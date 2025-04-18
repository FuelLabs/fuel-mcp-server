# Example: sway_sources/fluid-protocol/contracts/community-issuance-contract/src/main.sw

```sway
contract;
// This contract, CommunityIssuance, manages the issuance of FPT (Fluid Protocol Token) to the Stability Pool.
// It controls the distribution of FPT over time, implementing a decay function for token release.
//
// Key functionalities include:
// - Initializing the contract with necessary parameters
// - Calculating and issuing FPT based on time elapsed since deployment
// - Managing the transition of rewards distribution from an initial rapid issuance to a more gradual long-term rate
// - Interfacing with the Stability Pool to send FPT
// - Providing admin functions for contract management
//
// The contract uses a mathematical model to determine token issuance, ensuring a controlled
// and predictable distribution of FPT to incentivize participation in the Stability Pool.
// It also handles the transition period between different issuance rates, allowing for
// a smooth change in the token distribution strategy over time.

mod utils;

use libraries::community_issuance_interface::CommunityIssuance;
use libraries::fluid_math::{dec_pow, DECIMAL_PRECISION, fm_multiply_ratio};
use ::utils::*;
use std::{
    asset::transfer,
    auth::{
        AuthError,
    },
    block::{
        height,
        timestamp,
    },
    call_frames::{
        msg_asset_id,
    },
    context::{
        balance_of,
        msg_amount,
    },
};
use sway_libs::ownership::*;
use standards::{src5::*,};

const ONE_WEEK_IN_SECONDS: u64 = 604_800;
const SIX_MONTHS_IN_SECONDS: u64 = 15_552_000; // 180 days
const ONE_YEAR_IN_SECONDS: u64 = 31_536_000; // 365 days
configurable {
    /// Initializer identity
    INITIALIZER: Identity = Identity::Address(Address::zero()),
}

storage {
    stability_pool_contract: ContractId = ContractId::zero(),
    fpt_token_contract: AssetId = AssetId::zero(),
    is_initialized: bool = false,
    total_fpt_issued: u64 = 0,
    deployment_time: u64 = 0,
    debug: bool = false,
    debug_timestamp: u64 = 0,
    has_transitioned_rewards: bool = false,
    time_transition_started: u64 = 0,
    total_transition_time_seconds: u64 = 0,
}

/// @title Community Issuance Contract
/// @author Fluid Protocol
/// @notice This contract manages the issuance of FPT tokens to the Stability Pool
/// @dev Implements the CommunityIssuance interface for initializing and managing token issuance
///
/// The contract handles the following key functionalities:
/// - Initialization of contract parameters
/// - Starting and managing a rewards increase transition period
/// - Issuing FPT tokens to the Stability Pool
/// - Tracking total FPT issued and deployment time
///
/// It includes safety measures such as:
/// - One-time initialization
/// - Admin-only access for certain functions
/// - Transition period constraints
///
/// The contract also supports a debug mode for testing purposes.
impl CommunityIssuance for Contract {
    /// @notice Initializes the Community Issuance contract with essential parameters
    /// @dev Can only be called once, sets up the contract for FPT token issuance
    /// @param stability_pool_contract The address of the Stability Pool contract
    /// @param fpt_token_contract The asset ID of the FPT token
    /// @param admin The address of the contract administrator
    /// @param debugging A boolean flag to enable or disable debug mode
    /// @custom:throws "CommunityIssuance: Contract is already initialized" if the contract has been previously initialized
    #[storage(read, write)]
    fn initialize(
        stability_pool_contract: ContractId,
        fpt_token_contract: AssetId,
        admin: Identity,
        debugging: bool,
    ) {
        require(
            msg_sender()
                .unwrap() == INITIALIZER,
            "CommunityIssuance: Caller is not initializer",
        );
        require(
            !storage
                .is_initialized
                .read(),
            "CommunityIssuance: Contract is already initialized",
        );
        storage
            .stability_pool_contract
            .write(stability_pool_contract);
        storage.fpt_token_contract.write(fpt_token_contract);
        storage.is_initialized.write(true);
        storage.debug.write(debugging);
        storage.deployment_time.write(internal_get_current_time());

        // Initialize ownership
        initialize_ownership(admin);
    }

    /// @notice Issues FPT tokens based on the current issuance schedule
    /// @dev Can only be called by the Stability Pool contract
    /// @custom:access-control Stability Pool only
    /// @return The amount of FPT tokens issued in this call
    #[storage(read, write)]
    fn issue_fpt() -> u64 {
        internal_require_caller_is_stability_pool();

        let latest_total_fpt_issued = fm_multiply_ratio(
            internal_get_fpt_supply_cap(
                storage
                    .time_transition_started
                    .read(),
                storage
                    .total_transition_time_seconds
                    .read(),
                internal_get_current_time(),
                storage
                    .has_transitioned_rewards
                    .read(),
            ),
            internal_get_cumulative_issuance_fraction(internal_get_current_time(), storage.deployment_time.read()),
            DECIMAL_PRECISION,
        );
        let issuance = latest_total_fpt_issued - storage.total_fpt_issued.read();
        storage.total_fpt_issued.write(latest_total_fpt_issued);
        return issuance
    }

    /// @notice Sends FPT tokens to a specified account
    /// @dev Can only be called by the Stability Pool contract
    /// @param account The Identity of the account to receive the FPT tokens
    /// @param amount The amount of FPT tokens to send
    /// @custom:access-control Stability Pool only
    #[storage(read)]
    fn send_fpt(account: Identity, amount: u64) {
        internal_require_caller_is_stability_pool();
        if amount > 0 {
            transfer(account, storage.fpt_token_contract.read(), amount);
        }
    }

    /// @notice Retrieves the current timestamp used by the contract
    /// @dev Returns the debug timestamp if debugging is enabled, otherwise returns the current block timestamp
    /// @return The current timestamp as a u64 value
    #[storage(read)]
    fn get_current_time() -> u64 {
        return internal_get_current_time();
    }

    /// @notice Sets the current time for debugging purposes
    /// @dev This function can only be called when debugging is enabled
    /// @param time The timestamp to set as the current time
    /// @custom:access-control Debug mode only
    /// @custom:throws "CommunityIssuance: Debugging must be enabled to set current time" if debugging is not enabled
    #[storage(write, read)]
    fn set_current_time(time: u64) {
        require(
            storage
                .debug
                .read(),
            "CommunityIssuance: Debugging must be enabled to set current time",
        );
        storage.debug_timestamp.write(time);
    }

    /// @notice Initiates a transition period for increasing rewards
    /// @dev Can only be called by the admin and only once
    /// @param total_transition_time_seconds The duration of the transition period in seconds
    /// @custom:throws "CommunityIssuance: Rewards have already transitioned" if transition has already occurred
    /// @custom:throws "CommunityIssuance: Total transition time must be greater than 1 week" if transition time is too short
    /// @custom:access-control Admin only
    #[storage(read, write)]
    fn start_rewards_increase_transition(total_transition_time_seconds: u64) {
        only_owner();
        require(
            !storage
                .has_transitioned_rewards
                .read(),
            "CommunityIssuance: Rewards have already transitioned",
        );
        require(
            total_transition_time_seconds > ONE_WEEK_IN_SECONDS,
            "CommunityIssuance: Total transition time must be greater than 1 week",
        );
        storage.has_transitioned_rewards.write(true);
        storage
            .time_transition_started
            .write(internal_get_current_time());
        storage
            .total_transition_time_seconds
            .write(total_transition_time_seconds);
    }

    /// @notice Allows public initiation of rewards increase transition after a period of inactivity
    /// @dev Can be called by anyone after 1 year of inactivity since deployment
    /// @custom:throws "CommunityIssuance: Rewards have already transitioned" if transition has already occurred
    /// @custom:throws "CommunityIssuance: Rewards can only be publicly increased after 1 year of inactivity" if called before 1 year has passed
    #[storage(write, read)]
    fn public_start_rewards_increase_transition_after_deadline() {
        require(
            !storage
                .has_transitioned_rewards
                .read(),
            "CommunityIssuance: Rewards have already transitioned",
        );
        let time_since_started_rewards = internal_get_current_time() - storage.deployment_time.read();
        require(
            time_since_started_rewards > ONE_YEAR_IN_SECONDS,
            "CommunityIssuance: Rewards can only be publicly increased after 1 year of inactivity",
        ); // 1 year
        let total_transition_time_seconds = SIX_MONTHS_IN_SECONDS; // 6 months
        storage.has_transitioned_rewards.write(true);
        storage
            .time_transition_started
            .write(internal_get_current_time());
        storage
            .total_transition_time_seconds
            .write(total_transition_time_seconds);
    }
}

impl SRC5 for Contract {
    #[storage(read)]
    fn owner() -> State {
        _owner()
    }
}

/// @notice Checks if the caller is the Stability Pool contract
/// @dev This function is used to restrict access to certain functions to only the Stability Pool
/// @custom:throws "CommunityIssuance: Caller must be stability pool" if the caller is not the Stability Pool contract
#[storage(read)]
fn internal_require_caller_is_stability_pool() {
    require(
        msg_sender()
            .unwrap() == Identity::ContractId(storage.stability_pool_contract.read()),
        "CommunityIssuance: Caller must be stability pool",
    );
}

/// @notice Gets the current timestamp for the contract
/// @dev Returns the debug timestamp if debugging is enabled, otherwise returns the current block timestamp
/// @return The current timestamp as a u64 value
/// @custom:internal This function is intended for internal use within the contract
#[storage(read)]
fn internal_get_current_time() -> u64 {
    if storage.debug.read() {
        return storage.debug_timestamp.read();
    } else {
        return timestamp();
    }
}

```
