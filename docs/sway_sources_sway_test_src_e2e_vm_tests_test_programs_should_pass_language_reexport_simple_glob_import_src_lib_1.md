# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/simple_glob_import/src/lib_1.sw

```sway
library;

pub use ::items_1::Items1_Struct;

pub use ::items_1::Items1_Enum;

pub use ::items_1::Items1_Variants::X;
pub use ::items_1::Items1_Variants::Y;

pub use ::items_1::ITEMS_1_FUNCTION_RES;

pub use ::items_1::items_1_function;

pub use ::items_1::Items1Trait;

```
