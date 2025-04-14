[Docs](https://docs.fuel.network/) /

Nightly /

[Sway Libs](https://docs.fuel.network/docs/nightly/sway-libs/) /

[Asset](https://docs.fuel.network/docs/nightly/sway-libs/asset/) /

Base

## _Icon Link_ [Base Functionality](https://docs.fuel.network/docs/nightly/sway-libs/asset/base/\#base-functionality)

For implementation details on the Asset Library base functionality please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/asset/base/index.html).

## _Icon Link_ [Importing the Asset Library Base Functionality](https://docs.fuel.network/docs/nightly/sway-libs/asset/base/\#importing-the-asset-library-base-functionality)

In order to use the Asset Library, Sway Libs and [Sway Standards _Icon Link_](https://docs.fuel.network/docs/sway-standards/) must be added to the `Forc.toml` file and then imported into your Sway project. To add Sway Libs as a dependency to the `Forc.toml` file in your project please see the [Getting Started](https://docs.fuel.network/docs/nightly/sway-libs/getting_started/). To add Sway Standards as a dependency please see the [Sway Standards Book _Icon Link_](https://docs.fuel.network/docs/sway-standards/#using-a-standard).

To import the Asset Library Base Functionality and [SRC-20 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/) Standard to your Sway Smart Contract, add the following to your Sway file:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::asset::base::*;
use standards::src20::*;
```

_Icon ClipboardText_

## _Icon Link_ [Integration with the SRC-20 Standard](https://docs.fuel.network/docs/nightly/sway-libs/asset/base/\#integration-with-the-src-20-standard)

The [SRC-20 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/) definition states that the following abi implementation is required for any Native Asset on Fuel:

```fuel_Box fuel_Box-idXKMmm-css
abi SRC20 {
    #[storage(read)]
    fn total_assets() -> u64;
    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64>;
    #[storage(read)]
    fn name(asset: AssetId) -> Option<String>;
    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String>;
    #[storage(read)]
    fn decimals(asset: AssetId) -> Option<u8>;
}
```

_Icon ClipboardText_

The Asset Library has the following complimentary functions for each function in the `SRC20` abi:

- `_total_assets()`
- `_total_supply()`
- `_name()`
- `_symbol()`
- `_decimals()`

The following ABI and functions are also provided to set your [SRC-20 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/) standard storage values:

```fuel_Box fuel_Box-idXKMmm-css
abi SetAssetAttributes {
    #[storage(write)]
    fn set_name(asset: AssetId, name: String);
    #[storage(write)]
    fn set_symbol(asset: AssetId, symbol: String);
    #[storage(write)]
    fn set_decimals(asset: AssetId, decimals: u8);
}
```

_Icon ClipboardText_

- `_set_name()`
- `_set_symbol()`
- `_set_decimals()`

> _Icon InfoCircle_
>
> **NOTE** The `_set_name()`, `_set_symbol()`, and `_set_decimals()` functions will set the attributes of an asset _unconditionally_. External checks should be applied to restrict the setting of attributes.

## _Icon Link_ [Setting Up Storage](https://docs.fuel.network/docs/nightly/sway-libs/asset/base/\#setting-up-storage)

Once imported, the Asset Library's base functionality should be available. To use them, be sure to add the storage block below to your contract which enables the [SRC-20 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/) standard.

```fuel_Box fuel_Box-idXKMmm-css
storage {
    total_assets: u64 = 0,
    total_supply: StorageMap<AssetId, u64> = StorageMap {},
    name: StorageMap<AssetId, StorageString> = StorageMap {},
    symbol: StorageMap<AssetId, StorageString> = StorageMap {},
    decimals: StorageMap<AssetId, u8> = StorageMap {},
}
```

_Icon ClipboardText_

## _Icon Link_ [Implementing the SRC-20 Standard with the Asset Library](https://docs.fuel.network/docs/nightly/sway-libs/asset/base/\#implementing-the-src-20-standard-with-the-asset-library)

To use the Asset Library's base functionly, simply pass the `StorageKey` from the prescribed storage block. The example below shows the implementation of the [SRC-20 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/) standard in combination with the Asset Library with no user defined restrictions or custom functionality.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::asset::base::{_decimals, _name, _symbol, _total_assets, _total_supply};
use standards::src20::SRC20;
use std::{hash::Hash, storage::storage_string::*, string::String};

// The SRC-20 storage block
storage {
    total_assets: u64 = 0,
    total_supply: StorageMap<AssetId, u64> = StorageMap {},
    name: StorageMap<AssetId, StorageString> = StorageMap {},
    symbol: StorageMap<AssetId, StorageString> = StorageMap {},
    decimals: StorageMap<AssetId, u8> = StorageMap {},
}

// Implement the SRC-20 Standard for this contract
impl SRC20 for Contract {
    #[storage(read)]
    fn total_assets() -> u64 {
        // Pass the `total_assets` StorageKey to `_total_assets()` from the Asset Library.
        _total_assets(storage.total_assets)
    }

    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64> {
        // Pass the `total_supply` StorageKey to `_total_supply()` from the Asset Library.
        _total_supply(storage.total_supply, asset)
    }

    #[storage(read)]
    fn name(asset: AssetId) -> Option<String> {
        // Pass the `name` StorageKey to `_name_()` from the Asset Library.
        _name(storage.name, asset)
    }

    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String> {
        // Pass the `symbol` StorageKey to `_symbol_()` function from the Asset Library.
        _symbol(storage.symbol, asset)
    }

    #[storage(read)]
    fn decimals(asset: AssetId) -> Option<u8> {
        // Pass the `decimals` StorageKey to `_decimals_()` function from the Asset Library.
        _decimals(storage.decimals, asset)
    }
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Setting an Asset's SRC-20 Attributes](https://docs.fuel.network/docs/nightly/sway-libs/asset/base/\#setting-an-assets-src-20-attributes)

To set some the asset attributes for an Asset, use the `SetAssetAttributes` ABI provided by the Asset Library. The example below shows the implementation of the `SetAssetAttributes` ABI with no user defined restrictions or custom functionality. It is recommended that the [Ownership Library](https://docs.fuel.network/docs/nightly/sway-libs/ownership/) is used in conjunction with the `SetAssetAttributes` ABI to ensure only a single user has permissions to set an Asset's attributes.

The `_set_name()`, `_set_symbol()`, and `_set_decimals()` functions follows the SRC-20 standard for logging and will emit their respective log when called.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::asset::base::*;
use std::{hash::Hash, storage::storage_string::*, string::String};

storage {
    name: StorageMap<AssetId, StorageString> = StorageMap {},
    symbol: StorageMap<AssetId, StorageString> = StorageMap {},
    decimals: StorageMap<AssetId, u8> = StorageMap {},
}

impl SetAssetAttributes for Contract {
    #[storage(write)]
    fn set_name(asset: AssetId, name: String) {
        _set_name(storage.name, asset, name);
    }

    #[storage(write)]
    fn set_symbol(asset: AssetId, symbol: String) {
        _set_symbol(storage.symbol, asset, symbol);
    }

    #[storage(write)]
    fn set_decimals(asset: AssetId, decimals: u8) {
        _set_decimals(storage.decimals, asset, decimals);
    }
}
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE** The `_set_name()`, `_set_symbol()`, and `_set_decimals()` functions will set the attributes of an asset _unconditionally_. External checks should be applied to restrict the setting of attributes.