[Docs](https://docs.fuel.network/) /

[Sway Libs](https://docs.fuel.network/docs/sway-libs/) /

Pausable

## _Icon Link_ [Pausable Library](https://docs.fuel.network/docs/sway-libs/pausable/\#pausable-library)

The Pausable library allows contracts to implement an emergency stop mechanism. This can be useful for scenarios such as having an emergency switch to freeze all transactions in the event of a large bug.

It is highly encouraged to use the [Ownership Library](https://docs.fuel.network/docs/sway-libs/ownership/) in combination with the Pausable Library to ensure that only a single administrative user has the ability to pause your contract.

For implementation details on the Pausable Library please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/pausable/index.html).

## _Icon Link_ [Importing the Pausable Library](https://docs.fuel.network/docs/sway-libs/pausable/\#importing-the-pausable-library)

In order to use the Pausable library, Sway Libs must be added to the `Forc.toml` file and then imported into your Sway project. To add Sway Libs as a dependency to the `Forc.toml` file in your project please see the [Getting Started](https://docs.fuel.network/docs/sway-libs/getting_started/).

To import the Pausable Library to your Sway Smart Contract, add the following to your Sway file:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::pausable::*;
```

_Icon ClipboardText_

## _Icon Link_ [Basic Functionality](https://docs.fuel.network/docs/sway-libs/pausable/\#basic-functionality)

## _Icon Link_ [Implementing the `Pausable` abi](https://docs.fuel.network/docs/sway-libs/pausable/\#implementing-the-pausable-abi)

The Pausable Library has two states:

- `Paused`
- `Unpaused`

By default, your contract will start in the `Unpaused` state. To pause your contract, you may call the `_pause()` function. The example below provides a basic pausable contract using the Pausable Library's `Pausable` abi without any restrictions such as an administrator.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::pausable::{_is_paused, _pause, _unpause, Pausable};

impl Pausable for Contract {
    #[storage(write)]
    fn pause() {
        _pause();
    }

    #[storage(write)]
    fn unpause() {
        _unpause();
    }

    #[storage(read)]
    fn is_paused() -> bool {
        _is_paused()
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [Applying Paused Restrictions](https://docs.fuel.network/docs/sway-libs/pausable/\#applying-paused-restrictions)

When developing a contract, you may want to lock functions down to a specific state. To do this, you may call either of the `require_paused()` or `require_not_paused()` functions. The example below shows these functions in use.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::pausable::require_paused;

#[storage(read)]
fn require_paused_state() {
    require_paused();
    // This comment will only ever be reached if the contract is in the paused state
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::pausable::require_not_paused;

#[storage(read)]
fn require_not_paused_state() {
    require_not_paused();
    // This comment will only ever be reached if the contract is in the unpaused state
}
```

_Icon ClipboardText_

## _Icon Link_ [Using the Ownership Library with the Pausable Library](https://docs.fuel.network/docs/sway-libs/pausable/\#using-the-ownership-library-with-the-pausable-library)

It is highly recommended to integrate the [Ownership Library](https://docs.fuel.network/docs/sway-libs/ownership/) with the Pausable Library and apply restrictions the `pause()` and `unpause()` functions. This will ensure that only a single user may pause and unpause a contract in cause of emergency. Failure to apply this restriction will allow any user to obstruct a contract's functionality.

The follow example implements the `Pausable` abi and applies restrictions to it's pause/unpause functions. The owner of the contract must be set in a constructor defined by `MyConstructor` in this example.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::{
    ownership::{
        initialize_ownership,
        only_owner,
    },
    pausable::{
        _is_paused,
        _pause,
        _unpause,
        Pausable,
    },
};

abi MyConstructor {
    #[storage(read, write)]
    fn my_constructor(new_owner: Identity);
}

impl MyConstructor for Contract {
    #[storage(read, write)]
    fn my_constructor(new_owner: Identity) {
        initialize_ownership(new_owner);
    }
}

impl Pausable for Contract {
    #[storage(write)]
    fn pause() {
        // Add the `only_owner()` check to ensure only the owner may unpause this contract.
        only_owner();
        _pause();
    }

    #[storage(write)]
    fn unpause() {
        // Add the `only_owner()` check to ensure only the owner may unpause this contract.
        only_owner();
        _unpause();
    }

    #[storage(read)]
    fn is_paused() -> bool {
        _is_paused()
    }
}
```

Collapse_Icon ClipboardText_