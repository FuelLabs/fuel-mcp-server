# Example: sway_sources/fluid-protocol/contracts/token-contract/src/main.sw

```sway
contract;
// To the auditor:
// This is only a mockup of the token contract. It is not used in the system and does not need to be audited.
use libraries::token_interface::{Token, TokenInitializeConfig};
use std::{
    address::*,
    asset::*,
    auth::{
        AuthError,
    },
    call_frames::{
        msg_asset_id,
    },
    context::{
        balance_of,
        msg_amount,
    },
    hash::Hash,
    storage::*,
};

storage {
    owner: Identity = Identity::Address(Address::zero()),
    mint_amount: u64 = 0,
    mint_list: StorageMap<Identity, bool> = StorageMap::<Identity, bool> {},
}
enum Error {
    AddressAlreadyMint: (),
    CannotReinitialize: (),
    MintIsClosed: (),
    NotOwner: (),
}
#[storage(read)]
fn validate_owner() {
    let sender = msg_sender().unwrap();
    require(storage.owner.read() == sender, Error::NotOwner);
}
impl Token for Contract {
    //////////////////////////////////////
    // Owner methods
    //////////////////////////////////////
    #[storage(read, write)]
    fn initialize(
        config: TokenInitializeConfig,
        mint_amount: u64,
        owner: Identity,
    ) {
        require(
            storage
                .owner
                .read() == Identity::Address(Address::zero()),
            Error::CannotReinitialize,
        );
        storage.owner.write(owner);
        storage.mint_amount.write(mint_amount);
        // storage.config.write(config);
    }
    #[storage(read)]
    fn mint_to_id(amount: u64, address: Identity) {
        mint_to(address, SubId::zero(), amount);
    }
    #[storage(read, write)]
    fn set_mint_amount(mint_amount: u64) {
        validate_owner();
        storage.mint_amount.write(mint_amount);
    }
    #[storage(read)]
    fn mint_coins(mint_amount: u64) {
        validate_owner();
        mint(SubId::zero(), mint_amount);
    }
    #[storage(read)]
    fn burn_coins(burn_amount: u64) {
        validate_owner();
        burn(SubId::zero(), burn_amount);
    }
    #[storage(read)]
    fn transfer_coins(coins: u64, address: Identity) {
        validate_owner();
    }
    #[storage(read)]
    fn transfer_token_to_output(coins: u64, asset_id: AssetId, address: Identity) {
        validate_owner();
        transfer(address, asset_id, coins);
    }

    //////////////////////////////////////
    // Mint public method
    //////////////////////////////////////
    #[storage(read, write)]
    fn mint() {
        require(storage.mint_amount.read() > 0, Error::MintIsClosed);
        // Enable a address to mint only once
        let sender = msg_sender().unwrap();
        require(
            storage
                .mint_list
                .get(sender)
                .read() == false,
            Error::AddressAlreadyMint,
        );
        storage.mint_list.insert(sender, true);
        mint_to(sender, SubId::zero(), storage.mint_amount.read());
    }
    //////////////////////////////////////
    // Read-Only methods
    //////////////////////////////////////
    #[storage(read)]
    fn get_mint_amount() -> u64 {
        storage.mint_amount.read()
    }

    fn get_balance() -> u64 {
        return 0
    }

    fn get_token_balance(asset_id: ContractId) -> u64 {
        return 0
    }

    #[storage(read)]
    fn already_minted(address: Identity) -> bool {
        storage.mint_list.get(address).read()
    }
}

```
