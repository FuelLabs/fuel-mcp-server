# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/multiple_imports_of_same_reexport/src/lib_3_2.sw

```sway
library;

pub use ::items_3::Items3_Struct;

pub use ::items_3::Items3_Enum;

pub use ::items_3::Items3_Variants::U;
pub use ::items_3::Items3_Variants::V;

pub use ::items_3::ITEMS_3_FUNCTION_RES;

pub use ::items_3::items_3_function;

pub use ::items_3::Items3Trait;

```
