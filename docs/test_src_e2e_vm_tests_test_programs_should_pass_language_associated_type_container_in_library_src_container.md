# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/associated_type_container_in_library/src/container.sw

```sway
library;

pub trait Container {
    type E;
    fn empty() -> Self;
    fn insert(ref mut self, elem: Self::E);
    fn pop_last(ref mut self) -> Option<Self::E>;
}
```
