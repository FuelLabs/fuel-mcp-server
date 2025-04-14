[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Commands](https://docs.fuel.network/docs/nightly/forc/commands/) /

Forc Check

## _Icon Link_ [Check](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcheck/\#forc-check)

This will essentially compile the packages without performing the final step of code generation, which is faster than running forc build.

Usage: forc check \[OPTIONS\] \[BUILD\_TARGET\]

Arguments: \[BUILD\_TARGET\] Build target to use for code generation

\[default: fuel\] \[possible values: fuel, evm\]

Options:

`-p`, `--path` < _PATH_ \>

Path to the project, if not specified, current working directory will be used

`--offline`

Offline mode, prevents Forc from using the network when managing dependencies. Meaning it will only try to use previously downloaded dependencies

`--locked`

Requires that the Forc.lock file is up-to-date. If the lock file is missing, or it needs to be updated, Forc will exit with an error

`-t`, `--terse`

Terse mode. Limited warning and error output

`--disable-tests`

Disable checking unit tests

`--ipfs-node` < _IPFS\_NODE_ \>

The IPFS Node to use for fetching IPFS sources.

Possible values: PUBLIC, LOCAL, <GATEWAY\_URL>

`--experimental` < _EXPERIMENTAL_ \>

Comma separated list of all experimental features that will be enabled

\[possible values: new\_encoding, references, error\_type, const\_generics\]

`--no-experimental` < _NO\_EXPERIMENTAL_ \>

Comma separated list of all experimental features that will be disabled

\[possible values: new\_encoding, references, error\_type, const\_generics\]

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

## _Icon Link_ [Check the current project](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcheck/\#forc-check)

forc check

## _Icon Link_ [Check the current project with a different path](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcheck/\#forc-check)

forc check --path

## _Icon Link_ [Check the current project without updating dependencies](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcheck/\#forc-check)

forc check --locked