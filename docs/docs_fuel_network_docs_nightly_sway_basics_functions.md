[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Basics](https://docs.fuel.network/docs/nightly/sway/basics/) /

Functions

## _Icon Link_ [Functions](https://docs.fuel.network/docs/nightly/sway/basics/functions/\#functions)

Functions in Sway are declared with the `fn` keyword. Let's take a look:

```fuel_Box fuel_Box-idXKMmm-css
fn equals(first_param: u64, second_param: u64) -> bool {
    first_param == second_param
}
```

_Icon ClipboardText_

We have just declared a function named `equals` which takes two parameters: `first_param` and `second_param`. The parameters must both be 64-bit unsigned integers.

This function also returns a `bool` value, i.e. either `true` or `false`. This function returns `true` if the two given parameters are equal, and `false` if they are not. If we want to use this function, we can do so like this:

```fuel_Box fuel_Box-idXKMmm-css
fn main() {
    equals(5, 5); // evaluates to `true`
    equals(5, 6); // evaluates to `false`
}
```

_Icon ClipboardText_

## _Icon Link_ [Mutable Parameters](https://docs.fuel.network/docs/nightly/sway/basics/functions/\#mutable-parameters)

We can make a function parameter mutable by adding `ref mut` before the parameter name. This allows mutating the argument passed into the function when the function is called.

For example:

```fuel_Box fuel_Box-idXKMmm-css
fn increment(ref mut num: u32) {
    let prev = num;
    num = prev + 1u32;
}
```

_Icon ClipboardText_

This function is allowed to mutate its parameter `num` because of the `mut` keyword. In addition, the `ref` keyword instructs the function to modify the argument passed to it when the function is called, instead of modifying a local copy of it.

```fuel_Box fuel_Box-idXKMmm-css
let mut num: u32 = 0;
increment(num);
assert(num == 1u32); // The function `increment()` modifies `num`
```

_Icon ClipboardText_

Note that the variable `num` itself has to be declared as mutable for the above to compile.

> _Icon InfoCircle_
>
> **Note**
> It is not currently allowed to use `mut` without `ref` or vice versa for a function parameter.

Similarly, `ref mut` can be used with more complex data types such as:

```fuel_Box fuel_Box-idXKMmm-css
fn swap_tuple(ref mut pair: (u64, u64)) {
    let temp = pair.0;
    pair.0 = pair.1;
    pair.1 = temp;
}

fn update_color(ref mut color: Color, new_color: Color) {
    color = new_color;
}
```

_Icon ClipboardText_

We can then call these functions as shown below:

```fuel_Box fuel_Box-idXKMmm-css
let mut tuple = (42, 24);
swap_tuple(tuple);
assert(tuple.0 == 24); // The function `swap_tuple()` modifies `tuple.0`
assert(tuple.1 == 42); // The function `swap_tuple()` modifies `tuple.1`
let mut color = Color::Red;
update_color(color, Color::Blue);
assert(match color {
    Color::Blue => true,
    _ => false,
}); // The function `update_color()` modifies the color to Blue
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note**
> The only place, in a Sway program, where the `ref` keyword is valid is before a mutable function parameter.