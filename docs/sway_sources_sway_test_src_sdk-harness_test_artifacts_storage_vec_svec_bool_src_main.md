# Example: sway_sources/sway/test/src/sdk-harness/test_artifacts/storage_vec/svec_bool/src/main.sw

```sway
contract;

use std::storage::storage_vec::*;

abi MyContract {
    #[storage(read, write)]
    fn push(value: bool);

    #[storage(read, write)]
    fn pop() -> bool;

    #[storage(read)]
    fn get(index: u64) -> bool;

    #[storage(read, write)]
    fn remove(index: u64) -> bool;

    #[storage(read, write)]
    fn swap_remove(index: u64) -> bool;

    #[storage(read, write)]
    fn set(index: u64, value: bool);

    #[storage(read, write)]
    fn insert(index: u64, value: bool);

    #[storage(read)]
    fn len() -> u64;

    #[storage(read)]
    fn is_empty() -> bool;

    #[storage(write)]
    fn clear();

    #[storage(read, write)]
    fn swap(index_0: u64, index_1: u64);

    #[storage(read)]
    fn first() -> bool;

    #[storage(read)]
    fn last() -> bool;

    #[storage(read, write)]
    fn reverse();

    #[storage(read, write)]
    fn fill(value: bool);

    #[storage(read, write)]
    fn resize(new_len: u64, value: bool);
}

storage {
    my_vec: StorageVec<bool> = StorageVec {},
}

impl MyContract for Contract {
    #[storage(read, write)]
    fn push(value: bool) {
        storage.my_vec.push(value);
    }

    #[storage(read, write)]
    fn pop() -> bool {
        storage.my_vec.pop().unwrap()
    }

    #[storage(read)]
    fn get(index: u64) -> bool {
        storage.my_vec.get(index).unwrap().read()
    }

    #[storage(read, write)]
    fn remove(index: u64) -> bool {
        storage.my_vec.remove(index)
    }

    #[storage(read, write)]
    fn swap_remove(index: u64) -> bool {
        storage.my_vec.swap_remove(index)
    }

    #[storage(read, write)]
    fn set(index: u64, value: bool) {
        storage.my_vec.set(index, value);
    }

    #[storage(read, write)]
    fn insert(index: u64, value: bool) {
        storage.my_vec.insert(index, value);
    }

    #[storage(read)]
    fn len() -> u64 {
        storage.my_vec.len()
    }

    #[storage(read)]
    fn is_empty() -> bool {
        storage.my_vec.is_empty()
    }

    #[storage(write)]
    fn clear() {
        let _ = storage.my_vec.clear();
    }

    #[storage(read, write)]
    fn swap(index_0: u64, index_1: u64) {
        storage.my_vec.swap(index_0, index_1);
    }

    #[storage(read)]
    fn first() -> bool {
        storage.my_vec.first().unwrap().read()
    }

    #[storage(read)]
    fn last() -> bool {
        storage.my_vec.last().unwrap().read()
    }

    #[storage(read, write)]
    fn reverse() {
        storage.my_vec.reverse();
    }

    #[storage(read, write)]
    fn fill(value: bool) {
        storage.my_vec.fill(value);
    }

    #[storage(read, write)]
    fn resize(new_len: u64, value: bool) {
        storage.my_vec.resize(new_len, value);
    }
}

```
