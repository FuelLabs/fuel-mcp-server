[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Commands](https://docs.fuel.network/docs/nightly/forc/commands/) /

Forc Update

## _Icon Link_ [Update](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fupdate/\#forc-update)

Usage: forc update \[OPTIONS\]

Options:

`-p`, `--path` < _PATH_ \>

Path to the project, if not specified, current working directory will be used

`-d` < _TARGET\_DEPENDENCY_ \>

Dependency to be updated. If not set, all dependencies will be updated

`-c`, `--check`

Checks if the dependencies have newer versions. Won't actually perform the update, will output which ones are up-to-date and outdated

`--ipfs-node` < _IPFS\_NODE_ \>

The IPFS Node to use for fetching IPFS sources.

Possible values: PUBLIC, LOCAL, <GATEWAY\_URL>

`-v`, `--verbose...`

Use verbose output

`-s`, `--silent`

Silence all output

`-L`, `--log-level` < _LOG\_LEVEL_ \>

Set the log level

`-h`, `--help`

Print help (see a summary with '-h')

`-V`, `--version`

Print version

EXAMPLES:

## _Icon Link_ [Update dependencies](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fupdate/\#forc-update)

forc update

## _Icon Link_ [Update a specific dependency](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fupdate/\#forc-update)

forc update -d std

## _Icon Link_ [Check if dependencies have newer versions](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fupdate/\#forc-update)

forc update --check