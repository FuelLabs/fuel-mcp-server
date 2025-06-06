[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway Libs](https://docs.fuel.network/docs/nightly/sway-libs/) /

Admin

## _Icon Link_ [Admin Library](https://docs.fuel.network/docs/nightly/sway-libs/admin/\#admin-library)

The Admin library provides a way to block users without an "administrative status" from calling functions within a contract. The Admin Library differs from the [Ownership Library](https://docs.fuel.network/docs/nightly/sway-libs/ownership/) as multiple users may have administrative status. The Admin Library is often used when needing administrative calls on a contract that involve multiple users or a whitelist.

This library extends the [Ownership Library](https://docs.fuel.network/docs/nightly/sway-libs/ownership/). The Ownership library must be imported and used to enable the Admin library. Only the contract's owner may add and remove administrative users.

For implementation details on the Admin Library please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/admin/index.html).

## _Icon Link_ [Importing the Admin Library](https://docs.fuel.network/docs/nightly/sway-libs/admin/\#importing-the-admin-library)

In order to use the Admin Library, Sway Libs must be added to the `Forc.toml` file and then imported into your Sway project. To add Sway Libs as a dependency to the `Forc.toml` file in your project please see the [Getting Started](https://docs.fuel.network/docs/nightly/sway-libs/getting_started/).

To import the Admin Library, be sure to include both the Admin and Ownership Libraries in your import statements.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::{admin::*, ownership::*};
```

_Icon ClipboardText_

## _Icon Link_ [Integrating the Admin Library into the Ownership Library](https://docs.fuel.network/docs/nightly/sway-libs/admin/\#integrating-the-admin-library-into-the-ownership-library)

To use the Admin library, be sure to set a contract owner for your contract. The following demonstrates setting a contract owner using the [Ownership Library](https://docs.fuel.network/docs/nightly/sway-libs/ownership/).

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::{admin::add_admin, ownership::initialize_ownership};

#[storage(read, write)]
fn my_constructor(new_owner: Identity) {
    initialize_ownership(new_owner);
}

#[storage(read, write)]
fn add_a_admin(new_admin: Identity) {
    // Can only be called by contract's owner set in the constructor above.
    add_admin(new_admin);
}
```

_Icon ClipboardText_

## _Icon Link_ [Basic Functionality](https://docs.fuel.network/docs/nightly/sway-libs/admin/\#basic-functionality)

## _Icon Link_ [Adding an Admin](https://docs.fuel.network/docs/nightly/sway-libs/admin/\#adding-an-admin)

To add a new admin to a contract, call the `add_admin()` function.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn add_a_admin(new_admin: Identity) {
    // Can only be called by contract's owner.
    add_admin(new_admin);
}
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE** Only the contract's owner may call this function. Please see the example above to set a contract owner.

## _Icon Link_ [Removing an Admin](https://docs.fuel.network/docs/nightly/sway-libs/admin/\#removing-an-admin)

To remove an admin from a contract, call the `revoke_admin()` function.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn remove_an_admin(old_admin: Identity) {
    // Can only be called by contract's owner.
    revoke_admin(old_admin);
}
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE** Only the contract's owner may call this function. Please see the example above to set a contract owner.

## _Icon Link_ [Applying Restrictions](https://docs.fuel.network/docs/nightly/sway-libs/admin/\#applying-restrictions)

To restrict a function to only an admin, call the `only_admin()` function.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn only_owner_may_call() {
    only_admin();
    // Only an admin may reach this line.
}
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE:** Admins and the contract's owner are independent of one another. `only_admin()` will revert if called by the contract's owner.

To restrict a function to only an admin or the contract's owner, call the `only_owner_or_admin()` function.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn both_owner_or_admin_may_call() {
    only_owner_or_admin();
    // Only an admin may reach this line.
}
```

_Icon ClipboardText_

## _Icon Link_ [Checking Admin Status](https://docs.fuel.network/docs/nightly/sway-libs/admin/\#checking-admin-status)

To check the administrative privileges of a user, call the `is_admin()` function.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn check_if_admin(admin: Identity) {
    let status = is_admin(admin);
    assert(status);
}
```

_Icon ClipboardText_