# Example: sway_sources/sway/test/src/sdk-harness/test_artifacts/balance_contract/src/main.sw

```sway
contract;

abi BalanceTest {
    fn get_42() -> u64;
}

impl BalanceTest for Contract {
    fn get_42() -> u64 {
        42
    }
}

```
