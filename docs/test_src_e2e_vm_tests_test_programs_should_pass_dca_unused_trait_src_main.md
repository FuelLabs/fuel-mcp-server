# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/unused_trait/src/main.sw

```sway
script;

pub mod r#trait;
mod utils;

use r#trait::Trait;

struct Foo {

}

impl Trait for Foo {

}

fn main() {
    utils::uses_trait(Foo{});
}

```
