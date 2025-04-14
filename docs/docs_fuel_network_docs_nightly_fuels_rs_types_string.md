[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/) /

String

## _Icon Link_ [`String`](https://docs.fuel.network/docs/nightly/fuels-rs/types/string/\#string)

The Rust SDK represents Fuel's `String` s as `SizedAsciiString<LEN>`, where the generic parameter `LEN` is the length of a given string. This abstraction is necessary because all strings in Fuel and Sway are statically-sized, i.e., you must know the size of the string beforehand.

Here's how you can create a simple string using `SizedAsciiString`:

```fuel_Box fuel_Box-idXKMmm-css
let ascii_data = "abc".to_string();

SizedAsciiString::<3>::new(ascii_data)
    .expect("should have succeeded since we gave ascii data of correct length!");
```

_Icon ClipboardText_

To make working with `SizedAsciiString` s easier, you can use `try_into()` to convert from Rust's `String` to `SizedAsciiString`, and you can use `into()` to convert from `SizedAsciiString` to Rust's `String`. Here are a few examples:

```fuel_Box fuel_Box-idXKMmm-css
#[test]
fn can_be_constructed_from_str_ref() {
    let _: SizedAsciiString<3> = "abc".try_into().expect("should have succeeded");
}

#[test]
fn can_be_constructed_from_string() {
    let _: SizedAsciiString<3> = "abc".to_string().try_into().expect("should have succeeded");
}

#[test]
fn can_be_converted_into_string() {
    let sized_str = SizedAsciiString::<3>::new("abc".to_string()).unwrap();

    let str: String = sized_str.into();

    assert_eq!(str, "abc");
}
```

_Icon ClipboardText_

If your contract's method takes and returns, for instance, a Sway's `str[23]`. When using the SDK, this method will take and return a `SizedAsciiString<23>`.