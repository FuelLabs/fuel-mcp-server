[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway by Example Lib](https://docs.fuel.network/docs/nightly/sway-by-example-lib/) /

Imports

## _Icon Link_ [Imports](https://docs.fuel.network/docs/nightly/sway-by-example-lib/imports/\#imports)

Examples of imports in Sway

```fuel_Box fuel_Box-idXKMmm-css
contract;

// Imports
// - Internal
mod imports_library;
use imports_library::*;

// - External
use math_lib::full_math::*;

// - Standard library (std)
use std::{
    identity::*,
    auth::msg_sender,
};

// - Sway standards
use standards::src20::SRC20;

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}

```

_Icon ClipboardText_

## _Icon Link_ [Project Structures](https://docs.fuel.network/docs/nightly/sway-by-example-lib/imports/\#project-structures)

## _Icon Link_ [Internal](https://docs.fuel.network/docs/nightly/sway-by-example-lib/imports/\#internal)

```fuel_Box fuel_Box-idXKMmm-css

└── imports
    ├── Forc.toml
    └── src
        ├── imports_library.sw
        └── main.sw

```

_Icon ClipboardText_

## _Icon Link_ [External](https://docs.fuel.network/docs/nightly/sway-by-example-lib/imports/\#external)

```fuel_Box fuel_Box-idXKMmm-css

├── imports
│   ├── Forc.toml
│   └── src
│       ├── imports_library.sw
│       └── main.sw
└── math_lib
    ├── Forc.toml
    └── src
        ├── Q64x64.sw
        ├── full_math.sw
        └── math_lib.sw

```

_Icon ClipboardText_

All external imports must be defined as dependencies within `Forc.toml`

```fuel_Box fuel_Box-idXKMmm-css
[project]
authors = ["Kin Chan"]
entry = "main.sw"
license = "Apache-2.0"
name = "imports"

[dependencies]
standards = { git = "https://github.com/FuelLabs/sway-standards", tag = "v0.5.1" }
math_lib = { path = "../math_lib/" }

```

_Icon ClipboardText_