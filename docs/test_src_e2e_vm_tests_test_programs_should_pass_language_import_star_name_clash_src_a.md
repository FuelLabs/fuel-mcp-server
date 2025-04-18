# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/import_star_name_clash/src/a.sw

```sway
library;

// Allow dead code because of a bug in the dead code elimination
// See https://github.com/FuelLabs/sway/issues/5902
#[allow(dead_code)]
pub struct MyStruct {
    pub a: u64,
}

pub enum MyEnum {
    A: u64,
    B: u64,
}

pub struct C {
    pub b: u64,
}

```
