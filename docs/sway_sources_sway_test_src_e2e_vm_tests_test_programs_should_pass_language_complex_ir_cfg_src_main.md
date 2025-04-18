# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/complex_ir_cfg/src/main.sw

```sway
script;

use std::u128::U128;

pub enum Error {
    Overflow: (),
}

fn main() {
    let x = U128::from((0, 0));
    let cond = false;
    require(cond || (x < U128::from((1, 1)) || x == U128::from((1, 1))), Error::Overflow);
}

```
