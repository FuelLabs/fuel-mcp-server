# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/shadowing_in_reexporting_module/src/items_3_1.sw

```sway
library;

pub struct Items3_Struct {
    pub c: bool,
}

pub enum Items3_Enum {
    E: bool,
    F: bool,
}

pub enum Items3_Variants {
    G: bool,
    H: bool,
}

pub const ITEMS_3_FUNCTION_RES = 1234;

pub fn items_3_function() -> bool {
    ITEMS_3_FUNCTION_RES == 1234
}

pub trait Items3Trait<T> {
    fn items_3_trait_function(self, x: T) -> bool;
}

```
