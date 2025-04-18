# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/method_on_primitives/src/main.sw

```sway
script;

use std::assert::*;

fn main() {
    assert(__slice(&[1u8], 0, 1).len() == 1);
}

```
