# Example: sway_sources/fluid-protocol/contracts/multi-trove-getter-contract/src/main.sw

```sway
contract;
// This contract, MultiTroveGetter, is used to retrieve multiple troves from the SortedTroves contract.
// It is used for querying the system.
//
// To the auditor: This contract is not used in the system. It is only used for querying the system for frontend purposes.

use libraries::trove_manager_interface::TroveManager;
use libraries::sorted_troves_interface::SortedTroves;
use libraries::fluid_math::*;
use std::{
    asset::transfer,
    auth::msg_sender,
    call_frames::{
        msg_asset_id,
    },
    context::{
        msg_amount,
    },
    hash::Hasher,
};

configurable {
    SORTED_TROVES_CONTRACT: ContractId = ContractId::zero(),
}

abi MultiTroveGetter {
    #[storage(read)]
    fn get_multiple_sorted_troves(
        trove_manager_contract: ContractId,
        asset_id: AssetId,
        start_indx: u64,
        count: u8,
    ) -> Vec<CombinedTroveData>;
}

struct CombinedTroveData {
    address: Identity,
    collateral: u64,
    collateral_rewards: u64,
    debt: u64,
    debt_rewards: u64,
}

impl MultiTroveGetter for Contract {
    #[storage(read)]
    fn get_multiple_sorted_troves(
        trove_manager_contract: ContractId,
        asset_id: AssetId,
        start_indx: u64,
        count: u8,
    ) -> Vec<CombinedTroveData> {
        internal_get_multiple_sorted_troves(trove_manager_contract, asset_id, start_indx, count)
    }
}

#[storage(read)]
fn internal_get_multiple_sorted_troves(
    trove_manager_contract: ContractId,
    asset_id: AssetId,
    start_indx: u64,
    count: u8,
) -> Vec<CombinedTroveData> {
    let sorted_troves = abi(SortedTroves, SORTED_TROVES_CONTRACT.bits());

    let mut index = start_indx;
    let mut curr_index = 0;
    let mut current_count: u8 = 0;

    let mut current_trove_owner = sorted_troves.get_last(asset_id);
    let mut troves: Vec<CombinedTroveData> = Vec::new();

    while curr_index < index {
        current_trove_owner = sorted_troves.get_prev(current_trove_owner, asset_id);
        curr_index += 1;
    }

    while current_count < count && current_trove_owner != Identity::Address(Address::zero()) {
        let trove = get_trove_data(trove_manager_contract, current_trove_owner);
        troves.push(trove);
        current_trove_owner = sorted_troves.get_prev(current_trove_owner, asset_id);
        current_count += 1;
    }

    return troves;
}

fn get_trove_data(trove_manager_contract: ContractId, trove_owner: Identity) -> CombinedTroveData {
    let trove_manager = abi(TroveManager, trove_manager_contract.bits());

    let (debt, coll, debt_rewards, collateral_rewards) = trove_manager.get_entire_debt_and_coll(trove_owner);
    return CombinedTroveData {
        address: trove_owner,
        collateral: coll,
        collateral_rewards: collateral_rewards,
        debt: debt,
        debt_rewards: debt_rewards,
    };
}

```
