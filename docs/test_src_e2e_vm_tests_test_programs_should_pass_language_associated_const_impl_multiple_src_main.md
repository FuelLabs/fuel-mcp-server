# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/associated_const_impl_multiple/src/main.sw

```sway
script;

struct Struct { }

impl Struct {
    const ID: u32 = 1;
}

impl Struct {
    const ID2: u32 = 2;
}

fn main() {}

#[test]
fn test() {
  assert_eq(1, Struct::ID);
  assert_eq(2, Struct::ID2);
}

```
