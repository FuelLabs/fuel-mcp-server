# Example: test/src/e2e_vm_tests/test_programs/should_pass/blanket_impl/src/main.sw

```sway
script;

mod traits;

use traits::Foo;

struct Bar {}

fn main() -> u64 {
    let bar = Bar {};
    bar.foo()
    
}


```
