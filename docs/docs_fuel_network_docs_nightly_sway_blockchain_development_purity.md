[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Blockchain Development](https://docs.fuel.network/docs/nightly/sway/blockchain-development/) /

Purity

## _Icon Link_ [Purity](https://docs.fuel.network/docs/nightly/sway/blockchain-development/purity/\#purity)

A function is _pure_ if it does not access any [persistent storage](https://docs.fuel.network/docs/nightly/sway/blockchain-development/storage/). Conversely, the function is _impure_ if it does access any storage. Naturally, as storage is only available in smart contracts, impure functions cannot be used in predicates, scripts, or libraries. A pure function cannot call an impure function.

In Sway, functions are pure by default but can be opted into impurity via the `storage` function attribute. The `storage` attribute may take `read` and/or `write` arguments indicating which type of access the function requires.

The `storage` attribute without any arguments, `#[storage()]`, indicates a pure function, and has the same effect as not having the attribute at all.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn get_amount() -> u64 {
    ...
}

#[storage(read, write)]
fn increment_amount(increment: u64) -> u64 {
    ...
}

fn a_pure_function() {
    ...
}

#[storage()]
fn also_a_pure_function() {
    ...
}
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note**: the `#[storage(write)]` attribute also permits a function to read from storage. This is due to the fact that partially writing a storage slot requires first reading the slot.

Impure functions which call other impure functions must have at least the same storage privileges or a superset of those for the function called. For example, to call a function with write access a caller must also have write access, or both read and write access. To call a function with read and write access the caller must also have both privileges.

The `storage` attribute may also be applied to [methods and associated functions](https://docs.fuel.network/docs/nightly/sway/basics/methods_and_associated_functions/), [trait](https://docs.fuel.network/docs/nightly/sway/advanced/traits/) and [ABI](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/#the-abi-declaration) declarations.

A pure function gives you some guarantees: you will not incur excessive storage gas costs, the compiler can apply additional optimizations, and they are generally easy to reason about and audit.

> _Icon InfoCircle_
>
> **Note**: Purity does not provide an absolute guarantee that a storage access will not happen as a result of calling a pure function. E.g., it is possible for a pure function to call another contract, which can then call a write function in the original contract. The guarantee that the purity gives in this example is, that the original pure function itself does not change the storage, as well as that any function later called, that accesses storage, is clearly marked as impure.

[A similar concept exists in Solidity _Icon Link_](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions). Note that Solidity refers to contract storage as _contract state_, and in the Sway/Fuel ecosystem, these two terms are largely interchangeable.