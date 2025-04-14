[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Blockchain Development](https://docs.fuel.network/docs/sway/blockchain-development/) /

Native Assets

## _Icon Link_ [Native Assets](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#native-assets)

The FuelVM has built-in support for working with multiple assets.

## _Icon Link_ [Key Differences Between EVM and FuelVM Assets](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#key-differences-between-evm-and-fuelvm-assets)

## _Icon Link_ [ERC-20 vs Native Asset](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#erc-20-vs-native-asset)

On the EVM, Ether is the native asset. As such, sending ETH to an address or contract is an operation built into the EVM, meaning it doesn't rely on the existence of a smart contract to update balances to track ownership as with ERC-20 tokens.

On the FuelVM, _all_ assets are native and the process for sending _any_ native asset is the same.

While you would still need a smart contract to handle the minting and burning of assets, the sending and receiving of these assets can be done independently of the asset contract.

Just like the EVM however, Fuel has a standard that describes a standard API for Native Assets using the Sway Language. The ERC-20 equivalent for the Sway Language is the [SRC-20; Native Asset Standard](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/).

> _Icon InfoCircle_
>
> **NOTE** It is important to note that Fuel does not have tokens.

## _Icon Link_ [ERC-721 vs Native Asset](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#erc-721-vs-native-asset)

On the EVM, an ERC-721 token or NFT is a contract that contains multiple tokens which are non-fungible with one another.

On the FuelVM, the ERC-721 equivalent is a Native Asset where each asset has a supply of one. This is defined in the [SRC-20; Native Asset Standard _Icon Link_](https://github.com/FuelLabs/sway-standards/blob/v0.7.0/docs/src/src-20-native-asset.md#non-fungible-asset-restrictions) under the Non-Fungible Asset Restrictions.

In practice, this means all NFTs are treated the same as any other Native Asset on Fuel. When writing Sway code, no additional cases for handling non-fungible and fungible assets are required.

## _Icon Link_ [No Token Approvals](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#no-token-approvals)

An advantage Native Assets bring is that there is no need for token approvals; as with Ether on the EVM. With millions of dollars hacked every year due to misused token approvals, the FuelVM eliminates this attack vector.

## _Icon Link_ [Asset vs Coin vs Token](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#asset-vs-coin-vs-token)

An "Asset" is a Native Asset on Fuel and has the associated `AssetId` type. Assets are distinguishable from one another. A "Coin" represents a singular unit of an Asset. Coins of the same Asset are not distinguishable from one another.

Fuel does not use tokens like other ecosystems such as Ethereum and uses Native Assets with a UTXO design instead.

## _Icon Link_ [The `AssetId` type](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#the-assetid-type)

The `AssetId` type represents any Native Asset on Fuel. An `AssetId` is used for interacting with an asset on the network.

The `AssetId` of any Native Asset on Fuel is calculated by taking the SHA256 hash digest of the originating `ContractId` that minted the asset and a `SubId` i.e. `sha256((contract_id, sub_id))`.

## _Icon Link_ [Creating a New `AssetId`](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#creating-a-new-assetid)

There are 3 ways to instantiate a new `AssetId`:

## _Icon Link_ [Default](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#default)

When a contract will only ever mint a single asset, it is recommended to use the `DEFAULT_ASSET_ID` sub id. This is referred to as the default asset of a contract.

To get the default asset from an internal contract call, call the `default()` function:

```fuel_Box fuel_Box-idXKMmm-css
let asset_id: AssetId = AssetId::default();
```

_Icon ClipboardText_

## _Icon Link_ [New](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#new)

If a contract mints multiple assets or if the asset has been minted by an external contract, the `new()` function will be needed. The `new()` function takes the `ContractId` of the contract which minted the token as well as a `SubId`.

To create a new `AssetId` using a `ContractId` and `SubId`, call the `new()` function:

```fuel_Box fuel_Box-idXKMmm-css
let my_contract_id: ContractId = ContractId::from(0x1000000000000000000000000000000000000000000000000000000000000000);
let my_sub_id: SubId = 0x2000000000000000000000000000000000000000000000000000000000000000;

let asset_id: AssetId = AssetId::new(my_contract_id, my_sub_id);
```

_Icon ClipboardText_

## _Icon Link_ [From](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#from)

In the case where the `b256` value of an asset is already known, you may call the `from()` function with the `b256` value.

```fuel_Box fuel_Box-idXKMmm-css
let asset_id: AssetId = AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000);
```

_Icon ClipboardText_

## _Icon Link_ [The `SubId` type](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#the-subid-type)

The SubId is used to differentiate between different assets that are created by the same contract. The `SubId` is a `b256` value.

When creating a single new asset on Fuel, we recommend using the `DEFAULT_SUB_ID` or `SubId::zero()`.

## _Icon Link_ [The Base Asset](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#the-base-asset)

On the Fuel Network, the base asset is Ether. This is the only asset on the Fuel Network that does not have a `SubId`.

The Base Asset can be returned anytime by calling the `base()` function of the `AssetId` type.

```fuel_Box fuel_Box-idXKMmm-css
let base_asset: AssetId = AssetId::base();
```

_Icon ClipboardText_

## _Icon Link_ [Basic Native Asset Functionality](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#basic-native-asset-functionality)

## _Icon Link_ [Minting A Native Asset](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#minting-a-native-asset)

To mint a new asset, the `std::asset::mint()` function must be called internally within a contract. A `SubId` and amount of coins must be provided. These newly minted coins will be owned by the contract which minted them. To mint another asset from the same contract, replace the `DEFAULT_SUB_ID` with your desired `SubId`.

```fuel_Box fuel_Box-idXKMmm-css
mint(DEFAULT_SUB_ID, mint_amount);
```

_Icon ClipboardText_

You may also mint an asset to a specific entity with the `std::asset::mint_to()` function. Be sure to provide a target `Identity` that will own the newly minted coins.

```fuel_Box fuel_Box-idXKMmm-css
mint_to(target_identity, DEFAULT_SUB_ID, mint_amount);
```

_Icon ClipboardText_

If you intend to allow external users to mint assets using your contract, the [SRC-3; Mint and Burn Standard _Icon Link_](https://github.com/FuelLabs/sway-standards/blob/v0.7.0/docs/src/src-3-minting-and-burning.md#fn-mintrecipient-identity-vault_sub_id-subid-amount-u64) defines a standard API for minting assets. The [Sway-Libs Asset Library](https://docs.fuel.network/docs/sway-libs/asset/supply/) also provides an additional library to support implementations of the SRC-3 Standard into your contract.

## _Icon Link_ [Burning a Native Asset](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#burning-a-native-asset)

To burn an asset, the `std::asset::burn()` function must be called internally from the contract which minted them. The `SubId` used to mint the coins and amount must be provided. The burned coins must be owned by the contract. When an asset is burned it doesn't exist anymore.

```fuel_Box fuel_Box-idXKMmm-css
burn(DEFAULT_SUB_ID, burn_amount);
```

_Icon ClipboardText_

If you intend to allow external users to burn assets using your contract, the [SRC-3; Mint and Burn Standard _Icon Link_](https://github.com/FuelLabs/sway-standards/blob/v0.7.0/docs/src/src-3-minting-and-burning.md#fn-mintrecipient-identity-vault_sub_id-subid-amount-u64) defines a standard API for burning assets. The [Sway-Libs Asset Library](https://docs.fuel.network/docs/sway-libs/asset/supply/) also provides an additional library to support implementations of the SRC-3 Standard into your contract.

## _Icon Link_ [Transfer a Native Asset](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#transfer-a-native-asset)

To internally transfer a Native Asset, the `std::asset::transfer()` function must be called. A target `Identity` or user must be provided as well as the `AssetId` of the asset and an amount.

```fuel_Box fuel_Box-idXKMmm-css
transfer(target, asset_id, coins);
```

_Icon ClipboardText_

## _Icon Link_ [Native Asset And Transactions](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#native-asset-and-transactions)

## _Icon Link_ [Getting The Transaction Asset](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#getting-the-transaction-asset)

To query for the Native Asset sent in a transaction, you may call the `std::call_frames::msg_asset_id()` function.

```fuel_Box fuel_Box-idXKMmm-css
let amount = msg_asset_id();
```

_Icon ClipboardText_

## _Icon Link_ [Getting The Transaction Amount](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#getting-the-transaction-amount)

To query for the amount of coins sent in a transaction, you may call the `std::context::msg_amount()` function.

```fuel_Box fuel_Box-idXKMmm-css
let amount = msg_amount();
```

_Icon ClipboardText_

## _Icon Link_ [Native Assets and Contracts](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#native-assets-and-contracts)

## _Icon Link_ [Checking A Contract's Balance](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#checking-a-contracts-balance)

To internally check a contract's balance, call the `std::context::this_balance()` function with the corresponding `AssetId`.

```fuel_Box fuel_Box-idXKMmm-css
this_balance(asset_id)
```

_Icon ClipboardText_

To check the balance of an external contract, call the `std::context::balance_of()` function with the corresponding `AssetId`.

```fuel_Box fuel_Box-idXKMmm-css
balance_of(target_contract, asset_id)
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE** Due to the FuelVM's UTXO design, balances of `Address`'s cannot be returned in the Sway Language. This must be done off-chain using the SDK.

## _Icon Link_ [Receiving Native Assets In A Contract](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#receiving-native-assets-in-a-contract)

By default, a contract may not receive a Native Asset in a contract call. To allow transferring of assets to the contract, add the `#[payable]` attribute to the function.

```fuel_Box fuel_Box-idXKMmm-css
#[payable]
fn deposit() {
    assert(msg_amount() > 0);
}
```

_Icon ClipboardText_

## _Icon Link_ [Native Asset Standards](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#native-asset-standards)

There are a number of standards developed to enable further functionality for Native Assets and help cross contract functionality. Information on standards can be found in the [Sway Standards Repo _Icon Link_](https://github.com/FuelLabs/sway-standards).

We currently have the following standards for Native Assets:

- [SRC-20; Native Asset Standard](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/) defines the implementation of a standard API for Native Assets using the Sway Language.
- [SRC-3; Mint and Burn Standard](https://docs.fuel.network/docs/sway-standards/src-3-minting-and-burning/) is used to enable mint and burn functionality for Native Assets.
- [SRC-7; Arbitrary Asset Metadata Standard](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) is used to store metadata for Native Assets.
- [SRC-6; Vault Standard](https://docs.fuel.network/docs/sway-standards/src-6-vault/) defines the implementation of a standard API for asset vaults developed in Sway.

## _Icon Link_ [Native Asset Libraries](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#native-asset-libraries)

Additional Libraries have been developed to allow you to quickly create an deploy dApps that follow the [Sway Standards _Icon Link_](https://github.com/FuelLabs/sway-standards).

- [Asset Library](https://docs.fuel.network/docs/sway-libs/asset/) provides functionality to implement the [SRC-20; Native Asset Standard](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/), [SRC-3; Mint and Burn Standard](https://docs.fuel.network/docs/sway-standards/src-3-minting-and-burning/), and [SRC-7; Arbitrary Asset Metadata Standard](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) standards.

## _Icon Link_ [Single Native Asset Example](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#single-native-asset-example)

In this fully fleshed out example, we show a native asset contract which mints a single asset. This is the equivalent to the ERC-20 Standard use in Ethereum. Note there are no token approval functions.

It implements the [SRC-20; Native Asset](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/), [SRC-3; Mint and Burn](https://docs.fuel.network/docs/sway-standards/src-3-minting-and-burning/), and [SRC-5; Ownership](https://docs.fuel.network/docs/sway-standards/src-5-ownership/) standards. It does not use any external libraries.

```fuel_Box fuel_Box-idXKMmm-css
// ERC20 equivalent in Sway.
contract;

use standards::{
    src3::SRC3,
    src5::{
        SRC5,
        State,
        AccessError,
    },
    src20::{
        SetDecimalsEvent,
        SetNameEvent,
        SetSymbolEvent,
        SRC20,
        TotalSupplyEvent,
    },
};
use std::{
    asset::{
        burn,
        mint_to,
    },
    call_frames::msg_asset_id,
    constants::DEFAULT_SUB_ID,
    context::msg_amount,
    string::String,
    contract_id::ContractId
};

configurable {
    DECIMALS: u8 = 9u8,
    NAME: str[7] = __to_str_array("MyAsset"),
    SYMBOL: str[5] = __to_str_array("MYTKN"),
}

storage {
    total_supply: u64 = 0,
    owner: State = State::Uninitialized,
}

// Native Asset Standard
impl SRC20 for Contract {
    #[storage(read)]
    fn total_assets() -> u64 {
        1
    }

    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64> {
        if asset == AssetId::default() {
            Some(storage.total_supply.read())
        } else {
            None
        }
    }

    #[storage(read)]
    fn name(asset: AssetId) -> Option<String> {
        if asset == AssetId::default() {
            Some(String::from_ascii_str(from_str_array(NAME)))
        } else {
            None
        }
    }

    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String> {
        if asset == AssetId::default() {
            Some(String::from_ascii_str(from_str_array(SYMBOL)))
        } else {
            None
        }
    }

    #[storage(read)]
    fn decimals(asset: AssetId) -> Option<u8> {
        if asset == AssetId::default() {
            Some(DECIMALS)
        } else {
            None
        }
    }
}

// Ownership Standard
impl SRC5 for Contract {
    #[storage(read)]
    fn owner() -> State {
        storage.owner.read()
    }
}

// Mint and Burn Standard
impl SRC3 for Contract {
    #[storage(read, write)]
    fn mint(recipient: Identity, sub_id: Option<SubId>, amount: u64) {
        require(sub_id.is_some() && sub_id.unwrap() == DEFAULT_SUB_ID, "incorrect-sub-id");
        require_access_owner();

        let new_supply = storage.total_supply.read() + amount;
        storage
            .total_supply
            .write(new_supply);
        mint_to(recipient, DEFAULT_SUB_ID, amount);

        TotalSupplyEvent::new(
            AssetId::default(),
            new_supply,
            msg_sender().unwrap()
        ).log();
    }

    #[storage(read, write)]
    fn burn(sub_id: SubId, amount: u64) {
        require(sub_id == DEFAULT_SUB_ID, "incorrect-sub-id");
        require(msg_amount() >= amount, "incorrect-amount-provided");
        require(
            msg_asset_id() == AssetId::default(),
            "incorrect-asset-provided",
        );
        require_access_owner();

        let new_supply = storage.total_supply.read() - amount;
        storage
            .total_supply
            .write(new_supply);
        burn(DEFAULT_SUB_ID, amount);

        TotalSupplyEvent::new(
            AssetId::default(),
            new_supply,
            msg_sender().unwrap()
        ).log();
    }
}

abi SingleAsset {
    #[storage(read, write)]
    fn constructor(owner_: Identity);
}

impl SingleAsset for Contract {
    #[storage(read, write)]
    fn constructor(owner_: Identity) {
        require(storage.owner.read() == State::Uninitialized, "owner-initialized");
        storage.owner.write(State::Initialized(owner_));
    }
}

#[storage(read)]
fn require_access_owner() {
    require(
        storage.owner.read() == State::Initialized(msg_sender().unwrap()),
        AccessError::NotOwner,
    );
}

abi EmitSRC20Events {
    fn emit_src20_events();
}

impl EmitSRC20Events for Contract {
    fn emit_src20_events() {
        // Metadata that is stored as a configurable should only be emitted once.
        let asset = AssetId::default();
        let sender = msg_sender().unwrap();
        let name = Some(String::from_ascii_str(from_str_array(NAME)));
        let symbol = Some(String::from_ascii_str(from_str_array(SYMBOL)));

        SetNameEvent::new(asset, name, sender).log();
        SetSymbolEvent::new(asset, symbol, sender).log();
        SetDecimalsEvent::new(asset, DECIMALS, sender).log();
    }
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Multi Native Asset Example](https://docs.fuel.network/docs/sway/blockchain-development/native_assets/\#multi-native-asset-example)

In this fully fleshed out example, we show a native asset contract which mints multiple assets. This is the equivalent to the ERC-1155 Standard use in Ethereum. Note there are no token approval functions.

It implements the [SRC-20; Native Asset](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/), [SRC-3; Mint and Burn](https://docs.fuel.network/docs/sway-standards/src-3-minting-and-burning/), and [SRC-5; Ownership](https://docs.fuel.network/docs/sway-standards/src-5-ownership/) standards. It does not use any external libraries.

```fuel_Box fuel_Box-idXKMmm-css
// ERC1155 equivalent in Sway.
contract;

use standards::{
    src5::{
        SRC5,
        State,
        AccessError
    },
    src20::{
        SetDecimalsEvent,
        SetNameEvent,
        SetSymbolEvent,
        SRC20,
        TotalSupplyEvent,
    }
    src3::SRC3,
};
use std::{
    asset::{
        burn,
        mint_to,
    },
    call_frames::msg_asset_id,
    hash::{
        Hash,
    },
    context::this_balance,
    storage::storage_string::*,
    string::String,
    contract_id::ContractId
};

storage {
    total_assets: u64 = 0,
    total_supply: StorageMap<AssetId, u64> = StorageMap {},
    name: StorageMap<AssetId, StorageString> = StorageMap {},
    symbol: StorageMap<AssetId, StorageString> = StorageMap {},
    decimals: StorageMap<AssetId, u8> = StorageMap {},
    owner: State = State::Uninitialized,
}

// Native Asset Standard
impl SRC20 for Contract {
    #[storage(read)]
    fn total_assets() -> u64 {
        storage.total_assets.read()
    }

    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64> {
        storage.total_supply.get(asset).try_read()
    }

    #[storage(read)]
    fn name(asset: AssetId) -> Option<String> {
        storage.name.get(asset).read_slice()
    }

    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String> {
        storage.symbol.get(asset).read_slice()
    }

    #[storage(read)]
    fn decimals(asset: AssetId) -> Option<u8> {
        storage.decimals.get(asset).try_read()
    }
}

// Mint and Burn Standard
impl SRC3 for Contract {
    #[storage(read, write)]
    fn mint(recipient: Identity, sub_id: Option<SubId>, amount: u64) {
        require(sub_id.is_some(), "Error: SubId is None");
        require_access_owner();

        let asset_id = AssetId::new(ContractId::this(), sub_id.unwrap());
        let supply = storage.total_supply.get(asset_id).try_read();
        if supply.is_none() {
            storage.total_assets.write(storage.total_assets.try_read().unwrap_or(0) + 1);
        }
        let new_supply = supply.unwrap_or(0) + amount;
        storage.total_supply.insert(asset_id, new_supply);
        mint_to(recipient, sub_id, amount);

        TotalSupplyEvent::new(
            asset_id,
            new_supply,
            msg_sender().unwrap()
        ).log();
    }

    #[storage(read, write)]
    fn burn(sub_id: SubId, amount: u64) {
        require_access_owner();
        let asset_id = AssetId::new(ContractId::this(), sub_id);
        require(this_balance(asset_id) >= amount, "not-enough-coins");

        let supply = storage.total_supply.get(asset_id).try_read();
        let new_supply = supply.unwrap_or(0) - amount;
        storage.total_supply.insert(asset_id, new_supply);
        burn(sub_id, amount);

        TotalSupplyEvent::new(
            asset_id,
            new_supply,
            msg_sender().unwrap()
        ).log();
    }
}

abi MultiAsset {
    #[storage(read, write)]
    fn constructor(owner_: Identity);

    #[storage(read, write)]
    fn set_name(asset: AssetId, name: Option<String>);

    #[storage(read, write)]
    fn set_symbol(asset: AssetId, symbol: Option<String>);

    #[storage(read, write)]
    fn set_decimals(asset: AssetId, decimals: u8);
}

impl MultiAsset for Contract {
    #[storage(read, write)]
    fn constructor(owner_: Identity) {
        require(storage.owner.read() == State::Uninitialized, "owner-initialized");
        storage.owner.write(State::Initialized(owner_));
    }

    #[storage(read, write)]
    fn set_name(asset: AssetId, name: Option<String>) {
        require_access_owner();
        storage.name.insert(asset, StorageString {});
        storage.name.get(asset).write_slice(name);

        SetNameEvent::new(asset, name, msg_sender().unwrap()).log();
    }

    #[storage(read, write)]
    fn set_symbol(asset: AssetId, symbol: Option<String>) {
        require_access_owner();
        storage.symbol.insert(asset, StorageString {});
        storage.symbol.get(asset).write_slice(symbol);

        SetSymbolEvent::new(asset, symbol, msg_sender().unwrap()).log();
    }

    #[storage(read, write)]
    fn set_decimals(asset: AssetId, decimals: u8) {
        require_access_owner();
        storage.decimals.insert(asset, decimals);

        SetDecimalsEvent::new(asset, decimals, msg_sender().unwrap()).log();
    }
}

#[storage(read)]
fn require_access_owner() {
    require(
        storage.owner.read() == State::Initialized(msg_sender().unwrap()),
        AccessError::NotOwner,
    );
}
```

Collapse_Icon ClipboardText_