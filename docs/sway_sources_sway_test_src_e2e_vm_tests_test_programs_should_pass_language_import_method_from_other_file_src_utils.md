# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/import_method_from_other_file/src/utils.sw

```sway
library;

use ::asset::Asset;

pub struct Wrapper {
    pub asset: Asset,
}

impl Wrapper {
    pub fn new(value: u64) -> Self {
        Wrapper {
            asset: Asset { value },
        }
    }
}

impl PartialEq for Wrapper {
    fn eq(self, other: Self) -> bool {
        self.asset == other.asset
    }
}
impl Eq for Wrapper {}

```
