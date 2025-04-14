[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/) /

Bech32

## _Icon Link_ [`Bech32`](https://docs.fuel.network/docs/nightly/fuels-rs/types/bech32/\#bech32)

`Bech32Address` and `Bech32ContractId` enable the use of addresses and contract IDs in the `bech32` format. They can easily be converted to their counterparts `Address` and `ContractId`.

Here are the main ways of creating a `Bech32Address`, but note that the same applies to `Bech32ContractId`:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::types::{bech32::Bech32Address, Address, Bytes32};

// New from HRP string and a hash
let hrp = "fuel";
let my_slice = [1u8; 32];
let _bech32_address = Bech32Address::new(hrp, my_slice);

// Note that you can also pass a hash stored as Bytes32 to new:
let my_hash = Bytes32::new([1u8; 32]);
let _bech32_address = Bech32Address::new(hrp, my_hash);

// From a string.
let address = "fuel1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsx2mt2";
let bech32_address = Bech32Address::from_str(address)?;
assert_eq!([0u8; 32], *bech32_address.hash());

// From Address
let plain_address = Address::new([0u8; 32]);
let bech32_address = Bech32Address::from(plain_address);
assert_eq!([0u8; 32], *bech32_address.hash());

// Convert to Address
let _plain_address: Address = bech32_address.into();

```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note:** when creating a `Bech32Address` from `Address` or `Bech32ContractId` from `ContractId` the `HRP` (Human-Readable Part) is set to **"fuel"** per default.