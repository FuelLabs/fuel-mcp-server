# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/static_analysis/cei_pattern_violation_storage_struct_read/src/main.sw

```sway
contract;

use std::storage::storage_vec::StorageVec;

abi MyContract {
    #[storage(read)]
    fn withdraw();
}

struct Struct {
    x: u64,
    y: u64,
}

storage {
    var1: Struct = Struct { x: 0, y: 0 },
}

impl MyContract for Contract {
    #[storage(read)]
    fn withdraw() {
        let caller = abi(MyContract, 0x3dba0a4455b598b7655a7fb430883d96c9527ef275b49739e7b0ad12f8280eae);
        caller.withdraw();
        storage.var1.read();
    }
}


```
