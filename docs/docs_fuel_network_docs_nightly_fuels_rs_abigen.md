[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

Abigen

## _Icon Link_ [Generating bindings with abigen](https://docs.fuel.network/docs/nightly/fuels-rs/abigen/\#generating-bindings-with-abigen)

You might have noticed this snippet in the previous sections:

```fuel_Box fuel_Box-idXKMmm-css
abigen!(Contract(
    name = "MyContract",
    abi = "e2e/sway/contracts/contract_test/out/release/contract_test-abi.json"
));
```

_Icon ClipboardText_

The SDK lets you transform ABI methods of a smart contract, specified as JSON objects (which you can get from [Forc _Icon Link_](https://github.com/FuelLabs/sway/tree/v0.67.0/forc)), into Rust structs and methods that are type-checked at compile time.
In order to call your contracts, scripts or predicates, you first need to generate the Rust bindings for them.

The following subsections contain more details about the `abigen!` syntax and the code generated from it.