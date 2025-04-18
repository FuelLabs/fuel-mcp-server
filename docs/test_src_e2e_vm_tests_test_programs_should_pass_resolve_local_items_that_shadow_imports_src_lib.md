# Example: test/src/e2e_vm_tests/test_programs/should_pass/resolve_local_items_that_shadow_imports/src/lib.sw

```sway
library;

pub enum Enum {
    A: (),
}

pub struct Struct {
    pub x: u64,
}

pub struct PubStruct {
    pub x: u64,
}

pub struct GenericStruct<T> {
    pub x: T,
}

pub const X: u64 = 0u64;
```
