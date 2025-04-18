# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/reexport_paths_external_lib/ext_5_items/src/lib.sw

```sway
library;

pub struct Items5_Struct {
    pub e: u64,
}

pub enum Items5_Enum {
    I: u64,
    J: u64,
}

pub enum Items5_Variants {
    Q: u64,
    R: u64,
}

pub const ITEMS_5_FUNCTION_RES = 32894;

pub fn items_5_function() -> u64 {
    ITEMS_5_FUNCTION_RES
}

pub trait Items5Trait<T> {
    fn items_5_trait_function(self, x: T) -> bool;
}

```
