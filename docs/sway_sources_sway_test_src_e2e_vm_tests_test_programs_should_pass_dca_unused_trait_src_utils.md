# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/unused_trait/src/utils.sw

```sway
library;

use ::r#trait::Trait;

pub fn uses_trait<T>(_a: T) where T: Trait {

}

```
