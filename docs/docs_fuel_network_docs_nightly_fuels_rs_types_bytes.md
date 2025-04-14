[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/) /

Bytes32

## _Icon Link_ [`Bytes`](https://docs.fuel.network/docs/nightly/fuels-rs/types/bytes/\#bytes)

In Fuel, a type called `Bytes` represents a collection of tightly-packed bytes. The Rust SDK represents `Bytes` as `Bytes(Vec<u8>)`. Here's an example of using `Bytes` in a contract call:

```fuel_Box fuel_Box-idXKMmm-css
let bytes = Bytes(vec![40, 41, 42]);

contract_methods.accept_bytes(bytes).call().await?;
```

_Icon ClipboardText_

If you have a hexadecimal value as a string and wish to convert it to `Bytes`, you may do so with `from_hex_str`:

```fuel_Box fuel_Box-idXKMmm-css
let hex_str = "0101010101010101010101010101010101010101010101010101010101010101";

let bytes = Bytes::from_hex_str(hex_str)?;

assert_eq!(bytes.0, vec![1u8; 32]);

// With the `0x0` prefix
let hex_str = "0x0101010101010101010101010101010101010101010101010101010101010101";

let bytes = Bytes::from_hex_str(hex_str)?;

assert_eq!(bytes.0, vec![1u8; 32]);
```

_Icon ClipboardText_