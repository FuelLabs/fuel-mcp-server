# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/shadowing_in_reexporting_module/src/lib_1.sw

```sway
library;

pub use ::items_1::*;

pub struct Items1_Struct {
    pub a: u64,
}

pub enum Items1_Enum {
    A: u64,
    B: u64,
}

pub const ITEMS_1_FUNCTION_RES = 654;

pub fn items_1_function() -> u64 {
    ITEMS_1_FUNCTION_RES
}

pub trait Items1Trait<T> {
    fn items_1_trait_function(self, x: T) -> u64;
}

```
