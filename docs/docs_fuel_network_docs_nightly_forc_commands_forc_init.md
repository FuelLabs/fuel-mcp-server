[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Commands](https://docs.fuel.network/docs/nightly/forc/commands/) /

Forc Init

## _Icon Link_ [Create](https://docs.fuel.network/docs/nightly/forc/commands/forc_init/\#forc-init)

Usage: forc init \[OPTIONS\]

Options:

`--path` < _PATH_ \>

The directory in which the forc project will be initialized

`--contract`

The default program type, excluding all flags or adding this flag creates a basic contract program

`--script`

Create a package with a script target (src/main.sw)

`--predicate`

Create a package with a predicate target (src/predicate.rs)

`--library`

Create a package with a library target (src/lib.sw)

`--workspace`

Adding this flag creates an empty workspace

`--name` < _NAME_ \>

Set the package name. Defaults to the directory name

`-v`, `--verbose...`

Use verbose output

`-s`, `--silent`

Silence all output

`-L`, `--log-level` < _LOG\_LEVEL_ \>

Set the log level

`-h`, `--help`

Print help

`-V`, `--version`

Print version

EXAMPLES:

## _Icon Link_ [Initialize a new Forc project](https://docs.fuel.network/docs/nightly/forc/commands/forc_init/\#forc-init)

forc init --path

## _Icon Link_ [Initialize a new Forc project as workspace](https://docs.fuel.network/docs/nightly/forc/commands/forc_init/\#forc-init)

forc init --path --workspace

## _Icon Link_ [Initialize a new Forc project with a predicate](https://docs.fuel.network/docs/nightly/forc/commands/forc_init/\#forc-init)

forc init --path --predicate

## _Icon Link_ [Initialize a new Forc library project](https://docs.fuel.network/docs/nightly/forc/commands/forc_init/\#forc-init)

forc init --path --library

## _Icon Link_ [EXAMPLE](https://docs.fuel.network/docs/nightly/forc/commands/forc_init/\#forc-init)

```fuel_Box fuel_Box-idXKMmm-css
$ mkdir my-fuel-project
$ cd my-fuel-project
$ forc init
$ tree
.
├── Forc.toml
└── src
    └── main.sw

```

_Icon ClipboardText_

`Forc.toml` is the Forc manifest file, containing information about the project and dependencies.

A `src/` directory is created, with a single `main.sw` Sway file in it.