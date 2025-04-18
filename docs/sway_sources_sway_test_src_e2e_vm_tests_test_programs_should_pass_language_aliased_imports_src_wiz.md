# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/aliased_imports/src/wiz.sw

```sway
library;

// Dead code analysis disabled due to a bug.
// See https://github.com/FuelLabs/sway/issues/5902#issuecomment-2079212717
#[allow(dead_code)] 
pub struct Wiz {
    pub wiz: u64,
}

```
