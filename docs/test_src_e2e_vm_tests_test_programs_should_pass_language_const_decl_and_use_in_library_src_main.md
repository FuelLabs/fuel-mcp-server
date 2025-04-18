# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/const_decl_and_use_in_library/src/main.sw

```sway
script;

mod consts;

use consts::adder;

fn main() -> u64 {
    adder()
}

```
