# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/enum_in_fn_decl/src/main.sw

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

    impl std::ops::Ord for X {
        fn lt(self, other: Self) -> bool {
            asm(r1: self, r2: other, r3) {
                lt r3 r2 r1;
                r3: bool
            }
        }
        fn gt(self, other: Self) -> bool {
            asm(r1: self, r2: other, r3) {
                gt r3 r2 r1;
                r3: bool
            }
        }
    }
    if X::Y(true) == X::Y(true) {
        a
    } else {
        a
    }
}

```
