# Example: sway_sources/bako-safe/packages/sway/src/libraries/src/constants.sw

```sway
library;

pub const INVALID_ADDRESS = Address::from(0x0000000000000000000000000000000000000000000000000000000000000001);

pub const BYTE_WITNESS_TYPE_FUEL: u64 = 0x0000000000000001;
pub const BYTE_WITNESS_TYPE_WEBAUTHN: u64 = 0x0000000000000000;

pub const MAX_SIGNERS: u64 = 10; // if changed, sync with the predicate expected signers
pub const EMPTY_SIGNERS = [
    b256::zero(), b256::zero(), b256::zero(), b256::zero(), b256::zero(), b256::zero(), b256::zero(), b256::zero(),
    b256::zero(), b256::zero(),
];

pub const PREFIX_BAKO_SIG: [u8; 4] = [66, 65, 75, 79];

pub const ASCII_MAP: [u8; 16] = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102];

```
