# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/associated_const_trait_default/src/main.sw

```sway
script;

trait ConstantId {
    const ID: u32 = 7;
}

struct Struct {}

impl ConstantId for Struct {
  const ID: u32 = 5;
}

fn main() { }

#[test]
fn test() {
    assert_eq(5, Struct::ID);
    assert_eq(5, <Struct as ConstantId>::ID);
}

```
