# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/associated_type_method/src/main.sw

```sway
script;

trait TypeTrait {
    type T;

    fn method(self, s1: Self::T) -> Self::T;
}

struct Struct {}

struct Struct2 {}

struct Struct3 {}

impl TypeTrait for Struct2 {
  type T = Struct;

  fn method(self, s1: Self::T) -> Self::T {
    s1
  }
}

impl TypeTrait for Struct3 {
  type T = Struct2;

  fn method(self, s1: Self::T) -> Self::T {
    s1
  }
}

fn main() -> u32 {
  Struct2 {}.method(Struct {});
  Struct3 {}.method(Struct2 {});

  1
}

```
