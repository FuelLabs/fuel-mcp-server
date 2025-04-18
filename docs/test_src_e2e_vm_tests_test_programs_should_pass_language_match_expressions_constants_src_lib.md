# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/match_expressions_constants/src/lib.sw

```sway
library;

pub const LIB_X: u64 = 1021;
pub const LIB_Y: u64 = 1034;

pub fn return_me<T>(x: T) -> T {
    x
}
```
