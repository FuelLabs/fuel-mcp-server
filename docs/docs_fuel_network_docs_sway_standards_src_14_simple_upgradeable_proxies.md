[Docs](https://docs.fuel.network/) /

[Sway Standards](https://docs.fuel.network/docs/sway-standards/) /

Src 14 Simple Upgradeable Proxies

## _Icon Link_ [SRC-14: Simple Upgradeable Proxies](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#src-14-simple-upgradeable-proxies)

The following proposes a standard for simple upgradeable proxies.

## _Icon Link_ [Motivation](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#motivation)

We seek to standardize a proxy implementation to improve developer experience and enable tooling to automatically deploy or update proxies as needed.

## _Icon Link_ [Prior Art](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#prior-art)

[This OpenZeppelin blog post _Icon Link_](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades#proxies-and-implementations) is a good survey of the state of the art at this time.

Proxy designs fall into three essential categories:

1. Immutable proxies which are lightweight clones of other contracts but can't change targets
2. Upgradeable proxies such as [UUPS _Icon Link_](https://eips.ethereum.org/EIPS/eip-1822) which store a target in storage and delegate all calls to it
3. [Diamonds _Icon Link_](https://eips.ethereum.org/EIPS/eip-2535) which are both upgradeable and can point to multiple targets on a per method basis

This document falls in the second category. We want to standardize the implementation of simple upgradeable pass-through contracts.

The FuelVM provides an `LDC` instruction that is used by Sway's `std::execution::run_external` to provide a similar behavior to EVM's `delegatecall` and execute instructions from another contract while retaining one's own storage context. This is the intended means of implementation of this standard.

## _Icon Link_ [Specification](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#specification)

## _Icon Link_ [Required Behavior](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#required-behavior)

The proxy contract MUST maintain the address of its target in its storage at slot `0x7bb458adc1d118713319a5baa00a2d049dd64d2916477d2688d76970c898cd55` (equivalent to `sha256("storage_SRC14_0")`).
It SHOULD base other proxy specific storage fields in the `SRC14` namespace to avoid collisions with target storage.
It MAY have its storage definition overlap with that of its target if necessary.

The proxy contract MUST delegate any method call not part of its interface to the target contract.

This delegation MUST retain the storage context of the proxy contract.

## _Icon Link_ [Required Public Functions](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#required-public-functions)

The following functions MUST be implemented by a proxy contract to follow the SRC-14 standard:

## _Icon Link_ [`fn set_proxy_target(new_target: ContractId);`](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#fn-set_proxy_targetnew_target-contractid)

If a valid call is made to this function it MUST change the target contract of the proxy to `new_target`.
This method SHOULD implement access controls such that the target can only be changed by a user that possesses the right permissions (typically the proxy owner).

## _Icon Link_ [`fn proxy_target() -> Option<ContractId>;`](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#fn-proxy_target---optioncontractid)

This function MUST return the target contract of the proxy as `Some`. If no proxy is set then `None` MUST be returned.

## _Icon Link_ [Optional Public Functions](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#optional-public-functions)

The following functions are RECOMMENDED to be implemented by a proxy contract to follow the SRC-14 standard:

## _Icon Link_ [`fn proxy_owner() -> State;`](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#fn-proxy_owner---state)

This function SHALL return the current state of ownership for the proxy contract where the `State` is either `Uninitialized`, `Initialized`, or `Revoked`. `State` is defined in the [SRC-5; Ownership Standard](https://docs.fuel.network/docs/sway-standards/src-5-ownership/).

## _Icon Link_ [Rationale](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#rationale)

This standard is meant to provide simple upgradeability, it is deliberately minimalistic and does not provide the level of functionality of diamonds.

Unlike in [UUPS _Icon Link_](https://eips.ethereum.org/EIPS/eip-1822), this standard requires that the upgrade function is part of the proxy and not its target.
This prevents irrecoverable updates if a proxy is made to point to another proxy and no longer has access to upgrade logic.

## _Icon Link_ [Backwards Compatibility](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#backwards-compatibility)

SRC-14 is intended to be compatible with SRC-5 and other standards of contract functionality.

As it is the first attempt to standardize proxy implementation, we do not consider interoperability with other proxy standards.

## _Icon Link_ [Security Considerations](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#security-considerations)

Permissioning proxy target changes is the primary consideration here.
Use of the [SRC-5; Ownership Standard](https://docs.fuel.network/docs/sway-standards/src-5-ownership/) is discouraged. If both the target and proxy contracts implement the [SRC-5](https://docs.fuel.network/docs/sway-standards/src-5-ownership/) standard, the `owner()` function in the target contract is unreachable through the proxy contract. Use of the `proxy_owner()` function in the proxy contract should be used instead.

## _Icon Link_ [Example ABI](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#example-abi)

```fuel_Box fuel_Box-idXKMmm-css
abi SRC14 {
    #[storage(read, write)]
    fn set_proxy_target(new_target: ContractId);
    #[storage(read)]
    fn proxy_target() -> Option<ContractId>;
}

abi SRC14Extension {
    #[storage(read)]
    fn proxy_owner() -> State;
}
```

_Icon ClipboardText_

## _Icon Link_ [Example Implementation](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#example-implementation)

## _Icon Link_ [Minimal Proxy](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#minimal-proxy)

Example of a minimal SRC-14 implementation with no access control.

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::execution::run_external;
use standards::src14::{SRC14, SRC14_TARGET_STORAGE};

storage {
    SRC14 {
        /// The [ContractId] of the target contract.
        ///
        /// # Additional Information
        ///
        /// `target` is stored at sha256("storage_SRC14_0")
        target in 0x7bb458adc1d118713319a5baa00a2d049dd64d2916477d2688d76970c898cd55: ContractId = ContractId::zero(),
    },
}

impl SRC14 for Contract {
    #[storage(read, write)]
    fn set_proxy_target(new_target: ContractId) {
        storage::SRC14.target.write(new_target);
    }

    #[storage(read)]
    fn proxy_target() -> Option<ContractId> {
        storage::SRC14.target.try_read()
    }
}

#[fallback]
#[storage(read)]
fn fallback() {
    // pass through any other method call to the target
    run_external(storage::SRC14.target.read())
}

```

Collapse_Icon ClipboardText_

## _Icon Link_ [Owned Proxy](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/\#owned-proxy)

Example of a SRC-14 implementation that also implements `proxy_owner()`.

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::execution::run_external;
use standards::src5::{AccessError, State};
use standards::src14::{SRC14, SRC14_TARGET_STORAGE, SRC14Extension};

/// The owner of this contract at deployment.
#[allow(dead_code)]
const INITIAL_OWNER: Identity = Identity::Address(Address::zero());

storage {
    SRC14 {
        /// The [ContractId] of the target contract.
        ///
        /// # Additional Information
        ///
        /// `target` is stored at sha256("storage_SRC14_0")
        target in 0x7bb458adc1d118713319a5baa00a2d049dd64d2916477d2688d76970c898cd55: ContractId = ContractId::zero(),
        /// The [State] of the proxy owner.
        owner: State = State::Initialized(INITIAL_OWNER),
    },
}

impl SRC14 for Contract {
    #[storage(read, write)]
    fn set_proxy_target(new_target: ContractId) {
        only_owner();
        storage::SRC14.target.write(new_target);
    }

    #[storage(read)]
    fn proxy_target() -> Option<ContractId> {
        storage::SRC14.target.try_read()
    }
}

impl SRC14Extension for Contract {
    #[storage(read)]
    fn proxy_owner() -> State {
        storage::SRC14.owner.read()
    }
}

#[fallback]
#[storage(read)]
fn fallback() {
    // pass through any other method call to the target
    run_external(storage::SRC14.target.read())
}

#[storage(read)]
fn only_owner() {
    require(
        storage::SRC14
            .owner
            .read() == State::Initialized(msg_sender().unwrap()),
        AccessError::NotOwner,
    );
}

```

Collapse_Icon ClipboardText_