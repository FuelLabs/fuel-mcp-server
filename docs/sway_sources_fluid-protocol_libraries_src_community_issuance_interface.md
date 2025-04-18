# Example: sway_sources/fluid-protocol/libraries/src/community_issuance_interface.sw

```sway
library;

abi CommunityIssuance {
    // Initialize contract
    #[storage(read, write)]
    fn initialize(
        stability_pool_contract: ContractId,
        fpt_token_asset_id: AssetId,
        admin: Identity,
        debugging: bool,
    );

    #[storage(read, write)]
    fn start_rewards_increase_transition(total_transition_time_seconds: u64);

    #[storage(read, write)]
    fn public_start_rewards_increase_transition_after_deadline();

    #[storage(read, write)]
    fn issue_fpt() -> u64;

    #[storage(read)]
    fn send_fpt(account: Identity, amount: u64);

    #[storage(read)]
    fn get_current_time() -> u64;

    #[storage(write, read)]
    fn set_current_time(time: u64);
}

```
