[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Commands](https://docs.fuel.network/docs/nightly/forc/commands/) /

Forc Template

## _Icon Link_ [Create](https://docs.fuel.network/docs/nightly/forc/commands/forc%5ftemplate/\#forc-template)

Usage: forc template \[OPTIONS\] <PROJECT\_NAME>

Arguments:

< _PROJECT\_NAME_ \>

The name of the project that will be created

Options:

`-u`, `--url` < _URL_ \>

The template url, should be a git repo \[default: https://github.com/fuellabs/sway\]

`-t`, `--template-name` < _TEMPLATE\_NAME_ \>

The name of the template that needs to be fetched and used from git repo provided

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

## _Icon Link_ [Create a new Forc project from an option template](https://docs.fuel.network/docs/nightly/forc/commands/forc%5ftemplate/\#forc-template)

forc template new-path --template-name option

## _Icon Link_ [EXAMPLE](https://docs.fuel.network/docs/nightly/forc/commands/forc%5ftemplate/\#forc-template)

```fuel_Box fuel_Box-idXKMmm-css
forc template --url https://github.com/owner/template/ --project_name my_example_project

```

_Icon ClipboardText_

The command above fetches the `HEAD` of the `template` repo and searches for `Forc.toml` at the root of the fetched repo. It will fetch the repo and prepare a new `Forc.toml` with the new project name. Outputs everything to `current_dir/project_name`.

```fuel_Box fuel_Box-idXKMmm-css
forc template --url https://github.com/FuelLabs/sway --template_name counter --project_name my_example_project

```

_Icon ClipboardText_

The command above fetches the HEAD of the `sway` repo and searches for `counter` example inside it (there is an example called `counter` under `sway/examples`). It will fetch the `counter` example and prepare a new `Forc.toml` with the new project name. Outputs everything to `current_dir/project_name`.