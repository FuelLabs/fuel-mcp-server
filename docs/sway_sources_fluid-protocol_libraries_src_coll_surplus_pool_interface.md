# Example: sway_sources/fluid-protocol/libraries/src/coll_surplus_pool_interface.sw

```sway
library;

abi CollSurplusPool {
    #[storage(read, write)]
    fn initialize(borrow_operations: ContractId, protocol_manager: Identity);

    #[storage(read, write)]
    fn add_asset(asset: AssetId, trove_manager: Identity);

    #[storage(read, write)]
    fn claim_coll(acount: Identity, asset: AssetId);

    #[storage(read)]
    fn get_asset(asset: AssetId) -> u64;

    #[storage(read)]
    fn get_collateral(acount: Identity, asset: AssetId) -> u64;

    #[storage(read, write)]
    fn account_surplus(account: Identity, amount: u64, asset: AssetId);
}

```
