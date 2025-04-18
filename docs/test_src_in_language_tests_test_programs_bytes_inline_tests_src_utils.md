# Example: test/src/in_language_tests/test_programs/bytes_inline_tests/src/utils.sw

```sway
library;

use std::bytes::Bytes;

pub fn setup() -> (Bytes, u8, u8, u8) {
    let mut bytes = Bytes::new();
    let a = 5u8;
    let b = 7u8;
    let c = 9u8;
    bytes.push(a);
    bytes.push(b);
    bytes.push(c);
    (bytes, a, b, c)
}

```
