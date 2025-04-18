# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/shadowing_in_reexporting_module/src/items_1.sw

```sway
library;

pub struct Items1_Struct {
    pub a: bool,
}

pub enum Items1_Enum {
    A: bool,
    B: bool,
}

pub const ITEMS_1_FUNCTION_RES = 456;

pub fn items_1_function() -> bool {
    ITEMS_1_FUNCTION_RES == 456
}

pub trait Items1Trait<T> {
    fn items_1_trait_function(self, x: T) -> bool;
}

```
