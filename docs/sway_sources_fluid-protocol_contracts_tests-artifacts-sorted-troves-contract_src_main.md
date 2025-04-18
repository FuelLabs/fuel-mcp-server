# Example: sway_sources/fluid-protocol/contracts/tests-artifacts-sorted-troves-contract/src/main.sw

```sway
contract;

use libraries::fluid_math::*;
use libraries::sorted_troves_interface::SortedTroves;
use libraries::trove_manager_interface::data_structures::Status;
abi TroveManager {
    #[storage(read, write)]
    fn initialize(
        borrow_operations: ContractId,
        sorted_troves: ContractId,
        asset: ContractId,
        stability_pool: ContractId,
        default_pool: ContractId,
        active_pool: ContractId,
        coll_surplus_pool: ContractId,
        usdf_contract: ContractId,
    );
    #[storage(read, write)]
    fn set_nominal_icr_and_insert(
        id: Identity,
        value: u64,
        prev_id: Identity,
        next_id: Identity,
        asset: AssetId,
    );
    #[storage(read, write)]
    fn remove(id: Identity, asset: AssetId);
    #[storage(read)]
    fn get_nominal_icr(id: Identity) -> u64;
    #[storage(read, write)]
    fn close_trove(id: Identity, asset: AssetId);
    #[storage(read)]
    fn get_trove_status(id: Identity) -> Status;
    #[storage(read, write)]
    fn add_asset(asset: AssetId, trove_manager: ContractId);
}
use std::{
    asset::transfer,
    block::{
        height,
        timestamp,
    },
    call_frames::{
        msg_asset_id,
    },
    context::{
        msg_amount,
    },
    hash::Hash,
};

storage {
    sorted_troves_contract: ContractId = ContractId::zero(),
    borrow_operations_contract: ContractId = ContractId::zero(),
    nominal_icr: StorageMap<Identity, u64> = StorageMap::<Identity, u64> {},
}

impl TroveManager for Contract {
    #[storage(read, write)]
    fn initialize(
        borrow_operations: ContractId,
        sorted_troves: ContractId,
        oracle: ContractId,
        stability_pool: ContractId,
        default_pool: ContractId,
        active_pool: ContractId,
        coll_surplus: ContractId,
        usdf_contract: ContractId,
    ) {
        storage.sorted_troves_contract.write(sorted_troves);
        storage.borrow_operations_contract.write(borrow_operations);
    }
    #[storage(read)]
    fn get_nominal_icr(id: Identity) -> u64 {
        return storage.nominal_icr.get(id).try_read().unwrap_or(0)
    }
    #[storage(read, write)]
    fn add_asset(asset: AssetId, trove_manager: ContractId) {
        let sorted_troves_contract = abi(SortedTroves, storage.sorted_troves_contract.read().into());
        sorted_troves_contract.add_asset(asset, trove_manager);
    }
    #[storage(read, write)]
    fn set_nominal_icr_and_insert(
        id: Identity,
        value: u64,
        prev_id: Identity,
        next_id: Identity,
        asset: AssetId,
    ) {
        storage.nominal_icr.insert(id, value);
        let sorted_troves_contract = abi(SortedTroves, storage.sorted_troves_contract.read().bits());
        sorted_troves_contract.insert(id, value, prev_id, next_id, asset);
    }
    #[storage(read, write)]
    fn remove(id: Identity, asset: AssetId) {
        storage.nominal_icr.insert(id, 0);
        let sorted_troves_contract = abi(SortedTroves, storage.sorted_troves_contract.read().into());
        sorted_troves_contract.remove(id, asset);
    }
    #[storage(read)]
    fn get_trove_status(id: Identity) -> Status {
        return Status::Active
    }
    #[storage(read, write)]
    fn close_trove(id: Identity, asset: AssetId) {
        require_caller_is_borrow_operations_contract();
        internal_close_trove(id, Status::ClosedByOwner, asset);
    }
}
#[storage(read, write)]
fn internal_close_trove(id: Identity, close_status: Status, asset: AssetId) {
    let sorted_troves_contract = abi(SortedTroves, storage.sorted_troves_contract.read().into());
    sorted_troves_contract.remove(id, asset);
}
#[storage(read)]
fn require_caller_is_borrow_operations_contract() {
    let caller = msg_sender().unwrap();
    let borrow_operations_contract = Identity::ContractId(storage.borrow_operations_contract.read());
    require(
        caller == borrow_operations_contract,
        "TestsArtifactsSortedTrovesContract: Caller is not the Borrow Operations contract",
    );
}

```
