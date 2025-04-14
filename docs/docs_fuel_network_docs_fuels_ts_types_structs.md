[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Types](https://docs.fuel.network/docs/fuels-ts/types/) /

Structs

## _Icon Link_ [Structs](https://docs.fuel.network/docs/fuels-ts/types/structs/\#structs)

In Sway, a `struct` serves a similar purpose as an `Object` in TypeScript. It defines a custom data structure with specified property names and types. The property names and types in the Sway struct must match the corresponding TypeScript definition.

## _Icon Link_ [Example](https://docs.fuel.network/docs/fuels-ts/types/structs/\#example)

Here is an example of a `struct` in Sway:

```fuel_Box fuel_Box-idXKMmm-css
pub struct EmployeeData {
    name: str[8],
    age: u8,
    salary: u64,
    idHash: b256,
    ratings: [u8; 3],
    isActive: bool,
}
```

_Icon ClipboardText_

And here is the equivalent structure represented in TypeScript:

```fuel_Box fuel_Box-idXKMmm-css
type EmployeeDataStruct = {
  name: string;
  age: number;
  salary: number;
  idHash: string;
  ratings: number[];
  isActive: boolean;
};

const data: EmployeeDataStruct = {
  name: 'John Doe',
  age: 30,
  salary: 100_000,
  idHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  ratings: [4, 5, 5],
  isActive: true,
};
```

_Icon ClipboardText_

## _Icon Link_ [Handling Different Data Types](https://docs.fuel.network/docs/fuels-ts/types/structs/\#handling-different-data-types)

Please note that TypeScript does not have native support for `u8` and `u64` types. Instead, use the `number` type to represent them.

Additionally, TypeScript does not support specifying string length, so just use `string` for the `name`.

In a similar way, since the type `B256` on the SDK is just an hexlified string, we use `string` as well.