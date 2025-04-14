[Docs](https://docs.fuel.network/) /

[Migrations and Disclosures](https://docs.fuel.network/docs/migrations-and-disclosures/) /

[Migrations](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/) /

Sway

## _Icon Link_ [Sway Migrations Guide](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#sway-migrations-guide)

## _Icon Link_ [March 13, 2024](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#march-13-2024)

[Release v0.67.0 _Icon Link_](https://github.com/FuelLabs/sway/releases/tag/v0.67.0)

## _Icon Link_ [New `forc migrate`](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#new-forc-migrate)

Below is a simplified example of how to migrate your project quickly. For more information on how to use `forc migrate` please refer to the [`forc migrate` docs _Icon Link_](https://docs.fuel.network/docs/forc/plugins/forc_migrate/#forc-migrate).

> _Icon InfoCircle_
>
> Important: Using `forc migrate` requires you to use the version of Sway right before the breaking change version.

For example, breaking changes for Sway will come in version `v0.67.0`, you will need to use `v0.66.10` to run `forc migrate`, in order to migrate properly.

You can compile and migrate using the previous latest version by running the following command:

```fuel_Box fuel_Box-idXKMmm-css
fuelup component add forc@0.66.10
```

_Icon ClipboardText_

## _Icon Link_ [1\. Run `forc migrate show`](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#1-run-forc-migrate-show)

Running `forc migrate show` will inform you about all the breaking changes in the next release. For example:

```fuel_Box fuel_Box-idXKMmm-css
Breaking change features:
  - storage_domains            (https://github.com/FuelLabs/sway/issues/6701)
  - partial_eq                 (https://github.com/FuelLabs/sway/issues/6883)
  - try_from_bytes_for_b256    (https://github.com/FuelLabs/sway/issues/6994)
  - merge_core_std             (https://github.com/FuelLabs/sway/issues/7006)

Migration steps (1 manual, 3 semiautomatic, and 3 automatic):
storage_domains
  [M] Review explicitly defined slot keys in storage declarations (`in` keywords)
  [S] Explicitly define storage slot keys if they need to be backward compatible

partial_eq
  [A] Implement experimental `PartialEq` and `Eq` traits
  [S] Remove deprecated `Eq` trait implementations and `experimental_partial_eq` attributes

try_from_bytes_for_b256
  [A] Replace `b256::from(<bytes>)` calls with `b256::try_from(<bytes>).unwrap()`
  [A] Replace `<bytes>.into()` calls with `<bytes>.try_into().unwrap()`

merge_core_std
  [S] Replace `core` with `std` in paths

Experimental feature flags:
- for Forc.toml:  experimental = { storage_domains = true, partial_eq = true, try_from_bytes_for_b256 = true, merge_core_std = true }
- for CLI:        --experimental storage_domains,partial_eq,try_from_bytes_for_b256,merge_core_std
```

_Icon ClipboardText_

## _Icon Link_ [2\. Update `forc.toml` dependencies](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#2-update-forctoml-dependencies)

In your Sway project, update the `forc.toml` file to use the previous latest version of Sway.

```fuel_Box fuel_Box-idXKMmm-css
// before

[dependencies]
standards = { git = "https://github.com/FuelLabs/sway-standards", tag = "v0.6.1" }
sway_libs = { git = "https://github.com/FuelLabs/sway-libs", tag = "v0.24.0" }
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after

[dependencies]
standards = { git = "https://github.com/FuelLabs/sway-standards", tag = "v0.6.3" }
sway_libs = { git = "https://github.com/FuelLabs/sway-libs", tag = "v0.24.2" }
```

_Icon ClipboardText_

## _Icon Link_ [3\. Run `forc migrate run`](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#3-run-forc-migrate-run)

Running `forc migrate run` walks you through each of the breaking changes and helps you apply them to your project.
If you just want to see the breaking changes in your project without migrating them, you can run `forc migrate check`.

```fuel_Box fuel_Box-idXKMmm-css
   Compiling mira_amm_contract (/mira-v1-core/contracts/mira_amm_contract)
warning: unused manifest key: build-profile.?.release.experimental
   Migrating Breaking change feature storage_domains
     Checked [storage_domains]  Review explicitly defined slot keys in storage declarations (`in` keywords)
      Review [storage_domains]  Explicitly define storage slot keys if they need to be backward compatible
info: [storage_domains] Explicitly define storage slot keys if they need to be backward compatible
  --> /mira-v1-core/contracts/mira_amm_contract/src/main.sw:65:1
   |
63 |
64 |
65 | / storage {
66 | |     /// Pools storage
...  |
79 | |     hook: Option<ContractId> = None,
80 | | }
   | |_-
   |
   = help: If the contract owning this storage is behind a proxy, or for any other reason needs
   = help: to use previous storage slot keys, those keys must be explicitly assigned to the
   = help: storage fields by using the `in` keyword.
   = help:
   = help: E.g.:
   = help:     storage {
   = help:         field in <previous slot key>: u64 = 0,
   = help:     }
   = help:
   = help: The previous formula for calculating storage keys was: `sha256("storage.<field name>")`.
   = help: The new formula is:                                    `sha256((0u8, "storage.<field name>"))`.
   = help:
   = help: This migration step will interactively modify the code, based on your input.
   = help:
   = help: For a detailed migration guide see: https://github.com/FuelLabs/sway/issues/6701
____

The following storage fields will have slot keys calculated by using the new formula:
  - storage.pools
  - storage.total_pools
  - storage.total_reserves
  - storage.lp_total_supply
  - storage.lp_name
  - storage.protocol_fees
  - storage.hook

Do you want these fields to have backward compatible storage slot keys, calculated
by using the previous formula?

If yes, this migration step will insert `in` keywords to all of the above fields,
and calculate the storage slot keys by using the previous formula.

1. Yes, assign the backward compatible storage slot keys.
2. No, this contract does not require backwards compatibility.
Enter your choice [1..2]: 1
    Changing [storage_domains]  Explicitly define storage slot keys if they need to be backward compatible
Source code successfully changed (7 changes).
    Finished Project is compatible with the next breaking change version of Sway
```

Collapse_Icon ClipboardText_

## _Icon Link_ [4\. Switch to the latest version of Sway](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#4-switch-to-the-latest-version-of-sway)

```fuel_Box fuel_Box-idXKMmm-css
// Assuming you have 0.67.0 installed
fuelup default latest
```

_Icon ClipboardText_

## _Icon Link_ [5\. Compile your project](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#5-compile-your-project)

```fuel_Box fuel_Box-idXKMmm-css
forc build
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> Using the `forc migrate` tool is highly recommended, and the changes below are only for reference.

## _Icon Link_ [Compiler/std-lib: storage collison between variables and StorageMap, allows hidden backdoors, likely loss of funds -](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#compilerstd-lib-storage-collison-between-variables-and-storagemap-allows-hidden-backdoors-likely-loss-of-funds---6701) [\#6701 _Icon Link_](https://github.com/FuelLabs/sway/issues/6701)

Certain storage types, like, e.g., `StorageMap` allow storage slots of their contained elements to be defined based on developer's input. E.g., the key in a `StorageMap` used to calculate the storage slot is a developer input.

To ensure that pre-images of such storage slots can never be the same as a pre-image of compiler generated key of a storage field, we will prefix the pre-images of storage fields with a single byte that denotes the storage field domain. Storage types like `StorageMap` must have a different domain prefix than this storage field domain which will be set to 0u8.

```fuel_Box fuel_Box-idXKMmm-css
// before
sha256("storage::<optional namespace 1>::<optional namespace 2>.<field name>")
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
sha256((0u8, "storage::<optional namespace 1>::<optional namespace 2>.<field name>"))
```

_Icon ClipboardText_

If the contract owning the storage is behind a proxy, its storage field keys must be backward compatible and the same as the old keys. In this, and any other case where the backward compatibility of the storage slot keys is needed, the old keys must be explicitly defined for storage fields, by using the in keyword and the old keys.

E.g., assume we have a contract with the following storage behind a proxy:

```fuel_Box fuel_Box-idXKMmm-css
// before
storage {
    x: u64 = 0,
    namespace_1 {
        y: u64 = 0,
        namespace_2 {
            z: u64 = 0,
        }
    }
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
storage {
    x in 0xc979570128d5f52725e9a343a7f4992d8ed386d7c8cfd25f1c646c51c2ac6b4b: u64 = 0,
    namespace_1 {
        y in 0x2f055029200cd7fa6751421635c722fcda6ed2261de0f1e0d19d7f257e760589: u64 = 0,
        namespace_2 {
            z in 0x03d2ee7fb8f3f5e1084e86b02d9d742ede96559e44875c6210c7008e2d184694: u64 = 0,
        }
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [Replace `Eq` trait implementations with `PartialEq` and `Eq` implementations -](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#replace-eq-trait-implementations-with-partialeq-and-eq-implementations---6883) [\#6883 _Icon Link_](https://github.com/FuelLabs/sway/issues/6883)

Partial equivalence feature renames the current `Eq` trait to `PartialEq` and adds a new, empty `Eq` trait with `PartialEq` as a supertrait.

Every existing `Eq` trait implementation needs to be renamed to `PartialEq`, and in addition, an empty `Eq` implementations needs to be added.

```fuel_Box fuel_Box-idXKMmm-css
// before
impl Eq for SomeType {
    fn eq(self, other: Self) -> bool {
        self.x == other.x
    }
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
impl PartialEq for SomeType {
    fn eq(self, other: Self) -> bool {
        self.x == other.x
    }
}

impl Eq for SomeType {}
```

_Icon ClipboardText_

If the original implementation implements Eq for a generic type and in addition has Eq on trait constraints, those Eq trait constraints must be replaced by PartialEq in the new PartialEq impl, and remain Eq in the new, empty, Eq impl.

```fuel_Box fuel_Box-idXKMmm-css
// before
impl<A, B> Eq for (A, B)
where
    A: Eq,
    B: Eq,
{
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1
    }
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
impl<A, B> PartialEq for (A, B)
where
    A: PartialEq,
    B: PartialEq,
{
    fn eq(self, other: Self) -> bool {
        self.0 == other.0 && self.1 == other.1
    }
}

impl<A, B> Eq for (A, B)
where
    A: Eq,
    B: Eq,
{}
```

_Icon ClipboardText_

## _Icon Link_ [Implement `TryFrom<Bytes>` for `b256` \-](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#implement-tryfrombytes-for-b256---6994) [\#6994 _Icon Link_](https://github.com/FuelLabs/sway/issues/6994)

Replace calls to `from(bytes)/bytes.into()` with `try_from(bytes)/bytes.try_into()`.

Calls to `from`:

```fuel_Box fuel_Box-idXKMmm-css
// before
let result = b256::from(some_bytes);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
let result = b256::try_from(some_bytes).unwrap();
```

_Icon ClipboardText_

Calls to `into`:

```fuel_Box fuel_Box-idXKMmm-css
// before
let result = some_bytes.into();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
let result = some_bytes.try_into().unwrap();
```

_Icon ClipboardText_

## _Icon Link_ [Merge `core` and `std` libraries -](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#merge-core-and-std-libraries---7006) [\#7006 _Icon Link_](https://github.com/FuelLabs/sway/issues/7006)

Currently, we have two standard libraries, `core` and `std`. The distinction between them is rather arbitrary, and we want to merge them into a single library called `std`. All the existing modules in the `core` library will be moved to the `std` library, but their content will not be changed.

```fuel_Box fuel_Box-idXKMmm-css
// before
use core::ops::*;

impl core::ops::Eq for SomeType {
    fn eq(self, other: Self) -> bool {
        self.x == other.x
    }
}

let _ = core::codec::encode(0u64);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
use std::ops::*;

impl std::ops::Eq for SomeType {
    fn eq(self, other: Self) -> bool {
        self.x == other.x
    }
}

let _ = std::codec::encode(0u64);
```

_Icon ClipboardText_

## _Icon Link_ [August 16, 2024](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#august-16-2024)

[Release v0.63.0 _Icon Link_](https://github.com/FuelLabs/sway/releases/tag/v0.63.0)

## _Icon Link_ [`\#[namespace()]` attribute is no longer supported -](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#namespace-attribute-is-no-longer-supported---6279) [\#6279 _Icon Link_](https://github.com/FuelLabs/sway/pull/6279)

We no longer support the `#[namespace()]` attribute. If you use it, notably with SRC14, you should migrate to using the `in` keyword if you want backwards compatibility. If you just care about namespacing, you should use the new namespacing syntax.

Backwards compatibility places `foo` at `sha256("storage_example_namespace_0")`

```fuel_Box fuel_Box-idXKMmm-css
// before
#[namespace(example_namespace)]
storage {
    foo: u64 = 0,
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
storage {
    foo in 0x1102bf23d7c2114d6b409df4a1f8f7982eda775e800267be65c1cc2a93cb6c5c: u64 = 0,
}
```

_Icon ClipboardText_

New / recommended method places `foo` at `sha256("storage::example_namespace.foo")`

```fuel_Box fuel_Box-idXKMmm-css
// new
storage {
    example_namespace {
        foo: u64 = 0,
    },
}
```

_Icon ClipboardText_

## _Icon Link_ [Configurables are no longer allowed in pattern matching and shadowing -](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#configurables-are-no-longer-allowed-in-pattern-matching-and-shadowing---6289) [\#6289 _Icon Link_](https://github.com/FuelLabs/sway/pull/6289)

The code below does not compile any more.

```fuel_Box fuel_Box-idXKMmm-css
configurable {
    X: u8 = 10,
}

fn main() {
    let X = 101u8; // ERROR: Variable "X" shadows configurable of the same name.
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
configurable {
    X: u8 = 10,
}

fn main() {
    match var {
        (0, X) => true // ERROR: "X" is a configurable and configurables cannot be matched against.
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [New ABI specification format -](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#new-abi-specification-format---6254) [\#6254 _Icon Link_](https://github.com/FuelLabs/sway/pull/6254)

The new ABI specification format is hash based to improve support for indexing. There were also updates to support the latest VM features.

## _Icon Link_ [Added variable length message support when verifying ed signatures -](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#added-variable-length-message-support-when-verifying-ed-signatures---6419) [\#6419 _Icon Link_](https://github.com/FuelLabs/sway/pull/6419)

`ed_verify` was changed to use `Bytes` for the message instead of `b256` for a message hash.

```fuel_Box fuel_Box-idXKMmm-css
// before
pub fn ed_verify(public_key: b256, signature: B512, msg_hash: b256)
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
pub fn ed_verify(public_key: b256, signature: B512, msg: Bytes)
```

_Icon ClipboardText_

## _Icon Link_ [Some STD functions now return an `Option` instead of reverting -](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#some-std-functions-now-return-an-option-instead-of-reverting---6405-6414-6418) [\#6405 _Icon Link_](https://github.com/FuelLabs/sway/pull/6405), [\#6414 _Icon Link_](https://github.com/FuelLabs/sway/pull/6414), [\#6418 _Icon Link_](https://github.com/FuelLabs/sway/pull/6418)

Some functions in the STD now return an `Option` instead of reverting. This allows developers to fail gracefully. More functions will do this in the future.

```fuel_Box fuel_Box-idXKMmm-css
// before
let my_predicate_address: Address = predicate_address();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
let my_predicate_address: Address = predicate_address().unwrap();
```

_Icon ClipboardText_

## _Icon Link_ [Some STD functions now return types have been updated to match the Fuel Specifications](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#some-std-functions-now-return-types-have-been-updated-to-match-the-fuel-specifications)

- `output_count()` now returns a `u16` over a `u64`

Before:

```fuel_Box fuel_Box-idXKMmm-css
let output_count: u64 = output_count();
```

_Icon ClipboardText_

After:

```fuel_Box fuel_Box-idXKMmm-css
let my_output_count: u16 = output_count();
```

_Icon ClipboardText_

- `tx_maturity` now returns an `Option<u32>` over an `Option<u64>`

Before:

```fuel_Box fuel_Box-idXKMmm-css
let my_tx_maturity: u64 = tx_maturity().unwrap()
```

_Icon ClipboardText_

After:

```fuel_Box fuel_Box-idXKMmm-css
let my_tx_maturity: u32 = tx_maturity().unwrap()
```

_Icon ClipboardText_

## _Icon Link_ [Some STD functions have been made private. These will no longer be available for developers to use](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#some-std-functions-have-been-made-private-these-will-no-longer-be-available-for-developers-to-use)

- `input_pointer()`
- `output_pointer()`
- `tx_witness_pointer()`
- `tx_script_start_pointer()`
- `tx_script_data_start_pointer()`

The following functions now follow this format:

Inputs:

- `input_type()`
- `input_predicate_data()`
- `input_predicate()`
- `input_message_sender()`
- `input_message_recipient()`
- `input_message_data_length()`
- `input_message_data()`
- `input_message_nonce()`

Outputs:

- `output_type()`
- `output_amount()`

Transactions:

- `tx_script_length()`
- `tx_script_data_length()`
- `tx_witness_data_length()`
- `tx_witness_data()`
- `tx_script_data()`
- `tx_script_bytecode()`
- `tx_script_bytecode_hash()`

## _Icon Link_ [Non-breaking Changes](https://docs.fuel.network/docs/migrations-and-disclosures/migrations/sway/\#non-breaking-changes)

New partial support for slices.

Automated proxy creation and deployment with forc.