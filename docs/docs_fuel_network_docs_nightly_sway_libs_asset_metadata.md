[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway Libs](https://docs.fuel.network/docs/nightly/sway-libs/) /

[Asset](https://docs.fuel.network/docs/nightly/sway-libs/asset/) /

Metadata

## _Icon Link_ [Metadata Functionality](https://docs.fuel.network/docs/nightly/sway-libs/asset/metadata/\#metadata-functionality)

For implementation details on the Asset Library metadata functionality please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/asset/metadata/index.html).

## _Icon Link_ [Importing the Asset Library Metadata Functionality](https://docs.fuel.network/docs/nightly/sway-libs/asset/metadata/\#importing-the-asset-library-metadata-functionality)

In order to use the Asset Library, Sway Libs and [Sway Standards _Icon Link_](https://docs.fuel.network/docs/sway-standards/) must be added to the `Forc.toml` file and then imported into your Sway project. To add Sway Libs as a dependency to the `Forc.toml` file in your project please see the [Getting Started](https://docs.fuel.network/docs/nightly/sway-libs/getting_started/). To add Sway Standards as a dependency please see the [Sway Standards Book _Icon Link_](https://docs.fuel.network/docs/sway-standards/#using-a-standard).

To import the Asset Library Base Functionality and [SRC-7 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) Standard to your Sway Smart Contract, add the following to your Sway file:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::asset::metadata::{_metadata, _set_metadata, SetAssetMetadata, StorageMetadata};
use standards::src7::*;
```

_Icon ClipboardText_

## _Icon Link_ [Integration with the SRC-7 Standard](https://docs.fuel.network/docs/nightly/sway-libs/asset/metadata/\#integration-with-the-src-7-standard)

The [SRC-7 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) definition states that the following abi implementation is required for any Native Asset on Fuel which uses stateful metadata:

```fuel_Box fuel_Box-idXKMmm-css
abi SRC7 {
    #[storage(read)]
    fn metadata(asset: AssetId, key: String) -> Option<Metadata>;
}
```

_Icon ClipboardText_

The Asset Library has the following complimentary data type for the [SRC-7 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) standard:

- `StorageMetadata`

## _Icon Link_ [Setting Up Storage](https://docs.fuel.network/docs/nightly/sway-libs/asset/metadata/\#setting-up-storage)

Once imported, the Asset Library's metadata functionality should be available. To use them, be sure to add the storage block below to your contract which enables the [SRC-7 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) standard.

```fuel_Box fuel_Box-idXKMmm-css
storage {
    metadata: StorageMetadata = StorageMetadata {},
}
```

_Icon ClipboardText_

## _Icon Link_ [Using the `StorageMetadata` Type](https://docs.fuel.network/docs/nightly/sway-libs/asset/metadata/\#using-the-storagemetadata-type)

## _Icon Link_ [Setting Metadata](https://docs.fuel.network/docs/nightly/sway-libs/asset/metadata/\#setting-metadata)

As described in the [SRC-7 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) standard, the metadata type is a simple enum of the following types:

- `b256`
- `Bytes`
- `u64`
- `String`

To set some metadata of any of the above types for an Asset, you can use the `SetAssetMetadata` ABI provided by the Asset Library with the `_set_metadata()` function. Be sure to follow the [SRC-9 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-9-metadata-keys/) standard for your `key`. It is recommended that the [Ownership Library](https://docs.fuel.network/docs/nightly/sway-libs/ownership/) is used in conjunction with the `SetAssetMetadata` ABI to ensure only a single user has permissions to set an Asset's metadata.

The `_set_metadata()` function follows the SRC-7 standard for logging and will emit the `SetMetadataEvent` when called.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::asset::metadata::*;
use standards::src7::Metadata;

storage {
    metadata: StorageMetadata = StorageMetadata {},
}

impl SetAssetMetadata for Contract {
    #[storage(read, write)]
    fn set_metadata(asset: AssetId, key: String, metadata: Metadata) {
        // add your authentication logic here
        // eg. only_owner()
        _set_metadata(storage.metadata, asset, key, metadata);
    }
}
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE** The `_set_metadata()` function will set the metadata of an asset _unconditionally_. External checks should be applied to restrict the setting of metadata.

To set the metadata of an Asset, using only one of the above types, you can define a custom ABI and use it as such:

```fuel_Box fuel_Box-idXKMmm-css
abi CustomSetAssetMetadata {
    #[storage(read, write)]
    fn custom_set_metadata(
        asset: AssetId,
        key: String,
        bits256: b256,
        bytes: Bytes,
        int: u64,
        string: String,
    );
}

impl CustomSetAssetMetadata for Contract {
    #[storage(read, write)]
    fn custom_set_metadata(
        asset: AssetId,
        key: String,
        bits256: b256,
        bytes: Bytes,
        int: u64,
        string: String,
    ) {
        let b256_metadata = Metadata::B256(bits256);
        let bytes_metadata = Metadata::Bytes(bytes);
        let int_metadata = Metadata::Int(int);
        let string_metadata = Metadata::String(string);

        // your authentication logic here

        // set whichever metadata you want
        storage.metadata.insert(asset, key, string_metadata);
    }
}
```

Collapse_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE** The `_set_metadata()` function will set the metadata of an asset _unconditionally_. External checks should be applied to restrict the setting of metadata.

## _Icon Link_ [Implementing the SRC-7 Standard with StorageMetadata](https://docs.fuel.network/docs/nightly/sway-libs/asset/metadata/\#implementing-the-src-7-standard-with-storagemetadata)

To use the `StorageMetadata` type, simply get the stored metadata with the associated `key` and `AssetId` using the provided `_metadata()` convenience function. The example below shows the implementation of the [SRC-7 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) standard in combination with the Asset Library's `StorageMetadata` type and the `_metadata()` function with no user defined restrictions or custom functionality.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::asset::metadata::*;
use standards::src7::{Metadata, SRC7};

storage {
    metadata: StorageMetadata = StorageMetadata {},
}

// Implement the SRC-7 Standard for this contract
impl SRC7 for Contract {
    #[storage(read)]
    fn metadata(asset: AssetId, key: String) -> Option<Metadata> {
        // Return the stored metadata
        storage.metadata.get(asset, key)
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [Getting Metadata](https://docs.fuel.network/docs/nightly/sway-libs/asset/metadata/\#getting-metadata)

To get the metadata for an asset, apart from the above mentioned `_metadata()` convenience function, you can also use the `get()` method on the `StorageMetadata` type, which returns the `Metadata` type.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::asset::metadata::*; // To access trait implementations you must import everything using the glob operator.
let metadata: Option<Metadata> = storage.metadata.get(asset, key);
```

_Icon ClipboardText_

This results an `Option` type as the metadata may not be set for the asset and key combination.

If you know that the metadata is set, but you don't know the type, you can use a match statement to access the metadata.

```fuel_Box fuel_Box-idXKMmm-css
    match metadata.unwrap() {
        Metadata::B256(b256) => {
        // do something with b256
},
        Metadata::Bytes(bytes) => {
        // do something with bytes
},
        Metadata::Int(int) => {
        // do something with int
},
        Metadata::String(string) => {
        // do something with string
},
    }
```

_Icon ClipboardText_

If you know that the metadata is set and you know the type, you can use the `as_*` methods to access the metadata. We also provide `is_*` methods to check if the metadata is of a specific type.

```fuel_Box fuel_Box-idXKMmm-css
let metadata: Metadata = storage.metadata.get(asset, key).unwrap();

if metadata.is_b256() {
    let b256: b256 = metadata.as_b256().unwrap();
    // do something with b256
} else if metadata.is_bytes() {
    let bytes: Bytes = metadata.as_bytes().unwrap();
    // do something with bytes
} else if metadata.is_u64() {
    let int: u64 = metadata.as_u64().unwrap();
    // do something with int
} else if metadata.is_string() {
    let string: String = metadata.as_string().unwrap();
    // do something with string
}
```

_Icon ClipboardText_