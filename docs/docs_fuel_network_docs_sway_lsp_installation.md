[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[LSP](https://docs.fuel.network/docs/sway/lsp/) /

Installation

## _Icon Link_ [Installation](https://docs.fuel.network/docs/sway/lsp/installation/\#installation)

The Sway language server is contained in the [`forc-lsp`](https://docs.fuel.network/docs/forc/plugins/forc_lsp/) binary, which is installed as part of the [Fuel toolchain](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/). Once installed, it can be used with a variety of IDEs. It must be installed for any of the IDE plugins to work.

> _Icon InfoCircle_
>
> **Note**: There is no need to manually run `forc-lsp` (the plugin will automatically start it), however both `forc` and `forc-lsp` must be in your `$PATH`. To check if `forc` is in your `$PATH`, type `forc --help` in your terminal.

## _Icon Link_ [VSCode](https://docs.fuel.network/docs/sway/lsp/installation/\#vscode)

This is the best supported editor at the moment.

You can install the latest release of the plugin from the [marketplace _Icon Link_](https://marketplace.visualstudio.com/items?itemName=FuelLabs.sway-vscode-plugin).

Note that we only support the most recent version of VS Code.

## _Icon Link_ [Code OSS (VSCode on Linux)](https://docs.fuel.network/docs/sway/lsp/installation/\#code-oss-vscode-on-linux)

1. Install [code-marketplace _Icon Link_](https://aur.archlinux.org/packages/code-marketplace) to get access to all of the extensions in the VSCode marketplace.
2. Install the [Sway _Icon Link_](https://marketplace.visualstudio.com/items?itemName=FuelLabs.sway-vscode-plugin) extension.

## _Icon Link_ [vim / neovim](https://docs.fuel.network/docs/sway/lsp/installation/\#vim--neovim)

Follow the documentation for [sway.vim _Icon Link_](https://github.com/FuelLabs/sway.vim) to install.

## _Icon Link_ [helix](https://docs.fuel.network/docs/sway/lsp/installation/\#helix)

[Install helix _Icon Link_](https://docs.helix-editor.com/install.html) and Sway LSP will work out of the box.

Sway support is built into helix using [tree-sitter-sway _Icon Link_](https://github.com/FuelLabs/tree-sitter-sway).

## _Icon Link_ [Emacs](https://docs.fuel.network/docs/sway/lsp/installation/\#emacs)

Coming soon! Feel free to [contribute _Icon Link_](https://github.com/FuelLabs/sway/issues/3527).