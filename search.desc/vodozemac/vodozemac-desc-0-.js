searchState.loadedDescShard("vodozemac", 0, "A Rust implementation of Olm and Megolm\nThe signature wasn’t valid base64.\nThe pickle wasn’t valid base64.\nThe pickle wasn’t valid base64.\nThe message wasn’t valid base64.\nErrors that can occur while decoding.\nStruct representing a Curve25519 public key.\nStruct representing a Curve25519 secret key.\nThe payload of the pickle could not be decoded.\nError type describing the different ways message decoding …\nThe encrypted pickle could not have been decrypted.\nThe pickle could not have been decrypted.\nA struct collecting both a public, and a secret, Ed25519 …\nAn Ed25519 public key, used to verify digital signatures.\nAn Ed25519 secret key, used to create digital signatures.\nAn Ed25519 digital signature, can be used to verify the …\nThe object could not be encoded as a pickle.\nAn invalid byte was found in the input. The offset and …\nAn embedded public key couldn’t be decoded.\nThe last non-padding input symbol’s encoded 6 bits have …\nThe length of the input, as measured in valid base64 …\nThe embedded message authentication code couldn’t be …\nThe nature of the padding was not as configured: absent or …\nThe pickle does not contain a valid receiving or sending …\nThe message has a unsupported version.\nError type describing failures that can happen when we try …\nThe number of bytes a Curve25519 public key has.\nThe number of bytes a Ed25519 secret key has.\nThe number of bytes a Ed25519 public key has.\nThe number of bytes a Ed25519 signature has.\nError type describing the various ways libolm pickles can …\nThe message doesn’t have enough data to be correctly …\nThe Olm message has an invalid type.\nThe pickle is missing a valid version.\nThe message is missing a valid version.\nAt least one of the keys did not have contributory …\nError type describing the various ways Vodozemac pickles …\nA Protobuf message decoding error.\nThe message couldn’t be decoded as a valid protocol …\nThe pickle contains an invalid public key.\nThe serialized Vodozemac object couldn’t be deserialized.\nThe result of a Diffie-Hellman key exchange.\nThe signature failed to be verified.\nAn embedded signature couldn’t be decoded.\nError type describing signature verification failures.\nThe version of vodozemac that is being used.\nThe pickle has a unsupported version.\nView this shared secret key as a byte array.\nView this public key as a byte array.\nView this public key as a byte array.\nView this shared secret key as a byte array.\nDecode the input as base64 with no padding.\nEncode the input as base64 with no padding.\nPerform a Diffie-Hellman key exchange between the given …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nInstantiate a Curve25519 public key from an unpadded base64\nTry to create a <code>Ed25519SecretKey</code> from a base64 encoded …\nInstantiate a Ed25519PublicKey public key from an unpadded …\nTry to create a <code>Ed25519Signature</code> from an unpadded base64 …\nCreate a <code>Curve25519PublicKey</code> from a byte array.\nCreate a <code>Curve25519SecretKey</code> from the given slice of bytes.\nTry to create a <code>Curve25519PublicKey</code> from a slice of bytes.\nTry to create a <code>Ed25519SecretKey</code> from a slice of bytes.\nTry to create a <code>Ed25519PublicKey</code> from a slice of bytes.\nTry to create a <code>Ed25519Signature</code> from a slice of bytes.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAn implementation of the Megolm ratchet.\nGenerate a new, random, Curve25519SecretKey.\nCreate a new, random, <code>Ed25519Keypair</code>.\nCreate a new random <code>Ed25519SecretKey</code>.\nAn implementation of the Olm double ratchet.\nGet the public Ed25519 key of this keypair.\nGet the public key that matches this <code>Ed25519SecretKey</code>.\nUser-friendly key verification using short authentication …\nSign the given message with our secret key.\nSign the given slice of bytes with this <code>Ed25519SecretKey</code>.\nSerialize a Curve25519 public key to an unpadded base64 …\nConvert the secret key to a base64 encoded string.\nSerialize a Ed25519PublicKey public key to an unpadded …\nSerialize an <code>Ed25519Signature</code> to an unpadded base64 …\nConvert this shared secret to a byte array.\nConvert the <code>Curve25519SecretKey</code> to a byte array.\nConvert this public key to a byte array.\nGet the byte representation of the secret key.\nConvert the <code>Ed25519Signature</code> to a byte array.\nConvert the public key to a vector of bytes.\nVerify that the provided signature for a given message has …\nEnsure in constant-time that this shared secret did not …\nThe encoded session key wasn’t valid base64.\nThe first session has a better initial message index than …\nError type for Megolm-based decryption failures.\nThe sessions are the same.\nThe exported session key.\nA Megolm group session represents a single sending …\nA format suitable for serialization which implements …\nA format suitable for serialization which implements …\nThe message authentication code of the message was invalid.\nThe length of the message authentication code of the …\nThe ciphertext of the message isn’t padded correctly.\nAn encrypted Megolm message.\nThe encoded session key contains an invalid public key.\nThe encoded session key didn’t contain enough data to be …\nA struct to configure how Megolm sessions should work …\nThe session key, can be used to create a …\nError type describing failure modes for the <code>SessionKey</code> and …\nThe result of a comparison between two <code>InboundGroupSession</code> …\nThe signature on the message was invalid.\nThe signature on the session key was invalid.\nThe sessions are not the same, they can’t be compared.\nThe session is missing the correct message key to decrypt …\nThe encoded session key had a unsupported version.\nThe first session has a worse initial message index than …\nPermanently advance the session to the given index.\nThe actual ciphertext of the message.\nCompare the <code>InboundGroupSession</code> with the given other …\nCheck if two <code>InboundGroupSession</code>s are the same.\nEncrypt the <code>plaintext</code> with the group session.\nSerialize and encrypt the pickle using the given key.\nSerialize and encrypt the pickle using the given key.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nDeserialize the <code>ExportedSessionKey</code> from base64 encoded …\nDeserialize the <code>SessionKey</code> from base64 encoded string.\nTry to decode the given string as a <code>MegolmMessage</code>.\nDeserialize the <code>ExportedSessionKey</code> from a byte slice.\nDeserialize the <code>SessionKey</code> from a byte slice.\nTry to decode the given byte slice as a <code>MegolmMessage</code>.\nObtain a pickle from a ciphertext by decrypting and …\nObtain a pickle from a ciphertext by decrypting and …\nRestore a <code>GroupSession</code> from a previously saved …\nRestore an <code>InboundGroupSession</code> from a previously saved …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nGet the megolm message’s mac.\nMerge the session with the given other session, picking …\nReturn the current message index.\nThe index of the message that was used when the message …\nConstruct a new group session, with a random ratchet state …\nConvert the group session into a struct which implements …\nConvert the inbound group session into a struct which …\nReturns the globally unique session ID, in base64-encoded …\nExport the group session into a session key.\nGet a reference to the megolm message’s signature.\nSerialize the <code>ExportedSessionKey</code> to a base64 encoded …\nSerialize the <code>SessionKey</code> to a base64 encoded string.\nEncode the <code>MegolmMessage</code> as a string.\nSerialize the <code>ExportedSessionKey</code> to a byte vector.\nSerialize the <code>SessionKey</code> to a byte vector.\nEncode the <code>MegolmMessage</code> as an array of bytes.\nGet the numeric version of this <code>SessionConfig</code>.\nCreate a <code>SessionConfig</code> for the Megolm version 1. This …\nCreate a <code>SessionConfig</code> for the Megolm version 2. This …\nAn Olm account manages all cryptographic keys used on a …\nA format suitable for serialization which implements …\nThe pre-key message that was used to establish the Session …\nError type for Olm-based decryption failures.\nStruct holding the two public identity keys of an <code>Account</code>.\nReturn type for the creation of inbound <code>Session</code> objects.\nThe message authentication code of the message was invalid.\nThe length of the message authentication code of the …\nThe ciphertext of the message isn’t padded correctly.\nAn encrypted Olm message.\nAn enum over the two supported message types.\nThe pre-key message contains a curve25519 identity key …\nThe session is missing the correct message key to decrypt …\nThe pre-key message contained an unknown one-time key. …\nA normal message, contains only the ciphertext and …\nThe normal message type.\nEnum over the different Olm message types.\nThe result type for the one-time key generation operation.\nA pre-key message, contains metadata to establish a <code>Session</code>…\nThe pre-key message type.\nAn encrypted Olm pre-key message.\nThe public part of a <code>RatchetKey</code>.\nAn Olm session represents one end of an encrypted …\nA struct to configure how Olm sessions should work under …\nError describing failure modes when creating a Olm Session …\nThe set of keys that were used to establish the Olm …\nA format suitable for serialization which implements …\nToo many messages have been skipped to attempt decrypting …\nThe base key, a single use key that was created just in …\nThe index of the chain that was used when the message was …\nThe actual ciphertext of the message.\nCreate a <code>Session</code> from the given pre-key message and …\nCreate a <code>Session</code> with the given identity key and one-time …\nThe public part of the one-time keys that were newly …\nThe curve25519 key, used for to establish shared secrets.\nGet a reference to the account’s public Curve25519 key\nTry to decrypt an Olm message, which will either return …\nThe ed25519 key, used for signing.\nGet a reference to the account’s public Ed25519 key\nEncrypt the <code>plaintext</code> and construct an <code>OlmMessage</code>.\nSerialize and encrypt the pickle using the given key.\nSerialize and encrypt the pickle using the given key.\nGet the currently unpublished fallback key.\nThe <code>Account</code> stores at most two private parts of the …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nTry to decode the given string as a Olm <code>Message</code>.\nTry to decode the given string as a Olm <code>PreKeyMessage</code>.\nTry to decode the given byte slice as a Olm <code>Message</code>.\nTry to decode the given byte slice as a Olm <code>Message</code>.\nObtain a pickle from a ciphertext by decrypting and …\nObtain a pickle from a ciphertext by decrypting and …\nCreate an <code>Account</code> object by unpickling an account pickle …\nCreate a <code>Session</code> object by unpickling a session pickle in …\nCreate a <code>OlmMessage</code> from a message type and a ciphertext.\nRestore an <code>Account</code> from a previously saved <code>AccountPickle</code>.\nRestore a <code>Session</code> from a previously saved <code>SessionPickle</code>.\nGenerate a single new fallback key.\nGenerates the supplied number of one time keys. Returns …\nHave we ever received and decrypted a message from the …\nThe long term identity key of the sender of the message. …\nGet the IdentityKeys of this Account\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nHas the MAC been truncated in this Olm message.\nMark all currently unpublished one-time and fallback keys …\nGet the maximum number of one-time keys the client should …\nThe actual message that contains the ciphertext.\nGet the message as a byte array.\nGet the type of the message.\nCreate a new Account with new random identity keys.\nThe single-use key that was uploaded to a public key …\nGet the currently unpublished one-time keys.\nConvert the account into a struct which implements …\nConvert the session into a struct which implements …\nThe plaintext of the pre-key message.\nThe public part of the ratchet key, that was used when the …\nThe public part of the one-time keys that had to be …\nThe <code>Session</code> that was created from a pre-key message.\nReturns the globally unique session ID, in base64-encoded …\nReturns the globally unique session ID, in base64-encoded …\nReturns the globally unique session ID which these …\nGet the keys associated with this session.\nThe collection of all keys required for establishing an …\nSign the given message using our Ed25519 fingerprint key.\nEncode the <code>Message</code> as a string.\nEncode the <code>PreKeyMessage</code> as a string.\nEncode the <code>Message</code> as an array of bytes.\nEncode the <code>PreKeyMessage</code> as an array of bytes.\nPickle an <code>Account</code> into a libolm pickle format.\nConvert the <code>OlmMessage</code> into a message type, and base64 …\nThe version of the Olm message.\nGet the numeric version of this <code>SessionConfig</code>.\nCreate a <code>SessionConfig</code> for the Olm version 1. This version …\nCreate a <code>SessionConfig</code> for the Olm version 2. This version …\nA struct representing a short auth string verification …\nError type for the case when we try to generate too many …\nThe output type for the SAS MAC calculation.\nThe MAC failed to be validated.\nA struct representing a short auth string verification …\nBytes generated from an shared secret that can be used as …\nError type describing failures that can happen during the …\nGet the byte slice of the MAC.\nGet the raw bytes of the short auth string that can be …\nGenerate <code>SasBytes</code> using HKDF with the shared secret as the …\nGenerate the given number of bytes using HKDF with the …\nCalculate a MAC for the given input using the info string …\nCalculate a MAC for the given input using the info string …\nGet the three decimal numbers that can be presented to …\nEstablishes a SAS secret by performing a DH handshake with …\nEstablishes a SAS secret by performing a DH handshake with …\nGet the index of 7 emojis that can be presented to users …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCreate a new <code>Mac</code> object from a base64 encoded string.\nCreate a new <code>Mac</code> object from a byte slice.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCreate a new random verification object\nGet the public key that was created by us, that was used …\nGet the public key that can be used to establish a shared …\nGet the public key that was created by the other party, …\nConvert the MAC to a base64 encoded string.\nVerify a MAC that was previously created using the …")