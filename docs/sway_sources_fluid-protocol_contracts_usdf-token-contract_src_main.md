# Example: sway_sources/fluid-protocol/contracts/usdf-token-contract/src/main.sw

```sway
contract;
// The USDFToken contract is responsible for managing the issuance and transfer of USDF tokens in the system.
// It is used by the Stability Pool, Borrower Operations, and Trove Managers.
use libraries::usdf_token_interface::USDFToken;

pub const DECIMALS: u8 = 9;
pub const SYMBOL: str[4] = __to_str_array("USDF");
pub const NAME: str[4] = __to_str_array("USDF");
use standards::{
    src20::{
        SetDecimalsEvent,
        SetNameEvent,
        SetSymbolEvent,
        SRC20,
        TotalSupplyEvent,
    },
    src3::SRC3,
};
use std::{
    address::*,
    asset::{
        burn,
        mint_to,
        transfer,
    },
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
    storage::storage_vec::*,
    string::String,
};
configurable {
    /// Initializer identity
    INITIALIZER: Identity = Identity::Address(Address::zero()),
}

storage {
    valid_trove_managers: StorageMap<Identity, bool> = StorageMap::<Identity, bool> {},
    protocol_manager: ContractId = ContractId::zero(),
    stability_pool: Identity = Identity::Address(Address::zero()),
    borrower_operations: Identity = Identity::Address(Address::zero()),
    total_supply: u64 = 0,
    is_initialized: bool = false,
}
// Using https://docs.fuel.network/docs/sway-standards/src-20-native-asset/ as reference
impl USDFToken for Contract {
    //////////////////////////////////////
    // Initialization method
    //////////////////////////////////////
    #[storage(read, write)]
    fn initialize(
        protocol_manager: ContractId,
        stability_pool: Identity,
        borrower_operations: Identity,
    ) {
        require(
            msg_sender()
                .unwrap() == INITIALIZER,
            "USDFToken: Caller is not initializer",
        );
        require(
            storage
                .is_initialized
                .read() == false,
            "USDFToken: Contract is already initialized",
        );
        storage.stability_pool.write(stability_pool);
        storage.protocol_manager.write(protocol_manager);
        storage.borrower_operations.write(borrower_operations);
        let sender = msg_sender().unwrap();
        SetSymbolEvent::new(
            AssetId::default(),
            Some(String::from_ascii_str(from_str_array(SYMBOL))),
            sender,
        )
            .log();
        SetDecimalsEvent::new(AssetId::default(), DECIMALS, sender)
            .log();
        SetNameEvent::new(
            AssetId::default(),
            Some(String::from_ascii_str(from_str_array(NAME))),
            sender,
        )
            .log();
        TotalSupplyEvent::new(AssetId::default(), 0, sender).log();
        storage.is_initialized.write(true);
    }
    #[storage(read, write)]
    fn add_trove_manager(trove_manager: ContractId) {
        require_caller_is_protocol_manager();
        storage
            .valid_trove_managers
            .insert(Identity::ContractId(trove_manager), true);
    }
}
impl SRC3 for Contract {
    #[storage(read, write)]
    fn mint(address: Identity, sub_id: Option<SubId>, amount: u64) {
        require_caller_is_borrower_operations();
        let new_total_supply = storage.total_supply.read() + amount;
        storage.total_supply.write(new_total_supply);
        mint_to(address, SubId::zero(), amount);
        TotalSupplyEvent::new(AssetId::default(), new_total_supply, msg_sender().unwrap())
            .log();
    }
    #[storage(read, write), payable]
    fn burn(sub_id: SubId, burn_amount: u64) {
        require_caller_is_bo_or_tm_or_sp_or_pm();
        let new_total_supply = storage.total_supply.read() - burn_amount;
        storage.total_supply.write(new_total_supply);
        burn(sub_id, burn_amount);
        TotalSupplyEvent::new(AssetId::default(), new_total_supply, msg_sender().unwrap())
            .log();
    }
}
impl SRC20 for Contract {
    #[storage(read)]
    fn total_assets() -> u64 {
        return 1;
    }
    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64> {
        if asset == AssetId::default() {
            return Some(storage.total_supply.read())
        }
        return None;
    }
    #[storage(read)]
    fn name(asset: AssetId) -> Option<String> {
        if asset == AssetId::default() {
            return Some(String::from_ascii_str(from_str_array(NAME)));
        }
        return None;
    }
    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String> {
        if asset == AssetId::default() {
            return Some(String::from_ascii_str(from_str_array(SYMBOL)));
        }
        return None;
    }
    #[storage(read)]
    fn decimals(asset: AssetId) -> Option<u8> {
        if asset == AssetId::default() {
            return Some(DECIMALS);
        }
        return None;
    }
}
#[storage(read)]
fn require_caller_is_protocol_manager() {
    require(
        msg_sender()
            .unwrap() == Identity::ContractId(storage.protocol_manager.read()),
        "USDFToken: NotAuthorized",
    );
}
#[storage(read)]
fn require_caller_is_borrower_operations() {
    require(
        msg_sender()
            .unwrap() == storage
            .borrower_operations
            .read(),
        "USDFToken: NotAuthorized",
    );
}
#[storage(read)]
fn require_caller_is_bo_or_tm_or_sp_or_pm() {
    let sender = msg_sender().unwrap();
    let protocol_manager_id = Identity::ContractId(storage.protocol_manager.read());
    // Check if the sender is a valid trove manager
    let is_valid_trove_manager = storage.valid_trove_managers.get(sender).try_read().unwrap_or(false);
    require(
        sender == storage
            .borrower_operations
            .read() || sender == storage
            .stability_pool
            .read() || sender == protocol_manager_id || is_valid_trove_manager,
        "USDFToken: NotAuthorized",
    );
}

```
