# Example: test/src/sdk-harness/test_artifacts/pow/src/main.sw

```sway
contract;

use std::math::*;

abi PowTest {
    fn u64_overflow(a: u64, b: u32) -> u64;
    fn u32_overflow(a: u32, b: u32) -> u32;
    fn u16_overflow(a: u16, b: u32) -> u16;
    fn u8_overflow(a: u8, b: u32) -> u8;
}

impl PowTest for Contract {
    fn u64_overflow(a: u64, b: u32) -> u64 {
        a.pow(b)
    }

    fn u32_overflow(a: u32, b: u32) -> u32 {
        a.pow(b)
    }

    fn u16_overflow(a: u16, b: u32) -> u16 {
        a.pow(b)
    }

    fn u8_overflow(a: u8, b: u32) -> u8 {
        a.pow(b)
    }
}

```
