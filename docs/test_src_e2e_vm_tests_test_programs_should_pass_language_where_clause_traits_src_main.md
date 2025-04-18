# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/where_clause_traits/src/main.sw

```sway
script;

trait MyTrait {
    fn new() -> Self;
}

trait MyTraitGeneric<T> where T : MyTrait {
    fn get_value(self) -> T;
}

struct S1 {
    s1: u64
}

impl MyTrait for S1 {
    fn new() -> Self {
        S1 {s1: 0}
    }
}

impl MyTraitGeneric<S1> for u64 {
    fn get_value(self) -> S1 {
        S1::new()
    }
}

fn main() -> u8 {
    let _s0: S1 = 42u64.get_value();

    0u8
}
```
