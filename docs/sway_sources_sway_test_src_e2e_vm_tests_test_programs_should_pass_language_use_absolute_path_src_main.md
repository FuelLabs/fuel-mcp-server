# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/use_absolute_path/src/main.sw

```sway
script;

pub mod r#trait;
mod foo;

use ::foo::*;
use ::trait::*;
use std::assert::*;

struct S<T> where T: Trait {}

fn main() -> u64 {
    assert(Foo::method() == 42);

    let _s = S::<Foo> {};

    1
}

```
