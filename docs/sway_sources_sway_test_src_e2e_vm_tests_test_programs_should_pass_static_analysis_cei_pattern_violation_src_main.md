# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/static_analysis/cei_pattern_violation/src/main.sw

```sway
contract;

use std::storage::storage_api::write;

abi TestAbi {
    #[storage(write)]
    fn deposit();
}

impl TestAbi for Contract {
    #[storage(write)]
    fn deposit() {
        let other_contract = abi(TestAbi, 0x3dba0a4455b598b7655a7fb430883d96c9527ef275b49739e7b0ad12f8280eae);

        // interaction
        other_contract.deposit();
        // effect -- therefore violation of CEI where effect should go before interaction
        let storage_key = 0x3dba0a4455b598b7655a7fb430883d96c9527ef275b49739e7b0ad12f8280eae;
        write(storage_key, 0, ());
    }
}

```
