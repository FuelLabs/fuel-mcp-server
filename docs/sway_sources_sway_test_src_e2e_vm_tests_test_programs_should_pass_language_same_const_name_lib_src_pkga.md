# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/same_const_name_lib/src/pkga.sw

```sway
library;

pub mod pkgb;

pub const TEST_CONST: u64 = 50;

pub fn foo() {
    assert(pkgb::TEST_CONST == 40);
    assert(TEST_CONST == 50);
}

```
