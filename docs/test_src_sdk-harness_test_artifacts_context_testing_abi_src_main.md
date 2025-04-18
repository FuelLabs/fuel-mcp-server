# Example: test/src/sdk-harness/test_artifacts/context_testing_abi/src/main.sw

```sway
library;

abi ContextTesting {
    #[payable]
    fn get_this_balance(asset: b256) -> u64;
    #[payable]
    fn get_balance_of_contract(asset: b256, r#contract: ContractId) -> u64;
    #[payable]
    fn get_amount() -> u64;
    #[payable]
    fn get_asset_id() -> b256;
    #[payable]
    fn get_gas() -> u64;
    #[payable]
    fn get_global_gas() -> u64;
    #[payable]
    fn receive_coins();
}

```
