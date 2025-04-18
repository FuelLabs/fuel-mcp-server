# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/unary_not_basic_2/src/main.sw

```sway
script;
use std::*;

fn main() -> bool {
    let a: bool = true;
    let b = !a; // false
    let c = !( !b); // false
    let d = !( ! !c); // true
    let _e = ( ! ! !(d));
    !(and_true(a)) || true
}

fn and_true(x: bool) -> bool {
    let _y = ! !x;
    x && true
}

```
