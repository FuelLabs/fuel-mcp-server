# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/multiple_imports_of_same_reexport/src/items_4.sw

```sway
library;

pub struct Items4_Struct {
    pub d: u64,
}

pub enum Items4_Enum {
    G: u64,
    H: u64,
}

pub enum Items4_Variants {
    S: u64,
    T: u64,
}

pub const ITEMS_4_FUNCTION_RES = 5325;

pub fn items_4_function() -> u64 {
    ITEMS_4_FUNCTION_RES
}

pub trait Items4Trait<T> {
    fn items_4_trait_function(self, x: T) -> bool;
}

```
