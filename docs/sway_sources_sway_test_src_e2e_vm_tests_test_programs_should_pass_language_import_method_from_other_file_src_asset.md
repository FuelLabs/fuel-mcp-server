# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/import_method_from_other_file/src/asset.sw

```sway
library;

pub struct Asset {
    pub value: u64,
}

impl PartialEq for Asset {
    fn eq(self, other: Self) -> bool {
        self.value == other.value
    }
}
impl Eq for Asset {}

```
