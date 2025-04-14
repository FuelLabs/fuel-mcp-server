[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/) /

Bits256

## _Icon Link_ [`Bits256`](https://docs.fuel.network/docs/nightly/fuels-rs/types/bits256/\#bits256)

In Fuel, a type called `b256` represents hashes and holds a 256-bit value. The Rust SDK represents `b256` as `Bits256(value)` where `value` is a `[u8; 32]`. If your contract method takes a `b256` as input, you must pass a `Bits256([u8; 32])` when calling it from the SDK.

Here's an example:

```fuel_Box fuel_Box-idXKMmm-css
let b256 = Bits256([1; 32]);

let call_handler = contract_instance.methods().b256_as_input(b256);
```

_Icon ClipboardText_

If you have a hexadecimal value as a string and wish to convert it to `Bits256`, you may do so with `from_hex_str`:

```fuel_Box fuel_Box-idXKMmm-css
let hex_str = "0101010101010101010101010101010101010101010101010101010101010101";

let bits256 = Bits256::from_hex_str(hex_str)?;

assert_eq!(bits256.0, [1u8; 32]);

// With the `0x0` prefix
let hex_str = "0x0101010101010101010101010101010101010101010101010101010101010101";

let bits256 = Bits256::from_hex_str(hex_str)?;

assert_eq!(bits256.0, [1u8; 32]);
```

_Icon ClipboardText_