# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/allow_dead_code/src/main.sw

```sway
script;

#[allow(dead_code)]
const A = 1;

#[allow(dead_code)]
struct A {
  i: u64,
}

#[allow(dead_code)]
enum E {
  A: ()
}

#[allow(dead_code)]
fn f() -> u64 {
  return 1;
}

#[allow(dead_code)]
trait Trait {
  fn m(self) -> bool;
}

struct B {
  i: u64,
  #[allow(dead_code)]
  u: u64,
}

impl B {
  fn a(self) -> u64 {
    return self.i;
  }

  #[allow(dead_code)]
  fn b(self) -> u64 {
    return 1;
  }
}

#[allow(dead_code)]
type Alias1 = B;

fn main() {
  let b = B { i: 43, u: 43 };
  let _i = b.a();
}

```
