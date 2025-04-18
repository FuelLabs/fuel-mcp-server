# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/use_absolute_path/src/foo.sw

```sway
library;

use ::trait::*;

pub struct Foo {
    foo: u32,
}

impl Trait for Foo {
    fn method() -> u64 {
        42
    }
}

```
