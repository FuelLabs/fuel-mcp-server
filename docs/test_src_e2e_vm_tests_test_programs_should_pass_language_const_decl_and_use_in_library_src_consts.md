# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/const_decl_and_use_in_library/src/consts.sw

```sway
library;

const THREE: u64 = 3;
const FOUR: u64 = 4;

pub fn adder() -> u64 {
    THREE + FOUR
}

```
