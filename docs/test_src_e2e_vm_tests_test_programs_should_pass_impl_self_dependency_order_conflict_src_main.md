# Example: test/src/e2e_vm_tests/test_programs/should_pass/impl_self_dependency_order_conflict/src/main.sw

```sway
library;

mod foo;
use foo::*;

struct S {}

impl S {   //dependency of this impl is overwritten by the next impl
    fn a() -> u32 { foo() }
    fn b() {}
}

impl S {   //this will overwrite the dependency for the previous impl
    fn ab() {}
}

fn foo() -> u32 {
  2
}

fn main() {}

#[test]
fn test() {
  assert_eq(2, S::a());
}


```
