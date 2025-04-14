[Docs](https://docs.fuel.network/) /

Nightly  /

[Specs](https://docs.fuel.network/docs/nightly/specs/) /

[ABI](https://docs.fuel.network/docs/nightly/specs/abi/) /

Argument Encoding

## _Icon Link_ [Argument Encoding](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#argument-encoding)

## _Icon Link_ [Version 0](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#version-0)

> _Icon InfoCircle_
>
> :warning: This version is being deprecated for Version 1 (see below).

When crafting transaction script data, you must encode the arguments you wish to pass to the script.

## _Icon Link_ [Types](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#types)

These are the available types that can be encoded in the ABI:

- Unsigned integers:
  - `u8`, 8 bits.
  - `u16`, 16 bits.
  - `u32`, 32 bits.
  - `u64`, 64 bits.
  - `u128`, 128 bits.
  - `u256`, 256 bits.
- Boolean: `bool`, either `0` or `1` encoded identically to `u8`.
- B256: `b256`, arbitrary 256-bits value.
- Address : `address`, a 256-bit (32-byte) address.
- Fixed size string
- Array
- Enums (sum types)
- Structs
- Vectors
- Tuples

These types are encoded in-place. Here's how to encode them. We define `enc(X)` the encoding of the type `X`.

## _Icon Link_ [Unsigned Integers](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#unsigned-integers)

`u<M>` where `M` is either 8, 16, 32, 64, 128 or 256 bits.

`enc(X)` is the big-endian (i.e. right-aligned) representation of `X` left-padded with zero-bytes.

- In the case of `M` being 8, 16, 32 or 64, total length must be 8 bytes.
- If `M` is 128, total length must be 16 bytes.
- If `M` is 256, total length must be 32 bytes.

> _Icon InfoCircle_
>
> **Note:** since all integer values are unsigned, there is no need to preserve the sign when extending/padding; padding with only zeroes is sufficient.\_

**Example:**

Encoding `42` yields: `0x000000000000002a`, which is the hexadecimal representation of the decimal number `42`, right-aligned to 8 bytes.
Encoding `u128::MAX - 1` yields: `0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE`, it's right-aligned to 16 bytes

## _Icon Link_ [`Boolean`](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#boolean)

`enc(X)` is `0` if `X` is false or `1` if `X` is true, left-padded with zero-bytes. Total length must be 8 bytes. Similar to the `u8` encoding.

**Example:**

Encoding `true` yields:

```fuel_Box fuel_Box-idXKMmm-css
0x0000000000000001
```

_Icon ClipboardText_

## _Icon Link_ [`B256`](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#b256)

`b256` is a fixed size bit array of length 256. Used for 256-bit hash digests and other 256-bit types. It is encoded as-is.

**Example:**

Encoding `0xc7fd1d987ada439fc085cfa3c49416cf2b504ac50151e3c2335d60595cb90745` yields:

```fuel_Box fuel_Box-idXKMmm-css
0xc7fd1d987ada439fc085cfa3c49416cf2b504ac50151e3c2335d60595cb90745
```

_Icon ClipboardText_

## _Icon Link_ [`Address`](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#address)

A 256-bit (32-byte) address, encoded in the same way as a `b256` argument: encoded as-is.

**Example:**

Encoding `0xc7fd1d987ada439fc085cfa3c49416cf2b504ac50151e3c2335d60595cb90745` yields:

```fuel_Box fuel_Box-idXKMmm-css
0xc7fd1d987ada439fc085cfa3c49416cf2b504ac50151e3c2335d60595cb90745
```

_Icon ClipboardText_

## _Icon Link_ [Array](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#array)

An array of a certain type `T`, `[T; n]`, where `n` is the length of the array.

Arrays in Sway have a fixed-length which is known at compile time. This means the ABI encoding for arrays also happens in-place, with no need to account for dynamic sizing.

The encoding for the array contains, in order, the encoding of each element in `[T; n]`, recursively following the encoding for the type `T`.

For instance, consider the function signature `my_func(bool, [u64; 2])` with the values `(true, [1, 2])`.

The encoding will be:

1. `0x0000000000000001`, the `true` bool encoded in-place.
2. `0x0000000000000001`, First element of the parameter `[u64; 2]`, `1`, encoded as a `u64`.
3. `0x0000000000000002`, Second element of the parameter `[u64; 2]`, `2`, encoded as a `u64`.

The resulting encoded ABI will be:

```fuel_Box fuel_Box-idXKMmm-css
0x000000000000000100000000000000010000000000000002
```

_Icon ClipboardText_

## _Icon Link_ [Fixed-length Strings](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#fixed-length-strings)

Strings have fixed length and are encoded in-place. `str[n]`, where `n` is the fixed-size of the string. Rather than padding the string, the encoding of the elements of the string is tightly packed. And unlike the other type encodings, the string encoding is left-aligned.

Note that all strings are encoded in UTF-8.

**Example:**

Encoding `"Hello, World"` as a `str[12]` **yields**:

```fuel_Box fuel_Box-idXKMmm-css
0x48656c6c6f2c20576f726c6400000000
```

_Icon ClipboardText_

Note that we're padding with zeroes in order to keep it right-aligned to 8 bytes (FuelVM's word size).

## _Icon Link_ [Structs](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#structs)

Encoding ABIs that contain custom types, such as structs, is similar to encoding a set of primitive types. The encoding will proceed in the order that the inner types of a custom type are declared and _recursively_ just like encoding any other type. This way you can encode structs with primitive types or structs with more complex types in them such as other structs, arrays, strings, and enums.

Here's an example:

```fuel_Box fuel_Box-idXKMmm-css
struct InputStruct {
    field_1: bool,
    field_2: u8,
}


abi MyContract {
    fn foo(a: u64);
    fn bar(a: InputStruct);
} {
    fn baz(a: ()) { }
}
```

_Icon ClipboardText_

Calling `bar` with `InputStruct { field_1: true, field_2: 5 }` yields:

```fuel_Box fuel_Box-idXKMmm-css
0x
0000000000000001 // `true` encoded as a bool
0000000000000005 // `5` encoded as u8
```

_Icon ClipboardText_

A more complex scenario:

```fuel_Box fuel_Box-idXKMmm-css
struct InputStruct {
    field_1: bool,
    field_2: [u8; 2], // An array of u8, with length 2.
}


abi MyContract {
    fn foo(a: u64);
    fn bar(a: InputStruct);
} {
    fn baz(a: ()) { }
}
```

_Icon ClipboardText_

Calling `bar` with `InputStruct { field_1: true, field_2: [1, 2] }` yields:

```fuel_Box fuel_Box-idXKMmm-css
0x
0000000000000001 // `true` encoded as a bool
0000000000000001 // `1` encoded as u8
0000000000000002 // `2` encoded as u8
```

_Icon ClipboardText_

## _Icon Link_ [Enums (sum types)](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#enums-sum-types)

ABI calls containing enums (sum types) are encoded similarly to structs: encode the discriminant first, then recursively encode the type of the enum variant being passed to the function being called.

```fuel_Box fuel_Box-idXKMmm-css
enum MySumType
{
    X: u32,
    Y: bool,
}

abi MyContract {
    fn foo(a: u64);
    fn bar(a: MySumType);
} {
    fn baz(a: ()) { }
}
```

_Icon ClipboardText_

Calling `bar` with `MySumType::X(42)` yields:

```fuel_Box fuel_Box-idXKMmm-css
0x
0000000000000000 // The discriminant of the chosen enum, in this case `0`.
000000000000002a // `42` encoded as u64
```

_Icon ClipboardText_

If the sum type has variants of different sizes, then left padding is required.

```fuel_Box fuel_Box-idXKMmm-css
enum MySumType
{
    X: b256,
    Y: u32,
}

abi MyContract {
    fn foo(a: u64);
    fn bar(a: MySumType);
} {
    fn baz(a: ()) { }
}
```

_Icon ClipboardText_

Calling `bar` with `MySumType::Y(42)` yields:

```fuel_Box fuel_Box-idXKMmm-css
0x
0000000000000001 // The discriminant of the chosen enum, in this case `1`.
0000000000000000 // Left padding
0000000000000000 // Left padding
0000000000000000 // Left padding
000000000000002a // `42` encoded as u64
```

_Icon ClipboardText_

Note that three words of padding are required because the largest variant of `MySumType` is 4 words wide.

If all the variants of a sum type are of type `()`, or unit, then only the discriminant needs to be encoded.

```fuel_Box fuel_Box-idXKMmm-css
enum MySumType
{
    X: (),
    Y: (),
    Z: (),
}

abi MyContract {
    fn foo(a: u64);
    fn bar(a: MySumType);
} {
    fn baz(a: ()) { }
}
```

_Icon ClipboardText_

Calling `bar` with `MySumType::Z` yields:

```fuel_Box fuel_Box-idXKMmm-css
0x
0000000000000002 // The discriminant of the chosen enum, in this case `2`.
```

_Icon ClipboardText_

## _Icon Link_ [Vectors](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#vectors)

ABI calls containing vectors are encoded in the following way:

- First, figure out the the length `l` of the vector. Its length will also be its capacity.
- Encode the content of the vector according to the spec of its type, e.g. for a `Vec<bool>`,
encode each `bool` element according to the `bool` specs. This gives out data that is stored
on the heap, and we encode only the pointer to this data

```fuel_Box fuel_Box-idXKMmm-css
abi MyContract {
  fn foo(a: Vec<u32>);
} {
  fn foo(a: Vec<u32>) {};
}
```

_Icon ClipboardText_

Calling `foo` with `vec![1u32, 2u32, 3u32, 4u32]`:

- `length` is 4, `capacity` is 4
- `data`: \[0x0000000000000001, 0x0000000000000002, 0x0000000000000003, 0x0000000000000004\], stored at pointer address `0x000000000000beef`

> _Icon InfoCircle_
>
> Note: to understand how the `u32` are encoded, see the section about encoding integers.

```fuel_Box fuel_Box-idXKMmm-css
0x
000000000000beef // pointer address
0000000000000004 // length = 4
0000000000000004 // capacity = 4
```

_Icon ClipboardText_

At the pointer address, then the vector's content are encoded as such:

```fuel_Box fuel_Box-idXKMmm-css
0x
0000000000000001 // 1u32
0000000000000002 // 2u32
0000000000000003 // 3u32
0000000000000004 // 4u32
```

_Icon ClipboardText_

## _Icon Link_ [Tuples](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#tuples)

ABI calls containing tuples are encoded as such:
If `X` is a tuple with the type signature `(T_1, T_2, ..., T_n)`, with `T_1,...,T_n` being any type except for vector, then `enc(X)` is encoded as the concatenation of `enc(T_1)`, `enc(T_2)`, `enc (T_3)`, ..., `enc(T_n)`.

```fuel_Box fuel_Box-idXKMmm-css
abi MyContract {
  fn foo(a: (u64, str[3], bool));
} {
  fn foo(a: (u64, str[4], bool)) {};
}
```

_Icon ClipboardText_

Calling `foo` with `(1u64, "fuel", true)` :

```fuel_Box fuel_Box-idXKMmm-css
0x
0000000000000001 // 1u64
6675656c00000000 // "fuel" encoded as per the specs
0000000000000001 // true
```

_Icon ClipboardText_

## _Icon Link_ [Version 1](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#version-1)

This version was created to replace the older version 0 described above, and follows three philosophical tenets:

- being self-sufficient: it must be possible to completely decode the original data only using the encoded bytes and the original type (there are no references to data outside the encoded bytes);
- no overhead: only the bare minimum bytes are necessary to do the encoding. No metadata, headers, etc...;
- no relation with runtime memory layout: no padding, no alignment, etc...

## _Icon Link_ [Primitive Types](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#primitive-types)

Primitive types will be encoded using the exact number of bits they need:

- `u8`: 1 byte;
- `u16`: 2 bytes;
- `u32`: 4 bytes;
- `u64`: 8 bytes;
- `u256`: 32 bytes;
- `b256`: 32 bytes;

## _Icon Link_ [Arrays](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#arrays)

Arrays are encoded without any padding or alignment, with one item after the other.

- \[T; 1\] is encoded \[encode(T)\];
- \[T; 2\] is encoded \[encode(T), encode(T)\]

## _Icon Link_ [Strings](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#strings)

String arrays are encoded just like arrays, without any overhead.

- `str[1]` = 1 byte
- `str[2]` = 2 bytes
- `str[n]` = `n` bytes

String slices do contain their length as u64, and the string itself is encoded packed without alignment or padding.

- `"abc"` = `[0, 0, 0, 0, 0, 0, 0, 3, "a", "b", "c"]`

## _Icon Link_ [Slices](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#slices)

`raw_slice`, also being dynamic, contains their length as u64 and is treated as a "slice of bytes". Each byte is encoded as `u8` (1 byte) and is packed without alignment and padding.

For example, a slice of three bytes like `[0u8, 1u8, 2u8]` will be encoded as bytes `[0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 2]`

## _Icon Link_ [Tuple](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#tuple)

Tuples are encoded just like arrays, without any overhead like padding and alignment:

- `(A, B, C)` = `[encode(A), encode(B), encode(C)]`

## _Icon Link_ [Structs (v1)](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#structs-v1)

Structs can be encoded in two ways:

- first, with the automatic implementation;
- second, with the custom implementation.

Auto implementation follows the same rules as tuples. So we can imagine that

```fuel_Box fuel_Box-idXKMmm-css
struct S {
    a: A,
    b: B,
    c: C
}
```

_Icon ClipboardText_

is encoded the same way as the tuple `(A, B, C)`.

Custom implementation allows the developer to choose how a struct is encoded.

A struct has auto-implemented encoding if no custom was found.

## _Icon Link_ [Enums](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#enums)

`Enums` can also be encoded with the automatic or the custom implementation.

The auto implementation first encoded the variant with a `u64` number starting from zero as the first variant and increments this value for each variant, following declaration order.

```fuel_Box fuel_Box-idXKMmm-css
enum E {
    VARIANT_A: A, // <- variant 0
    VARIANT_B: B, // <- variant 1
    VARIANT_C: C  // <- variant 2
}
```

_Icon ClipboardText_

will be encoded as `[encode(variant), encode(value)]`.

The variant data will be encoded right after the variant tag, without any alignment or padding.

An enum has auto-implemented encoding if no custom was found.

## _Icon Link_ [Data Structures](https://docs.fuel.network/docs/nightly/specs/abi/argument-encoding/\#data-structures)

Some common data structures also have well-defined encoding:

- `Vec` will be encoded as `[encode(length), <encode each item>]`
- `Bytes` will be encoded as `[encode(length), <bytes>]`
- `String` will be encoded as `[encode (length), <data>]`

All of them first contain the length and then their data right after, without any padding or alignment.