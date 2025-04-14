[Docs](https://docs.fuel.network/) /

[Sway Standards](https://docs.fuel.network/docs/sway-standards/) /

Src 5 Ownership

## _Icon Link_ [SRC-5: Ownership](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#src-5-ownership)

The following standard intends to enable the use of administrators or owners in Sway contracts.

## _Icon Link_ [Motivation](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#motivation)

The standard seeks to provide a method for restricting access to particular users within a Sway contract.

## _Icon Link_ [Prior Art](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#prior-art)

The [sway-libs _Icon Link_](https://docs.fuel.network/docs/sway-libs/ownership/) repository contains a pre-existing Ownership library.

Ownership libraries exist for other ecosystems such as OpenZeppelin's [Ownership library _Icon Link_](https://docs.openzeppelin.com/contracts/2.x/api/ownership).

## _Icon Link_ [Specification](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#specification)

## _Icon Link_ [State](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#state)

There SHALL be 3 states for any library implementing an ownership module in the following order:

## _Icon Link_ [`Uninitialized`](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#uninitialized)

The `Uninitialized` state SHALL be set as the initial state if no owner or admin is set. The `Uninitialized` state MUST be used when an owner or admin MAY be set in the future.

## _Icon Link_ [`Initialized`](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#initialized)

The `Initialized` state SHALL be set as the state if an owner or admin is set with an associated `Identity` type.

## _Icon Link_ [`Revoked`](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#revoked)

The `Revoked` state SHALL be set when there is no owner or admin and there SHALL NOT be one set in the future.

Example:

```fuel_Box fuel_Box-idXKMmm-css
pub enum State {
    Uninitialized: (),
    Initialized: Identity,
    Revoked: (),
}
```

_Icon ClipboardText_

## _Icon Link_ [Functions](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#functions)

The following functions MUST be implemented to follow the SRC-5 standard:

## _Icon Link_ [`fn owner() -> State`](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#fn-owner---state)

This function SHALL return the current state of ownership for the contract where `State` is either `Uninitialized`, `Initialized`, or `Revoked`.

## _Icon Link_ [Errors](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#errors)

There SHALL be error handling.

## _Icon Link_ [`NotOwner`](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#notowner)

This error MUST be emitted when `only_owner()` reverts.

## _Icon Link_ [Rationale](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#rationale)

In order to provide a universal method of administrative capabilities, SRC-5 will further enable interoperability between applications and provide safeguards for smart contract security.

## _Icon Link_ [Backwards Compatibility](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#backwards-compatibility)

The SRC-5 standard is compatible with the [sway-libs _Icon Link_](https://github.com/FuelLabs/sway-libs) repository pre-existing Ownership library. Considerations should be made to best handle multiple owners or admins.

There are no standards that SRC-5 requires to be compatible with.

## _Icon Link_ [Security Considerations](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#security-considerations)

The SRC-5 standard should help improve the security of Sway contracts and their interoperability.

## _Icon Link_ [Example ABI](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#example-abi)

```fuel_Box fuel_Box-idXKMmm-css
abi SRC5 {
    #[storage(read)]
    fn owner() -> State;
}
```

_Icon ClipboardText_

## _Icon Link_ [Example Implementation](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#example-implementation)

## _Icon Link_ [Uninitialized](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#uninitialized-1)

Example of the SRC-5 implementation where a contract does not have an owner set at compile time with the intent to set it during runtime.

````fuel_Box fuel_Box-idXKMmm-css
contract;

use standards::src5::{SRC5, State};

storage {
    /// The owner in storage.
    owner: State = State::Uninitialized,
}

impl SRC5 for Contract {
    /// Returns the owner.
    ///
    /// # Return Values
    ///
    /// * [State] - Represents the state of ownership for this contract.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    ///
    /// # Examples
    ///
    /// ```sway
    /// use src5::SRC5;
    ///
    /// fn foo(contract_id: ContractId) {
    ///     let ownership_abi = abi(contract_id, SRC_5);
    ///
    ///     match ownership_abi.owner() {
    ///         State::Uninitialized => log("The ownership is uninitialized"),
    ///         _ => log("This example will never reach this statement"),
    ///     }
    /// }
    /// ```
    #[storage(read)]
    fn owner() -> State {
        storage.owner.read()
    }
}

````

Collapse_Icon ClipboardText_

## _Icon Link_ [Initialized](https://docs.fuel.network/docs/sway-standards/src-5-ownership/\#initialized-1)

Example of the SRC-5 implementation where a contract has an owner set at compile time.

````fuel_Box fuel_Box-idXKMmm-css
contract;

use standards::src5::{SRC5, State};

/// The owner of this contract at deployment.
#[allow(dead_code)]
const INITIAL_OWNER: Identity = Identity::Address(Address::zero());

storage {
    /// The owner in storage.
    owner: State = State::Initialized(INITIAL_OWNER),
}

impl SRC5 for Contract {
    /// Returns the owner.
    ///
    /// # Return Values
    ///
    /// * [State] - Represents the state of ownership for this contract.
    ///
    /// # Number of Storage Accesses
    ///
    /// * Reads: `1`
    ///
    /// # Examples
    ///
    /// ```sway
    /// use src5::SRC5;
    ///
    /// fn foo(contract_id: ContractId) {
    ///     let ownership_abi = abi(contract_id, SRC_5);
    ///
    ///     match ownership_abi.owner() {
    ///         State::Initialized(owner) => log("The ownership is initialized"),
    ///         _ => log("This example will never reach this statement"),
    ///     }
    /// }
    /// ```
    #[storage(read)]
    fn owner() -> State {
        storage.owner.read()
    }
}

````

Collapse_Icon ClipboardText_