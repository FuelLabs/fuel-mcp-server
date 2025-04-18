# Example: sway_sources/fluid-protocol/contracts/tests-artifacts-stability-pool-contract/src/main.sw

```sway
contract;

use libraries::fluid_math::*;
use libraries::sorted_troves_interface::SortedTroves;
use libraries::stability_pool_interface::StabilityPool;
use libraries::trove_manager_interface::data_structures::Status;
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
    stability_pool_contract: ContractId = ContractId::zero(),
    nominal_icr: StorageMap<Identity, u64> = StorageMap::<Identity, u64> {},
}

abi MockTroveManager {
    #[storage(read, write)]
    fn initialize(
        borrow_operations: ContractId,
        sorted_troves: ContractId,
        stability_pool: ContractId,
    );
    #[storage(read)]
    fn get_nominal_icr(id: Identity) -> u64;
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
    fn offset(debt: u64, coll: u64);
    #[storage(read, write)]
    fn set_trove_status(id: Identity, status: Status);
    #[storage(read, write)]
    fn increase_trove_coll(id: Identity, coll: u64) -> u64;
    #[storage(read, write)]
    fn increase_trove_debt(id: Identity, debt: u64) -> u64;
    #[storage(read, write)]
    fn decrease_trove_coll(id: Identity, value: u64) -> u64;
    #[storage(read, write)]
    fn decrease_trove_debt(id: Identity, value: u64) -> u64;
    #[storage(read, write)]
    fn add_trove_owner_to_array(id: Identity) -> u64;
    #[storage(read)]
    fn get_trove_debt(id: Identity) -> u64;
    #[storage(read)]
    fn get_trove_coll(id: Identity) -> u64;
    #[storage(read, write)]
    fn close_trove(id: Identity, asset: AssetId);
    #[storage(read, write)]
    fn remove_stake(id: Identity);
    #[storage(read, write)]
    fn liquidate(id: Identity);
    #[storage(read, write)]
    fn liquidate_troves(num_troves: u64);
    #[storage(read, write)]
    fn batch_liquidate_troves(ids: Vec<Identity>);
}
impl MockTroveManager for Contract {
    #[storage(read, write)]
    fn initialize(
        borrow_operations: ContractId,
        sorted_troves: ContractId,
        stability_pool: ContractId,
    ) {
        storage.sorted_troves_contract.write(sorted_troves);
        storage.borrow_operations_contract.write(borrow_operations);
        storage.stability_pool_contract.write(stability_pool);
    }
    #[storage(read)]
    fn get_nominal_icr(id: Identity) -> u64 {
        storage.nominal_icr.get(id).try_read().unwrap_or(0)
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
    fn offset(debt: u64, coll: u64) {
        let stability_pool = abi(StabilityPool, storage.stability_pool_contract.read().into());
        stability_pool.offset(
            debt,
            coll,
            AssetId::from(storage.sorted_troves_contract.read().bits()),
        );
    }
    #[storage(read, write)]
    fn set_trove_status(id: Identity, status: Status) {}
    #[storage(read, write)]
    fn increase_trove_coll(id: Identity, coll: u64) -> u64 {
        return 0
    }
    #[storage(read, write)]
    fn increase_trove_debt(id: Identity, debt: u64) -> u64 {
        return 0
    }
    #[storage(read, write)]
    fn decrease_trove_coll(id: Identity, value: u64) -> u64 {
        return 0
    }
    #[storage(read, write)]
    fn decrease_trove_debt(id: Identity, value: u64) -> u64 {
        return 0
    }
    #[storage(read, write)]
    fn add_trove_owner_to_array(id: Identity) -> u64 {
        return 0
    }
    #[storage(read)]
    fn get_trove_debt(id: Identity) -> u64 {
        return 0
    }
    #[storage(read)]
    fn get_trove_coll(id: Identity) -> u64 {
        return 0
    }
    #[storage(read, write)]
    fn close_trove(id: Identity, asset: AssetId) {
        require_caller_is_borrow_operations_contract();
        internal_close_trove(id, Status::ClosedByOwner, asset);
    }
    #[storage(read, write)]
    fn remove_stake(id: Identity) {}
    #[storage(read, write)]
    fn liquidate(id: Identity) {}
    #[storage(read, write)]
    fn liquidate_troves(num_troves: u64) {}
    #[storage(read, write)]
    fn batch_liquidate_troves(ids: Vec<Identity>) {}
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
        "TestsArtifactsStabilityPoolContract: Caller is not the Borrow Operations contract",
    );
}

```
