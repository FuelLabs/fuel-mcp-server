# Example: sway_sources/fluid-protocol/contracts/fpt-token-contract/src/main.sw

```sway
contract;
// This contract, FPTToken, implements the Fluid Protocol Token (FPT) functionality.
// FPT is the native token of the Fluid Protocol
//
// Key functionalities include:
// - Minting and distributing the initial supply of FPT tokens
// - Interfacing with the Vesting and Community Issuance contracts
//
// The contract follows the SRC-20 standard for native assets on the Fuel network,
// ensuring compatibility with the broader ecosystem. It manages a fixed total supply
// of 100 million FPT tokens, distributed between the Vesting contract and the
// Community Issuance contract upon initialization.

use libraries::fpt_token_interface::FPTToken;
use libraries::fluid_math::{DECIMAL_PRECISION,};
use standards::src20::{SetDecimalsEvent, SetNameEvent, SetSymbolEvent, SRC20, TotalSupplyEvent,};
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
    storage::*,
    string::String,
};
configurable {
    /// Initializer identity
    INITIALIZER: Identity = Identity::Address(Address::zero()),
}

storage {
    vesting_contract: ContractId = ContractId::zero(),
    community_issuance_contract: ContractId = ContractId::zero(),
    is_initialized: bool = false,
}
// Using https://docs.fuel.network/docs/sway-standards/src-20-native-asset/ as reference
// import fluid math decimals here
pub const TOTAL_SUPPLY: u64 = 100_000_000;
pub const DECIMALS: u8 = 9;
pub const SYMBOL: str[3] = __to_str_array("FPT");
pub const NAME: str[20] = __to_str_array("Fluid Protocol Token");
impl FPTToken for Contract {
    //////////////////////////////////////
    // Initialization method
    //////////////////////////////////////
    #[storage(read, write)]
    fn initialize(
        vesting_contract: ContractId,
        community_issuance_contract: ContractId,
    ) {
        require(
            msg_sender()
                .unwrap() == INITIALIZER,
            "FPTToken: Caller is not initializer",
        );
        require(
            storage
                .is_initialized
                .read() == false,
            "FPTToken: Contract is already initialized",
        );
        storage.vesting_contract.write(vesting_contract);
        storage
            .community_issuance_contract
            .write(community_issuance_contract);
        mint_to(
            Identity::ContractId(vesting_contract),
            SubId::zero(),
            TOTAL_SUPPLY * 68 / 100 * DECIMAL_PRECISION,
        );
        mint_to(
            Identity::ContractId(community_issuance_contract),
            SubId::zero(),
            TOTAL_SUPPLY * 32 / 100 * DECIMAL_PRECISION,
        );

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
        TotalSupplyEvent::new(AssetId::default(), TOTAL_SUPPLY * DECIMAL_PRECISION, sender)
            .log();
        storage.is_initialized.write(true);
    }
    //////////////////////////////////////
    // Read-Only methods
    //////////////////////////////////////
    #[storage(read)]
    fn get_vesting_contract() -> ContractId {
        storage.vesting_contract.read()
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
            return Some(TOTAL_SUPPLY * DECIMAL_PRECISION);
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

```
