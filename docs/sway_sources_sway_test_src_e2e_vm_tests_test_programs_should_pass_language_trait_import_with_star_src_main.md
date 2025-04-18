# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/trait_import_with_star/src/main.sw

```sway
script;

mod shiftable;
use shiftable::*;

fn main() {
    let mut shiftAnswer: u64 = 0;

    shiftAnswer.my_rsh(5);
}

```
