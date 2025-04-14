[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Types](https://docs.fuel.network/docs/fuels-ts/types/) /

Options

## _Icon Link_ [Options](https://docs.fuel.network/docs/fuels-ts/types/options/\#options)

Sway provides the `Option` (optional) container for handling variables that can have a value or be marked as `no-value`. This concept is useful when dealing with situations where a variable may or may not have a defined value.

In this guide, we'll explain how to work with Option types in Sway and demonstrate their usage through a practical example.

## _Icon Link_ [Overview of `Option` Type](https://docs.fuel.network/docs/fuels-ts/types/options/\#overview-of-option-type)

The `Option` type in Sway is a special wrapper type of Enum. In TypeScript, you can represent the `Option` type by using the `undefined` keyword, as shown in the following example

```fuel_Box fuel_Box-idXKMmm-css
// Sway Option<u8>
const input: number | undefined = 10;
```

_Icon ClipboardText_

In this example, the variable `input1` can be either a `number` or `undefined`.

## _Icon Link_ [Example: `Option<u8>` Parameters](https://docs.fuel.network/docs/fuels-ts/types/options/\#example-optionu8-parameters)

Let's say we have a contract function that accepts two `Option<u8>` parameters. Both of these parameters can have a value or be undefined. The function checks whether each input has a value; if not, it assigns a value of `0`. Finally, the function returns the sum of the two inputs.

Here's the contract function written in Sway:

```fuel_Box fuel_Box-idXKMmm-css
fn sum_optional_u8(input1: Option<u8>, input2: Option<u8>) -> u8 {
    let value1 = match input1 {
        Option::Some(v) => v,
        Option::None => 0,
    };

    let value2 = match input2 {
        Option::Some(v) => v,
        Option::None => 0,
    };

    value1 + value2
}
```

_Icon ClipboardText_

You can interact with the contract function using the SDK as follows:

```fuel_Box fuel_Box-idXKMmm-css
const input: number | undefined = 10;
const input2: number | undefined = 5;

const { value } = await contract.functions.sum_optional_u8(input, input2).get();

console.log('value', value);
// 15
```

_Icon ClipboardText_

In this case, the result of the contract function call is the sum of both input parameters. If we pass only one parameter, the contract function will default the other parameter's value to `0`.

```fuel_Box fuel_Box-idXKMmm-css
const input: number | undefined = 10;

const { value } = await contract.functions.sum_optional_u8(input).get();

console.log('value', value);
// 10
```

_Icon ClipboardText_

Using `Option` types in Sway allows you to elegantly handle situations where a variable may or may not have a defined value.