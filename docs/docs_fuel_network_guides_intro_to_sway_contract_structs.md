[Guides](https://docs.fuel.network/guides/) /

[Intro to Sway](https://docs.fuel.network/guides/intro-to-sway/) /

Structs

## _Icon Link_ [Defining an Item Struct](https://docs.fuel.network/guides/intro-to-sway/contract-structs/\#defining-an-item-struct)

Struct is short for structure, which is a data structure similar to an object in JavaScript. You define a struct with the `struct` keyword in Sway and define the fields of a struct inside curly brackets.

The core of our program is the ability to list, sell, and get `items`.

Let's define the Item type as shown below to write into your `main.sw` file:

```fuel_Box fuel_Box-idXKMmm-css
struct Item {
    id: u64,
    price: u64,
    owner: Identity,
    metadata: str[20],
    total_bought: u64,
}
```

_Icon ClipboardText_

The item struct will contain an ID, price, the owner's identity, a string representing a URL or identifier for off-chain data about the item (such as its description and photos), and a "total bought" counter to track the overall number of purchases.

## _Icon Link_ [Types](https://docs.fuel.network/guides/intro-to-sway/contract-structs/\#types)

The `Item` struct uses three types: `u64`, `str`, and `Identity`.

`u64`: a 64-bit unsigned integer.

In Sway, there are four native types of numbers:

- `u8`: an 8-bit unsigned integer.
- `u16`: a 16-bit unsigned integer.
- `u32`: a 32-bit unsigned integer.
- `u64`: a 64-bit unsigned integer.
- `u256`: a 256-bit unsigned integer.

An unsigned integer means there is no `+` or `-` sign, making the value always positive. `u64` is the default type used for numbers in Sway.

In JavaScript, there are two types of integers: `number` and `BigInt`. The primary difference between these types is that `BigInt` can store much larger values. Similarly, each numeric type in Sway has its maximum value that can be stored.

`String Array`: a string is a built-in primitive type in Sway. The number inside the square brackets indicates the size of the string.

`Identity`: an enum type that represents either a user's `Address` or a `ContractId`. In Sway, a contract and an EOA (Externally Owned Account) are distinctly differentiated. Both are type-safe wrappers for `b256`.