# Example: sway_sources/fluid-protocol/contracts/default-pool-contract/src/main.sw

```sway
contract;
// The Default Pool holds the Asset and USDF debt (but not USDF tokens) from liquidations that have been redistributed
// to active troves but not yet "applied", i.e. not yet recorded on a recipient active trove's struct.
//
// When a trove makes an operation that applies its pending Asset and USDF debt, its pending Asset and USDF debt is moved
// from the Default Pool to the Active Pool.

use libraries::default_pool_interface::DefaultPool;
use libraries::active_pool_interface::ActivePool;
use libraries::fluid_math::{null_contract, null_identity_address};
use std::{
    asset::transfer,
    auth::msg_sender,
    call_frames::{
        msg_asset_id,
    },
    context::{
        msg_amount,
    },
    hash::Hash,
};
configurable {
    /// Initializer identity
    INITIALIZER: Identity = Identity::Address(Address::zero()),
}

storage {
    protocol_manager: Identity = Identity::Address(Address::zero()),
    active_pool_contract: ContractId = ContractId::zero(),
    asset_amount: StorageMap<AssetId, u64> = StorageMap::<AssetId, u64> {},
    usdf_debt_amount: StorageMap<AssetId, u64> = StorageMap::<AssetId, u64> {},
    valid_asset_ids: StorageMap<AssetId, bool> = StorageMap::<AssetId, bool> {},
    valid_trove_managers: StorageMap<Identity, bool> = StorageMap::<Identity, bool> {},
    is_initialized: bool = false,
}

impl DefaultPool for Contract {
    #[storage(read, write)]
    fn initialize(protocol_manager: Identity, active_pool_contract: ContractId) {
        require(
            msg_sender()
                .unwrap() == INITIALIZER,
            "DefaultPool: Caller is not initializer",
        );
        require(
            storage
                .is_initialized
                .read() == false,
            "DefaultPool: Contract is already initialized",
        );

        storage.protocol_manager.write(protocol_manager);
        storage.active_pool_contract.write(active_pool_contract);
        storage.is_initialized.write(true);
    }

    #[storage(read, write)]
    fn send_asset_to_active_pool(amount: u64, asset_id: AssetId) {
        require_is_trove_manager();
        let active_pool = abi(ActivePool, storage.active_pool_contract.read().into());
        let new_amount = storage.asset_amount.get(asset_id).read() - amount;

        storage.asset_amount.insert(asset_id, new_amount);
        active_pool
            .recieve {
                coins: amount,
                asset_id: asset_id.bits(),
            }();
    }

    #[storage(read, write)]
    fn add_asset(asset: AssetId, trove_manager: Identity) {
        require_is_protocol_manager();
        storage.valid_asset_ids.insert(asset, true);
        storage.valid_trove_managers.insert(trove_manager, true);
        storage.asset_amount.insert(asset, 0);
        storage.usdf_debt_amount.insert(asset, 0);
    }

    #[storage(read)]
    fn get_asset(asset_id: AssetId) -> u64 {
        return storage.asset_amount.get(asset_id).try_read().unwrap_or(0);
    }

    #[storage(read)]
    fn get_usdf_debt(asset_id: AssetId) -> u64 {
        return storage.usdf_debt_amount.get(asset_id).try_read().unwrap_or(0);
    }

    #[storage(read, write)]
    fn increase_usdf_debt(amount: u64, asset_id: AssetId) {
        require_is_trove_manager();
        let new_debt = storage.usdf_debt_amount.get(asset_id).read() + amount;
        storage.usdf_debt_amount.insert(asset_id, new_debt);
    }

    #[storage(read, write)]
    fn decrease_usdf_debt(amount: u64, asset_id: AssetId) {
        require_is_trove_manager();
        let new_debt = storage.usdf_debt_amount.get(asset_id).read() - amount;
        storage.usdf_debt_amount.insert(asset_id, new_debt);
    }

    #[storage(read, write), payable]
    fn recieve() {
        require_is_active_pool_contract();
        require_is_valid_asset_id();
        let new_amount = storage.asset_amount.get(msg_asset_id()).read() + msg_amount();
        storage.asset_amount.insert(msg_asset_id(), new_amount);
    }
}

#[storage(read)]
fn require_is_valid_asset_id() {
    let asset_id = msg_asset_id();
    let valid_asset_id = storage.valid_asset_ids.get(asset_id).read();
    require(valid_asset_id, "DefaultPool: Asset is not correct");
}

#[storage(read)]
fn require_is_trove_manager() {
    let caller = msg_sender().unwrap();
    let is_valid_trove_manager = storage.valid_trove_managers.get(caller).read();
    require(is_valid_trove_manager, "DefaultPool: Caller is not TM");
}

#[storage(read)]
fn require_is_active_pool_contract() {
    let caller = msg_sender().unwrap();
    let active_pool_contract_contract = Identity::ContractId(storage.active_pool_contract.read());
    require(
        caller == active_pool_contract_contract,
        "DefaultPool: Caller is not AP",
    );
}

#[storage(read)]
fn require_is_protocol_manager() {
    let caller = msg_sender().unwrap();
    let protocol_manager = storage.protocol_manager.read();
    require(caller == protocol_manager, "DefaultPool: Caller is not PM");
}

```
