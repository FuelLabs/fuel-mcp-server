# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/generic_impl_self_where/src/traits/nested_traits.sw

```sway
library;

pub trait MyEq2 {
    fn my_eq2(self, other: Self) -> bool;
}

impl MyEq2 for u64 {
    fn my_eq2(self, other: Self) -> bool {
        self == other
    }
}

```
