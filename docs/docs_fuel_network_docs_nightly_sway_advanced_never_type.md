[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Advanced](https://docs.fuel.network/docs/nightly/sway/advanced/) /

Never Type

## _Icon Link_ [Never Type](https://docs.fuel.network/docs/nightly/sway/advanced/never_type/\#never-type)

The Never type `!` represents the type of computations which never resolve to any value at all.

## _Icon Link_ [Additional Information](https://docs.fuel.network/docs/nightly/sway/advanced/never_type/\#additional-information)

`break`, `continue` and `return` expressions also have type `!`. For example we are allowed to
write:

```fuel_Box fuel_Box-idXKMmm-css
let x: ! = {
    return 123
};
```

_Icon ClipboardText_

Although the `let` is pointless here, it illustrates the meaning of `!`. Since `x` is never
assigned a value (because `return` returns from the entire function), `x` can be given type
`Never`. We could also replace `return 123` with a `revert()` or a never-ending `loop` and this code
would still be valid.

A more realistic usage of `Never` is in this code:

```fuel_Box fuel_Box-idXKMmm-css
let num: u32 = match get_a_number() {
    Some(num) => num,
    None => break,
};
```

_Icon ClipboardText_

Both match arms must produce values of type \[ `u32`\], but since `break` never produces a value
at all we know it can never produce a value which isn't a \[ `u32`\]. This illustrates another
behaviour of the `!` type - expressions with type `!` will coerce into any other type.

Note that `!` type coerces into any other type, another example of this would be:

```fuel_Box fuel_Box-idXKMmm-css
let x: u32 = {
    return 123
};
```

_Icon ClipboardText_

Regardless of the type of `x`, the return block of type `Never` will always coerce into `x` type.

## _Icon Link_ [Examples](https://docs.fuel.network/docs/nightly/sway/advanced/never_type/\#examples)

```fuel_Box fuel_Box-idXKMmm-css
fn foo() {
    let num: u64 = match Option::None::<u64> {
        Some(num) => num,
        None => return,
    };
}
```

_Icon ClipboardText_