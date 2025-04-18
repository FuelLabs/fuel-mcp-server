# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/const_generics/src/main.sw

```sway
script;

struct C {}

trait A {
    fn my_len(self) -> u64;
}

impl<T, const N: u64> A for [T; N] {
    fn my_len(self) -> u64 {
        N
    }
}

fn main(a: [u64; 2]) {
    __log(a);

    let a = [C {}].my_len();
    assert(a == 1);

    let b = [C {}, C{}].my_len();
    assert(b == 2);
}
```
