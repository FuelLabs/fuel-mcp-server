[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[LSP](https://docs.fuel.network/docs/nightly/sway/lsp/) /

Troubleshooting

## _Icon Link_ [Troubleshooting](https://docs.fuel.network/docs/nightly/sway/lsp/troubleshooting/\#troubleshooting)

First, confirm you are running the most recent version:

```fuel_Box fuel_Box-idXKMmm-css
fuelup toolchain install latest
fuelup update
forc-lsp --version
```

_Icon ClipboardText_

Second, confirm that your `$PATH` resolves to the `forc-lsp` binary in `$HOME/.fuelup/bin`.

```fuel_Box fuel_Box-idXKMmm-css
which forc-lsp
```

_Icon ClipboardText_

## _Icon Link_ [Slow Performance](https://docs.fuel.network/docs/nightly/sway/lsp/troubleshooting/\#slow-performance)

If you are experiencing slow performance, you can try the following:

Follow [the steps above](https://docs.fuel.network/docs/nightly/sway/lsp/troubleshooting/#troubleshooting) to ensure you are running the most recent version.

Then, make sure you only have the most recent version of the LSP server running.

```fuel_Box fuel_Box-idXKMmm-css
pkill forc-lsp
```

_Icon ClipboardText_

## _Icon Link_ [Large projects](https://docs.fuel.network/docs/nightly/sway/lsp/troubleshooting/\#large-projects)

Sway projects with ten or more Sway files are likely to have slower LSP performance. We are working on better support for large projects.

In the meantime, if it's too slow, you can disable the LSP server entirely with the `sway-lsp.diagnostic.disableLsp` setting. The extension will still provide basic syntax highlighting, command palettes, as well as the Sway debugger, but all other language features will be disabled.

## _Icon Link_ [Server Logs](https://docs.fuel.network/docs/nightly/sway/lsp/troubleshooting/\#server-logs)

You can enable verbose logging of the LSP server.

In VSCode, this is under the setting:

```fuel_Box fuel_Box-idXKMmm-css
"sway-lsp.trace.server": "verbose"
```

_Icon ClipboardText_

Once enabled, you can find this in the output window under Sway Language Server.

For other editors, see [Installation](https://docs.fuel.network/docs/nightly/sway/lsp/installation/) for links to documentation.