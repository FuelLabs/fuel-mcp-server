[Docs](https://docs.fuel.network/) /

[Sway Libs](https://docs.fuel.network/docs/sway-libs/) /

Ownership

## _Icon Link_ [Ownership Library](https://docs.fuel.network/docs/sway-libs/ownership/\#ownership-library)

The **Ownership Library** provides a straightforward way to restrict specific calls in a Sway contract to a single _owner_. Its design follows the [SRC-5 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-5-ownership/) standard from [Sway Standards _Icon Link_](https://docs.fuel.network/docs/sway-standards/) and offers a set of functions to initialize, verify, revoke, and transfer ownership.

For implementation details, visit the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/ownership/index.html).

## _Icon Link_ [Importing the Ownership Library](https://docs.fuel.network/docs/sway-libs/ownership/\#importing-the-ownership-library)

1. **Add Sway Libs to `Forc.toml`**


Please see the [Getting Started](https://docs.fuel.network/docs/sway-libs/getting_started/) guide for instructions on adding **Sway Libs** as a dependency.

2. **Add Sway Standards to `Forc.toml`**


Refer to the [Sway Standards Book _Icon Link_](https://docs.fuel.network/docs/sway-standards/#using-a-standard) to add **Sway Standards**.

3. **Import the Ownership Library**


To import the Ownership Library and the [SRC-5 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-5-ownership/) standard, include the following in your Sway file:







```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::ownership::*;
use standards::src5::*;
```





_Icon ClipboardText_


## _Icon Link_ [Integrating the Ownership Library into the SRC-5 Standard](https://docs.fuel.network/docs/sway-libs/ownership/\#integrating-the-ownership-library-into-the-src-5-standard)

When integrating the Ownership Library with [SRC-5 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-5-ownership/), ensure that the `SRC5` trait from **Sway Standards** is implemented in your contract, as shown below. The `_owner()` function from this library is used to fulfill the SRC-5 requirement of exposing the ownership state.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::ownership::_owner;
use standards::src5::{SRC5, State};

impl SRC5 for Contract {
    #[storage(read)]
    fn owner() -> State {
        _owner()
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [Basic Usage](https://docs.fuel.network/docs/sway-libs/ownership/\#basic-usage)

## _Icon Link_ [Setting a Contract Owner](https://docs.fuel.network/docs/sway-libs/ownership/\#setting-a-contract-owner)

Establishes the initial ownership state by calling `initialize_ownership(new_owner)`. This can only be done once, typically in your contract's constructor.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn my_constructor(new_owner: Identity) {
    initialize_ownership(new_owner);
}
```

_Icon ClipboardText_

## _Icon Link_ [Applying Restrictions](https://docs.fuel.network/docs/sway-libs/ownership/\#applying-restrictions)

Protect functions so only the owner can call them by invoking `only_owner()` at the start of those functions.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn only_owner_may_call() {
    only_owner();
    // Only the contract's owner may reach this line.
}
```

_Icon ClipboardText_

## _Icon Link_ [Checking the Ownership Status](https://docs.fuel.network/docs/sway-libs/ownership/\#checking-the-ownership-status)

To retrieve the current ownership state, call `_owner()`.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn get_owner_state() {
    let owner: State = _owner();
}
```

_Icon ClipboardText_

## _Icon Link_ [Transferring Ownership](https://docs.fuel.network/docs/sway-libs/ownership/\#transferring-ownership)

To transfer ownership from the current owner to a new owner, call `transfer_ownership(new_owner)`.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn transfer_contract_ownership(new_owner: Identity) {
    // The caller must be the current owner.
    transfer_ownership(new_owner);
}
```

_Icon ClipboardText_

## _Icon Link_ [Renouncing Ownership](https://docs.fuel.network/docs/sway-libs/ownership/\#renouncing-ownership)

To revoke ownership entirely and disallow the assignment of a new owner, call `renounce_ownership()`.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn renounce_contract_owner() {
    // The caller must be the current owner.
    renounce_ownership();
    // Now no one owns the contract.
}
```

_Icon ClipboardText_

## _Icon Link_ [Events](https://docs.fuel.network/docs/sway-libs/ownership/\#events)

## _Icon Link_ [`OwnershipRenounced`](https://docs.fuel.network/docs/sway-libs/ownership/\#ownershiprenounced)

Emitted when ownership is revoked.

- **Fields:**
  - `previous_owner`: Identity of the owner prior to revocation.

## _Icon Link_ [`OwnershipSet`](https://docs.fuel.network/docs/sway-libs/ownership/\#ownershipset)

Emitted when initial ownership is set.

- **Fields:**
  - `new_owner`: Identity of the newly set owner.

## _Icon Link_ [`OwnershipTransferred`](https://docs.fuel.network/docs/sway-libs/ownership/\#ownershiptransferred)

Emitted when ownership is transferred from one owner to another.

- **Fields:**
  - `new_owner`: Identity of the new owner.
  - `previous_owner`: Identity of the prior owner.

## _Icon Link_ [Errors](https://docs.fuel.network/docs/sway-libs/ownership/\#errors)

## _Icon Link_ [`InitializationError`](https://docs.fuel.network/docs/sway-libs/ownership/\#initializationerror)

- **Variants:**
  - `CannotReinitialized`: Thrown when attempting to initialize ownership if the owner is already set.

## _Icon Link_ [`AccessError`](https://docs.fuel.network/docs/sway-libs/ownership/\#accesserror)

- **Variants:**
  - `NotOwner`: Thrown when a function restricted to the owner is called by a non-owner.

## _Icon Link_ [Example Integration](https://docs.fuel.network/docs/sway-libs/ownership/\#example-integration)

Below is a example illustrating how to use this library within a Sway contract:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use sway_libs::ownership::{
    _owner,
    initialize_ownership,
    only_owner,
    renounce_ownership,
    transfer_ownership,
};
use standards::src5::{SRC5, State};

impl SRC5 for Contract {
    #[storage(read)]
    fn owner() -> State {
        _owner()
    }
}

abi MyContract {
    #[storage(read, write)]
    fn constructor(new_owner: Identity);
    #[storage(read)]
    fn restricted_action();
    #[storage(read, write)]
    fn change_owner(new_owner: Identity);
    #[storage(read, write)]
    fn revoke_ownership();
    #[storage(read)]
    fn get_current_owner() -> State;
}

impl MyContract for Contract {
    #[storage(read, write)]
    fn constructor(new_owner: Identity) {
        initialize_ownership(new_owner);
    }

    // A function restricted to the owner
    #[storage(read)]
    fn restricted_action() {
        only_owner();
        // Protected action
    }

    // Transfer ownership
    #[storage(read, write)]
    fn change_owner(new_owner: Identity) {
        transfer_ownership(new_owner);
    }

    // Renounce ownership
    #[storage(read, write)]
    fn revoke_ownership() {
        renounce_ownership();
    }

    // Get current owner state
    #[storage(read)]
    fn get_current_owner() -> State {
        _owner()
    }
}
```

Collapse_Icon ClipboardText_

1. **Initialization:** Call `constructor(new_owner)` once to set the initial owner.
2. **Restricted Calls:** Use `only_owner()` to guard any owner-specific functions.
3. **Ownership Checks:** Retrieve the current owner state via `_owner()`.
4. **Transfer or Renounce:** Use `transfer_ownership(new_owner)` or `renounce_ownership()` for ownership modifications.