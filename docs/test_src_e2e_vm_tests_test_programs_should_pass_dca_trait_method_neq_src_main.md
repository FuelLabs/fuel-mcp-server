# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/trait_method_neq/src/main.sw

```sway
script;

fn main() -> u64 {
    let a = 255;

    enum X {
        Y: bool,
    }

    impl PartialEq for X {
        fn eq(self, other: Self) -> bool {
            asm(r1: self, r2: other, r3) {
                eq r3 r2 r1;
                r3: bool
            }
        }
    }
    impl Eq for X {}

    if X::Y(true) == X::Y(true) {
        a
    } else {
        a
    }
}
```
