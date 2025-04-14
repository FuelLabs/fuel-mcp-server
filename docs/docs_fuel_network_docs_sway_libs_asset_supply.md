[Docs](https://docs.fuel.network/) /

[Sway Libs](https://docs.fuel.network/docs/sway-libs/) /

[Asset](https://docs.fuel.network/docs/sway-libs/asset/) /

Supply

## _Icon Link_ [Supply Functionality](https://docs.fuel.network/docs/sway-libs/asset/supply/\#supply-functionality)

For implementation details on the Asset Library supply functionality please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/asset/supply/index.html).

## _Icon Link_ [Importing the Asset Library Supply Functionality](https://docs.fuel.network/docs/sway-libs/asset/supply/\#importing-the-asset-library-supply-functionality)

In order to use the Asset Library, Sway Libs and [Sway Standards _Icon Link_](https://docs.fuel.network/docs/sway-standards/) must be added to the `Forc.toml` file and then imported into your Sway project. To add Sway Libs as a dependency to the `Forc.toml` file in your project please see the [Getting Started](https://docs.fuel.network/docs/sway-libs/getting_started/). To add Sway Standards as a dependency please see the [Sway Standards Book _Icon Link_](https://docs.fuel.network/docs/sway-standards/#using-a-standard).

To import the Asset Library Supply Functionality and [SRC-3 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-3-minting-and-burning/) Standard to your Sway Smart Contract, add the following to your Sway file:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::asset::supply::*;
use standards::src3::*;
```

_Icon ClipboardText_

## _Icon Link_ [Integration with the SRC-3 Standard](https://docs.fuel.network/docs/sway-libs/asset/supply/\#integration-with-the-src-3-standard)

The [SRC-3 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-3-minting-and-burning/) definition states that the following abi implementation is required for any Native Asset on Fuel which mints and burns tokens:

```fuel_Box fuel_Box-idXKMmm-css
abi SRC3 {
    #[storage(read, write)]
    fn mint(recipient: Identity, sub_id: Option<SubId>, amount: u64);
    #[payable]
    #[storage(read, write)]
    fn burn(vault_sub_id: SubId, amount: u64);
}
```

_Icon ClipboardText_

The Asset Library has the following complimentary functions for each function in the `SRC3` abi:

- `_mint()`
- `_burn()`

> _Icon InfoCircle_
>
> **NOTE** The `_mint()` and `_burn()` functions will mint and burn assets _unconditionally_. External checks should be applied to restrict the minting and burning of assets.

## _Icon Link_ [Setting Up Storage](https://docs.fuel.network/docs/sway-libs/asset/supply/\#setting-up-storage)

Once imported, the Asset Library's supply functionality should be available. To use them, be sure to add the storage block below to your contract which enables the [SRC-3 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-3-minting-and-burning/) standard.

```fuel_Box fuel_Box-idXKMmm-css
storage {
    total_assets: u64 = 0,
    total_supply: StorageMap<AssetId, u64> = StorageMap {},
}
```

_Icon ClipboardText_

## _Icon Link_ [Implementing the SRC-3 Standard with the Asset Library](https://docs.fuel.network/docs/sway-libs/asset/supply/\#implementing-the-src-3-standard-with-the-asset-library)

To use either function, simply pass the `StorageKey` from the prescribed storage block. The example below shows the implementation of the [SRC-3 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-3-minting-and-burning/) standard in combination with the Asset Library with no user defined restrictions or custom functionality. It is recommended that the [Ownership Library](https://docs.fuel.network/docs/sway-libs/ownership/) is used in conjunction with the Asset Library's supply functionality to ensure only a single user has permissions to mint an Asset.

The `_mint()` and `_burn()` functions follows the SRC-20 standard for logging and will emit the `TotalSupplyEvent` when called.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::asset::supply::{_burn, _mint};
use standards::src3::SRC3;

storage {
    total_assets: u64 = 0,
    total_supply: StorageMap<AssetId, u64> = StorageMap {},
}

// Implement the SRC-3 Standard for this contract
impl SRC3 for Contract {
    #[storage(read, write)]
    fn mint(recipient: Identity, sub_id: Option<SubId>, amount: u64) {
        // Pass the StorageKeys to the `_mint()` function from the Asset Library.
        _mint(
            storage
                .total_assets,
            storage
                .total_supply,
            recipient,
            sub_id
                .unwrap_or(b256::zero()),
            amount,
        );
    }

    // Pass the StorageKeys to the `_burn_()` function from the Asset Library.
    #[payable]
    #[storage(read, write)]
    fn burn(sub_id: SubId, amount: u64) {
        _burn(storage.total_supply, sub_id, amount);
    }
}
```

Collapse_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE** The `_mint()` and `_burn()` functions will mint and burn assets _unconditionally_. External checks should be applied to restrict the minting and burning of assets.