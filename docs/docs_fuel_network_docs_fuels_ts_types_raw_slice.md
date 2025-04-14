[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Types](https://docs.fuel.network/docs/fuels-ts/types/) /

Raw Slice

## _Icon Link_ [`RawSlice`](https://docs.fuel.network/docs/fuels-ts/types/raw-slice/\#rawslice)

A dynamic array of values can be represented using the `RawSlice` type. A raw slice can be a value reference or a raw pointer.

## _Icon Link_ [Using a `RawSlice`](https://docs.fuel.network/docs/fuels-ts/types/raw-slice/\#using-a-rawslice)

The `RawSlice` type can be integrated with your contract calls. Consider the following contract that can compare and return a `RawSlice`:

```fuel_Box fuel_Box-idXKMmm-css
contract;

abi RawSliceTest {
    fn echo_raw_slice(value: raw_slice) -> raw_slice;
    fn raw_slice_comparison(value: raw_slice) -> bool;
}

impl RawSliceTest for Contract {
    fn echo_raw_slice(value: raw_slice) -> raw_slice {
        value
    }

    fn raw_slice_comparison(value: raw_slice) -> bool {
        let vec: Vec<u8> = Vec::from(value);

        vec.len() == 3 && vec.get(0).unwrap() == 40 && vec.get(1).unwrap() == 41 && vec.get(2).unwrap() == 42
    }
}
```

_Icon ClipboardText_

A `RawSlice` can be created using a native JavaScript array of numbers or Big Numbers, and sent to a Sway contract:

```fuel_Box fuel_Box-idXKMmm-css
const rawSlice: RawSlice = [8, 42, 77];

const { value } = await contract.functions.echo_raw_slice(rawSlice).get();
```

_Icon ClipboardText_