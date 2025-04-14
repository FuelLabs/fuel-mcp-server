[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Fuels CLI](https://docs.fuel.network/docs/fuels-ts/fuels-cli/) /

ABI Typegen

## _Icon Link_ [ABI Typegen](https://docs.fuel.network/docs/fuels-ts/fuels-cli/abi-typegen/\#abi-typegen)

## _Icon Link_ [The JSON ABI file](https://docs.fuel.network/docs/fuels-ts/fuels-cli/abi-typegen/\#the-json-abi-file)

Whether you want to deploy or connect to a pre-existing smart contract, the [JSON ABI _Icon Link_](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/#the-abi-declaration) file is what makes it possible.

It tells the SDK about the [ABI methods _Icon Link_](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/#the-abi-declaration) in your [Smart Contracts _Icon Link_](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/) and [Scripts _Icon Link_](https://docs.fuel.network/docs/sway/sway-program-types/scripts/)

Given the following Sway smart contract:

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

The JSON ABI file would look something like this:

```fuel_Box fuel_Box-idXKMmm-css
$ cat out/debug/my-test-abi.json
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

See also:

- [Generating Types](https://docs.fuel.network/docs/fuels-ts/fuels-cli/generating-types/)
- [Using Generated Types](https://docs.fuel.network/docs/fuels-ts/fuels-cli/using-generated-types/)