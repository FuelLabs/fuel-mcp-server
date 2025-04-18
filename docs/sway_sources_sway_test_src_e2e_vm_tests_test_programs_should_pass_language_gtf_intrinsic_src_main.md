# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/gtf_intrinsic/src/main.sw

```sway
script;

use std::tx::*;

fn main() -> u64 {
    assert(tx_witnesses_count() == 3);
    assert(tx_witness_data::<u8>(1).unwrap() == 1);
    assert(tx_witness_data::<u64>(2).unwrap() == 1234);
    0
}

```
