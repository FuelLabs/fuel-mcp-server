# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/associated_const_impl/src/main.sw

```sway
script;

struct Struct { }

impl Struct {
    const ID: u32 = 1;
}

fn main() -> u32 {
  Struct::ID
}

```
