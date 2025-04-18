# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/builtin_type_method_call/src/main.sw

```sway
script;

use std::ops::*;

fn main() -> u64 {
    let a = 1u64;
    let b = 2u64;
    u64::binary_xor(a, b)
}

```
