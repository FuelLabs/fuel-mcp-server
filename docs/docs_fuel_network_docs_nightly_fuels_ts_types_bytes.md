[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-ts/types/) /

Bytes

## _Icon Link_ [Bytes](https://docs.fuel.network/docs/nightly/fuels-ts/types/bytes/\#bytes)

A dynamic array of byte values can be represented using the `Bytes` type, which represents raw bytes.

## _Icon Link_ [Using Bytes](https://docs.fuel.network/docs/nightly/fuels-ts/types/bytes/\#using-bytes)

The `Bytes` type can be integrated with your contract calls. Consider the following contract that can compare and return a `Bytes`:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::bytes::Bytes;

abi BytesTest {
    fn echo_bytes(value: Bytes) -> Bytes;
    fn bytes_comparison(value: Bytes) -> bool;
}

impl BytesTest for Contract {
    fn echo_bytes(value: Bytes) -> Bytes {
        value
    }

    fn bytes_comparison(value: Bytes) -> bool {
        let mut bytes = Bytes::new();

        bytes.push(40u8);
        bytes.push(41u8);
        bytes.push(42u8);

        value == bytes
    }
}
```

_Icon ClipboardText_

A `Bytes` array can be created using a native JavaScript array of numbers or Big Numbers, and sent to a Sway contract:

```fuel_Box fuel_Box-idXKMmm-css
const bytes: Bytes = [40, 41, 42];

const { value } = await contract.functions.echo_bytes(bytes).get();

console.log('value', value);
// Uint8Array(3)[40, 41, 42]
```

_Icon ClipboardText_