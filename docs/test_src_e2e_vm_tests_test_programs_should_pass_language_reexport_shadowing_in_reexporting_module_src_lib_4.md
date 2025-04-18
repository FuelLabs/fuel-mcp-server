# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/shadowing_in_reexporting_module/src/lib_4.sw

```sway
library;

pub use ::items_4_1::*;
pub use ::items_4_1::Items4_Variants::*;

pub use ::items_4_2::Items4_Struct;
pub use ::items_4_2::Items4_Enum;
pub use ::items_4_2::Items4_Variants;
pub use ::items_4_2::Items4_Variants::K;
pub use ::items_4_2::Items4_Variants::L;
pub use ::items_4_2::ITEMS_4_FUNCTION_RES;
pub use ::items_4_2::items_4_function;
pub use ::items_4_2::Items4Trait;

pub use ::items_4_3::Items4_Variants2::*;
pub use ::items_4_4::Items4_Variants2::M;
pub use ::items_4_4::Items4_Variants2::N;

```
