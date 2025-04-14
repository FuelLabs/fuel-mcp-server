[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Sway Program Types](https://docs.fuel.network/docs/sway/sway-program-types/) /

Libraries

## _Icon Link_ [Libraries](https://docs.fuel.network/docs/sway/sway-program-types/libraries/\#libraries)

Libraries in Sway are files used to define new common behavior.

The most prominent example of this is the [Sway Standard Library](https://docs.fuel.network/docs/sway/introduction/standard_library/) that is made implicitly available to all Forc projects created using `forc new`.

## _Icon Link_ [Writing Libraries](https://docs.fuel.network/docs/sway/sway-program-types/libraries/\#writing-libraries)

Libraries are defined using the `library` keyword at the beginning of a file, followed by a name so that they can be imported.

```fuel_Box fuel_Box-idXKMmm-css
library;

// library code
```

_Icon ClipboardText_

A good reference library to use when learning library design is the [Sway Standard Library](https://docs.fuel.network/docs/sway/introduction/standard_library/). For example, the standard library offers an [implementation _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/option.sw) of `enum Option<T>` which is a generic type that represents either the existence of a value using the variant `Some(..)` or a value's absence using the variant `None`. The [Sway file implementing `Option<T>` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/option.sw) has the following structure:

- The `library` keyword:

```fuel_Box fuel_Box-idXKMmm-css
library;
```

_Icon ClipboardText_

- A `use` statement that imports `revert` from another library _inside_ the standard library:

```fuel_Box fuel_Box-idXKMmm-css
use ::revert::revert;
```

_Icon ClipboardText_

- The `enum` definition which starts with the keyword `pub` to indicate that this `Option<T>` is publicly available _outside_ the `option` library:

```fuel_Box fuel_Box-idXKMmm-css
pub enum Option<T> {
    // variants
}
```

_Icon ClipboardText_

- An `impl` block that implements some methods for `Option<T>`:

```fuel_Box fuel_Box-idXKMmm-css
impl<T> Option<T> {

    fn is_some(self) -> bool {
        // body of is_some
    }

    // other methods
}
```

_Icon ClipboardText_

Now that the library `option` is fully written, and because `Option<T>` is defined with the `pub` keyword, we are now able to import `Option<T>` using `use std::option::Option;` from any Sway project and have access to all of its variants and methods. That being said, `Option` is automatically available in the [standard library prelude](https://docs.fuel.network/docs/sway/introduction/standard_library/#standard-library-prelude) so you never actually have to import it manually.

Libraries are composed of just a `Forc.toml` file and a `src` directory, unlike contracts which usually contain a `tests` directory and a `Cargo.toml` file as well. An example of a library's `Forc.toml`:

```fuel_Box fuel_Box-idXKMmm-css
[project]
authors = ["Fuel Labs <contact@fuel.sh>"]
entry = "lib.sw"
license = "Apache-2.0"
name = "my_library"

[dependencies]
```

_Icon ClipboardText_

which denotes the authors, an entry file, the name by which it can be imported, and any dependencies.

For large libraries, it is recommended to have a `lib.sw` entry point re-export all other sub-libraries.

The `mod` keyword registers a submodule, making its items (such as functions and structs) accessible from the parent library.
If used at the top level it will refer to a file in the `src` folder and in other cases in a folder named after the library in which it is defined.

For example, the `lib.sw` of the standard library looks like:

```fuel_Box fuel_Box-idXKMmm-css
library;

mod block;
mod storage;
mod constants;
mod vm;
// .. Other deps
```

_Icon ClipboardText_

with other libraries contained in the `src` folder, like the `vm` library (inside of `src/vm.sw`):

```fuel_Box fuel_Box-idXKMmm-css
library;

mod evm;
// ...
```

_Icon ClipboardText_

and it's own sub-library `evm` located in `src/vm/evm.sw`:

```fuel_Box fuel_Box-idXKMmm-css
library;

// ...
```

_Icon ClipboardText_

## _Icon Link_ [Using Libraries](https://docs.fuel.network/docs/sway/sway-program-types/libraries/\#using-libraries)

There are two types of Sway libraries, based on their location and how they can be imported.

## _Icon Link_ [Internal Libraries](https://docs.fuel.network/docs/sway/sway-program-types/libraries/\#internal-libraries)

Internal libraries are located within the project's `src` directory alongside
`main.sw` or in the appropriate folders as shown below:

```fuel_Box fuel_Box-idXKMmm-css
$ tree
.
├── Cargo.toml
├── Forc.toml
└── src
    ├── internal_lib.sw
    ├── main.sw
    └── internal_lib
        └── nested_lib.sw
```

_Icon ClipboardText_

As `internal_lib` is an internal library, it can be imported into `main.sw` as follows:

- Use the `mod` keyword followed by the library name to make the internal library a dependency
- Use the `use` keyword with a `::` separating the name of the library and the imported item(s)

```fuel_Box fuel_Box-idXKMmm-css
mod internal_lib; // Assuming the library name in `internal_lib.sw` is `internal_lib`

use internal_lib::mint;

// `mint` from `internal_library` is now available in this file
```

_Icon ClipboardText_

## _Icon Link_ [External Libraries](https://docs.fuel.network/docs/sway/sway-program-types/libraries/\#external-libraries)

External libraries are located outside the main `src` directory as shown below:

```fuel_Box fuel_Box-idXKMmm-css
$ tree
.
├── my_project
│   ├── Cargo.toml
│   ├── Forc.toml
│   └─── src
│       └── main.sw
│
└── external_lib
    ├── Cargo.toml
    ├── Forc.toml
    └─── src
        └── lib.sw
```

_Icon ClipboardText_

As `external_lib` is outside the `src` directory of `my_project`, it needs to be added as a dependency in the `Forc.toml` file of `my_project`, by adding the library path in the `dependencies` section as shown below, before it can be imported:

```fuel_Box fuel_Box-idXKMmm-css
[dependencies]
external_library = { path = "../external_library" }
```

_Icon ClipboardText_

Once the library dependency is added to the `toml` file, you can import items from it as follows:

- Make sure the item you want imported are declared with the `pub` keyword (if applicable, for instance: `pub fn mint() {}`)
- Use the `use` keyword to selectively import items from the library

```fuel_Box fuel_Box-idXKMmm-css
use external_library::mint;

// `mint` from `external_library` is now available in this file
```

_Icon ClipboardText_

Wildcard imports using `*` are supported, but it is generally recommended to use explicit imports where possible.

> _Icon InfoCircle_
>
> **Note**: the standard library is implicitly available to all Forc projects, that is, you are not required to manually specify `std` as an explicit dependency in `Forc.toml`.

## _Icon Link_ [Reference Sway Libraries](https://docs.fuel.network/docs/sway/sway-program-types/libraries/\#reference-sway-libraries)

The repository [`sway-libs` _Icon Link_](https://github.com/FuelLabs/sway-libs/) is a collection of external libraries that you can import and make use of in your Fuel applications. These libraries are meant to be implementations of common use-cases valuable for dapp development.

Some Sway Libraries to try out:

- [Binary Merkle Proof _Icon Link_](https://github.com/FuelLabs/sway-libs/tree/v0.24.2/libs/src/merkle)
- [Signed Integers _Icon Link_](https://github.com/FuelLabs/sway-libs/tree/v0.24.2/libs/src/signed_integers)
- [Ownership _Icon Link_](https://github.com/FuelLabs/sway-libs/tree/v0.24.2/libs/src/ownership)

## _Icon Link_ [Example](https://docs.fuel.network/docs/sway/sway-program-types/libraries/\#example)

You can import and use a Sway Library such as the [Ownership _Icon Link_](https://github.com/FuelLabs/sway-libs/tree/v0.24.2/libs/src/ownership) library just like any other external library.

```fuel_Box fuel_Box-idXKMmm-css
use ownership::Ownership;
```

_Icon ClipboardText_

Once imported, you can use the following basic functionality of the library in your smart contract:

- Declaring an owner
- Changing ownership
- Renouncing ownership
- Ensuring a function may only be called by the owner