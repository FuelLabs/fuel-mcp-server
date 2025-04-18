# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/associated_type_ascription/src/main.sw

```sway
script;

trait TypeTrait {
    type T;
}

struct Struct {}

struct Struct2 {}

struct Struct3 {}

impl TypeTrait for Struct2 {
  type T = Struct;
}

impl TypeTrait for Struct3 {
  type T = Struct2;
}

fn main() -> u32 {
  let _: Struct2::T = Struct {};
  let _: Struct3::T = Struct2 {};
  let _: Struct3::T::T = Struct {};

  1
}

```
