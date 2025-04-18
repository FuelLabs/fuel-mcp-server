# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/shadowing_in_reexporting_module/src/items_2_2.sw

```sway
library;

pub struct Items2_Struct {
    pub b: u64,
}

pub enum Items2_Enum {
    C: u64,
    D: u64,
}

pub const ITEMS_2_FUNCTION_RES = 987;

pub fn items_2_function() -> u64 {
    ITEMS_2_FUNCTION_RES
}

pub trait Items2Trait<T> {
    fn items_2_trait_function(self, x: T) -> u64;
}

```
