# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/reexport_paths_external_lib/ext_3_lib/src/lib.sw

```sway
library;

pub use ext_3_items::Items3_Struct;

pub use ext_3_items::Items3_Enum;

pub use ext_3_items::Items3_Variants::U;
pub use ext_3_items::Items3_Variants::V;

pub use ext_3_items::ITEMS_3_FUNCTION_RES;

pub use ext_3_items::items_3_function;

pub use ext_3_items::Items3Trait;

```
