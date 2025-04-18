# Example: test/src/sdk-harness/test_projects/option_field_order/src/main.sw

```sway
contract;

use std::hash::*;

struct Data {
    value: u64,
}

storage {
    value: StorageMap<u64, Option<Data>> = StorageMap::<u64, Option<Data>> {},
}

abi MyContract {
    #[storage(read)]
    fn is_none() -> bool;
}

impl MyContract for Contract {
    #[storage(read)]
    fn is_none() -> bool {
        storage.value.get(0).try_read().is_none()
    }
}

```
