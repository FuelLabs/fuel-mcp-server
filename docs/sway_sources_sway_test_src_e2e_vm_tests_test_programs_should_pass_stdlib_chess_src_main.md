# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/stdlib/chess/src/main.sw

```sway
script;

mod huge_enum;

use huge_enum::*;

fn main() -> u64 {
    let huge = Huge::b3;
    huge.to_u64()
}

```
