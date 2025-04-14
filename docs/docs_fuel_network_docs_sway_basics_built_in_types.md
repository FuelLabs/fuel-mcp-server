[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Basics](https://docs.fuel.network/docs/sway/basics/) /

Built in Types

## _Icon Link_ [Built-in Types](https://docs.fuel.network/docs/sway/basics/built_in_types/\#built-in-types)

Every value in Sway is of a certain type. Although deep down, all values are just ones and zeroes in the underlying virtual machine, Sway needs to know what those ones and zeroes actually mean. This is accomplished with _types_.

Sway is a statically typed language. At compile time, the types of every value must be known. This does not mean you need to specify every single type: usually, the type can be reasonably inferred by the compiler.

## _Icon Link_ [Primitive Types](https://docs.fuel.network/docs/sway/basics/built_in_types/\#primitive-types)

Sway has the following primitive types:

01. `()` (unit type)
02. `u8` (8-bit unsigned integer)
03. `u16` (16-bit unsigned integer)
04. `u32` (32-bit unsigned integer)
05. `u64` (64-bit unsigned integer)
06. `u256` (256-bit unsigned integer)
07. `str[]` (fixed-length string)
08. `str` (string slices)
09. `bool` (Boolean `true` or `false`)
10. `b256` (256 bits (32 bytes), i.e. a hash)

All other types in Sway are built up of these primitive types, or references to these primitive types. You may notice that there are no signed integers—this is by design. In the blockchain domain that Sway occupies, floating-point values and negative numbers have smaller utility, so their implementation has been left up to libraries for specific use cases.

## _Icon Link_ [Unit Type](https://docs.fuel.network/docs/sway/basics/built_in_types/\#unit-type)

The unit type, `()`, is a type that allows only one value, and thus, represents a value with no information. It is used to indicate the absence of a meaningful value, or the result of a function that performs an action, but does not return any data. The value of the unit type, called simply unit, has the same symbol as the unit type, `()`. Unit type in Sway serves a similar purpose as `void` in imperative languages like C or Java.

For example:

```fuel_Box fuel_Box-idXKMmm-css
fn returns_unit() -> () { // Here, `()` represent the unit type.
    ()                    // Here, `()` represents the single unit value of the unit type.
}
```

_Icon ClipboardText_

In Sway, if the function return type is not specified, it is `()` by default. Thus, the above example is semantically same as the following:

```fuel_Box fuel_Box-idXKMmm-css
fn returns_unit() {
}
```

_Icon ClipboardText_

## _Icon Link_ [Numeric Types](https://docs.fuel.network/docs/sway/basics/built_in_types/\#numeric-types)

All of the unsigned integer types are numeric types.

Numbers can be declared with binary syntax, hexadecimal syntax, base-10 syntax, and underscores for delineation. Let's take a look at the following valid numeric primitives:

```fuel_Box fuel_Box-idXKMmm-css
0xffffff    // hexadecimal
0b10101010  // binary
10          // base-10
100_000     // underscore delineated base-10
0x1111_0000 // underscore delineated binary
0xfff_aaa   // underscore delineated hexadecimal
```

_Icon ClipboardText_

The default numeric type is `u64`. The FuelVM's word size is 64 bits, and the cases where using a smaller numeric type saves space are minimal.

If a 64-bit or 256-bit arithmetic operation produces an overflow or an underflow,
computation gets reverted automatically by FuelVM.

8/16/32-bit arithmetic operations are emulated using their 64-bit analogues with
additional overflow/underflow checks inserted, which generally results in
somewhat higher gas consumption.

The same does not happen with 256-bit operations, including `b256`, which uses specialized operations and are as efficient as possible.

## _Icon Link_ [Boolean Type](https://docs.fuel.network/docs/sway/basics/built_in_types/\#boolean-type)

The boolean type ( `bool`) has two potential values: `true` or `false`. Boolean values are typically used for conditional logic or validation, for example in `if` expressions. Booleans can be negated, or flipped, with the unary negation operator `!`.

For example:

```fuel_Box fuel_Box-idXKMmm-css
fn returns_false() -> bool {
    let boolean_value: bool = true;
    !boolean_value
}
```

_Icon ClipboardText_

## _Icon Link_ [String Slices](https://docs.fuel.network/docs/sway/basics/built_in_types/\#string-slices)

In Sway, string literals are stored as variable length string slices. Which means that they are stored as a pointer to the actual string data and its length.

```fuel_Box fuel_Box-idXKMmm-css
let my_string: str = "fuel";
```

_Icon ClipboardText_

String slices, because they contain pointers have limited usage. They cannot be used as constants, storage fields, or configurable constants, nor as main function arguments or returns.

For these cases one must use string arrays, as described below.

## _Icon Link_ [String Arrays](https://docs.fuel.network/docs/sway/basics/built_in_types/\#string-arrays)

In Sway, static-length strings are a primitive type. This means that when you declare a string array, its size is a part of its type. This is necessary for the compiler to know how much memory to give for the storage of that data. The size of the string is denoted with square brackets.

Let's take a look:

```fuel_Box fuel_Box-idXKMmm-css
let my_string: str[4] = __to_str_array("fuel");
```

_Icon ClipboardText_

Because the string literal `"fuel"` is four letters, the type is `str[4]`, denoting a static length of 4 characters. Strings default to UTF-8 in Sway.

As above, string literals are typed as string slices. So that is why the need for `__to_str_array` that convert them to string arrays at compile time.

Conversion during runtime can be done with `from_str_array` and `try_as_str_array`. The latter can fail, given that the specified string array must be big enough for the string slice content.

```fuel_Box fuel_Box-idXKMmm-css
let a: str = "abcd";
let b: str[4] = a.try_as_str_array().unwrap();
let c: str = from_str_array(b);
```

_Icon ClipboardText_

## _Icon Link_ [Compound Types](https://docs.fuel.network/docs/sway/basics/built_in_types/\#compound-types)

_Compound types_ are types that group multiple values into one type. In Sway, we have arrays and tuples.

## _Icon Link_ [Tuple Types](https://docs.fuel.network/docs/sway/basics/built_in_types/\#tuple-types)

A tuple is a general-purpose static-length aggregation of types. In more plain terms, a tuple is a single type that consists of an aggregate of zero or more types. The internal types that make up a tuple, and the tuple's arity, define the tuple's type.

Let's take a look at some examples.

```fuel_Box fuel_Box-idXKMmm-css
let x: (u64, u64) = (0, 0);
```

_Icon ClipboardText_

This is a tuple, denoted by parenthesized, comma-separated values. Note that the type annotation, `(u64, u64)`, is similar in syntax to the expression which instantiates that type, `(0, 0)`.

```fuel_Box fuel_Box-idXKMmm-css
let x: (u64, bool) = (42, true);
assert(x.1);
```

_Icon ClipboardText_

In this example, we have created a new tuple type, `(u64, bool)`, which is a composite of a `u64` and a `bool`.

To access a value within a tuple, we use _tuple indexing_: `x.1` stands for the first (zero-indexed, so the `bool`) value of the tuple. Likewise, `x.0` would be the zeroth, `u64` value of the tuple. Tuple values can also be accessed via destructuring.

```fuel_Box fuel_Box-idXKMmm-css
struct Foo {}
let x: (u64, Foo, bool) = (42, Foo {}, true);
let (number, foo, boolean) = x;
```

_Icon ClipboardText_

To create one-arity tuples, we will need to add a trailing comma:

```fuel_Box fuel_Box-idXKMmm-css
let x: u64 = (42);     // x is of type u64
let y: (u64) = (42);   // y is of type u64
let z: (u64,) = (42,); // z is of type (u64), i.e. a one-arity tuple
let w: (u64) = (42,);  // type error
```

_Icon ClipboardText_

## _Icon Link_ [Arrays](https://docs.fuel.network/docs/sway/basics/built_in_types/\#arrays)

An array is similar to a tuple, but an array's values must all be of the same type. Arrays can hold arbitrary types including non-primitive types.

An array is written as a comma-separated list inside square brackets:

```fuel_Box fuel_Box-idXKMmm-css
let x = [1, 2, 3, 4, 5];
```

_Icon ClipboardText_

Arrays are allocated on the stack since their size is known. An array's size is _always_ static, i.e. it cannot change. An array of five elements cannot become an array of six elements.

Arrays can be iterated over, unlike tuples. An array's type is written as the type the array contains followed by the number of elements, semicolon-separated and within square brackets, e.g., `[u64; 5]`. To access an element in an array, use the _array indexing syntax_, i.e. square brackets.

Array elements can also be mutated if the underlying array is declared as mutable:

```fuel_Box fuel_Box-idXKMmm-css
let mut x = [1, 2, 3, 4, 5];
x[0] = 0;
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
script;

struct Foo {
    f1: u32,
    f2: b256,
}

fn main() {
    // Array of integers with type ascription
    let array_of_integers: [u8; 5] = [1, 2, 3, 4, 5];

    // Array of strings
    let array_of_strings = ["Bob", "Jan", "Ron"];

    // Array of structs
    let array_of_structs: [Foo; 2] = [\
        Foo {\
            f1: 11,\
            f2: 0x1111111111111111111111111111111111111111111111111111111111111111,\
        },\
        Foo {\
            f1: 22,\
            f2: 0x2222222222222222222222222222222222222222222222222222222222222222,\
        },\
    ];

    // Accessing an element of an array
    let mut array_of_bools: [bool; 2] = [true, false];
    assert(array_of_bools[0]);

    // Mutating the element of an array
    array_of_bools[1] = true;
    assert(array_of_bools[1]);
}

```

Collapse_Icon ClipboardText_