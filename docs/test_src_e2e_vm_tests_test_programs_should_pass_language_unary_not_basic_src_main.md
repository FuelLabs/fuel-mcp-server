# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/unary_not_basic/src/main.sw

```sway
script;
use std::*;

fn main() -> bool {
    let a: bool = true;
    let b = !a; // false
    let c = ! !b; // false
    let d = ! ! !c; // true
    d
}

```
