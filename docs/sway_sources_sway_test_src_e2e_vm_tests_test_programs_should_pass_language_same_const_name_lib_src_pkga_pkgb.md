# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/same_const_name_lib/src/pkga/pkgb.sw

```sway
library;

pub const TEST_CONST: u64 = 40;

pub fn bar() {
    assert(TEST_CONST == 40);
}

```
