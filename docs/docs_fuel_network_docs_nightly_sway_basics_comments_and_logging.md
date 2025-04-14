[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Basics](https://docs.fuel.network/docs/nightly/sway/basics/) /

Comments and Logging

## _Icon Link_ [Comments and Logging](https://docs.fuel.network/docs/nightly/sway/basics/comments_and_logging/\#comments-and-logging)

## _Icon Link_ [Comments](https://docs.fuel.network/docs/nightly/sway/basics/comments_and_logging/\#comments)

Comments in Sway start with two slashes and continue until the end of the line. For comments that extend beyond a single line, you'll need to include `//` on each line.

```fuel_Box fuel_Box-idXKMmm-css
// hello world
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// let's make a couple of lines
// commented.
```

_Icon ClipboardText_

You can also place comments at the ends of lines containing code.

```fuel_Box fuel_Box-idXKMmm-css
fn main() {
    let baz = 8; // Eight is a lucky number
}
```

_Icon ClipboardText_

You can also do block comments

```fuel_Box fuel_Box-idXKMmm-css
fn main() {
    /*
    You can write on multiple lines
    like this if you want
    */
    let baz = 8;
}
```

_Icon ClipboardText_

## _Icon Link_ [Logging](https://docs.fuel.network/docs/nightly/sway/basics/comments_and_logging/\#logging)

The `logging` library provides a generic `log` function that can be imported using `use std::logging::log` and used to log variables of any type. Each call to `log` appends a `receipt` to the list of receipts. There are two types of receipts that a `log` can generate: `Log` and `LogData`.

```fuel_Box fuel_Box-idXKMmm-css
fn log_values(){
  // Generates a Log receipt
  log(42);

  // Generates a LogData receipt
  let string = "sway";
  log(string);
}
```

_Icon ClipboardText_

## _Icon Link_ [`Log` Receipt](https://docs.fuel.network/docs/nightly/sway/basics/comments_and_logging/\#log-receipt)

The `Log` receipt is generated for _non-reference_ types, namely `bool`, `u8`, `u16`, `u32`, and `u64`.

For example, logging an integer variable `x` that holds the value `42` using `log(x)` may generate the following receipt:

```fuel_Box fuel_Box-idXKMmm-css
"Log": {
  "id": "0000000000000000000000000000000000000000000000000000000000000000",
  "is": 10352,
  "pc": 10404,
  "ra": 42,
  "rb": 1018205,
  "rc": 0,
  "rd": 0
}
```

_Icon ClipboardText_

Note that `ra` will include the value being logged. The additional registers `rc` and `rd` will be zero when using `log` while `rb` may include a non-zero value representing a unique ID for the `log` instance. The unique ID is not meaningful on its own but allows the Rust and the TS SDKs to know the type of the data being logged, by looking up the log ID in the JSON ABI file.

## _Icon Link_ [`LogData` Receipt](https://docs.fuel.network/docs/nightly/sway/basics/comments_and_logging/\#logdata-receipt)

`LogData` is generated for _reference_ types which include all types except for _non\_reference_ types; and for _non-reference_ types bigger than 64-bit integers, for example, `u256`;

For example, logging a `b256` variable `b` that holds the value `0x1111111111111111111111111111111111111111111111111111111111111111` using `log(b)` may generate the following receipt:

```fuel_Box fuel_Box-idXKMmm-css
"LogData": {
  "data": "1111111111111111111111111111111111111111111111111111111111111111",
  "digest": "02d449a31fbb267c8f352e9968a79e3e5fc95c1bbeaa502fd6454ebde5a4bedc",
  "id": "0000000000000000000000000000000000000000000000000000000000000000",
  "is": 10352,
  "len": 32,
  "pc": 10444,
  "ptr": 10468,
  "ra": 0,
  "rb": 1018194
}
```

_Icon ClipboardText_

Note that `data` in the receipt above will include the value being logged as a hexadecimal. Similarly to the `Log` receipt, additional registers are written: `ra` will always be zero when using `log`, while `rb` will contain a unique ID for the `log` instance.

> _Icon InfoCircle_
>
> **Note**
> The Rust SDK exposes [APIs](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/logs/#logs) that allow you to retrieve the logged values and display them nicely based on their types as indicated in the JSON ABI file.