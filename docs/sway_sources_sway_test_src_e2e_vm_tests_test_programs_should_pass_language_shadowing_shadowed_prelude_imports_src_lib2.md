# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/shadowing/shadowed_prelude_imports/src/lib2.sw

```sway
library;

struct T {
    a: u64
}

// Add from std::prelude
impl Add for T {
    fn add(self, other: Self) -> Self {
        Self {
            a: self.a + other.a
        }
    }
}

pub fn log_tester(value: T) {
    log::<T>(value);
}
   

```
