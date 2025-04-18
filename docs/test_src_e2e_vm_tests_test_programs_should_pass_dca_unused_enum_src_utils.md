# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/unused_enum/src/utils.sw

```sway
library;

use ::r#enum::AnEnum;

pub fn uses_enum() -> AnEnum {
    AnEnum::Variant
}

```
