[Docs](https://docs.fuel.network/) /

[Sway Standards](https://docs.fuel.network/docs/sway-standards/) /

Src 16 Typed Structured Data

## _Icon Link_ [SRC-16: Typed Structured Data](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#src-16-typed-structured-data)

The following standard sets out to standardize encoding and hashing of typed structured data. This enables secure off-chain message signing with human-readable data structures.

## _Icon Link_ [Motivation](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#motivation)

As the Fuel ecosystem expands, there's an increasing need for applications to handle complex, human-readable data structures rather than raw bytes. When users sign messages or transactions, they should be able to clearly understand what they're signing, whether it's a simple asset transfer, or a complex DeFi interaction. Without a standard method for hashing structured data, developers risk implementing their own solutions, which could lead to confusion or compromise security. This standard provides a secure and consistent way to handle encoding and hashing of structured data, ensuring both safety and usability within ecosystem.

This standard aims to:

- Provide a secure, standardized method for hashing structured data
- Enable clear presentation of structured data for user verification during signing
- Support complex data types that mirror Sway structs
- Enable domain separation to prevent cross-protocol replay attacks
- Define a consistent encoding scheme for structured data types
- Remain stateless, not requiring any storage attributes to enable use across all Fuel program types.

## _Icon Link_ [Prior Art](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#prior-art)

This standard uses ideas from [Ethereum's EIP-712 standard _Icon Link_](https://eips.ethereum.org/EIPS/eip-712), adapting its concepts for the Fuel ecosystem. EIP-712 has proven successful in enabling secure structured data signing for applications like the various browser based wallets and signers that are utilized throughout various DeFi protocols.

## _Icon Link_ [Specification](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#specification)

## _Icon Link_ [Definition of Typed Structured Data 𝕊](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#definition-of-typed-structured-data-%F0%9D%95%8A)

The set of structured data 𝕊 consists of all instances of struct types that can be composed from the following types:

Atomic Types:

```fuel_Box fuel_Box-idXKMmm-css
u8 to u256
bool
b256 (hash)
```

_Icon ClipboardText_

Dynamic Types:

```fuel_Box fuel_Box-idXKMmm-css
Bytes   // Variable-length byte sequences
String  // Variable-length strings
```

_Icon ClipboardText_

Reference Types:

Arrays (both fixed size and dynamic)
Structs (reference to other struct types)

Example struct definition:

```fuel_Box fuel_Box-idXKMmm-css
struct Mail {
    from: Address,
    to: Address,
    contents: String,
}
```

_Icon ClipboardText_

## _Icon Link_ [Domain Separator Encoding](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#domain-separator-encoding)

The domain separator provides context for the signing operation, preventing cross-protocol replay attacks. It is computed as hash\_struct(domain) where domain is defined as:

```fuel_Box fuel_Box-idXKMmm-css
pub struct SRC16Domain {
    name: String,                   // The protocol name (e.g., "MyProtocol")
    version: String,                // The protocol version (e.g., "1")
    chain_id: u64,                  // The Fuel chain ID
    verifying_contract: ContractId, // The contract id that will verify the signature
}
```

_Icon ClipboardText_

The `chain_id` field is a u64 that must be encoded by left-padding with zeros and packed in big-endian order to fill a 32-byte value.

The domain separator encoding follows this scheme:

- Add SRC16\_DOMAIN\_TYPE\_HASH
- Add Keccak256 hash of name string
- Add Keccak256 hash of version string
- Add chain ID as 32-byte big-endian
- Add verifying contract id as 32 bytes

## _Icon Link_ [Type Encoding](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#type-encoding)

Each struct type is encoded as name ‖ "(" ‖ member₁ ‖ "," ‖ member₂ ‖ "," ‖ … ‖ memberₙ ")" where each member is written as type ‖ " " ‖ name.

Example:

```fuel_Box fuel_Box-idXKMmm-css
Mail(address from,address to,string contents)
```

_Icon ClipboardText_

## _Icon Link_ [Data Encoding](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#data-encoding)

## _Icon Link_ [Definition of hash\_struct](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#definition-of-hash_struct)

The hash\_struct function is defined as:

hash\_struct(s : 𝕊) = keccak256(type\_hash ‖ encode\_data(s))
where:

- type\_hash = keccak256(encode\_type(type of s))
- ‖ represents byte concatenation
- encode\_type and encode\_data are defined below

## _Icon Link_ [Definition of encode\_data](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#definition-of-encode_data)

The encoding of a struct instance is enc(value₁) ‖ enc(value₂) ‖ … ‖ enc(valueₙ), the concatenation of the encoded member values in the order they appear in the type. Each encoded member value is exactly 32 bytes long.

The values are encoded as follows:

Atomic Values:

- Boolean false and true are encoded as u64 values 0 and 1, padded to 32 bytes
- `Address`, `ContractId`, `Identity`, and `b256` are encoded directly as 32 bytes
- Unsigned Integer values (u8 to u256) are encoded as big-endian bytes, padded to 32 bytes

Dynamic Types:

- `Bytes` and `String` are encoded as their Keccak256 hash

Reference Types:

- Arrays (both fixed and dynamic) are encoded as the Keccak256 hash of their concatenated encodings
- Struct values are encoded recursively as hash\_struct(value)

The implementation of `TypedDataHash` for `𝕊` SHALL utilize the `DataEncoder` for encoding each element of the struct based on its type.

## _Icon Link_ [Final Message Encoding](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#final-message-encoding)

The encoding of structured data follows this pattern:

encode(domain\_separator : 𝔹²⁵⁶, message : 𝕊) = "\\x19\\x01" ‖ `domain_separator` ‖ `hash_struct`(message)

where:

- \\x19\\x01 is a constant prefix
- ‖ represents byte concatenation
- `domain_separator` is the 32-byte hash of the domain parameters
- `hash_struct`(message) is the 32-byte hash of the structured data

## _Icon Link_ [Example implementation](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#example-implementation)

```fuel_Box fuel_Box-idXKMmm-css
const MAIL_TYPE_HASH: b256 = 0x536e54c54e6699204b424f41f6dea846ee38ac369afec3e7c141d2c92c65e67f;

impl TypedDataHash for Mail {

    fn type_hash() -> b256 {
        MAIL_TYPE_HASH
    }

    fn struct_hash(self) -> b256 {
        let mut encoded = Bytes::new();
        encoded.append(
            MAIL_TYPE_HASH.to_be_bytes()
        );
        encoded.append(
            DataEncoder::encode_address(self.from).to_be_bytes()
        );
        encoded.append(
            DataEncoder::encode_address(self.to).to_be_bytes()
        );
        encoded.append(
            DataEncoder::encode_string(self.contents).to_be_bytes()
        );

        keccak256(encoded)
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [Rationale](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#rationale)

- Domain separators provides protocol-specific context to prevent signature replay across different protocols and chains.
- Type hashes ensure type safety and prevent collisions between different data structures
- The encoding scheme is designed to be deterministic and injective
- The standard maintains compatibility with existing Sway types and practices

## _Icon Link_ [Backwards Compatibility](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#backwards-compatibility)

This standard is compatible with existing Sway data structures and can be implemented alongside other Fuel standards. It does not conflict with existing signature verification methods.

## _Icon Link_ [Type System Compatibility Notes](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#type-system-compatibility-notes)

When implementing SRC16 in relation to EIP712, the following type mappings and considerations apply:

## _Icon Link_ [String Encoding](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#string-encoding)

- Both standards use the same String type and encoding
- SRC16 specifically uses String type only (not Sway's `str` or `str[]`)
- String values are encoded identically in both standards using keccak256 hash

## _Icon Link_ [Fixed Bytes](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#fixed-bytes)

- EIP712's `bytes32` maps directly to Sway's `b256`
- Encoded using `encode_b256` in the `DataEncoder`
- Both standards handle 32-byte values identically
- Smaller fixed byte arrays ( `bytes1` to `bytes31`) are not supported in SRC16

## _Icon Link_ [Address Types](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#address-types)

- EIP712 uses 20-byte Ethereum addresses
- When encoding an EIP712 address, SRC16:
  - Takes only rightmost 20 bytes from a 32-byte Fuel Address
  - Pads with zeros on the left for EIP712 compatibility
  - Example: Fuel `Address` of 32 bytes becomes rightmost 20 bytes in EIP712 encoding

## _Icon Link_ [ContractId Handling](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#contractid-handling)

- `ContractId` is unique to Fuel/SRC16 (no equivalent in EIP712)
- When encoding for EIP712 compatibility:
  - Uses rightmost 20 bytes of `ContractId`
  - Particularly important in domain separators where EIP712 expects a 20-byte address

## _Icon Link_ [Domain Separator Compatibility](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#domain-separator-compatibility)

```fuel_Box fuel_Box-idXKMmm-css
// SRC16 Domain (Fuel native)
pub struct SRC16Domain {
    name: String,                   // Same as EIP712
    version: String,                // Same as EIP712
    chain_id: u64,                  // Fuel chain ID
    verifying_contract: ContractId, // Full 32-byte ContractId
}

// EIP712 Domain (Ethereum compatible)
pub struct EIP712Domain {
    name: String,
    version: String,
    chain_id: u256,
    verifying_contract: b256,      // Only rightmost 20 bytes used
}
```

_Icon ClipboardText_

Note on `verifying_contract` field; When implementing EIP712 compatibility within SRC16, the `verifying_contract` address in the `EIP712Domain` must be constructed by taking only the rightmost 20 bytes from either a Fuel `ContractId`. This ensures proper compatibility with Ethereum's 20-byte addressing scheme in the domain separator.

```fuel_Box fuel_Box-idXKMmm-css
// Example ContractId conversion:
// Fuel ContractId (32 bytes):
//   0x000000000000000000000000a2233d3bf2aa3f0cbbe824eb04afc1acc84c364c
//                            └─────────────── 20 bytes ───────────────┘
//
// EIP712 Address (20 bytes):
//   0xa2233d3bf2aa3f0cbbe824eb04afc1acc84c364c
//    └─────────────── 20 bytes ───────────────┘
```

_Icon ClipboardText_

Note on EIP712 Domain Separator `salt`; Within EIP712 the field `salt` is an optional field to be used at the discretion of the protocol designer. Within SRC16 the `EIP712Domain` does not use the `salt` field. The other fields in `EIP712Domain` are mandatory within SRC16.

## _Icon Link_ [Security Considerations](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#security-considerations)

## _Icon Link_ [Replay Attacks](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#replay-attacks)

Implementations must ensure signatures cannot be replayed across:

Different chains (prevented by chain\_id)
Different protocols (prevented by domain separator)
Different contracts (prevented by verifying\_contract)

## _Icon Link_ [Type Safety](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#type-safety)

Implementations must validate all type information and enforce strict encoding rules to prevent type confusion attacks.

## _Icon Link_ [Example Implementation](https://docs.fuel.network/docs/sway-standards/src-16-typed-structured-data/\#example-implementation-1)

Example of the SRC16 implementation where a contract utilizes the encoding scheme to produce a typed structured data hash of the Mail type.

```fuel_Box fuel_Box-idXKMmm-css
contract;

use standards::src16::{
    DataEncoder,
    DomainHash,
    SRC16,
    SRC16Base,
    SRC16Domain,
    SRC16Encode,
    SRC16Payload,
    TypedDataHash,
};
use std::{bytes::Bytes, contract_id::*, hash::*, string::String};

configurable {
    /// The name of the signing domain.
    DOMAIN: str[8] = __to_str_array("MyDomain"),
    /// The current major version for the signing domain.
    VERSION: str[1] = __to_str_array("1"),
    /// The active chain ID where the signing is intended to be used. Cast to u256 in domain_hash
    CHAIN_ID: u64 = 9889u64,
}

/// A demo struct representing a mail message
pub struct Mail {
    /// The sender's address
    pub from: Address,
    /// The recipient's address
    pub to: Address,
    /// The message contents
    pub contents: String,
}

/// The Keccak256 hash of the type Mail as UTF8 encoded bytes.
///
/// "Mail(address from,address to,string contents)"
///
/// 536e54c54e6699204b424f41f6dea846ee38ac369afec3e7c141d2c92c65e67f
///
const MAIL_TYPE_HASH: b256 = 0x536e54c54e6699204b424f41f6dea846ee38ac369afec3e7c141d2c92c65e67f;

impl TypedDataHash for Mail {
    fn type_hash() -> b256 {
        MAIL_TYPE_HASH
    }

    fn struct_hash(self) -> b256 {
        let mut encoded = Bytes::new();
        // Add the Mail type hash.
        encoded.append(MAIL_TYPE_HASH.to_be_bytes());
        // Use the DataEncoder to encode each field for known types
        encoded.append(DataEncoder::encode_address(self.from).to_be_bytes());
        encoded.append(DataEncoder::encode_address(self.to).to_be_bytes());
        encoded.append(DataEncoder::encode_string(self.contents).to_be_bytes());

        keccak256(encoded)
    }
}

/// Implement the encode function for Mail using SRC16Payload
///
/// # Additional Information
///
/// 1. Get the encodeData hash of the Mail typed data using
///    <Mail>..struct_hash();
/// 2. Obtain the payload to by populating the SRC16Payload struct
///    with the domain separator and data_hash from the previous step.
/// 3. Obtain the final_hash [Some(b256)] or None using the function
///    SRC16Payload::encode_hash()
///
impl SRC16Encode<Mail> for Mail {
    fn encode(s: Mail) -> b256 {
        // encodeData hash
        let data_hash = s.struct_hash();
        // setup payload
        let payload = SRC16Payload {
            domain: _get_domain_separator(),
            data_hash: data_hash,
        };

        // Get the final encoded hash
        match payload.encode_hash() {
            Some(hash) => hash,
            None => revert(0),
        }
    }
}

impl SRC16Base for Contract {
    fn domain_separator_hash() -> b256 {
        _get_domain_separator().domain_hash()
    }

    fn data_type_hash() -> b256 {
        MAIL_TYPE_HASH
    }
}

impl SRC16 for Contract {
    fn domain_separator() -> SRC16Domain {
        _get_domain_separator()
    }
}

abi MailMe {
    fn send_mail_get_hash(from_addr: Address, to_addr: Address, contents: String) -> b256;
}

impl MailMe for Contract {
    /// Sends a some mail and returns its encoded hash
    ///
    /// # Arguments
    ///
    /// * `from_addr`: [Address] - The sender's address
    /// * `to_addr`: [Address] - The recipient's address
    /// * `contents`: [String] - The message contents
    ///
    /// # Returns
    ///
    /// * [b256] - The encoded hash of the mail data
    ///
    fn send_mail_get_hash(from_addr: Address, to_addr: Address, contents: String) -> b256 {
        // Create the mail struct from data passed in call
        let some_mail = Mail {
            from: from_addr,
            to: to_addr,
            contents: contents,
        };

        Mail::encode(some_mail)
    }
}

/// A program specific implementation to get the Fuel SRC16Domain
///
/// In a Contract the ContractID can be obtain with ContractId::this()
///
/// In a Predicate or Script it is at the implementors discretion to
/// use the code root if they wish to contrain the validation to a
/// specifc program.
///
fn _get_domain_separator() -> SRC16Domain {
    SRC16Domain::new(
        String::from_ascii_str(from_str_array(DOMAIN)),
        String::from_ascii_str(from_str_array(VERSION)),
        CHAIN_ID,
        ContractId::this(),
    )
}

```

Collapse_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
contract;

use standards::src16::{
    DataEncoder,
    DomainHash,
    EIP712,
    EIP712Domain,
    SRC16Base,
    SRC16Encode,
    SRC16Payload,
    TypedDataHash,
};
use std::{bytes::Bytes, contract_id::*, hash::*, string::String};

configurable {
    /// The name of the signing domain.
    DOMAIN: str[8] = __to_str_array("MyDomain"),
    /// The current major version for the signing domain.
    VERSION: str[1] = __to_str_array("1"),
    /// The active chain ID where the signing is intended to be used. Cast to u256 in domain_hash
    CHAIN_ID: u64 = 9889u64,
}

/// A demo struct representing a mail message
pub struct Mail {
    /// The sender's address
    pub from: b256,
    /// The recipient's address
    pub to: b256,
    /// The message contents
    pub contents: String,
}

/// The Keccak256 hash of the type Mail as UTF8 encoded bytes.
///
/// "Mail(bytes32 from,bytes32 to,string contents)"
///
/// cfc972d321844e0304c5a752957425d5df13c3b09c563624a806b517155d7056
///
const MAIL_TYPE_HASH: b256 = 0xcfc972d321844e0304c5a752957425d5df13c3b09c563624a806b517155d7056;

impl TypedDataHash for Mail {
    fn type_hash() -> b256 {
        MAIL_TYPE_HASH
    }

    fn struct_hash(self) -> b256 {
        let mut encoded = Bytes::new();

        // Add the Mail type hash.
        encoded.append(MAIL_TYPE_HASH.to_be_bytes());
        // Use the DataEncoder to encode each field for known types
        encoded.append(DataEncoder::encode_b256(self.from).to_be_bytes());
        encoded.append(DataEncoder::encode_b256(self.to).to_be_bytes());
        encoded.append(DataEncoder::encode_string(self.contents).to_be_bytes());

        keccak256(encoded)
    }
}

/// Implement the encode function for Mail using SRC16Payload
///
/// # Additional Information
///
/// 1. Get the encodeData hash of the Mail typed data using
///    <Mail>..struct_hash();
/// 2. Obtain the payload to by populating the SRC16Payload struct
///    with the domain separator and data_hash from the previous step.
/// 3. Obtain the final_hash [Some(b256)] or None using the function
///    SRC16Payload::encode_hash()
///
impl SRC16Encode<Mail> for Mail {
    fn encode(s: Mail) -> b256 {
        // encodeData hash
        let data_hash = s.struct_hash();
        // setup payload
        let payload = SRC16Payload {
            domain: _get_domain_separator(),
            data_hash: data_hash,
        };

        // Get the final encoded hash
        match payload.encode_hash() {
            Some(hash) => hash,
            None => revert(0),
        }
    }
}

impl SRC16Base for Contract {
    fn domain_separator_hash() -> b256 {
        _get_domain_separator().domain_hash()
    }

    fn data_type_hash() -> b256 {
        MAIL_TYPE_HASH
    }
}

impl EIP712 for Contract {
    fn domain_separator() -> EIP712Domain {
        _get_domain_separator()
    }
}

abi MailMe {
    fn send_mail_get_hash(from_addr: b256, to_addr: b256, contents: String) -> b256;
}

impl MailMe for Contract {
    /// Sends a some mail and returns its encoded hash
    ///
    /// # Arguments
    ///
    /// * `from_addr`: [b256] - The sender's address
    /// * `to_addr`: [b256] - The recipient's address
    /// * `contents`: [String] - The message contents
    ///
    /// # Returns
    ///
    /// * [b256] - The encoded hash of the mail data
    ///
    fn send_mail_get_hash(from_addr: b256, to_addr: b256, contents: String) -> b256 {
        // Create the mail struct from data passed in call
        let some_mail = Mail {
            from: from_addr,
            to: to_addr,
            contents: contents,
        };

        Mail::encode(some_mail)
    }
}

/// A program specific implementation to get the Ethereum EIP712Domain
///
/// In a Contract the ContractID can be obtain with ContractId::this()
///
/// In a Predicate or Script it is at the implementors discretion to
/// use the code root if they wish to contrain the validation to a
/// specifc program.
///
fn _get_domain_separator() -> EIP712Domain {
    EIP712Domain::new(
        String::from_ascii_str(from_str_array(DOMAIN)),
        String::from_ascii_str(from_str_array(VERSION)),
        (asm(r1: (0, 0, 0, CHAIN_ID)) {
                r1: u256
            }),
        ContractId::this(),
    )
}

```

Collapse_Icon ClipboardText_