# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/same_const_name/src/pkga/pkgb.sw

```sway
library;

pub const TEST_CONST: u64 = 10;

pub fn bar() {
    assert(same_const_name_lib::TEST_CONST == 60);
    assert(same_const_name_lib::pkga::TEST_CONST == 50);
    assert(same_const_name_lib::pkga::pkgb::TEST_CONST == 40);

    assert(TEST_CONST == 10);
}

```
