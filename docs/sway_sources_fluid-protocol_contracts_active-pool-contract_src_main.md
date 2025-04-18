# Example: sway_sources/fluid-protocol/contracts/active-pool-contract/src/main.sw

```sway
contract;
// The Active Pool holds the collateral assets and USDF debt (but not USDF tokens) for all active troves.
//
// When a trove is liquidated, its collateral assets and USDF debt are transferred from the Active Pool
// to either the Stability Pool, the Default Pool, or both, depending on the liquidation conditions.
//
// This contract supports multiple collateral assets, each managed separately.
use libraries::active_pool_interface::ActivePool;
use libraries::default_pool_interface::DefaultPool;
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
    borrow_operations_contract: Identity = Identity::Address(Address::zero()),
    stability_pool_contract: Identity = Identity::Address(Address::zero()),
    default_pool_contract: ContractId = ContractId::zero(),
    protocol_manager_contract: Identity = Identity::Address(Address::zero()),
    asset_amount: StorageMap<AssetId, u64> = StorageMap::<AssetId, u64> {}, // Asset amount in the active pool
    usdf_debt_amount: StorageMap<AssetId, u64> = StorageMap::<AssetId, u64> {}, // USDF debt in the active pool
    valid_asset_ids: StorageMap<AssetId, bool> = StorageMap::<AssetId, bool> {}, // Valid asset ids
    valid_trove_managers: StorageMap<Identity, bool> = StorageMap::<Identity, bool> {}, // Valid trove managers, one for each asset managed
    is_initialized: bool = false,
}
impl ActivePool for Contract {
    #[storage(read, write)]
    fn initialize(
        borrow_operations: Identity,
        stability_pool: Identity,
        default_pool: ContractId,
        protocol_manager: Identity,
    ) {
        require(
            msg_sender()
                .unwrap() == INITIALIZER,
            "Active Pool: Caller is not initializer",
        );
        require(
            storage
                .is_initialized
                .read() == false,
            "Active Pool: Already initialized",
        );
        storage.borrow_operations_contract.write(borrow_operations);
        storage.stability_pool_contract.write(stability_pool);
        storage.default_pool_contract.write(default_pool);
        storage.protocol_manager_contract.write(protocol_manager);
        storage.is_initialized.write(true);
    }
    // --- Getters for public variables. Required by Pool interface ---
    /*
    * Returns the Asset state variable.
    *
    * Not necessarily equal to the the contract's raw Asset balance - Assets can be forcibly sent to contracts.
    */
    #[storage(read)]
    fn get_asset(asset_id: AssetId) -> u64 {
        return storage.asset_amount.get(asset_id).try_read().unwrap_or(0);
    }
    #[storage(read)]
    fn get_usdf_debt(asset_id: AssetId) -> u64 {
        return storage.usdf_debt_amount.get(asset_id).try_read().unwrap_or(0);
    }

    // --- Pool functionality ---
    #[storage(read, write)]
    fn send_asset(address: Identity, amount: u64, asset_id: AssetId) {
        require_caller_is_bo_or_tm_or_sp_or_pm();
        if amount > 0 {
            let new_amount = storage.asset_amount.get(asset_id).read() - amount;
            storage.asset_amount.insert(asset_id, new_amount);
            transfer(address, asset_id, amount);
        }
    }
    // Increase the USDF debt for a given asset
    #[storage(read, write)]
    fn increase_usdf_debt(amount: u64, asset_id: AssetId) {
        require_caller_is_bo_or_tm();
        let new_debt = storage.usdf_debt_amount.get(asset_id).try_read().unwrap_or(0) + amount;
        storage.usdf_debt_amount.insert(asset_id, new_debt);
    }
    // Decrease the USDF debt for a given asset
    #[storage(read, write)]
    fn decrease_usdf_debt(amount: u64, asset_id: AssetId) {
        require_caller_is_bo_or_tm_or_sp_or_pm();
        let new_debt = storage.usdf_debt_amount.get(asset_id).read() - amount;
        storage.usdf_debt_amount.insert(asset_id, new_debt);
    }
    // Send the collateral asset to the Default Pool to manually simulate asset recieve fallback
    #[storage(read, write)]
    fn send_asset_to_default_pool(amount: u64, asset_id: AssetId) {
        require_caller_is_bo_or_tm_or_sp_or_pm();
        let new_amount = storage.asset_amount.get(asset_id).read() - amount;
        storage.asset_amount.insert(asset_id, new_amount);
        let dafault_pool = abi(DefaultPool, storage.default_pool_contract.read().bits());
        dafault_pool
            .recieve {
                coins: amount,
                asset_id: asset_id.bits(),
            }();
    }
    // --- Receive functionality ---
    // Required to record the contract's raw Asset balance since there is no FallBack function
    #[storage(read, write), payable]
    fn recieve() {
        require_caller_is_borrow_operations_or_default_pool();
        let asset_id = msg_asset_id();
        require_is_valid_asset_id(asset_id);
        let new_amount = storage.asset_amount.get(asset_id).try_read().unwrap_or(0) + msg_amount();
        storage.asset_amount.insert(asset_id, new_amount);
    }
    // --- Support multiple assets functionality ---
    #[storage(read, write)]
    fn add_asset(asset: AssetId, trove_manager: Identity) {
        require_is_protocol_manager();
        storage.valid_asset_ids.insert(asset, true);
        storage.valid_trove_managers.insert(trove_manager, true);
        storage.asset_amount.insert(asset, 0);
        storage.usdf_debt_amount.insert(asset, 0);
    }
}
// --- Helper functions ---
#[storage(read)]
fn require_is_valid_asset_id(asset_id: AssetId) {
    let valid_asset_id = storage.valid_asset_ids.get(asset_id).try_read().unwrap_or(false);
    require(valid_asset_id, "Active Pool: Asset ID is not correct");
}
#[storage(read)]
fn require_caller_is_bo_or_tm_or_sp_or_pm() {
    let caller = msg_sender().unwrap();
    let borrow_operations_contract = storage.borrow_operations_contract.read();
    let valid_trove_manager = storage.valid_trove_managers.get(caller).try_read().unwrap_or(false);
    let stability_pool_contract = storage.stability_pool_contract.read();
    let protocol_manager_contract = storage.protocol_manager_contract.read();
    require(
        caller == protocol_manager_contract || caller == borrow_operations_contract || valid_trove_manager || caller == stability_pool_contract,
        "Active Pool: Caller is not BorrowOperations, TroveManager, ProtocolManager, or DefaultPool",
    );
}
#[storage(read)]
fn require_caller_is_bo_or_tm() {
    let caller = msg_sender().unwrap();
    let borrow_operations_contract = storage.borrow_operations_contract.read();
    let valid_trove_manager = storage.valid_trove_managers.get(caller).try_read().unwrap_or(false);
    require(
        caller == borrow_operations_contract || valid_trove_manager,
        "Active Pool: Caller is not BorrowOperations or TroveManager",
    );
}
#[storage(read)]
fn require_caller_is_borrow_operations_or_default_pool() {
    let caller = msg_sender().unwrap();
    let borrow_operations_contract = storage.borrow_operations_contract.read();
    let default_pool_contract = Identity::ContractId(storage.default_pool_contract.read());
    require(
        caller == borrow_operations_contract || caller == default_pool_contract,
        "Active Pool: Caller is not BorrowOperations or DefaultPool",
    );
}
#[storage(read)]
fn require_is_protocol_manager() {
    let caller = msg_sender().unwrap();
    let protocol_manager = storage.protocol_manager_contract.read();
    require(
        caller == protocol_manager,
        "Active Pool: Caller is not ProtocolManager",
    );
}

```
