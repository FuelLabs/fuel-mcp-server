# Example: sway_sources/fluid-protocol/libraries/src/stability_pool_interface.sw

```sway
library;

abi StabilityPool {
    #[storage(read, write)]
    fn initialize(
        usdf_address: ContractId,
        community_issuance_address: ContractId,
        protocol_manager: ContractId,
        active_pool: ContractId,
        sorted_troves: ContractId,
    );

    #[storage(read, write)]
    fn add_asset(
        trove_manager_address: ContractId,
        asset_address: AssetId,
        oracle_address: ContractId,
    );

    #[storage(read, write), payable]
    fn provide_to_stability_pool();

    #[storage(read, write)]
    fn withdraw_from_stability_pool(amount: u64);

    #[storage(read, write)]
    fn offset(
        debt_to_offset: u64,
        coll_to_offset: u64,
        asset_address: AssetId,
    );

    #[storage(read)]
    fn get_asset(asset_address: AssetId) -> u64;

    #[storage(read)]
    fn get_total_usdf_deposits() -> u64;

    #[storage(read)]
    fn get_depositor_asset_gain(depositor: Identity, asset_address: AssetId) -> u64;

    #[storage(read)]
    fn get_compounded_usdf_deposit(depositor: Identity) -> u64;

    #[storage(read)]
    fn get_depositor_fpt_gain(depositor: Identity) -> u64;
}

```
