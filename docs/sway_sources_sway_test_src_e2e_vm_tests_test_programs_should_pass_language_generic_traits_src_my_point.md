# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/generic_traits/src/my_point.sw

```sway
library;

use ::my_double::MyDouble;

pub struct MyPoint<T> {
    pub x: T,
    pub y: T,
}

impl MyDouble<u64> for MyPoint<u64> {
    fn my_double(self, value: u64) -> u64 {
        (self.x*2) + (self.y*2) + (value*2)
    }
}

```
