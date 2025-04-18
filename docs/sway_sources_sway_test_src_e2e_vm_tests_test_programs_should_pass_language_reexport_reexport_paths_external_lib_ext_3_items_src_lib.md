# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/reexport_paths_external_lib/ext_3_items/src/lib.sw

```sway
library;

pub struct Items3_Struct {
    pub c: u64,
}

pub enum Items3_Enum {
    E: u64,
    F: u64,
}

pub enum Items3_Variants {
    U: u64,
    V: u64,
}

pub const ITEMS_3_FUNCTION_RES = 893;

pub fn items_3_function() -> u64 {
    ITEMS_3_FUNCTION_RES
}

pub trait Items3Trait<T> {
    fn items_3_trait_function(self, x: T) -> bool;
}

```
