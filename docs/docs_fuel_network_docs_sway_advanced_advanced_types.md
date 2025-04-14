[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Advanced](https://docs.fuel.network/docs/sway/advanced/) /

Advanced Types

## _Icon Link_ [Advanced Types](https://docs.fuel.network/docs/sway/advanced/advanced_types/\#advanced-types)

## _Icon Link_ [Creating Type Synonyms with Type Aliases](https://docs.fuel.network/docs/sway/advanced/advanced_types/\#creating-type-synonyms-with-type-aliases)

Sway provides the ability to declare a type alias to give an existing type another name. For this we use the `type` keyword. For example, we can create the alias `Kilometers` to `u64` like so:

```fuel_Box fuel_Box-idXKMmm-css
type Kilometers = u64;
```

_Icon ClipboardText_

Now, the alias `Kilometers` is a _synonym_ for `u64`. Note that `Kilometers` is **not** a separate new type. Values that have the type `Kilometers` will be treated the same as values of type `u64`:

```fuel_Box fuel_Box-idXKMmm-css
let x: u64 = 5;
let y: Kilometers = 5;
assert(x + y == 10);
```

_Icon ClipboardText_

Because `Kilometers` and `u64` are the same type, we can add values of both types and we can pass `Kilometers` values to functions that take `u64` parameters. However, using this method, we don’t get the type checking benefits that we get from introducing a _separate_ new type called `Kilometers`. In other words, if we mix up `Kilometers` and `i32` values somewhere, the compiler will not give us an error.

The main use case for type synonyms is to reduce repetition. For example, we might have a lengthy array type like this:

```fuel_Box fuel_Box-idXKMmm-css
[MyStruct<u64, b256>; 5]
```

_Icon ClipboardText_

Writing this lengthy type in function signatures and as type annotations all over the code can be tiresome and error prone. Imagine having a project full of code like this:

```fuel_Box fuel_Box-idXKMmm-css
fn foo_long(array: [MyStruct<u64, b256>; 5]) -> [MyStruct<u64, b256>; 5] {
    array
}
```

_Icon ClipboardText_

A type alias makes this code more manageable by reducing the repetition. Below, we’ve introduced an alias named `MyArray` for the verbose type and can replace all uses of the type with the shorter alias `MyArray`:

```fuel_Box fuel_Box-idXKMmm-css
type MyArray = [MyStruct<u64, b256>; 5];

fn foo_shorter(array: MyArray) -> MyArray {
    array
}
```

_Icon ClipboardText_

This code is much easier to read and write! Choosing a meaningful name for a type alias can help communicate your intent as well.