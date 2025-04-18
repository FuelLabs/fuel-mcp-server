# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/generic_impl_self_where/src/traits.sw

```sway
library;

pub mod nested_traits;

use nested_traits::*;

pub trait MyEq {
    fn my_eq(self, other: Self) -> bool;
}

impl MyEq for u64 {
    fn my_eq(self, other: Self) -> bool {
        self == other
    }
}

impl MyEq for bool {
    fn my_eq(self, other: Self) -> bool {
        self == other
    }
}

```
