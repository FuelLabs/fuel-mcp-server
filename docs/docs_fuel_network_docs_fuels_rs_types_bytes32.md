[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Types](https://docs.fuel.network/docs/fuels-rs/types/) /

Bytes32

## _Icon Link_ [`Bytes32`](https://docs.fuel.network/docs/fuels-rs/types/bytes32/\#bytes32)

In Sway and the FuelVM, `Bytes32` represents hashes. They hold a 256-bit (32-byte) value. `Bytes32` is a wrapper on a 32-sized slice of `u8`: `pub struct Bytes32([u8; 32]);`.

These are the main ways of creating a `Bytes32`:

```fuel_Box fuel_Box-idXKMmm-css
use std::str::FromStr;

use fuels::types::Bytes32;

// Zeroed Bytes32
let b256 = Bytes32::zeroed();

// Grab the inner `[u8; 32]` from
// `Bytes32` by dereferencing (i.e. `*`) it.
assert_eq!([0u8; 32], *b256);

// From a `[u8; 32]`.
let my_slice = [1u8; 32];
let b256 = Bytes32::new(my_slice);
assert_eq!([1u8; 32], *b256);

// From a hex string.
let hex_str = "0x0000000000000000000000000000000000000000000000000000000000000000";
let b256 = Bytes32::from_str(hex_str)?;
assert_eq!([0u8; 32], *b256);
```

_Icon ClipboardText_

`Bytes32` also implements the `fmt` module's `Debug`, `Display`, `LowerHex` and `UpperHex` traits. For example, you can get the display and hex representations with:

```fuel_Box fuel_Box-idXKMmm-css
let b256_string = b256.to_string();
let b256_hex_string = format!("{b256:#x}");
```

_Icon ClipboardText_

For a full list of implemented methods and traits, see the [fuel-types documentation _Icon Link_](https://docs.rs/fuel-types/latest/fuel_types/struct.Bytes32.html).

> _Icon InfoCircle_
>
> **Note:** In Fuel, there's a special type called `b256`, which is similar to `Bytes32`; also used to represent hashes, and it holds a 256-bit value. In Rust, through the SDK, this is represented as `Bits256(value)` where `value` is a `[u8; 32]`. If your contract method takes a `b256` as input, all you need to do is pass a `Bits256([u8; 32])` when calling it from the SDK.