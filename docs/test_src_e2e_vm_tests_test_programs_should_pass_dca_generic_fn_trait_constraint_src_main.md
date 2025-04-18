# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/generic_fn_trait_constraint/src/main.sw

```sway
script;

pub trait MyEq {
    fn my_eq(self, other: Self);
}

impl MyEq for u64 {
    fn my_eq(self, _other: Self) {
    }
}

fn test_my_eq<T>(x: T, y: T) where T: MyEq {
  x.my_eq(y)
}

fn main() {
  test_my_eq(42, 42);
}

```
