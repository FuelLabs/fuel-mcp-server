[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-ts/types/) /

Std String

## _Icon Link_ [`StdString`](https://docs.fuel.network/docs/nightly/fuels-ts/types/std-string/\#stdstring)

A dynamic string of variable length can be represented using the `StdString` type, also known as a Standard Lib String or `std-lib-string`. It behaves much like a dynamic string in most languages, and is essentially an array of characters.

## _Icon Link_ [Using a `StdString`](https://docs.fuel.network/docs/nightly/fuels-ts/types/std-string/\#using-a-stdstring)

The `StdString` type can be integrated with your contract calls. Consider the following contract that can compare and return a String:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::string::String;

abi StdStringTest {
    fn echo_string(value: String) -> String;
    fn string_comparison(value: String) -> bool;
}

impl StdStringTest for Contract {
    fn echo_string(value: String) -> String {
        value
    }

    fn string_comparison(value: String) -> bool {
        let expected = String::from_ascii_str("Hello World");

        value.as_bytes() == expected.as_bytes()
    }
}
```

_Icon ClipboardText_

A string can be created using a native JavaScript string, and sent to a Sway contract:

```fuel_Box fuel_Box-idXKMmm-css
const stdString: StdString = 'Hello Fuel';

const { value } = await contract.functions.echo_string(stdString).get();

console.log('value', value);
// 'Hello Fuel'
```

_Icon ClipboardText_