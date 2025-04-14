[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway Libs](https://docs.fuel.network/docs/nightly/sway-libs/) /

Getting Started

## _Icon Link_ [Getting Started](https://docs.fuel.network/docs/nightly/sway-libs/getting_started/\#getting-started)

## _Icon Link_ [Adding Sway Libs as a Dependency](https://docs.fuel.network/docs/nightly/sway-libs/getting_started/\#adding-sway-libs-as-a-dependency)

To import any library, the following dependency should be added to the project's `Forc.toml` file under `[dependencies]`.

```fuel_Box fuel_Box-idXKMmm-css
sway_libs = { git = "https://github.com/FuelLabs/sway-libs", tag = "v0.24.2" }
```

_Icon ClipboardText_

For reference, here is a complete `Forc.toml` file:

```fuel_Box fuel_Box-idXKMmm-css
[project]
authors = ["Fuel Labs <contact@fuel.sh>"]
entry = "main.sw"
license = "Apache-2.0"
name = "MyProject"

[dependencies]
sway_libs = { git = "https://github.com/FuelLabs/sway-libs", tag = "v0.24.2" }
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE:** Be sure to set the tag to the latest release.

## _Icon Link_ [Importing Sway Libs to Your Project](https://docs.fuel.network/docs/nightly/sway-libs/getting_started/\#importing-sway-libs-to-your-project)

Once Sway Libs is a dependency to your project, you may then import a library in your Sway Smart Contract as so:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::<library>::<library_function>;
```

_Icon ClipboardText_

For example, to import the `only_owner()` from the Ownership Library, use the following statement at the top of your Sway file:

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::ownership::only_owner;
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE:**
> All projects currently use `forc 0.66.6`, `fuels-rs v0.66.6` and `fuel-core 0.40.0`.

## _Icon Link_ [Using Sway Libs](https://docs.fuel.network/docs/nightly/sway-libs/getting_started/\#using-sway-libs)

Once the library you require has been imported to your project, you may call or use any functions and structures the library provides.

In the following example, we import the Pausable Library and implement the `Pausable` ABI with it's associated functions.

```fuel_Box fuel_Box-idXKMmm-css
use sway_libs::pausable::{_is_paused, _pause, _unpause, Pausable};

// Implement the Pausable ABI for our contract
impl Pausable for Contract {
    #[storage(write)]
    fn pause() {
        _pause(); // Call the provided pause function.
    }

    #[storage(write)]
    fn unpause() {
        _unpause(); // Call the provided unpause function.
    }

    #[storage(read)]
    fn is_paused() -> bool {
        _is_paused() // Call the provided is paused function.
    }
}
```

_Icon ClipboardText_

Any instructions related to using a specific library should be found within the [libraries](https://docs.fuel.network/docs/nightly/sway-libs/) section of the Sway Libs Book.

For implementation details on the libraries please see the [Sway Libs Docs _Icon Link_](https://fuellabs.github.io/sway-libs/master/sway_libs/).