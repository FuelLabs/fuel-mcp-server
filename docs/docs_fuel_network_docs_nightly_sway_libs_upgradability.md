[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway Libs](https://docs.fuel.network/docs/nightly/sway-libs/) /

Upgradability

## _Icon Link_ [Upgradability Library](https://docs.fuel.network/docs/nightly/sway-libs/upgradability/\#upgradability-library)

The Upgradability Library provides functions that can be used to implement contract upgrades via simple upgradable proxies. The Upgradability Library implements the required and optional functionality from [SRC-14 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/) as well as additional functionality for ownership of the proxy contract.

For implementation details on the Upgradability Library please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/upgradability/index.html).

## _Icon Link_ [Importing the Upgradability Library](https://docs.fuel.network/docs/nightly/sway-libs/upgradability/\#importing-the-upgradability-library)

In order to use the Upgradability library, Sway Libs and [Sway Standards _Icon Link_](https://docs.fuel.network/docs/sway-standards/) must be added to the `Forc.toml` file and then imported into your Sway project. To add Sway Libs as a dependency to the `Forc.toml` file in your project please see the [Getting Started](https://docs.fuel.network/docs/nightly/sway-libs/getting_started/). To add Sway Standards as a dependency please see the [Sway Standards Book _Icon Link_](https://docs.fuel.network/docs/sway-standards/#using-a-standard).

To import the Upgradability Library and [SRC-14 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/) Standard to your Sway Smart Contract, add the following to your Sway file:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::upgradability::*;
use standards::{src14::*, src5::*};
```

_Icon ClipboardText_

## _Icon Link_ [Integrating the Upgradability Library into the SRC-14 Standard](https://docs.fuel.network/docs/nightly/sway-libs/upgradability/\#integrating-the-upgradability-library-into-the-src-14-standard)

To implement the [SRC-14 _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/) standard with the Upgradability library, be sure to add the Sway Standards dependency to your contract. The following demonstrates the integration of the Ownership library with the SRC-14 standard.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::upgradability::{_proxy_owner, _proxy_target, _set_proxy_target};
use standards::{src14::{SRC14, SRC14Extension}, src5::State};

storage {
    SRC14 {
        /// The [ContractId] of the target contract.
        ///
        /// # Additional Information
        ///
        /// `target` is stored at sha256("storage_SRC14_0")
        target in 0x7bb458adc1d118713319a5baa00a2d049dd64d2916477d2688d76970c898cd55: Option<ContractId> = None,
        /// The [State] of the proxy owner.
        ///
        /// # Additional Information
        ///
        /// `proxy_owner` is stored at sha256("storage_SRC14_1")
        proxy_owner in 0xbb79927b15d9259ea316f2ecb2297d6cc8851888a98278c0a2e03e1a091ea754: State = State::Uninitialized,
    },
}

impl SRC14 for Contract {
    #[storage(read, write)]
    fn set_proxy_target(new_target: ContractId) {
        _set_proxy_target(new_target);
    }

    #[storage(read)]
    fn proxy_target() -> Option<ContractId> {
        _proxy_target()
    }
}

impl SRC14Extension for Contract {
    #[storage(read)]
    fn proxy_owner() -> State {
        _proxy_owner()
    }
}
```

Collapse_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE** An initialization method must be implemented to initialize the proxy target or proxy owner.

## _Icon Link_ [Basic Functionality](https://docs.fuel.network/docs/nightly/sway-libs/upgradability/\#basic-functionality)

## _Icon Link_ [Setting and getting a Proxy Target](https://docs.fuel.network/docs/nightly/sway-libs/upgradability/\#setting-and-getting-a-proxy-target)

Once imported, the Upgradability Library's functions will be available. Use them to change the proxy target for your contract by calling the `set_proxy_target()` function.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn set_proxy_target(new_target: ContractId) {
    _set_proxy_target(new_target);
}
```

_Icon ClipboardText_

Use the `proxy_target()` method to get the current proxy target.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn proxy_target() -> Option<ContractId> {
    _proxy_target()
}
```

_Icon ClipboardText_

## _Icon Link_ [Setting and getting a Proxy Owner](https://docs.fuel.network/docs/nightly/sway-libs/upgradability/\#setting-and-getting-a-proxy-owner)

To change the proxy target for your contract use the `set_proxy_owner()` function.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(write)]
fn set_proxy_owner(new_proxy_owner: State) {
    _set_proxy_owner(new_proxy_owner);
}
```

_Icon ClipboardText_

Use the `proxy_owner()` method to get the current proxy owner.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn proxy_owner() -> State {
    _proxy_owner()
}
```

_Icon ClipboardText_

## _Icon Link_ [Proxy access control](https://docs.fuel.network/docs/nightly/sway-libs/upgradability/\#proxy-access-control)

To restrict a function to only be callable by the proxy's owner, call the `only_proxy_owner()` function.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn only_proxy_owner_may_call() {
    only_proxy_owner();
    // Only the proxy's owner may reach this line.
}
```

_Icon ClipboardText_