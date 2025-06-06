# Example: test/src/e2e_vm_tests/test_programs/should_pass/storage_slot_key_calculation/src/main.sw

```sway
contract;

use std::hash::*;

storage {
    a: u8 = 0,
    b: u8 = 0,
    ns1 {
        a: u8 = 0,
        b: u8 = 0,
    },
    ns2 {
        ns3 {
            a: u8 = 0,
            b: u8 = 0,
        },
    },
}

abi TestStorageKeyCalculation {
    #[storage(read)]
    fn test_storage_key_calculation();
}

impl TestStorageKeyCalculation for Contract {
    #[storage(read)]
    fn test_storage_key_calculation() {
        assert_eq(storage.a.slot(), sha256((0u8, "storage.a")));
        assert_eq(storage.b.slot(), sha256((0u8, "storage.b")));
        assert_eq(storage::ns1.a.slot(), sha256((0u8, "storage::ns1.a")));
        assert_eq(storage::ns1.b.slot(), sha256((0u8, "storage::ns1.b")));
        assert_eq(storage::ns2::ns3.a.slot(), sha256((0u8, "storage::ns2::ns3.a")));
        assert_eq(storage::ns2::ns3.b.slot(), sha256((0u8, "storage::ns2::ns3.b")));
    }
}

#[test]
fn test() {
    let caller = abi(TestStorageKeyCalculation, CONTRACT_ID);
    caller.test_storage_key_calculation();
}
```
