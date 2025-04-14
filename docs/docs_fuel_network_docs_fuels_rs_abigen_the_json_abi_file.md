[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Abigen](https://docs.fuel.network/docs/fuels-rs/abigen/) /

The Json ABI File

## _Icon Link_ [The JSON ABI file](https://docs.fuel.network/docs/fuels-rs/abigen/the-json-abi-file/\#the-json-abi-file)

Whether you want to deploy or connect to a pre-existing smart contract, the JSON ABI file is extremely important: it's what tells the SDK about the [ABI methods _Icon Link_](https://docs.fuel.network/guides/quickstart/building-a-smart-contract/#abi) in your smart contracts.

For the same example Sway code as above:

```fuel_Box fuel_Box-idXKMmm-css
contract;

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}
```

_Icon ClipboardText_

The JSON ABI file looks like this:

```fuel_Box fuel_Box-idXKMmm-css
$ cat out/release/my-test-abi.json
[\
  {\
    "type": "function",\
    "inputs": [],\
    "name": "test_function",\
    "outputs": [\
      {\
        "name": "",\
        "type": "bool",\
        "components": null\
      }\
    ]\
  }\
]
```

_Icon ClipboardText_

The Fuel Rust SDK will take this file as input and generate equivalent methods (and custom types if applicable) that you can call from your Rust code.