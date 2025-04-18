# Example: test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/return_struct/src/main.sw

```sway
contract;

pub mod data_structures;
mod interface;

use interface::MyContract;
use data_structures::MyStruct;
use std::hash::*;

storage {
    a: StorageMap<u64, MyStruct> = StorageMap::<u64, MyStruct> {}
}

impl MyContract for Contract {
    #[storage(read)]
    fn test_function() -> Option<MyStruct> {
        storage.a.get(1).try_read()
    }
}

```
