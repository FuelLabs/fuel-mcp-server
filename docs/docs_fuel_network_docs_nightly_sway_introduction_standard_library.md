[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Introduction](https://docs.fuel.network/docs/nightly/sway/introduction/) /

Standard Library

## _Icon Link_ [Standard Library](https://docs.fuel.network/docs/nightly/sway/introduction/standard_library/\#standard-library)

Similar to Rust, Sway comes with its own standard library.

The Sway Standard Library is the foundation of portable Sway software, a set of minimal shared abstractions for the broader Sway ecosystem. It offers core types, like `Result<T, E>` and `Option<T>`, library-defined operations on language primitives, native asset management, blockchain contextual operations, access control, storage management, and support for types from other VMs, among many other things.

The entire Sway standard library is a Forc project called `std`, and is available directly [here _Icon Link_](https://github.com/FuelLabs/sway/tree/v0.67.0/sway-lib-std). Navigate to the appropriate tagged release if the latest `master` is not compatible. You can find the latest `std` documentation [here _Icon Link_](https://fuellabs.github.io/sway/master/std/).

## _Icon Link_ [Using the Standard Library](https://docs.fuel.network/docs/nightly/sway/introduction/standard_library/\#using-the-standard-library)

The standard library is made implicitly available to all Forc projects created using [`forc new`](https://docs.fuel.network/docs/nightly/forc/commands/forc_new/). In other words, it is not required to manually specify `std` as an explicit dependency. Forc will automatically use the version of `std` that matches its version.

Importing items from the standard library can be done using the `use` keyword, just as importing items from any Sway project. For example:

```fuel_Box fuel_Box-idXKMmm-css
use std::storage::storage_vec::*;
```

_Icon ClipboardText_

This imports the `StorageVec` type into the current namespace.

## _Icon Link_ [Standard Library Prelude](https://docs.fuel.network/docs/nightly/sway/introduction/standard_library/\#standard-library-prelude)

Sway comes with a variety of things in its standard library. However, if you had to manually import every single thing that you used, it would be very verbose. But importing a lot of things that a program never uses isn't good either. A balance needs to be struck.

The prelude is the list of things that Sway automatically imports into every Sway program. It's kept as small as possible, and is focused on things which are used in almost every single Sway program.

The current version of the prelude lives in [`std::prelude` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/prelude.sw), and re-exports the following:

- [`std::address::Address` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/address.sw), a wrapper around the `b256` type representing a wallet address.
- [`std::contract_id::ContractId` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/contract_id.sw), a wrapper around the `b256` type representing the ID of a contract.
- [`std::identity::Identity` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/identity.sw), an enum with two possible variants: `Address: Address` and `ContractId: ContractId`.
- [`std::vec::Vec` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/vec.sw), a growable, heap-allocated vector.
- [`std::storage::storage_key::*` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/storage/storage_key.sw), contains the API for accessing a `std::storage::StorageKey` which describes a location in storage.
- [`std::storage::storage_map::*` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/storage/storage_map.sw), a key-value mapping in contract storage.
- [`std::option::Option` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/option.sw), an enum which expresses the presence or absence of a value.
- [`std::result::Result` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/result.sw), an enum for functions that may succeed or fail.
- [`std::assert::assert` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/assert.sw), a function that reverts the VM if the condition provided to it is `false`.
- [`std::assert::assert_eq` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/assert.sw), a function that reverts the VM and logs its two inputs `v1` and `v2` if the condition `v1` == `v2` is `false`.
- [`std::assert::assert_ne` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/assert.sw), a function that reverts the VM and logs its two inputs `v1` and `v2` if the condition `v1` != `v2` is `false`.
- [`std::revert::require` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/revert.sw), a function that reverts the VM and logs a given value if the condition provided to it is `false`.
- [`std::revert::revert` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/revert.sw), a function that reverts the VM.
- [`std::logging::log` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/logging.sw), a function that logs arbitrary stack types.
- [`std::auth::msg_sender` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/auth.sw), a function that gets the `Identity` from which a call was made.
- [`std::primitives::*` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/primitives.sw), methods on primitive types.
- [`std::primitive_conversions::*` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/primitive_conversions.sw), methods for converting between primitive types.
- [`std::raw_ptr::*` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/raw_ptr.sw), functions for working with raw pointers.
- [`std::raw_slice::*` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/raw_slice.sw), functions for working with raw slices.
- [`std::ops::*` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/ops.sw), mathematical operations such as addition, subtraction, multiplication, and division.
- [`std::str::*` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/str.sw), methods for working with strings.
- [`std::codec::*` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/codec.sw), automatic serialization and deserialization of types.