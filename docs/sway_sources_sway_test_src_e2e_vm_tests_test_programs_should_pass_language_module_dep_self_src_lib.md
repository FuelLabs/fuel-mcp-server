# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/module_dep_self/src/lib.sw

```sway
library;

mod a;

fn main() -> u32 {
  a::a();
  0
}

```
