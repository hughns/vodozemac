// Copyright 2024 The Matrix.org Foundation C.I.C.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use chacha20poly1305::{aead::Aead, ChaCha20Poly1305, Key as Chacha20Key, KeyInit, Nonce};
use hkdf::Hkdf;
use rand::thread_rng;
use sha2::Sha512;
use thiserror::Error;
use x25519_dalek::{EphemeralSecret, SharedSecret};
use zeroize::{Zeroize, ZeroizeOnDrop};

pub use self::messages::{InitialMessage, Message, SecureChannelMessage};
use crate::Curve25519PublicKey;

mod messages;

#[derive(Debug, Error)]
pub enum SecureChannelError {
    /// At least one of the keys did not have contributory behaviour and the
    /// resulting shared secret would have been insecure.
    #[error("At least one of the keys did not have contributory behaviour")]
    NonContributoryKey,

    #[error("The message could not have been decrypted")]
    Decryption,
}

pub struct ChannelCreationResult {
    pub secure_channel: EstablishedSecureChannel,
    pub message: Vec<u8>,
}

pub struct SecureChannel {
    secret_key: EphemeralSecret,
}

impl SecureChannel {
    pub fn new() -> Self {
        let rng = thread_rng();
        let secret_key = EphemeralSecret::random_from_rng(rng);

        Self { secret_key }
    }

    pub fn create_outbound_channel(
        self,
        their_public_key: Curve25519PublicKey,
    ) -> Result<EstablishedSecureChannel, SecureChannelError> {
        let our_public_key = self.public_key();
        let shared_secret = self.secret_key.diffie_hellman(&their_public_key.inner);

        if shared_secret.was_contributory() {
            Ok(EstablishedSecureChannel::new(
                &shared_secret,
                our_public_key,
                their_public_key,
                true,
            ))
        } else {
            Err(SecureChannelError::NonContributoryKey)
        }
    }

    pub fn create_inbound_channel(
        self,
        message: &InitialMessage,
    ) -> Result<ChannelCreationResult, SecureChannelError> {
        let our_public_key = self.public_key();

        let shared_secret = self.secret_key.diffie_hellman(&message.public_key.inner);

        if shared_secret.was_contributory() {
            let mut secure_channel = EstablishedSecureChannel::new(
                &shared_secret,
                our_public_key,
                message.public_key,
                false,
            );

            let nonce = secure_channel.decryption_nonce.get();
            let message = secure_channel.decrypt_helper(&nonce, &message.ciphertext)?;

            Ok(ChannelCreationResult { secure_channel, message })
        } else {
            Err(SecureChannelError::NonContributoryKey)
        }
    }

    pub fn public_key(&self) -> Curve25519PublicKey {
        Curve25519PublicKey::from(&self.secret_key)
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CheckCode {
    bytes: [u8; 2],
}

impl CheckCode {
    pub fn as_bytes(&self) -> &[u8; 2] {
        &self.bytes
    }

    pub fn to_digit(&self) -> u8 {
        let first = (self.bytes[0] % 10) * 10;
        let second = self.bytes[1] % 10;

        first + second
    }
}

#[derive(Zeroize, ZeroizeOnDrop)]
pub struct EstablishedSecureChannel {
    #[zeroize(skip)]
    our_public_key: Curve25519PublicKey,
    #[zeroize(skip)]
    their_public_key: Curve25519PublicKey,
    #[zeroize(skip)]
    encryption_nonce: SecureChannelNonce,
    #[zeroize(skip)]
    decryption_nonce: SecureChannelNonce,
    /// The key that we will use to encrypt messages
    encryption_key: Box<[u8; 32]>,
    /// The key that the other party will use to encrypt messages
    decryption_key: Box<[u8; 32]>,
    #[zeroize(skip)]
    check_code: CheckCode,
    /// Whether we initiated the secure channel or not. i.e. are we Device G?
    initiator: bool,
}

const CHECKCODE_INFO_STRING: &str = "MATRIX_QR_CODE_LOGIN_CHECKCODE";
const ENCKEY_S_INFO_STRING: &str = "MATRIX_QR_CODE_LOGIN_ENCKEY_S";
const ENCKEY_G_INFO_STRING: &str = "MATRIX_QR_CODE_LOGIN_ENCKEY_G";

impl EstablishedSecureChannel {
    fn create_check_code(
        shared_secret: &SharedSecret,
        our_public_key: Curve25519PublicKey,
        their_public_key: Curve25519PublicKey,
        initiator: bool,
    ) -> CheckCode {
        let mut bytes = [0u8; 2];
        let kdf: Hkdf<Sha512> = Hkdf::new(None, shared_secret.as_bytes());

        let info = if initiator {
            // we are Device G. Gp = our_public_key, Sp = their_public_key
            format!("{CHECKCODE_INFO_STRING}|{}|{}", our_public_key.to_base64(), their_public_key.to_base64(),)
        } else {
            // we are Device S. Gp = their_public_key, Sp = our_public_key
            format!("{CHECKCODE_INFO_STRING}|{}|{}", their_public_key.to_base64(), our_public_key.to_base64(),)
        };

        kdf.expand(info.as_bytes(), bytes.as_mut_slice())
            .expect("We should be able to expand the shared secret into a 32 byte key.");

        CheckCode { bytes }
    }

    fn create_key(
        info: &str,
        shared_secret: &SharedSecret,
        our_public_key: Curve25519PublicKey,
        their_public_key: Curve25519PublicKey,
        initiator: bool,
    ) -> Box<[u8; 32]> {
        let mut key = Box::new([0u8; 32]);
        let kdf: Hkdf<Sha512> = Hkdf::new(None, shared_secret.as_bytes());

        let info = if initiator {
            // we are Device G. Gp = our_public_key, Sp = their_public_key
            format!("{info}|{}|{}", our_public_key.to_base64(), their_public_key.to_base64(),)
        } else {
            // we are Device S. Gp = their_public_key, Sp = our_public_key
            format!("{info}|{}|{}", their_public_key.to_base64(), our_public_key.to_base64(),)
        };

        kdf.expand(info.as_bytes(), key.as_mut_slice())
            .expect("We should be able to expand the shared secret into a 32 byte key.");

        key
    }

    fn create_encryption_key(
        shared_secret: &SharedSecret,
        our_public_key: Curve25519PublicKey,
        their_public_key: Curve25519PublicKey,
        initiator: bool,
    ) -> Box<[u8; 32]> {
        let info: &str = if initiator {
            // we are Device G
            ENCKEY_G_INFO_STRING
        } else {
            // we are Device S
            ENCKEY_S_INFO_STRING
        };

        Self::create_key(info, shared_secret, our_public_key, their_public_key, initiator)
    }

    fn create_decryption_key(
        shared_secret: &SharedSecret,
        our_public_key: Curve25519PublicKey,
        their_public_key: Curve25519PublicKey,
        initiator: bool,
    ) -> Box<[u8; 32]> {
        let info: &str = if initiator {
            // we are Device G, they are Device S
            ENCKEY_S_INFO_STRING
        } else {
            // we are Device S, they are Device G
            ENCKEY_G_INFO_STRING
        };

        Self::create_key(info, shared_secret, our_public_key, their_public_key, initiator)
    }

    fn new(
        shared_secret: &SharedSecret,
        our_public_key: Curve25519PublicKey,
        their_public_key: Curve25519PublicKey,
        initiator: bool,
    ) -> Self {
        let (encryption_nonce, decryption_nonce) = (SecureChannelNonce::zero(), SecureChannelNonce::zero());

        let encryption_key = Self::create_encryption_key(shared_secret, our_public_key, their_public_key, initiator);
        let decryption_key = Self::create_decryption_key(shared_secret, our_public_key, their_public_key, initiator);
        let check_code =
            Self::create_check_code(shared_secret, our_public_key, their_public_key, initiator);

        Self {
            encryption_key,
            decryption_key,
            encryption_nonce,
            decryption_nonce,
            our_public_key,
            their_public_key,
            check_code,
            initiator,
        }
    }

    pub fn public_key(&self) -> Curve25519PublicKey {
        self.our_public_key
    }

    pub fn check_code(&self) -> &CheckCode {
        &self.check_code
    }

    fn encryption_key(&self) -> &Chacha20Key {
        Chacha20Key::from_slice(self.encryption_key.as_slice())
    }

    fn decryption_key(&self) -> &Chacha20Key {
        Chacha20Key::from_slice(self.decryption_key.as_slice())
    }

    pub fn encrypt(&mut self, plaintext: &[u8]) -> SecureChannelMessage {
        let nonce = self.encryption_nonce.get();

        let cipher = ChaCha20Poly1305::new(self.encryption_key());
        let ciphertext = cipher.encrypt(&nonce, plaintext).expect(
            "We should always be able to encrypt a message since we provide the correct nonce",
        );

        if self.initiator && nonce.as_slice() == &[0u8; 12] {
            // we are Device G, we send the LoginInitiateMessage
            InitialMessage { ciphertext, public_key: self.our_public_key }.into()
        } else {
            Message { ciphertext }.into()
        }
    }

    pub fn decrypt(&mut self, message: &Message) -> Result<Vec<u8>, SecureChannelError> {
        let nonce = self.decryption_nonce.get();
        self.decrypt_helper(&nonce, &message.ciphertext)
    }

    fn decrypt_helper(
        &self,
        nonce: &Nonce,
        ciphertext: &[u8],
    ) -> Result<Vec<u8>, SecureChannelError> {
        let cipher = ChaCha20Poly1305::new(self.decryption_key());
        let nonce = nonce.into();

        let plaintext =
            cipher.decrypt(nonce, ciphertext).map_err(|_| SecureChannelError::Decryption)?;

        Ok(plaintext)
    }
}

struct SecureChannelNonce {
    inner: u128,
}

impl SecureChannelNonce {
    fn zero() -> Self {
        Self { inner: 0 }
    }

    fn get(&mut self) -> Nonce {
        let current = self.inner;
        self.inner += 1;

        let mut nonce = [0u8; 12];
        nonce.copy_from_slice(&current.to_le_bytes()[..12]);

        Nonce::from_exact_iter(nonce)
            .expect("We should be able to construct the correct nonce from a 12 byte slice")
    }
}

#[cfg(test)]
mod test {
    use assert_matches2::assert_let;

    use super::*;

    #[test]
    fn channel_creation() {
        let plaintext = b"It's a secret to everybody";

        let alice = SecureChannel::new();
        let bob = SecureChannel::new();

        let mut alice = alice
            .create_outbound_channel(bob.public_key())
            .expect("We should be able to create an outbound channel");

        let message = alice.encrypt(plaintext);

        assert_let!(SecureChannelMessage::Initial(message) = message);

        let ChannelCreationResult { mut secure_channel, message } = bob
            .create_inbound_channel(&message)
            .expect("We should be able to create an inbound channel");

        assert_eq!(
            message, plaintext,
            "The decrypted plaintext should match our initial plaintext"
        );
        assert_eq!(alice.check_code(), secure_channel.check_code());
        assert_eq!(alice.check_code().to_digit(), secure_channel.check_code().to_digit());

        let message = secure_channel.encrypt(b"Another plaintext");

        assert_let!(SecureChannelMessage::Normal(message) = message);

        let decrypted =
            alice.decrypt(&message).expect("We should be able to decrypt the second message");

        assert_eq!(decrypted, b"Another plaintext");
    }
}
