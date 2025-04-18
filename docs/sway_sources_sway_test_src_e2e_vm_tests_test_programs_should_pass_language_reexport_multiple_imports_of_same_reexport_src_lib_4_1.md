# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/multiple_imports_of_same_reexport/src/lib_4_1.sw

```sway
library;

pub use ::items_4::Items4_Struct;

pub use ::items_4::Items4_Enum;

pub use ::items_4::Items4_Variants::S;
pub use ::items_4::Items4_Variants::T;

pub use ::items_4::ITEMS_4_FUNCTION_RES;

pub use ::items_4::items_4_function;

pub use ::items_4::Items4Trait;

```
