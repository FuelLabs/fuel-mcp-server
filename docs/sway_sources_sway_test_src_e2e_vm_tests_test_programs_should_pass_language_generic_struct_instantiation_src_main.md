# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/generic_struct_instantiation/src/main.sw

```sway
script;

trait Trait {
  fn method();
}

#[allow(dead_code)]
struct Struct<T> where T: Trait {
    
}

impl Trait for u64 {
  #[allow(dead_code)]
  fn method() {}
}

#[allow(dead_code)]
const C: Struct<u64> = Struct{};

fn main() -> u64 {
  1
}

```
