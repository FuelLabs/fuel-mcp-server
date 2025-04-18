# Example: test/src/e2e_vm_tests/test_programs/should_pass/blanket_impl_u16/src/main.sw

```sway
script;

mod traits;

use traits::Foo;

fn main() -> u64 {
    1_u16.foo()  
}


```
