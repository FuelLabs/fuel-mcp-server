[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Testing](https://docs.fuel.network/docs/fuels-rs/testing/) /

Basics

## _Icon Link_ [Testing Basics](https://docs.fuel.network/docs/fuels-rs/testing/basics/\#testing-basics)

If you're new to Rust, you'll want to review these important tools to help you build tests.

## _Icon Link_ [The `assert!` macro](https://docs.fuel.network/docs/fuels-rs/testing/basics/\#the-assert-macro)

You can use the `assert!` macro to assert certain conditions in your test. This macro invokes `panic!()` and fails the test if the expression inside evaluates to `false`.

```fuel_Box fuel_Box-idXKMmm-css
assert!(value == 5);
```

_Icon ClipboardText_

## _Icon Link_ [The `assert_eq!` macro](https://docs.fuel.network/docs/fuels-rs/testing/basics/\#the-assert_eq-macro)

The `assert_eq!` macro works a lot like the `assert` macro, however instead it accepts two values, and panics if those values are not equal.

```fuel_Box fuel_Box-idXKMmm-css
assert_eq!(balance, 100);
```

_Icon ClipboardText_

## _Icon Link_ [The `assert_ne!` macro](https://docs.fuel.network/docs/fuels-rs/testing/basics/\#the-assert_ne-macro)

The `assert_ne!` macro works just like the `assert_eq!` macro, but it will panic if the two values are equal.

```fuel_Box fuel_Box-idXKMmm-css
assert_ne!(address, 0);
```

_Icon ClipboardText_

## _Icon Link_ [The `println!` macro](https://docs.fuel.network/docs/fuels-rs/testing/basics/\#the-println-macro)

You can use the `println!` macro to print values to the console.

```fuel_Box fuel_Box-idXKMmm-css
println!("WALLET 1 ADDRESS {}", wallet_1.address());
println!("WALLET 1 ADDRESS {:?}", wallet_1.address());
```

_Icon ClipboardText_

Using `{}` will print the value, and using `{:?}` will print the value plus its type.

Using `{:?}` will also allow you to print values that do not have the `Display` trait implemented but do have the `Debug` trait. Alternatively you can use the `dbg!` macro to print these types of variables.

```fuel_Box fuel_Box-idXKMmm-css
println!("WALLET 1 PROVIDER {:?}", wallet_1.provider().unwrap());
dbg!("WALLET 1 PROVIDER {}", wallet_1.provider().unwrap());
```

_Icon ClipboardText_

To print more complex types that don't have it already, you can implement your own formatted display method with the `fmt` module from the Rust standard library.

```fuel_Box fuel_Box-idXKMmm-css
use std::fmt;

struct Point {
    x: u64,
    y: u64,
}

// add print functionality with the fmt module
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "value of x: {}, value of y: {}", self.x, self.y)
    }
}

let p = Point {x: 1, y: 2};
println!("POINT: {}", p);
```

_Icon ClipboardText_

## _Icon Link_ [Run Commands](https://docs.fuel.network/docs/fuels-rs/testing/basics/\#run-commands)

You can run your tests to see if they pass or fail with

```fuel_Box fuel_Box-idXKMmm-css
cargo test
```

_Icon ClipboardText_

Outputs will be hidden if the test passes. If you want to see outputs printed from your tests regardless of whether they pass or fail, use the `nocapture` flag.

```fuel_Box fuel_Box-idXKMmm-css
cargo test -- --nocapture
```

_Icon ClipboardText_