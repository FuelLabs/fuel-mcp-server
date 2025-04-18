# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/local_impl_for_ord/src/main.sw

```sway
script;

use std::ops::{Eq, Ord};

enum X {
    Y: (),
}

impl PartialEq for X {
    fn eq(self, other: Self) -> bool {
        true
    }
}
impl Eq for X {}

impl Ord for X {
    fn lt(self, other: Self) -> bool {
        false
    }
    fn gt(self, other: Self) -> bool {
        false
    }
}

fn main() -> bool {
    X::Y == X::Y
}

```
