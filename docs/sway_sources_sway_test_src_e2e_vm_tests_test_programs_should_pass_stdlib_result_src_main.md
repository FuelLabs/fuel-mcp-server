# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/stdlib/result/src/main.sw

```sway
script;

pub mod data_structures;
mod tests;

use tests::*;

fn main() -> bool {
    test_bool();
    test_u8();
    test_u16();
    test_u32();
    test_u64();
    test_struct();
    test_enum();
    test_tuple();
    test_array();
    test_string();

    true
}

```
