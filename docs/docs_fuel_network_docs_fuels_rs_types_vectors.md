[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Types](https://docs.fuel.network/docs/fuels-rs/types/) /

Vectors

## _Icon Link_ [Vectors](https://docs.fuel.network/docs/fuels-rs/types/vectors/\#vectors)

## _Icon Link_ [Passing in vectors](https://docs.fuel.network/docs/fuels-rs/types/vectors/\#passing-in-vectors)

You can pass a Rust `std::vec::Vec` into your contract method transparently. The following code calls a Sway contract method which accepts a `Vec<SomeStruct<u32>>`.

```fuel_Box fuel_Box-idXKMmm-css
let arg = vec![SomeStruct { a: 0 }, SomeStruct { a: 1 }];
methods.struct_in_vec(arg.clone()).call().await?;
```

_Icon ClipboardText_

You can use a vector just like you would use any other type -- e.g. a `[Vec<u32>; 2]` or a `SomeStruct<Vec<Bits256>>` etc.

## _Icon Link_ [Returning vectors](https://docs.fuel.network/docs/fuels-rs/types/vectors/\#returning-vectors)

Returning vectors from contract methods is supported transparently, with the caveat that you cannot have them nested inside another type. This limitation is temporary.

```fuel_Box fuel_Box-idXKMmm-css
let response = contract_methods.u8_in_vec(10).call().await?;
assert_eq!(response.value, (0..10).collect::<Vec<_>>());
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note: you can still interact with contracts containing methods that return vectors nested inside another type, just not interact with the methods themselves**