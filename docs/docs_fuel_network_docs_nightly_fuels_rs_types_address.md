[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/) /

Address

## _Icon Link_ [`Address`](https://docs.fuel.network/docs/nightly/fuels-rs/types/address/\#address)

Like `Bytes32`, `Address` is a wrapper on `[u8; 32]` with similar methods and implements the same traits (see [fuel-types documentation _Icon Link_](https://docs.rs/fuel-types/latest/fuel_types/struct.Address.html)).

These are the main ways of creating an `Address`:

```fuel_Box fuel_Box-idXKMmm-css
use std::str::FromStr;

use fuels::types::Address;

// Zeroed Bytes32
let address = Address::zeroed();

// Grab the inner `[u8; 32]` from
// `Bytes32` by dereferencing (i.e. `*`) it.
assert_eq!([0u8; 32], *address);

// From a `[u8; 32]`.
let my_slice = [1u8; 32];
let address = Address::new(my_slice);
assert_eq!([1u8; 32], *address);

// From a string.
let hex_str = "0x0000000000000000000000000000000000000000000000000000000000000000";
let address = Address::from_str(hex_str)?;
assert_eq!([0u8; 32], *address);
```

_Icon ClipboardText_