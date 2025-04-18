# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/match_expressions_with_self/src/main.sw

```sway
script;

use std::assert::*;

enum Initialized {
    True: (),
    False: (),
}

impl PartialEq for Initialized {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (Initialized::True, Initialized::True) => true,
            (Initialized::False, Initialized::False) => true,
            _ => false,
        }
    }
}
impl Eq for Initialized {}

impl Initialized {
    fn foo(self) -> bool {
        match self {
            Self::True(_) => true,
            Self::False(_) => false,
        }
    }
}

fn main() -> u64 {
    let a = Initialized::True;
    let b = Initialized::False;
    let c = a == b;
    assert(c == false);

    assert(a.foo());

    1
}

```
