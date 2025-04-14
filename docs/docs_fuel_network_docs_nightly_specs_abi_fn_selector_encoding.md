[Docs](https://docs.fuel.network/) /

Nightly  /

[Specs](https://docs.fuel.network/docs/nightly/specs/) /

[ABI](https://docs.fuel.network/docs/nightly/specs/abi/) /

Fn Selector Encoding

## _Icon Link_ [Function Selector Encoding](https://docs.fuel.network/docs/nightly/specs/abi/fn-selector-encoding/\#function-selector-encoding)

To select which function you want to call, first, this function must be in an ABI struct of a Sway program. For instance:

```fuel_Box fuel_Box-idXKMmm-css
abi MyContract {
    fn foo(a: u64);
    fn bar(a: InputStruct );
} {
    fn baz(a: ()) { }
}
```

_Icon ClipboardText_

The function selector is the first 4 bytes of the SHA-256 hash function of the signature of the Sway function being called. Then, these 4 bytes are right-aligned to 8 bytes, left-padded with zeroes.

> _Icon InfoCircle_
>
> **Note**: The word size for the FuelVM is 8 bytes.

## _Icon Link_ [Function Signature](https://docs.fuel.network/docs/nightly/specs/abi/fn-selector-encoding/\#function-signature)

The signature is composed of the function name with the parenthesized list of comma-separated parameter types without spaces. All strings encoded with UTF-8. For custom types such as `enum` and `struct`, there is a prefix added to the parenthesized list (see below). Generic `struct` and `enum` types also accept a list of comma-separated type arguments in between angle brackets right after the prefix.

For instance, to compute the selector for the following function:

```fuel_Box fuel_Box-idXKMmm-css
fn entry_one(arg: u64);
```

_Icon ClipboardText_

we should pass `"entry_one(u64)"` to the `sha256()` hashing algorithm. The full digest would be:

```fuel_Box fuel_Box-idXKMmm-css
0x0c36cb9cb766ff60422db243c4fff06d342949da3c64a3c6ac564941f84b6f06
```

_Icon ClipboardText_

Then we would get only the first 4 bytes of this digest and left-pad it to 8 bytes:

```fuel_Box fuel_Box-idXKMmm-css
0x000000000c36cb9c
```

_Icon ClipboardText_

The table below summarizes how each function argument type is encoded

| Type | Encoding |
| --- | --- |
| `bool` | `bool` |
| `u8` | `u8` |
| `u16` | `u16` |
| `u32` | `u32` |
| `u64` | `u64` |
| `b256` | `b256` |
| `struct` | `s<<arg1>,<arg2>,...>(<ty1>,<ty2>,...)` where `<ty1>`, `<ty2>`, ... are the encoded types of the struct fields and `<arg1>`, `<arg2>`, ... are the encoded type arguments |
| `enum` | `e<<arg1>>,<arg_2>,...>(<ty1>,<ty2>,...)` where `<ty1>`, `<ty2>`, ... are the encoded types of the enum variants and `<arg1>`, `<arg2>`, ... are the encoded type arguments |
| `str[<n>]` | `str[<n>]` |
| `array` | `a[<ty>;<n>]` where `<ty>` is the encoded element type of the array and `<n>` is its length |
| `tuple` | `(<ty1>,<ty2>,...)` where `<ty1>`, `<ty2>`, ... are the encoded types of the tuple fields |

> _Icon InfoCircle_
>
> **Note:** Non-generic structs and enums do not require angle brackets.

## _Icon Link_ [A Complex Example](https://docs.fuel.network/docs/nightly/specs/abi/fn-selector-encoding/\#a-complex-example)

```fuel_Box fuel_Box-idXKMmm-css
enum MyEnum<V> {
    Foo: u64,
    Bar: bool,
}
struct MyStruct<T, U> {
    bim: T,
    bam: MyEnum<u64>,
}

struct MyOtherStruct {
    bom: u64,
}

fn complex_function(
    arg1: MyStruct<[b256; 3], u8>,
    arg2: [MyStruct<u64, bool>; 4],
    arg3: (str[5], bool),
    arg4: MyOtherStruct,
);
```

_Icon ClipboardText_

is encoded as:

```fuel_Box fuel_Box-idXKMmm-css
abi MyContract {
    complex_function(s<a[b256;3],u8>(a[b256;3],e<u64>(u64,bool)),a[s<u64,bool>(u64,e<u64>(u64,bool));4],(str[5],bool),s(u64))
}
```

_Icon ClipboardText_

which is then hashed into:

```fuel_Box fuel_Box-idXKMmm-css
51fdfdadc37ff569e281a622281af7ec055f8098c40bc566118cbb48ca5fd28b
```

_Icon ClipboardText_

and then the encoded function selector is:

```fuel_Box fuel_Box-idXKMmm-css
0x0000000051fdfdad
```

_Icon ClipboardText_