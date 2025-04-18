# Example: sway_sources/fluid-protocol/contracts/hint-helper-contract/src/main.sw

```sway
contract;
// This contract, HintHelper, provides approximate hinting functionality for the system.
// It is used to find a trove with a nominal ICR closest to a given target ICR (cr).
// The hint is found by simulating a random walk through the trove list.
//
// Key functionalities include:
// - Initializing the contract with the SortedTroves contract ID
// - Providing a function to get an approximate hint for the closest trove
// - Using a random seed to ensure different hints for different inputs
//
// To the auditor: This contract is not used in the system. It is only used for querying the system.

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
storage {
    sorted_troves_contract: ContractId = ContractId::zero(),
    is_initialized: bool = false,
}
abi HintHelper {
    #[storage(read, write)]
    fn initialize(sorted_troves_contract: ContractId);
    #[storage(read)]
    fn get_approx_hint(
        asset: AssetId,
        trove_manager_contract: ContractId,
        cr: u64,
        num_trials: u64,
        input_random_seed: u64,
    ) -> (Identity, u64, u64);
}
impl HintHelper for Contract {
    #[storage(read, write)]
    fn initialize(sorted_troves_contract: ContractId) {
        require(
            storage
                .is_initialized
                .read() == false,
            "HintHelper: Already initialized",
        );
        storage.sorted_troves_contract.write(sorted_troves_contract);
        storage.is_initialized.write(true);
    }
    #[storage(read)]
    fn get_approx_hint(
        asset: AssetId,
        trove_manager_contract: ContractId,
        cr: u64,
        num_trials: u64,
        input_random_seed: u64,
    ) -> (Identity, u64, u64) {
        let sorted_troves_contract = storage.sorted_troves_contract.read();
        let sorted_troves = abi(SortedTroves, sorted_troves_contract.bits());
        let trove_manager = abi(TroveManager, trove_manager_contract.bits());

        let array_length = trove_manager.get_trove_owners_count();

        if array_length == 0 {
            return (Identity::Address(Address::zero()), 0, 0);
        }

        let mut hint_address = sorted_troves.get_last(asset);
        let mut diff = fm_abs_diff(trove_manager.get_nominal_icr(hint_address), cr);
        let mut latest_random_seed = input_random_seed;

        let mut i = 1;
        let mut hasher = Hasher::new();

        while i < num_trials {
            latest_random_seed.hash(hasher);
            latest_random_seed = decompose(hasher.keccak256()).0;

            let index = latest_random_seed % array_length;
            let address = trove_manager.get_trove_owner_by_index(index);
            let icr = trove_manager.get_nominal_icr(address);
            let new_diff = fm_abs_diff(icr, cr);
            if new_diff < diff {
                diff = new_diff;
                hint_address = address;
                latest_random_seed = latest_random_seed;
            }
            i += 1;
        }

        return (hint_address, diff, latest_random_seed);
    }
}

fn decompose(val: b256) -> (u64, u64, u64, u64) {
    asm(r1: __addr_of(val)) {
        r1: (u64, u64, u64, u64)
    }
}

```
