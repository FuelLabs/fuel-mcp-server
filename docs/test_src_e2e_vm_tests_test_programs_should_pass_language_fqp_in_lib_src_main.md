# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/fqp_in_lib/src/main.sw

```sway
script;

pub mod lib;

use ::lib::*;

fn main() {
    test_u128_from_u8();
}

```
