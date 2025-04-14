[Docs](https://docs.fuel.network/) /

Nightly /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/) /

Contract Id

## _Icon Link_ [`ContractId`](https://docs.fuel.network/docs/nightly/fuels-rs/types/contract-id/\#contractid)

Like `Bytes32`, `ContractId` is a wrapper on `[u8; 32]` with similar methods and implements the same traits (see [fuel-types documentation _Icon Link_](https://docs.rs/fuel-types/0.49.0/fuel_types/struct.ContractId.html)).

These are the main ways of creating a `ContractId`:

```fuel_Box fuel_Box-idXKMmm-css
use std::str::FromStr;

use fuels::types::ContractId;

// Zeroed Bytes32
let contract_id = ContractId::zeroed();

// Grab the inner `[u8; 32]` from
// `Bytes32` by dereferencing (i.e. `*`) it.
assert_eq!([0u8; 32], *contract_id);

// From a `[u8; 32]`.
let my_slice = [1u8; 32];
let contract_id = ContractId::new(my_slice);
assert_eq!([1u8; 32], *contract_id);

// From a string.
let hex_str = "0x0000000000000000000000000000000000000000000000000000000000000000";
let contract_id = ContractId::from_str(hex_str)?;
assert_eq!([0u8; 32], *contract_id);
```

_Icon ClipboardText_