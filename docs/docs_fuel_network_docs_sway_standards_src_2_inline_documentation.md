[Docs](https://docs.fuel.network/) /

[Sway Standards](https://docs.fuel.network/docs/sway-standards/) /

Src 2 Inline Documentation

## _Icon Link_ [SRC-2: Inline Documentation](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#src-2-inline-documentation)

The following standard intends to define the structure and organization of inline documentation for functions, structs, enums, storage, configurables, and more within the Sway Language. This is a living standard.

## _Icon Link_ [Motivation](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#motivation)

The standard seeks to provide a better developer experience using Fuel's tooling and the Language Server. This will allow for better interoperability between applications and enable developers to quickly understand any external code they are using or implementing.

## _Icon Link_ [Prior Art](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#prior-art)

A number of pre-existing functions in the [sway standard library _Icon Link_](https://fuellabs.github.io/sway/master/std/), [sway-applications _Icon Link_](https://github.com/FuelLabs/sway-applications), and [sway-libs _Icon Link_](https://docs.fuel.network/docs/sway-libs/) repositories have inline documentation. The inline documentation for these is already compatible with Fuel's VS Code extension. These however do not all follow the same structure and outline.

## _Icon Link_ [Specification](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#specification)

## _Icon Link_ [Functions](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#functions)

The following describes the structure and order of inline documentation for functions. Some sections MAY NOT apply to each function. When a section is not relevant it SHALL be omitted.

## _Icon Link_ [Functions: Description](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#functions-description)

This section has no header.
A simple explanation of the function's intent or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// This function computes the hash of two numbers.
```

_Icon ClipboardText_

## _Icon Link_ [Functions: Additional Information](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#functions-additional-information)

This section has a `h1` header.
This section is directly below the description and can provide additional information beyond the function's intent or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Additional Information
///
/// This function also has some complex behaviors.
```

_Icon ClipboardText_

## _Icon Link_ [Functions: Arguments](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#functions-arguments)

This section has a `h1` header.
Lists the arguments of the function's definition with the `*` symbol and describes each one. The list SHALL provide the name, type, and description. The argument SHALL be encapsulated between two backticks: `argument`. The type SHALL be encapsulated between two square brackets: \[type\].
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Arguments
///
/// * `argument_1`: [Identity] - This argument is a user to be hashed.
```

_Icon ClipboardText_

## _Icon Link_ [Functions: Returns](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#functions-returns)

This section has a `h1` header.
Lists the return values of the function with the `*` symbol and describes each one. This list SHALL be in the order of the return index and provide the type and description. The type SHALL be encapsulated between two square brackets: \[type\].
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Returns
///
/// * [u64] - The number of hashes performed.
```

_Icon ClipboardText_

## _Icon Link_ [Functions: Reverts](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#functions-reverts)

This section has a `h1` header.
Lists the cases in which the function will revert starting with the `*` symbol. The list SHALL be in the order of occurrence within the function.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Reverts
///
/// * When `argument_1` or `argument_2` are a zero [b256].
```

_Icon ClipboardText_

## _Icon Link_ [Functions: Number of Storage Accesses](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#functions-number-of-storage-accesses)

This section has a `h1` header.
Provides information on how many storage reads, writes, and clears occur within the function.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Number of Storage Accesses
///
/// * Reads: `1`
/// * Clears: `2`
```

_Icon ClipboardText_

## _Icon Link_ [Functions: Examples](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#functions-examples)

This section has a `h1` header.
This section provides an example of the use of the function. This section is not required to follow the SRC-2 standard however encouraged for auxiliary and library functions.
Example:

````fuel_Box fuel_Box-idXKMmm-css
/// # Examples
///
/// ```sway
/// fn foo(argument_1: b256, argument_2: b256) {
///     let result = my_function(argument_1, argument_2);
/// }
````

_Icon ClipboardText_

## _Icon Link_ [Structs](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#structs)

The following describes the structure and order of inline documentation for structs. Some sections MAY NOT apply to each struct. When a section is not relevant it SHALL be omitted.

## _Icon Link_ [Structs: Description](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#structs-description)

This section has no header.
A simple explanation of the struct's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// This struct contains information on an NFT.
```

_Icon ClipboardText_

## _Icon Link_ [Structs: Additional Information](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#structs-additional-information)

This section has a `h1` header.
This section is directly below the description and can provide additional information beyond the struct's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Additional Information
///
/// This struct also has some complex behaviors.
```

_Icon ClipboardText_

## _Icon Link_ [Fields](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#fields)

The following describes the structure and order of inline documentation for fields within structs. Some sections MAY NOT apply to each field. When a section is not relevant it SHALL be omitted.

## _Icon Link_ [Fields: Description](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#fields-description)

This section has no header.
Each field SHALL have its own description with a simple explanation of the field's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// This field represents an owner.
field_1: Identity,
```

_Icon ClipboardText_

## _Icon Link_ [Fields: Additional Information](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#fields-additional-information)

This section has a `h1` header.
This section is directly below the description and can provide additional information beyond the field's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Additional Information
///
/// This field also has some complex behaviors.
```

_Icon ClipboardText_

## _Icon Link_ [Enums](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#enums)

The following describes the structure and order of inline documentation for enums. Some sections MAY NOT apply to each enum. When a section is not relevant it SHALL be omitted.

## _Icon Link_ [Enums: Description](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#enums-description)

This section has no header.
A simple explanation of the enum's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// This enum holds the state of a contract.
```

_Icon ClipboardText_

## _Icon Link_ [Enums: Additional Information](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#enums-additional-information)

This section has a `h1` header.
This section is directly below the description and can provide additional information beyond the enum's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Additional Information
///
/// This enum also has some complex behaviors.
```

_Icon ClipboardText_

## _Icon Link_ [Variant](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#variant)

The following describes the structure and order of inline documentation for fields within enums. Some sections MAY NOT apply to each field. When a section is not relevant it SHALL be omitted.

## _Icon Link_ [Variant: Description](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#variant-description)

This section has no header.
Each variant SHALL have its own description with a simple explanation of the variant's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// This variant represents the uninitialized state of a contract.
variant_1: (),
/// This variant represents the initialized state of a contract.
variant_2: Identity,
```

_Icon ClipboardText_

## _Icon Link_ [Variant: Additional Information](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#variant-additional-information)

This section has a `h1` header.
This section is directly below the description and can provide additional information beyond the variant's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Additional Information
///
/// This variant also has some complex behaviors.
```

_Icon ClipboardText_

## _Icon Link_ [Errors](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#errors)

In Sway, errors are recommended to be enums. They SHALL follow the same structure and order for inline documentation as described above for enums. Some sections MAY NOT apply to each error. When a section is not relevant it SHALL be omitted.

## _Icon Link_ [Logs](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#logs)

In Sway, logs are recommended to be structs. They SHALL follow the same structure and order for inline documentation as described above for structs. Some sections MAY NOT apply to each log. When a section is not relevant it SHALL be omitted.

## _Icon Link_ [Storage](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#storage)

The following describes the structure and order of inline documentation for variables within the storage block. Some sections MAY NOT apply to each storage variable. When a section is not relevant it SHALL be omitted.

## _Icon Link_ [Storage: Description](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#storage-description)

This section has no header.
A simple explanation of the storage variable's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// This storage variable is used for state.
```

_Icon ClipboardText_

## _Icon Link_ [Storage: Additional Information](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#storage-additional-information)

This section has a `h1` header.
This section is directly below the description and can provide additional information beyond the storage variable's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Additional Information
///
/// This storage variable maps a user to a state.
```

_Icon ClipboardText_

## _Icon Link_ [Configurable](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#configurable)

The following describes the structure and order of inline documentation for variables in the configurable block. Some sections MAY NOT apply to each storage variable. When a section is not relevant it SHALL be omitted.

## _Icon Link_ [Configurable: Description](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#configurable-description)

This section has no header.
A simple explanation of the configurable variable's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// This configurable variable is used for an address.
```

_Icon ClipboardText_

## _Icon Link_ [Configurable: Additional Information](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#configurable-additional-information)

This section has a `h1` header.
This section is directly below the description and can provide additional information beyond the configurable variable's purpose or functionality.
Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Additional Information
///
/// This configurable variable makes security assumptions.
```

_Icon ClipboardText_

## _Icon Link_ [Other Sections](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#other-sections)

If the above described sections are not relevant for the information that needs to documented, a custom section with a arbitrary `h1` header may be utilized.

Example:

```fuel_Box fuel_Box-idXKMmm-css
/// # Recommended Message Style
///
/// We recommend that `expect` messages are used to describe the reason you *expect* the `Option` should be `Some`.
```

_Icon ClipboardText_

## _Icon Link_ [Rationale](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#rationale)

The SRC-2 standard should help provide developers with an easy way to both quickly write inline documentation and get up to speed on other developers' code. This standard in combination with Fuel's VS Code extension provides readily accessible information on functions, structs, and enums

![Screenshot 2023-05-10 125656](https://github.com/FuelLabs/sway-standards/assets/54727135/f03073b9-2a28-44d1-b12a-5603a0738fee)

## _Icon Link_ [Backwards Compatibility](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#backwards-compatibility)

There are no standards that the SRC-2 standard requires to be backward compatible with.

## _Icon Link_ [Security Considerations](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#security-considerations)

This standard will improve security by providing developers with relevant information such as revert cases.

## _Icon Link_ [Examples](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#examples)

## _Icon Link_ [Function Example](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#function-example)

````fuel_Box fuel_Box-idXKMmm-css
/// Ensures that the sender is the owner.
///
/// # Arguments
///
/// * `number`: [u64] - A value that is checked to be 5.
///
/// # Returns
///
/// * [bool] - Determines whether `number` is or is not 5.
///
/// # Reverts
///
/// * When the sender is not the owner.
///
/// # Number of Storage Accesses
///
/// * Reads: `1`
///
/// # Examples
///
/// ```sway
/// use ownable::Ownership;
///
/// storage {
///     owner: Ownership = Ownership::initialized(Identity::Address(Address::zero())),
/// }
///
/// fn foo() {
///     storage.owner.only_owner();
///     // Do stuff here
/// }
#[storage(read)]
pub fn only_owner(self, number: u64) -> bool {
    require(self.owner() == State::Initialized(msg_sender().unwrap()), AccessError::NotOwner);
    number == 5
}
````

Collapse_Icon ClipboardText_

## _Icon Link_ [Struct Examples](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#struct-examples)

```fuel_Box fuel_Box-idXKMmm-css
/// Metadata that is tied to an asset.
pub struct NFTMetadata {
    /// Represents the ID of this NFT.
    value: u64,
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
/// Log of a bid.
pub struct Bid {
    /// The number of coins that were bid.
    amount: u64,
    /// The user which placed this bid.
    bidder: Identity,
}
```

_Icon ClipboardText_

## _Icon Link_ [Enum Examples](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#enum-examples)

```fuel_Box fuel_Box-idXKMmm-css
/// Determines the state of ownership.
pub enum State {
    /// The ownership has not been set.
    Uninitialized: (),
    /// The user who has been given ownership.
    Initialized: Identity,
    /// The ownership has been given up and can never be set again.
    Revoked: (),
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
/// Error log for when access is denied.
pub enum AccessError {
    /// Emitted when the caller is not the owner of the contract.
    NotOwner: (),
}
```

_Icon ClipboardText_

## _Icon Link_ [Storage Examples](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#storage-examples)

```fuel_Box fuel_Box-idXKMmm-css
storage {
    /// An asset which is to be distributed.
    asset: Option<AssetId> = Option::None,
    /// Stores the ClaimState of users that have interacted with the Airdrop Distributor contract.
    ///
    /// # Additional Information
    ///
    /// Maps (user => claim)
    claims: StorageMap<Identity, ClaimState> = StorageMap {},
}
```

_Icon ClipboardText_

## _Icon Link_ [Configurable Example](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/\#configurable-example)

```fuel_Box fuel_Box-idXKMmm-css
configurable {
    /// The threshold required for activation.
    THRESHOLD: u64 = 5,
}
```

_Icon ClipboardText_