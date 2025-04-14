[Docs](https://docs.fuel.network/) /

[Forc](https://docs.fuel.network/docs/forc/) /

[Commands](https://docs.fuel.network/docs/forc/commands/) /

Forc New

## _Icon Link_ [Create](https://docs.fuel.network/docs/forc/commands/forc%5fnew/\#forc-new)

Usage: forc new \[OPTIONS\]

Arguments:

< _PATH_ \>

The path at which the project directory will be created

Options:

`--contract`

The default program type. Excluding all flags or adding this flag creates a basic contract program

`--script`

Adding this flag creates an empty script program

`--predicate`

Adding this flag creates an empty predicate program

`--library`

Adding this flag creates an empty library program

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

## _Icon Link_ [Create a new project](https://docs.fuel.network/docs/forc/commands/forc%5fnew/\#forc-new)

forc new --contract --name my\_project

## _Icon Link_ [Create a new workspace](https://docs.fuel.network/docs/forc/commands/forc%5fnew/\#forc-new)

forc new --workspace --name my\_workspace

## _Icon Link_ [Create a new Forc project with a predicate](https://docs.fuel.network/docs/forc/commands/forc%5fnew/\#forc-new)

forc new --predicate

## _Icon Link_ [Create a new Forc library project](https://docs.fuel.network/docs/forc/commands/forc%5fnew/\#forc-new)

forc new --library

## _Icon Link_ [EXAMPLE](https://docs.fuel.network/docs/forc/commands/forc%5fnew/\#forc-new)

```fuel_Box fuel_Box-idXKMmm-css
$ forc new my-fuel-project
$ cd my-fuel-project
$ tree
.
├── Forc.toml
└── src
    └── main.sw

```

_Icon ClipboardText_

`Forc.toml` is the Forc manifest file, containing information about the project and dependencies.

A `src/` directory is created, with a single `main.sw` Sway file in it.