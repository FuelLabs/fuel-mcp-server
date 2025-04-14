[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway Libs](https://docs.fuel.network/docs/nightly/sway-libs/) /

Reentrancy

## _Icon Link_ [Reentrancy Guard Library](https://docs.fuel.network/docs/nightly/sway-libs/reentrancy/\#reentrancy-guard-library)

The Reentrancy Guard Library provides an API to check for and disallow reentrancy on a contract. A reentrancy attack happens when a function is externally invoked during its execution, allowing it to be run multiple times in a single transaction.

The reentrancy check is used to check if a contract ID has been called more than once in the current call stack.

A reentrancy, or "recursive call" attack can cause some functions to behave in unexpected ways. This can be prevented by asserting a contract has not yet been called in the current transaction. An example can be found [here _Icon Link_](https://swcregistry.io/docs/SWC-107).

For implementation details on the Reentrancy Guard Library please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/reentrancy/index.html).

## _Icon Link_ [Importing the Reentrancy Guard Library](https://docs.fuel.network/docs/nightly/sway-libs/reentrancy/\#importing-the-reentrancy-guard-library)

In order to use the Reentrancy Guard library, Sway Libs must be added to the `Forc.toml` file and then imported into your Sway project. To add Sway Libs as a dependency to the `Forc.toml` file in your project please see the [Getting Started](https://docs.fuel.network/docs/nightly/sway-libs/getting_started/).

To import the Reentrancy Guard Library to your Sway Smart Contract, add the following to your Sway file:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::reentrancy::*;
```

_Icon ClipboardText_

## _Icon Link_ [Basic Functionality](https://docs.fuel.network/docs/nightly/sway-libs/reentrancy/\#basic-functionality)

Once imported, using the Reentrancy Library can be done by calling one of the two functions:

- `is_reentrant() -> bool`
- `reentrancy_guard()`

## _Icon Link_ [Using the Reentrancy Guard](https://docs.fuel.network/docs/nightly/sway-libs/reentrancy/\#using-the-reentrancy-guard)

Once imported, using the Reentrancy Guard Library can be used by calling the `reentrancy_guard()` in your Sway Smart Contract. The following shows a Sway Smart Contract that applies the Reentrancy Guard Library:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::reentrancy::reentrancy_guard;

abi MyContract {
    fn my_non_reentrant_function();
}

impl MyContract for Contract {
    fn my_non_reentrant_function() {
        reentrancy_guard();

        // my code here
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [Checking Reentrancy Status](https://docs.fuel.network/docs/nightly/sway-libs/reentrancy/\#checking-reentrancy-status)

To check if the current caller is a reentrant, you may call the `is_reentrant()` function.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::reentrancy::is_reentrant;

fn check_if_reentrant() {
    assert(!is_reentrant());
}
```

_Icon ClipboardText_

## _Icon Link_ [Cross Contract Reentrancy](https://docs.fuel.network/docs/nightly/sway-libs/reentrancy/\#cross-contract-reentrancy)

Cross-Contract Reentrancy is not possible on Fuel due to the use of Native Assets. As such, no contract calls are performed when assets are transferred. However standard security practices when relying on other contracts for state should still be applied, especially when making external calls.