# Example: sway_sources/fluid-protocol/contracts/fpt-staking-contract/src/main.sw

```sway
contract;

mod events;

use ::events::{StakeEvent, UnstakeEvent};
use libraries::fluid_math::{
    DECIMAL_PRECISION,
    fm_min,
    fm_multiply_ratio,
    null_contract,
    null_identity_address,
};
use libraries::fpt_staking_interface::{FPTStaking, ReadStorage};
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
    storage::storage_vec::*,
};

configurable {
    /// Initializer identity
    INITIALIZER: Identity = Identity::Address(Address::zero()),
}

storage {
    valid_assets: StorageVec<AssetId> = StorageVec {},
    stakes: StorageMap<Identity, u64> = StorageMap::<Identity, u64> {},
    usdf_snapshot: StorageMap<Identity, u64> = StorageMap::<Identity, u64> {},
    asset_snapshot: StorageMap<(Identity, AssetId), u64> = StorageMap::<(Identity, AssetId), u64> {},
    f_asset: StorageMap<AssetId, u64> = StorageMap::<AssetId, u64> {},
    f_usdf: u64 = 0,
    total_fpt_staked: u64 = 0,
    protocol_manager_address: ContractId = ContractId::zero(),
    borrower_operations_address: ContractId = ContractId::zero(),
    fpt_asset_id: AssetId = AssetId::zero(),
    usdf_asset_id: AssetId = AssetId::zero(),
    is_initialized: bool = false,
    lock_stake: bool = false,
    lock_unstake: bool = false,
}
/// @title FPT Staking Contract
/// @author Fluid Protocol
/// @notice This contract allows users to stake FPT tokens and earn rewards in USDF and other assets
/// @dev Implements the FPTStaking interface for staking, unstaking, and reward distribution
impl FPTStaking for Contract {
    /// @notice Initializes the FPT Staking contract with essential addresses and tokens
    /// @dev Can only be called once, sets up the contract for staking operations
    /// @param protocol_manager_address The address of the protocol manager contract
    /// @param borrower_operations_address The address of the borrower operations contract
    /// @param fpt_asset_id The asset ID of the FPT token
    /// @param usdf_asset_id The asset ID of the USDF token
    #[storage(read, write)]
    fn initialize(
        protocol_manager_address: ContractId,
        borrower_operations_address: ContractId,
        fpt_asset_id: AssetId,
        usdf_asset_id: AssetId,
    ) {
        require(
            msg_sender()
                .unwrap() == INITIALIZER,
            "FPTStaking: Caller is not initializer",
        );
        require(
            storage
                .is_initialized
                .read() == false,
            "FPTStaking: Contract is already initialized",
        );
        storage
            .protocol_manager_address
            .write(protocol_manager_address);
        storage
            .borrower_operations_address
            .write(borrower_operations_address);
        storage.fpt_asset_id.write(fpt_asset_id);
        storage.usdf_asset_id.write(usdf_asset_id);
        storage.is_initialized.write(true);
    }

    /// @notice Allows users to stake their FPT tokens
    /// @dev Handles staking, updates user's stake, distributes pending rewards, and updates snapshots
    /// @custom:payable This function is payable and expects FPT tokens to be sent with the transaction
    #[storage(read, write), payable]
    fn stake() {
        require(
            storage
                .lock_stake
                .read() == false,
            "FPTStaking: Stake is locked",
        );
        storage.lock_stake.write(true);

        let id = msg_sender().unwrap();

        require_fpt_is_valid_and_non_zero();

        let amount = msg_amount();

        let current_stake = storage.stakes.get(id).try_read().unwrap_or(0);

        if (current_stake != 0) {
            let usdf_gain = internal_get_pending_usdf_gain(id);
            internal_send_usdf_gain_to_user(usdf_gain);

            internal_send_pending_asset_gain_to_user(id);
        }

        internal_update_user_snapshots(id);

        let new_stake = current_stake + amount;
        storage.stakes.insert(id, new_stake); //overwrite previous balance
        storage
            .total_fpt_staked
            .write(storage.total_fpt_staked.read() + amount);

        log(StakeEvent {
            user: id,
            amount: amount,
        });
        storage.lock_stake.write(false);
    }

    /// @notice Allows users to unstake their FPT tokens
    /// @dev Handles unstaking, updates user's stake, distributes pending rewards, and updates snapshots
    /// @param amount The amount of FPT tokens to unstake
    #[storage(read, write)]
    fn unstake(amount: u64) {
        require(
            storage
                .lock_unstake
                .read() == false,
            "FPTStaking: Unstake is locked",
        );
        storage.lock_unstake.write(true);

        let id = msg_sender().unwrap();

        let current_stake = storage.stakes.get(id).try_read().unwrap_or(0);
        require_user_has_stake(current_stake, amount);

        let usdf_gain = internal_get_pending_usdf_gain(id);
        internal_send_usdf_gain_to_user(usdf_gain);
        internal_send_pending_asset_gain_to_user(id);

        internal_update_user_snapshots(id);

        if (amount > 0) {
            let amount_to_withdraw = fm_min(amount, current_stake);
            let new_stake = current_stake - amount_to_withdraw;
            storage.stakes.insert(id, new_stake); //overwrite previous balance
            storage
                .total_fpt_staked
                .write(storage.total_fpt_staked.read() - amount_to_withdraw);

            if (amount_to_withdraw > 0) {
                // transfer the FPT tokens to the user
                transfer(
                    msg_sender()
                        .unwrap(),
                    storage
                        .fpt_asset_id
                        .read(),
                    amount_to_withdraw,
                );
            }

            log(UnstakeEvent {
                user: id,
                amount: amount_to_withdraw,
            });
        }

        storage.lock_unstake.write(false);
    }

    /// @notice Adds a new asset to the staking contract
    /// @dev Can only be called by the protocol manager, called in the `register_asset` fn
    /// @param asset_address The AssetId of the new asset to be added
    /// @custom:access-control Protocol Manager only
    #[storage(read, write)]
    fn add_asset(asset_address: AssetId) {
        require_is_protocol_manager();
        storage.valid_assets.push(asset_address);
        storage.f_asset.insert(asset_address, 0);
    }

    /// @notice Retrieves the pending asset gain for a specific user and asset
    /// @dev Calculates the unrealized asset rewards for the given user and asset
    /// @param id The Identity of the user
    /// @param asset_address The AssetId of the asset to check
    /// @return The amount of pending asset gain for the user
    #[storage(read)]
    fn get_pending_asset_gain(id: Identity, asset_address: AssetId) -> u64 {
        internal_get_pending_asset_gain(id, asset_address)
    }

    /// @notice Retrieves the pending USDF gain for a specific user
    /// @dev Calculates the unrealized USDF rewards for the given user
    /// @param id The Identity of the user
    /// @return The amount of pending USDF gain for the user
    #[storage(read)]
    fn get_pending_usdf_gain(id: Identity) -> u64 {
        internal_get_pending_usdf_gain(id)
    }

    /// @notice Retrieves the staking balance for a specific user
    /// @dev Returns the amount of FPT tokens staked by the given user
    /// @param id The Identity of the user
    /// @return The staking balance of the user in FPT tokens
    #[storage(read)]
    fn get_staking_balance(id: Identity) -> u64 {
        storage.stakes.get(id).try_read().unwrap_or(0)
    }

    /// @notice Increases the F_USDF value based on USDF fee amount
    /// @dev Can only be called by the Borrower Operations contract
    /// @dev If total FPT staked is greater than 0, calculates and adds USDF fee per FPT staked
    /// @param usdf_fee_amount The amount of USDF fee to be distributed
    #[storage(read, write)]
    fn increase_f_usdf(usdf_fee_amount: u64) {
        require_is_borrower_operations();
        if (storage.total_fpt_staked.read() > 0) {
            let usdf_fee_per_fpt_staked = fm_multiply_ratio(
                usdf_fee_amount,
                DECIMAL_PRECISION,
                storage
                    .total_fpt_staked
                    .read(),
            );
            storage
                .f_usdf
                .write(storage.f_usdf.read() + usdf_fee_per_fpt_staked);
        }
    }

    /// @notice Increases the F_Asset value for a specific asset based on the asset fee amount
    /// @dev Can only be called by the Protocol Manager contract
    /// @dev If total FPT staked is greater than 0, calculates and adds asset fee per FPT staked
    /// @param asset_fee_amount The amount of asset fee to be distributed
    /// @param asset_address The AssetId of the asset for which the fee is being distributed
    #[storage(read, write)]
    fn increase_f_asset(asset_fee_amount: u64, asset_address: AssetId) {
        require_is_protocol_manager(); // we have redeem function in protocol manager, not trove manager in liquity
        if (storage.total_fpt_staked.read() > 0) {
            let asset_fee_per_fpt_staked = fm_multiply_ratio(
                asset_fee_amount,
                DECIMAL_PRECISION,
                storage
                    .total_fpt_staked
                    .read(),
            );
            let mut new_f_asset = storage.f_asset.get(asset_address).read() + asset_fee_per_fpt_staked;
            storage.f_asset.insert(asset_address, new_f_asset);
        }
    }

    /// @notice Retrieves the current storage state of the FPT Staking contract
    /// @dev Returns a ReadStorage struct containing key contract parameters and state variables
    /// @return ReadStorage A struct containing f_usdf, total_fpt_staked, protocol_manager_address,
    ///         borrower_operations_address, fpt_asset_id, usdf_asset_id, and is_initialized
    #[storage(read)]
    fn get_storage() -> ReadStorage {
        return ReadStorage {
            f_usdf: storage.f_usdf.read(),
            total_fpt_staked: storage.total_fpt_staked.read(),
            protocol_manager_address: storage.protocol_manager_address.read(),
            borrower_operations_address: storage.borrower_operations_address.read(),
            fpt_asset_id: storage.fpt_asset_id.read(),
            usdf_asset_id: storage.usdf_asset_id.read(),
            is_initialized: storage.is_initialized.read(),
        }
    }
}

/// @notice Calculates the pending asset gain for a specific user and asset
/// @dev This function is internal and used to compute unrealized gains
/// @param id The Identity of the user
/// @param asset_address The AssetId of the asset for which to calculate the gain
/// @return The pending asset gain for the user
#[storage(read)]
fn internal_get_pending_asset_gain(id: Identity, asset_address: AssetId) -> u64 {
    let f_asset_snapshot = storage.asset_snapshot.get((id, asset_address)).try_read().unwrap_or(0);
    let asset_gain = fm_multiply_ratio(
        storage
            .stakes
            .get(id)
            .try_read()
            .unwrap_or(0),
        storage
            .f_asset
            .get(asset_address)
            .try_read()
            .unwrap_or(0) - f_asset_snapshot,
        DECIMAL_PRECISION,
    );
    return asset_gain
}

/// @notice Calculates the pending USDF gain for a specific user
/// @dev This function is internal and used to compute unrealized USDF gains
/// @param id The Identity of the user
/// @return The pending USDF gain for the user
#[storage(read)]
fn internal_get_pending_usdf_gain(id: Identity) -> u64 {
    let f_usdf_snapshot = storage.usdf_snapshot.get(id).try_read().unwrap_or(0);
    let usdf_gain = fm_multiply_ratio(
        storage
            .stakes
            .get(id)
            .try_read()
            .unwrap_or(0),
        storage
            .f_usdf
            .read() - f_usdf_snapshot,
        DECIMAL_PRECISION,
    );
    return usdf_gain
}

/// @notice Updates the snapshots of USDF and asset gains for a user
/// @dev This function updates the user's snapshots for USDF and all valid assets
/// @param id The Identity of the user whose snapshots are being updated
#[storage(read, write)]
fn internal_update_user_snapshots(id: Identity) {
    storage.usdf_snapshot.insert(id, storage.f_usdf.read());

    let mut ind = 0;
    while ind < storage.valid_assets.len() {
        let current_asset_address = storage.valid_assets.get(ind).unwrap().read();
        let f_asset = storage.f_asset.get(current_asset_address).try_read().unwrap_or(0);
        storage
            .asset_snapshot
            .insert((id, current_asset_address), f_asset);
        ind += 1;
    }
}

/// @notice Checks if a user has sufficient stake to perform an unstake operation
/// @dev This function is used to validate unstake requests
/// @param current_stake_amount The current amount of FPT tokens staked by the user
/// @param unstake_amount The amount of FPT tokens the user wants to unstake
/// @custom:throws "FPTStaking: User must have stake greater than 0" if the user has no stake
/// @custom:throws "FPTStaking: Cannot unstake more than current staked amount" if unstake amount exceeds current stake
fn require_user_has_stake(current_stake_amount: u64, unstake_amount: u64) {
    require(
        current_stake_amount > 0,
        "FPTStaking: User must have stake greater than 0",
    );
    require(
        current_stake_amount >= unstake_amount,
        "FPTStaking: Cannot unstake more than current staked amount",
    );
}

/// @notice Checks if the caller is the protocol manager
/// @dev This function is used to restrict access to certain functions to only the protocol manager
/// @custom:throws "FPTStaking: Caller is not the protocol manager" if the caller is not the protocol manager
#[storage(read)]
fn require_is_protocol_manager() {
    let protocol_manager = Identity::ContractId(storage.protocol_manager_address.read());
    require(
        msg_sender()
            .unwrap() == protocol_manager,
        "FPTStaking: Caller is not the protocol manager",
    );
}

/// @notice Checks if the caller is the borrower operations contract
/// @dev This function is used to restrict access to certain functions to only the borrower operations contract
/// @custom:throws "FPTStaking: Caller is not the Borrower Operations" if the caller is not the borrower operations contract
#[storage(read)]
fn require_is_borrower_operations() {
    let borrower_operations = Identity::ContractId(storage.borrower_operations_address.read());
    require(
        msg_sender()
            .unwrap() == borrower_operations,
        "FPTStaking: Caller is not the Borrower Operations",
    );
}

/// @notice Validates that the received token is FPT and the amount is non-zero
/// @dev This function checks if the received asset matches the stored FPT address and if the amount is greater than zero
/// @custom:throws "FPTStaking: FPT contract not initialized, or wrong token" if the received asset is not FPT
/// @custom:throws "FPTStaking: FPT amount must be greater than 0" if the received amount is zero
#[storage(read)]
fn require_fpt_is_valid_and_non_zero() {
    require(
        storage
            .fpt_asset_id
            .read() == msg_asset_id(),
        "FPTStaking: FPT contract not initialized, or wrong token",
    );
    require(
        msg_amount() > 0,
        "FPTStaking: FPT amount must be greater than 0",
    );
}

/// @notice Sends accumulated asset gains to a user
/// @dev Iterates through all valid assets, calculates pending gains, and transfers them to the user
/// @param id The Identity of the user to receive the asset gains
/// @custom:internal This function is intended for internal use within the contract
#[storage(read)]
fn internal_send_pending_asset_gain_to_user(id: Identity) {
    // when fuel adds a .contains or .indexOf for StorageVec, double check asset address is in valid_assets here
    let mut ind = 0;
    while ind < storage.valid_assets.len() {
        let current_asset_address = storage.valid_assets.get(ind).unwrap().read();
        let asset_gain = internal_get_pending_asset_gain(id, current_asset_address);
        if (asset_gain > 0) {
            transfer(msg_sender().unwrap(), current_asset_address, asset_gain);
        }
        ind += 1;
    }
}

/// @notice Sends accumulated USDF gains to a user
/// @dev Transfers USDF tokens to the user if the amount is greater than zero
/// @param amount The amount of USDF to send to the user
/// @custom:internal This function is intended for internal use within the contract
#[storage(read)]
fn internal_send_usdf_gain_to_user(amount: u64) {
    if (amount > 0) {
        transfer(msg_sender().unwrap(), storage.usdf_asset_id.read(), amount);
    }
}

```
