[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Plugins](https://docs.fuel.network/docs/nightly/forc/plugins/) /

Forc Fmt

## _Icon Link_ [Forc](https://docs.fuel.network/docs/nightly/forc/plugins/forc_fmt/\#forc-fmt)

Usage: forc-fmt \[OPTIONS\]

Options:

`-c`, `--check`

Run in 'check' mode.

- Exits with `0` if input is formatted correctly. - Exits with `1` and prints a diff if formatting is required.

`-p`, `--path` < _PATH_ \>

Path to the project.

If not specified, current working directory will be used.

`-f`, `--file` < _FILE_ \>

Formats a single .sw file with the default settings. If not specified, current working directory will be formatted using a Forc.toml configuration

`-h`, `--help`

Print help (see a summary with '-h')

`-V`, `--version`

Print version

EXAMPLES:

## _Icon Link_ [Run the formatter in check mode on the current directory](https://docs.fuel.network/docs/nightly/forc/plugins/forc_fmt/\#forc-fmt)

forc fmt --check

## _Icon Link_ [Run the formatter in check mode on the current directory with short format](https://docs.fuel.network/docs/nightly/forc/plugins/forc_fmt/\#forc-fmt)

forc fmt -c

## _Icon Link_ [Run formatter against a given file](https://docs.fuel.network/docs/nightly/forc/plugins/forc_fmt/\#forc-fmt)

forc fmt --file {path}/src/main.sw

## _Icon Link_ [Run formatter against a given file with short format](https://docs.fuel.network/docs/nightly/forc/plugins/forc_fmt/\#forc-fmt)

forc fmt -f {path}/src/main.sw

## _Icon Link_ [Run formatter against a given dir](https://docs.fuel.network/docs/nightly/forc/plugins/forc_fmt/\#forc-fmt)

forc fmt --path {path}

## _Icon Link_ [Run formatter against a given dir with short format](https://docs.fuel.network/docs/nightly/forc/plugins/forc_fmt/\#forc-fmt)

forc fmt -p {path}