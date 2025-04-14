[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-ts/types/) /

Numbers

## _Icon Link_ [Numbers](https://docs.fuel.network/docs/nightly/fuels-ts/types/numbers/\#numbers)

In Sway, there are multiple primitive number types:

1. `u8` (8-bit unsigned integer)
2. `u16` (16-bit unsigned integer)
3. `u32` (32-bit unsigned integer)
4. `u64` (64-bit unsigned integer)
5. `u256` (256-bit unsigned integer)

This guide explains how to create and interact with Sway numbers while using the SDK.

## _Icon Link_ [Creating Numbers](https://docs.fuel.network/docs/nightly/fuels-ts/types/numbers/\#creating-numbers)

## _Icon Link_ [For `u64` and `u256`](https://docs.fuel.network/docs/nightly/fuels-ts/types/numbers/\#for-u64-and-u256)

When you pass in a `u64` or a `u256` to a Sway program from JavaScript, you must first convert it to a `BigNum` object. This is because these types can have extremely large maximum values ( `2^64` and `2^256` respectively), and JavaScript's `Number` type can only hold up to 53 bits of precision ( `2^53`).

```fuel_Box fuel_Box-idXKMmm-css
import { bn } from 'fuels';

const number: number | string = 20;

const bigNumber = bn(number);

console.log('equals', bigNumber.eqn(number));
// true
```

_Icon ClipboardText_

You can also create a `BigNum` from a string. This is useful when you want to pass in a number that is too large to be represented as a JavaScript number. Here's how you can do that:

```fuel_Box fuel_Box-idXKMmm-css
import { bn } from 'fuels';

const strNumber = '9007199254740992';

const bigNumber = bn(strNumber);

console.log('equals', bigNumber.toString() === strNumber);
// true
```

_Icon ClipboardText_

## _Icon Link_ [For `u8`, `u16`, and `u32`](https://docs.fuel.network/docs/nightly/fuels-ts/types/numbers/\#for-u8-u16-and-u32)

You don't need to do anything special to create these numbers. You can pass in a JavaScript number directly. See the examples below for more details.

## _Icon Link_ [Examples: Interacting with Numbers in Contract Methods](https://docs.fuel.network/docs/nightly/fuels-ts/types/numbers/\#examples-interacting-with-numbers-in-contract-methods)

## _Icon Link_ [For `u64` and `u256`](https://docs.fuel.network/docs/nightly/fuels-ts/types/numbers/\#for-u64-and-u256-1)

```fuel_Box fuel_Box-idXKMmm-css
const bigNumber = bn('10000000000000000000');

const { value } = await contract.functions.echo_u64(bigNumber).get();

console.log('value', value.toString());
// '10000000000000000000'
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> Note: If a contract call returns a number that is too large to be represented as a JavaScript number, you can convert it to a string using the `.toString()` method instead of `.toNumber()`.

## _Icon Link_ [For `u8`, `u16`, and `u32`](https://docs.fuel.network/docs/nightly/fuels-ts/types/numbers/\#for-u8-u16-and-u32-1)

```fuel_Box fuel_Box-idXKMmm-css
const number = 200;

const { value } = await contract.functions.echo_u8(number).get();

console.log('value', Number(value));
// 200
```

_Icon ClipboardText_

## _Icon Link_ [Using a `BigNum` from `ethers` with `fuels`](https://docs.fuel.network/docs/nightly/fuels-ts/types/numbers/\#using-a-bignum-from-ethers-with-fuels)

```fuel_Box fuel_Box-idXKMmm-css
import { toBigInt } from 'ethers';
import { bn } from 'fuels';

const number = 20;

const ethersBigNum = toBigInt(number);

const fuelsBigNum = bn(ethersBigNum.toString());

console.log('value', fuelsBigNum.toNumber());
// 20
```

_Icon ClipboardText_