[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/) /

Asset Id

## _Icon Link_ [`AssetId`](https://docs.fuel.network/docs/nightly/fuels-rs/types/asset-id/\#assetid)

Like `Bytes32`, `AssetId` is a wrapper on `[u8; 32]` with similar methods and implements the same traits (see [fuel-types documentation _Icon Link_](https://docs.rs/fuel-types/0.49.0/fuel_types/struct.AssetId.html)).

These are the main ways of creating an `AssetId`:

```fuel_Box fuel_Box-idXKMmm-css
use std::str::FromStr;

use fuels::types::AssetId;

// Zeroed Bytes32
let asset_id = AssetId::zeroed();

// Grab the inner `[u8; 32]` from
// `Bytes32` by dereferencing (i.e. `*`) it.
assert_eq!([0u8; 32], *asset_id);

// From a `[u8; 32]`.
let my_slice = [1u8; 32];
let asset_id = AssetId::new(my_slice);
assert_eq!([1u8; 32], *asset_id);

// From a string.
let hex_str = "0x0000000000000000000000000000000000000000000000000000000000000000";
let asset_id = AssetId::from_str(hex_str)?;
assert_eq!([0u8; 32], *asset_id);
```

_Icon ClipboardText_