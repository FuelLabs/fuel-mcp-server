[Docs](https://docs.fuel.network/) /

[Forc](https://docs.fuel.network/docs/forc/) /

[Plugins](https://docs.fuel.network/docs/forc/plugins/) /

Forc Doc

## _Icon Link_ [Forc](https://docs.fuel.network/docs/forc/plugins/forc_doc/\#forc-doc)

Usage: forc-doc \[OPTIONS\]

Options:

`-p`, `--path` < _PATH_ \>

Path to the project.

If not specified, current working directory will be used.

`--document-private-items`

Include non-public items in the documentation

`--open`

Open the docs in a browser after building them

`--offline`

Offline mode, prevents Forc from using the network when managing dependencies. Meaning it will only try to use previously downloaded dependencies

`--locked`

Requires that the Forc.lock file is up-to-date. If the lock file is missing, or it needs to be updated, Forc will exit with an error

`--no-deps`

Do not build documentation for dependencies

`--ipfs-node` < _IPFS\_NODE_ \>

The IPFS Node to use for fetching IPFS sources.

Possible values: PUBLIC, LOCAL, <GATEWAY\_URL>

`--experimental` < _EXPERIMENTAL_ \>

Comma separated list of all experimental features that will be enabled

\[possible values: new\_encoding, references, error\_type, const\_generics\]

`--no-experimental` < _NO\_EXPERIMENTAL_ \>

Comma separated list of all experimental features that will be disabled

\[possible values: new\_encoding, references, error\_type, const\_generics\]

`-s`, `--silent`

Silent mode. Don't output any warnings or errors to the command line

`-h`, `--help`

Print help (see a summary with '-h')

`-V`, `--version`

Print version

EXAMPLES:

## _Icon Link_ [Build the docs for a project in the current path](https://docs.fuel.network/docs/forc/plugins/forc_doc/\#forc-doc)

forc doc

## _Icon Link_ [Build the docs for a project in the current path and open it in the browser](https://docs.fuel.network/docs/forc/plugins/forc_doc/\#forc-doc)

forc doc --open

## _Icon Link_ [Build the docs for a project located in another path](https://docs.fuel.network/docs/forc/plugins/forc_doc/\#forc-doc)

forc doc --path {path}

## _Icon Link_ [Build the docs for the current project exporting private types](https://docs.fuel.network/docs/forc/plugins/forc_doc/\#forc-doc)

forc doc --document-private-items

## _Icon Link_ [Build the docs offline without downloading any dependencies](https://docs.fuel.network/docs/forc/plugins/forc_doc/\#forc-doc)

forc doc --offline