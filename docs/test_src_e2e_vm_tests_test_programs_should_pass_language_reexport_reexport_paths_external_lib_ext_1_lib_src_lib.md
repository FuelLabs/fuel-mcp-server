# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/reexport_paths_external_lib/ext_1_lib/src/lib.sw

```sway
library;

pub use ext_1_items::Items1_Struct;

pub use ext_1_items::Items1_Enum;

pub use ext_1_items::Items1_Variants::X;
pub use ext_1_items::Items1_Variants::Y;

pub use ext_1_items::ITEMS_1_FUNCTION_RES;

pub use ext_1_items::items_1_function;

pub use ext_1_items::Items1Trait;

```
