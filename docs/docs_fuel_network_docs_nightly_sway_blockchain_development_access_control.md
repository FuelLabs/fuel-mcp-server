[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Blockchain Development](https://docs.fuel.network/docs/nightly/sway/blockchain-development/) /

Access Control

## _Icon Link_ [Access Control](https://docs.fuel.network/docs/nightly/sway/blockchain-development/access_control/\#access-control)

Smart contracts require the ability to restrict access to and identify certain users or contracts. Unlike account-based blockchains, transactions in UTXO-based blockchains (i.e. Fuel) do not necessarily have a unique transaction sender. Additional logic is needed to handle this difference, and is provided by the standard library.

## _Icon Link_ [`msg_sender`](https://docs.fuel.network/docs/nightly/sway/blockchain-development/access_control/\#msg_sender)

To deliver an experience akin to the EVM's access control, the `std` library provides a `msg_sender` function, which identifies a unique caller based upon the call and/or transaction input data.

```fuel_Box fuel_Box-idXKMmm-css
contract;

abi MyOwnedContract {
    fn receive(field_1: u64) -> bool;
}

const OWNER = Address::from(0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c);

impl MyOwnedContract for Contract {
    fn receive(field_1: u64) -> bool {
        let sender = msg_sender().unwrap();
        if let Identity::Address(addr) = sender {
            assert(addr == OWNER);
        } else {
            revert(0);
        }

        true
    }
}

```

_Icon ClipboardText_

The `msg_sender` function works as follows:

- If the caller is a contract, then `Ok(Sender)` is returned with the `ContractId` sender variant.
- If the caller is external (i.e. from a script), then all coin input owners in the transaction are checked. If all owners are the same, then `Ok(Sender)` is returned with the `Address` sender variant.
- If the caller is external and coin input owners are different, then the caller cannot be determined and a `Err(AuthError)` is returned.

## _Icon Link_ [Contract Ownership](https://docs.fuel.network/docs/nightly/sway/blockchain-development/access_control/\#contract-ownership)

Many contracts require some form of ownership for access control. The [SRC-5 Ownership Standard](https://docs.fuel.network/docs/nightly/sway-standards/src-5-ownership/) has been defined to provide an interoperable interface for ownership within contracts.

To accomplish this, use the [Ownership Library](https://docs.fuel.network/docs/nightly/sway-libs/ownership/) to keep track of the owner. This allows setting and revoking ownership using the variants `Some(..)` and `None` respectively. This is better, safer, and more readable than using the `Identity` type directly where revoking ownership has to be done using some magic value such as `b256::zero()` or otherwise.

- The following is an example of how to properly lock a function such that only the owner may call a function:

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn only_owner() {
    storage.owner.only_owner();
    // Do stuff here
}
```

_Icon ClipboardText_

Setting ownership can be done in one of two ways; During compile time or run time.

- The following is an example of how to properly set ownership of a contract during compile time:

```fuel_Box fuel_Box-idXKMmm-css
storage {
    owner: Ownership = Ownership::initialized(Identity::Address(Address::zero())),
}
```

_Icon ClipboardText_

- The following is an example of how to properly set ownership of a contract during run time:

```fuel_Box fuel_Box-idXKMmm-css
#[storage(write)]
fn set_owner(identity: Identity) {
    storage.owner.set_ownership(identity);
}
```

_Icon ClipboardText_

- The following is an example of how to properly revoke ownership of a contract:

```fuel_Box fuel_Box-idXKMmm-css
#[storage(write)]
fn revoke_ownership() {
    storage.owner.renounce_ownership();
}
```

_Icon ClipboardText_

- The following is an example of how to properly retrieve the state of ownership:

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn owner() -> State {
    storage.owner.owner()
}
```

_Icon ClipboardText_

## _Icon Link_ [Access Control Libraries](https://docs.fuel.network/docs/nightly/sway/blockchain-development/access_control/\#access-control-libraries)

[Sway-Libs](https://docs.fuel.network/docs/nightly/sway/reference/sway_libs/) provides the following libraries to enable further access control.

- [Ownership Library](https://docs.fuel.network/docs/nightly/sway-libs/ownership/); used to apply restrictions on functions such that only a **single** user may call them. This library provides helper functions for the [SRC-5; Ownership Standard](https://docs.fuel.network/docs/nightly/sway-standards/src-5-ownership/).
- [Admin Library](https://docs.fuel.network/docs/nightly/sway-libs/admin/); used to apply restrictions on functions such that only a select few users may call them like a whitelist.
- [Pausable Library](https://docs.fuel.network/docs/nightly/sway-libs/pausable/); allows contracts to implement an emergency stop mechanism.
- [Reentrancy Guard Library](https://docs.fuel.network/docs/nightly/sway-libs/reentrancy/); used to detect and prevent reentrancy attacks.