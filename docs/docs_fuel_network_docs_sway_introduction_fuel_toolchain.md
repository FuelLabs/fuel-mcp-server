[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Introduction](https://docs.fuel.network/docs/sway/introduction/) /

Fuel Toolchain

## _Icon Link_ [The Fuel Toolchain](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/\#the-fuel-toolchain)

The Fuel toolchain consists of several components.

## _Icon Link_ [Forc ( `forc`)](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/\#forc-forc)

The "Fuel Orchestrator" [Forc _Icon Link_](https://github.com/FuelLabs/sway/tree/v0.67.0/forc) is our equivalent of Rust's [Cargo _Icon Link_](https://doc.rust-lang.org/cargo/). It is the primary entry point for creating, building, testing, and deploying Sway projects.

## _Icon Link_ [Sway Language Server ( `forc-lsp`)](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/\#sway-language-server-forc-lsp)

The Sway Language Server `forc-lsp` is provided to expose features to IDEs. [Installation instructions](https://docs.fuel.network/docs/sway/lsp/installation/).

## _Icon Link_ [Sway Formatter ( `forc-fmt`)](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/\#sway-formatter-forc-fmt)

A canonical formatter is provided with `forc-fmt`. [Installation instructions](https://docs.fuel.network/docs/sway/introduction/getting_started/). It can be run manually with

```fuel_Box fuel_Box-idXKMmm-css
forc fmt
```

_Icon ClipboardText_

The [Visual Studio Code plugin _Icon Link_](https://marketplace.visualstudio.com/items?itemName=FuelLabs.sway-vscode-plugin) will
automatically format Sway files with `forc-fmt` on save, though you might have to explicitly set the Sway plugin as the
default formatter, like this:

```fuel_Box fuel_Box-idXKMmm-css
"[sway]": {
  "editor.defaultFormatter": "FuelLabs.sway-vscode-plugin"
}
```

_Icon ClipboardText_

## _Icon Link_ [Fuel Core ( `fuel-core`)](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/\#fuel-core-fuel-core)

An implementation of the Fuel protocol, [Fuel Core _Icon Link_](https://github.com/FuelLabs/fuel-core), is provided together with the _Sway toolchain_ to form the _Fuel toolchain_. [The Rust SDK _Icon Link_](https://github.com/FuelLabs/fuels-rs) will automatically start and stop an instance of the node during tests, so there is no need to manually run a node unless using Forc directly without the SDK.