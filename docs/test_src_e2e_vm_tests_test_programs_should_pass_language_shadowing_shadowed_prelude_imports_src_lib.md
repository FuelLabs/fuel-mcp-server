# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/shadowing/shadowed_prelude_imports/src/lib.sw

```sway
library;

// Shadows the Add trait from std::ops, imported via std::prelude
pub trait Add {
    // Same name as std::ops::Add, but different return type
    fn add(self, other: Self) -> u64;
}

// Shadows std::logging::log, which is imported through the std prelude
pub fn log<T>(value: T) -> u64 {
    112
}
   

```
