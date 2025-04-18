# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/associated_const_impl_generic/src/main.sw

```sway
script;

struct Struct<T> { }

impl<T> Struct<T> {
    const ID: u32 = 1;
}

fn main() -> u32 {
  Struct::<u32>::ID
}

// TODO: errors with generics are not supported here
```
