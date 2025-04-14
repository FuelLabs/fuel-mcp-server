[Docs](https://docs.fuel.network/) /

[Sway Libs](https://docs.fuel.network/docs/sway-libs/) /

Signed Integers

## _Icon Link_ [Signed Integers Library](https://docs.fuel.network/docs/sway-libs/signed_integers/\#signed-integers-library)

The Signed Integers library provides a library to use signed numbers in Sway. It has 6 distinct types: `I8`, `I16`, `I32`, `I64`, `I128`, `I256`. These types are stack allocated.

Internally the library uses the `u8`, `u16`, `u32`, `u64`, `U128`, `u256` types to represent the underlying values of the signed integers.

For implementation details on the Signed Integers Library please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/signed_integers/index.html).

## _Icon Link_ [Importing the Signed Integer Library](https://docs.fuel.network/docs/sway-libs/signed_integers/\#importing-the-signed-integer-library)

In order to use the Signed Integer Number Library, Sway Libs must be added to the `Forc.toml` file and then imported into your Sway project. To add Sway Libs as a dependency to the `Forc.toml` file in your project please see the [Getting Started](https://docs.fuel.network/docs/sway-libs/getting_started/).

To import the Signed Integer Number Library to your Sway Smart Contract, add the following to your Sway file:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::signed_integers::*;
```

_Icon ClipboardText_

In order to use any of the Signed Integer types, import them into your Sway project like so:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::signed_integers::i8::I8;
```

_Icon ClipboardText_

## _Icon Link_ [Basic Functionality](https://docs.fuel.network/docs/sway-libs/signed_integers/\#basic-functionality)

All the functionality is demonstrated with the `I8` type, but all of the same functionality is available for the other types as well.

## _Icon Link_ [Instantiating a Signed Integer](https://docs.fuel.network/docs/sway-libs/signed_integers/\#instantiating-a-signed-integer)

## _Icon Link_ [Zero value](https://docs.fuel.network/docs/sway-libs/signed_integers/\#zero-value)

Once imported, a `Signed Integer` type can be instantiated defining a new variable and calling the `new` function.

```fuel_Box fuel_Box-idXKMmm-css
let mut i8_value = I8::new();
```

_Icon ClipboardText_

this newly initialized variable represents the value of `0`.

The `new` function is functionally equivalent to the `zero` function.

```fuel_Box fuel_Box-idXKMmm-css
let zero = I8::zero();
```

_Icon ClipboardText_

## _Icon Link_ [Positive and Negative Values](https://docs.fuel.network/docs/sway-libs/signed_integers/\#positive-and-negative-values)

As the signed variants can only represent half as high a number as the unsigned variants (but with either a positive or negative sign), the `try_from` and `neg_try_from` functions will only work with half of the maximum value of the unsigned variant.

You can use the `try_from` function to create a new positive `Signed Integer` from a its unsigned variant.

```fuel_Box fuel_Box-idXKMmm-css
let one = I8::try_from(1u8).unwrap();
```

_Icon ClipboardText_

You can use the `neg_try_from` function to create a new negative `Signed Integer` from a its unsigned variant.

```fuel_Box fuel_Box-idXKMmm-css
let negative_one = I8::neg_try_from(1u8).unwrap();
```

_Icon ClipboardText_

## _Icon Link_ [With underlying value](https://docs.fuel.network/docs/sway-libs/signed_integers/\#with-underlying-value)

As mentioned previously, the signed integers are internally represented by an unsigned integer, with its values divided into two halves, the bottom half of the values represent the negative values and the top half represent the positive values, and the middle value represents zero.

Therefore, for the lowest value representable by a i8, `-128`, the underlying value would be `0`.

```fuel_Box fuel_Box-idXKMmm-css
let neg_128 = I8::from_uint(0u8);
```

_Icon ClipboardText_

For the zero value, the underlying value would be `128`.

```fuel_Box fuel_Box-idXKMmm-css
let zero = I8::from_uint(128u8);
```

_Icon ClipboardText_

And for the highest value representable by a i8, `127`, the underlying value would be `255`.

```fuel_Box fuel_Box-idXKMmm-css
let pos_127 = I8::from_uint(255u8);
```

_Icon ClipboardText_

## _Icon Link_ [Minimum and Maximum Values](https://docs.fuel.network/docs/sway-libs/signed_integers/\#minimum-and-maximum-values)

To get the minimum and maximum values of a signed integer, use the `min` and `max` functions.

```fuel_Box fuel_Box-idXKMmm-css
let min = I8::min();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
let max = I8::max();
```

_Icon ClipboardText_

## _Icon Link_ [Basic Mathematical Functions](https://docs.fuel.network/docs/sway-libs/signed_integers/\#basic-mathematical-functions)

Basic arithmetic operations are working as usual.

```fuel_Box fuel_Box-idXKMmm-css
fn add_signed_int(val1: I8, val2: I8) {
    let result: I8 = val1 + val2;
}

fn subtract_signed_int(val1: I8, val2: I8) {
    let result: I8 = val1 - val2;
}

fn multiply_signed_int(val1: I8, val2: I8) {
    let result: I8 = val1 * val2;
}

fn divide_signed_int(val1: I8, val2: I8) {
    let result: I8 = val1 / val2;
}
```

_Icon ClipboardText_

## _Icon Link_ [Checking if a Signed Integer is Zero](https://docs.fuel.network/docs/sway-libs/signed_integers/\#checking-if-a-signed-integer-is-zero)

The library also provides a helper function to easily check if a `Signed Integer` is zero.

```fuel_Box fuel_Box-idXKMmm-css
fn is_zero() {
    let i8 = I8::zero();
    assert(i8.is_zero());
}
```

_Icon ClipboardText_

## _Icon Link_ [Known Issues](https://docs.fuel.network/docs/sway-libs/signed_integers/\#known-issues)

The current implementation of `U128` will compile large bytecode sizes when performing mathematical computations. As a result, `I128` and `I256` inherit the same issue and could cause high transaction costs. This should be resolved with future optimizations of the Sway compiler.