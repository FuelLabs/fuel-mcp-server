[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-ts/types/) /

Tuples

## _Icon Link_ [Tuples](https://docs.fuel.network/docs/nightly/fuels-ts/types/tuples/\#tuples)

In Sway, Tuples are fixed-length collections of heterogeneous elements. Tuples can store multiple data types, including basic types, structs, and enums. This guide will demonstrate how to represent and work with Tuples in TypeScript and interact with a contract function that accepts a tuple as a parameter.

In TypeScript, you can represent Sway tuples using arrays with specified types for each element:

```fuel_Box fuel_Box-idXKMmm-css
// Sway let tuple2: (u8, bool, u64) = (100, false, 10000);
const tuple: [number, boolean, number] = [100, false, 10000];
```

_Icon ClipboardText_

In this example, the Typescript `tuple` variable contains three elements of different types: a number, a boolean, and another number.

## _Icon Link_ [Example: Passing Tuple as a Parameter](https://docs.fuel.network/docs/nightly/fuels-ts/types/tuples/\#example-passing-tuple-as-a-parameter)

Let's consider a contract function that accepts a tuple as a parameter and returns the same Tuple:

```fuel_Box fuel_Box-idXKMmm-css
fn echo_tuple(tuple: (u8, bool, u64)) -> (u8, bool, u64) {
    tuple
}
```

_Icon ClipboardText_

To execute and validate the contract function using the SDK, follow these steps:

```fuel_Box fuel_Box-idXKMmm-css
const tuple: [number, boolean, number] = [100, false, 10000];

const { value } = await contract.functions.echo_tuple(tuple).simulate();

console.log('value', value);
// [100, false, <BN 0x2710>]
```

_Icon ClipboardText_

In this example, we create a Tuple with three elements, call the `echo_tuple` contract function, and expect the returned tuple to match the original one. Note that we convert the third element of the returned tuple to a number using `new BN(value[2]).toNumber()`.

Tuples in Sway provide a convenient way to store and manipulate collections of heterogeneous elements. Understanding how to represent and work with tuples in TypeScript and Sway contracts will enable you to create more versatile and expressive code.