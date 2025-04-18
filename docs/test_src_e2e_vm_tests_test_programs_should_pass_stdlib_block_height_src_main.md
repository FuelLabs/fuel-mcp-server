# Example: test/src/e2e_vm_tests/test_programs/should_pass/stdlib/block_height/src/main.sw

```sway
script;

use std::block::height;

fn main() -> bool {
    let h = height();
    assert(h >= 1u32);
    true
}

```
