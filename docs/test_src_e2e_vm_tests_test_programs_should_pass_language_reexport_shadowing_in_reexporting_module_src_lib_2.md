# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/shadowing_in_reexporting_module/src/lib_2.sw

```sway
library;

pub use ::items_2_1::*;

pub use ::items_2_2::Items2_Struct;
pub use ::items_2_2::Items2_Enum;
pub use ::items_2_2::ITEMS_2_FUNCTION_RES;
pub use ::items_2_2::items_2_function;
pub use ::items_2_2::Items2Trait;

```
