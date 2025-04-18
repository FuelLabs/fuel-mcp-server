# Example: sway_sources/fluid-protocol/libraries/src/sorted_troves_interface.sw

```sway
library;

abi SortedTroves {
    #[storage(read, write)]
    fn set_params(
        size: u64,
        protocol_manager: ContractId,
        borrower_operations_identity: ContractId,
    );

    #[storage(read, write)]
    fn add_asset(asset: AssetId, trove_manager: ContractId);

    #[storage(read, write)]
    fn insert(
        id: Identity,
        icr: u64,
        prev_id: Identity,
        next_id: Identity,
        asset: AssetId,
    );

    #[storage(read, write)]
    fn remove(id: Identity, asset: AssetId);

    #[storage(read, write)]
    fn re_insert(
        id: Identity,
        new_icr: u64,
        prev_id: Identity,
        next_id: Identity,
        asset: AssetId,
    );

    #[storage(read)]
    fn contains(id: Identity, asset: AssetId) -> bool;

    #[storage(read)]
    fn is_full(asset: AssetId) -> bool;

    #[storage(read)]
    fn is_empty(asset: AssetId) -> bool;

    #[storage(read)]
    fn get_size(asset: AssetId) -> u64;

    #[storage(read)]
    fn get_max_size() -> u64;

    #[storage(read)]
    fn get_first(asset: AssetId) -> Identity;

    #[storage(read)]
    fn get_last(asset: AssetId) -> Identity;

    #[storage(read)]
    fn get_next(id: Identity, asset: AssetId) -> Identity;

    #[storage(read)]
    fn get_prev(id: Identity, asset: AssetId) -> Identity;

    #[storage(read)]
    fn valid_insert_position(
        icr: u64,
        next_id: Identity,
        prev_id: Identity,
        asset: AssetId,
    ) -> bool;

    #[storage(read)]
    fn find_insert_position(
        icr: u64,
        next_id: Identity,
        prev_id: Identity,
        asset: AssetId,
    ) -> (Identity, Identity);
}

pub struct Node {
    pub exists: bool,
    pub next_id: Identity,
    pub prev_id: Identity,
}

```
