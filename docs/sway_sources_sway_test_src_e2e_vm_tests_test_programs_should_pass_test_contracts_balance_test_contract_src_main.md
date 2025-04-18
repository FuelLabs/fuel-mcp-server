# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/balance_test_contract/src/main.sw

```sway
contract;

use balance_test_abi::BalanceTest;

impl BalanceTest for Contract {
    fn get_42() -> u64 {
        42
    }
}

```
