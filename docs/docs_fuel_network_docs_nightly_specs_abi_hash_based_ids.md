[Docs](https://docs.fuel.network/) /

Nightly  /

[Specs](https://docs.fuel.network/docs/nightly/specs/) /

[ABI](https://docs.fuel.network/docs/nightly/specs/abi/) /

Hash Based Ids

## _Icon Link_ [Hash based IDs](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#hash-based-ids)

Hash based ids are deterministically generated from associated types and are used in the JSON ABI for `type` IDs and for `logId`.
This document specifies how the hash based IDS are generated for `type` IDs and for `logId`.

## _Icon Link_ [Generation](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#generation)

Hash based ids for `type` IDs are generated from the `sha256` of a string that represents the type.

For `logIds` we use the first 8 bytes of the `sha256` of a string that represents the type, this is because the `LOG` and `LOGD` opcodes use a 64bit value as log id.

## _Icon Link_ [String representation of types](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#string-representation-of-types)

For describing the string representation of type we will use the notation `{abi_str(T)}` that should be replaced by the respective ABI string representation of the respective type `T`.

## _Icon Link_ [Intrinsics](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#intrinsics)

`u8` =\> `"u8"` `u16` =\> `"u16"` `u32` =\> `"u32"` `u64` =\> `"u64"` `u256` =\> `"u256"` `b256` =\> `"b256"` `bool` =\> `"bool"`

## _Icon Link_ [String arrays](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#string-arrays)

String array of size `1` =\> `"str[1]"`
String array of size `2` =\> `"str[2]"`
etc.

## _Icon Link_ [String slices](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#string-slices)

String slice => `"str"`

## _Icon Link_ [Arrays](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#arrays)

`[T; 1]` =\> `"[{abi_str(T)}; 1]"` `[T; 2]` =\> `"[{abi_str(T)}; 2]"`
etc.

## _Icon Link_ [Tuples](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#tuples)

`()` =\> `"()"` `(T1)` =\> `"({abi_str(T1)})"` `(T1,T2)` =\> `"({abi_str(T1)}, {abi_str(T2)})"`
etc.

## _Icon Link_ [Enums](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#enums)

`Option` enum with type parameter `T` =\> `"enum std::option::Option<{abi_str(T)}>"`
Enum without type parameters named `MyEnum` =\> `"enum MyEnum"`
Enum with type parameter `T1` named `MyEnum` =\> `"enum MyEnum<{abi_str(T1)}>"`
Enum with type parameters `T1`, `T2` named `MyEnum` in `my_module` =\> `"enum my_module::MyEnum<{abi_str(T1)},{abi_str(T2)}>"`

## _Icon Link_ [Structs](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#structs)

`Vec` struct with type parameter `T` =\> `"struct std::vec::Vec<{abi_str(T)}>"`
Struct without type parameters named `MyStruct` =\> `"struct MyStruct"`
Struct with type parameter `T1` named `MyStruct` =\> `"struct MyStruct<{abi_str(T1)}>"`
Struct with type parameters `T1`, `T2` named `MyStruct` in `my_module` =\> `"struct my_module::MyStruct<{abi_str(T1)},{abi_str(T2)}>"`

## _Icon Link_ [Generic Type Parameter](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#generic-type-parameter)

Generic type parameter `T` if root type => `"generic T"`
Generic type parameter `T` if not root type => `"T"` as in `"struct MyStruct<T>"`

## _Icon Link_ [Complex examples composition](https://docs.fuel.network/docs/nightly/specs/abi/hash-based-ids/\#complex-examples-composition)

Tuple of array and `u64` =\> `"([u64,1]; u64)"`
Array of `Option<u64>` =\> `"[enum std::option::Option<u64>; 3]"`
Struct with tuple type parameter => `"struct my_module::MyStruct<(u64, u64)>"`