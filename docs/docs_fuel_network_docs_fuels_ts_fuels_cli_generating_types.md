[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Fuels CLI](https://docs.fuel.network/docs/fuels-ts/fuels-cli/) /

Generating Types

## _Icon Link_ [Generating Types from ABI](https://docs.fuel.network/docs/fuels-ts/fuels-cli/generating-types/\#generating-types-from-abi)

## _Icon Link_ [Installation](https://docs.fuel.network/docs/fuels-ts/fuels-cli/generating-types/\#installation)

First we install `fuels` to our project:

```fuel_Box fuel_Box-idXKMmm-css
pnpm add fuels@0.100.1
```

_Icon ClipboardText_

## _Icon Link_ [Help](https://docs.fuel.network/docs/fuels-ts/fuels-cli/generating-types/\#help)

A first glance at the docs:

```fuel_Box fuel_Box-idXKMmm-css
$ pnpm fuels typegen -h

Usage: fuels typegen [options]

Generate Typescript from Sway ABI JSON files

Options:
  -i, --inputs <path|glob...>  Input paths/globals to your ABI JSON files
  -o, --output <dir>           Directory path for generated files
  -c, --contract               Generate types for Contracts [default]
  -s, --script                 Generate types for Scripts
  -p, --predicate              Generate types for Predicates
  -S, --silent                 Omit output messages
  -h, --help                   Display help
```

_Icon ClipboardText_

## _Icon Link_ [Generating Types for Contracts](https://docs.fuel.network/docs/fuels-ts/fuels-cli/generating-types/\#generating-types-for-contracts)

You can generate types for a Sway contract using the command below:

```fuel_Box fuel_Box-idXKMmm-css
pnpm fuels typegen -i ./abis/*-abi.json -o ./types
```

_Icon ClipboardText_

The path after the input flag `-i` should point to the file ending in `-abi.json` produced when the contract was built.

The path after the output flag `-o` will be the output directory for the generated types.

You can omit the `--contract` option here since it's the default.

## _Icon Link_ [Generating Types for Scripts](https://docs.fuel.network/docs/fuels-ts/fuels-cli/generating-types/\#generating-types-for-scripts)

To generate types for a Sway script, use the `--script` flag:

```fuel_Box fuel_Box-idXKMmm-css
pnpm fuels typegen -i ./abis/*-abi.json -o ./types --script
```

_Icon ClipboardText_

## _Icon Link_ [Generating Types for Predicates](https://docs.fuel.network/docs/fuels-ts/fuels-cli/generating-types/\#generating-types-for-predicates)

To generate types for a Sway predicate, use the `--predicate` flag:

```fuel_Box fuel_Box-idXKMmm-css
pnpm fuels typegen -i ./abis/*-abi.json -o ./types --predicate
```

_Icon ClipboardText_

* * *

See also:

- [Using Generated Contract Types](https://docs.fuel.network/docs/fuels-ts/fuels-cli/using-generated-types/#contract)
- [Using Generated Script Types](https://docs.fuel.network/docs/fuels-ts/fuels-cli/using-generated-types/#script)
- [Using Generated Predicate Types](https://docs.fuel.network/docs/fuels-ts/fuels-cli/using-generated-types/#predicate)