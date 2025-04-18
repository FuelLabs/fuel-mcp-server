# Example: test/src/e2e_vm_tests/test_programs/should_pass/blanket_impl/src/traits.sw

```sway
library;

pub trait Foo {
    fn foo(self) -> u64;
}

impl<T> Foo for T {
    fn foo(self) -> u64 {
        42
    }
}
```
