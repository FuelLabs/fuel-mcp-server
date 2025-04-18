# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/associated_const_trait_method/src/main.sw

```sway
script;

trait ConstantId {
    const ID: u32;
} {
  fn foo(self) -> u32 {
    Self::ID
  }
}

struct Struct { }
impl ConstantId for Struct { const ID: u32 = 1; }

fn main() -> u32 {
  let s = Struct {};
  s.foo()
}

```
