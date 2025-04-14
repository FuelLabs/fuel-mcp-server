[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Plugins](https://docs.fuel.network/docs/nightly/forc/plugins/) /

Forc Deploy

## _Icon Link_ [Build](https://docs.fuel.network/docs/nightly/forc/plugins/forc_deploy/\#forc-deploy)

Usage: forc deploy \[OPTIONS\] \[SIGNING\_KEY\]

Arguments: \[SIGNING\_KEY\] Set the key to be used for signing

Options:

`-p`, `--path` < _PATH_ \>

Path to the project.

If not specified, current working directory will be used.

`--offline`

Offline mode.

Prevents Forc from using the network when managing dependencies. Meaning it will only try to use previously downloaded dependencies.

`-t`, `--terse`

Terse mode.

Limited warning and error output.

`--output-directory` < _OUTPUT\_DIRECTORY_ \>

The directory in which Forc output artifacts are placed.

By default, this is `<project-root>/out`.

`--locked`

Requires that the Forc.lock file is up-to-date.

If the lock file is missing, or it needs to be updated, Forc will exit with an error.

`--ipfs-node` < _IPFS\_NODE_ \>

The IPFS node to use for fetching IPFS sources.

\[possible values: PUBLIC, LOCAL, <GATEWAY\_URL>\]

`--json-abi`

Minify JSON ABI files.

By default the JSON for ABIs is formatted for human readability. By using this option JSON output will be "minified", i.e. all on one line without whitespace.

`--json-storage-slots`

Minify JSON storage slot files.

By default the JSON for initial storage slots is formatted for human readability. By using this option JSON output will be "minified", i.e. all on one line without whitespace.

`--ast`

Print the generated Sway AST (Abstract Syntax Tree)

`--dca-graph` < _DCA\_GRAPH_ \>

Print the computed Sway DCA (Dead Code Analysis) graph.

DCA graph is printed to the specified path. If specified '' graph is printed to the stdout.

`--dca-graph-url-format` < _DCA\_GRAPH\_URL\_FORMAT_ \>

URL format to be used in the generated DCA graph .dot file.

Variables {path}, {line}, and {col} can be used in the provided format. An example for vscode would be: "vscode://file/{path}:{line}:{col}"

`--asm` < _ASM>.._ \>

Print the generated ASM (assembler).

Values that can be combined:

- virtual: initial ASM with virtual registers and abstract control flow.
- allocated: ASM with registers allocated, but still with abstract control flow.
- abstract: short for both virtual and allocated ASM.
- final: final ASM that gets serialized to the target VM bytecode.
- all: short for virtual, allocated, and final ASM.

\[possible values: virtual, allocated, abstract, final, all\]

`--bytecode`

Print the bytecode.

This is the final output of the compiler.

`--ir` < _IR>.._ \>

Print the generated Sway IR (Intermediate Representation).

Values that can be combined:

- initial: initial IR prior to any optimization passes.
- final: final IR after applying all optimization passes.
: the name of an optimization pass. Prints the IR state after that pass.
- all: short for initial, final, and all the optimization passes.
- modified: print a requested optimization pass only if it has modified the IR.

\[possible values: initial, final, all, modified, inline, simplify-cfg, sroa, dce, globals-dce, fn-dedup-release, fn-dedup-debug, mem2reg, memcpyopt, const-folding, arg-demotion, const-demotion, ret-demotion, misc-demotion\]

`--time-phases`

Output the time elapsed over each part of the compilation process

`--profile`

Profile the compilation process

`--reverse-order`

Output build errors and warnings in reverse order

`--metrics-outfile` < _METRICS\_OUTFILE_ \>

Output compilation metrics into the specified file

`--gas-price` < _PRICE_ \>

Gas price for the transaction

`--script-gas-limit` < _SCRIPT\_GAS\_LIMIT_ \>

Gas limit for the transaction

`--max-fee` < _MAX\_FEE_ \>

Max fee for the transaction

`--tip` < _TIP_ \>

The tip for the transaction

`--maturity` < _MATURITY_ \>

Block height until which tx cannot be included

\[default: 0\]

`--node-url` < _NODE\_URL_ \>

The URL of the Fuel node to which we're submitting the transaction. If unspecified, checks the manifest's `network` table, then falls back to `http://127.0.0.1:4000`

You can also use `--target`, `--devnet`, `--testnet`, or `--mainnet` to specify the Fuel node.

\[env: FUEL\_NODE\_URL=\]

`--target` < _TARGET_ \>

Preset configurations for using a specific target.

You can also use `--node-url`, `--devnet`, `--testnet`, or `--mainnet` to specify the Fuel node.

Possible values are: \[local, testnet, mainnet\]

`--mainnet`

Use preset configuration for mainnet.

You can also use `--node-url`, `--target`, or `--testnet` to specify the Fuel node.

`--testnet`

Use preset configuration for testnet.

You can also use `--node-url`, `--target`, or `--mainnet` to specify the Fuel node.

`--devnet`

Use preset configuration for devnet.

You can also use `--node-url`, `--target`, or `--testnet` to specify the Fuel node.

`--salt` < _SALT_ \>

Optional 256-bit hexadecimal literal(s) to redeploy contracts.

For a single contract, use `--salt <SALT>`, eg.: forc deploy --salt 0x0000000000000000000000000000000000000000000000000000000000000001

For a workspace with multiple contracts, use `--salt <CONTRACT_NAME>:<SALT>` to specify a salt for each contract, eg.:

forc deploy --salt contract\_a:0x0000000000000000000000000000000000000000000000000000000000000001 --salt contract\_b:0x0000000000000000000000000000000000000000000000000000000000000002

`--default-salt`

Generate a default salt (0x0000000000000000000000000000000000000000000000000000000000000000) for the contract. Useful for CI, to create reproducible deployments

`-o`, `--output-bin` < _BIN\_FILE_ \>

Create a binary file at the provided path representing the final bytecode

`-g`, `--output-debug` < _DEBUG\_FILE_ \>

Create a file at the provided path containing debug information.

If the file extension is .json, JSON format is used. Otherwise, an .elf file containing DWARF format is emitted.

`--build-profile` < _BUILD\_PROFILE_ \>

The name of the build profile to use

\[default: release\]

`--default-signer`

Sign the transaction with default signer that is pre-funded by fuel-core. Useful for testing against local node

`--unsigned`

Deprecated in favor of `--default-signer`

`--submit-only`

Submit the deployment transaction(s) without waiting for execution to complete

`--manual-signing`

Sign the deployment transaction manually

`--override-storage-slots` < _JSON\_FILE\_PATH_ \>

Override storage slot initialization.

By default, storage slots are initialized with the values defined in the storage block in the contract. You can override the initialization by providing the file path to a JSON file containing the overridden values.

The file format and key values should match the compiler-generated `*-storage_slots.json` file in the output directory of the compiled contract.

Example: `forc deploy --override-storage-slots my_override.json`

my\_override.json: \[ { "key": "<key from out/debug/storage\_slots.json>", "value": "0000000000000000000000000000000000000000000000000000000000000001" } \]

`--experimental` < _EXPERIMENTAL_ \>

Comma separated list of all experimental features that will be enabled

\[possible values: new\_encoding, references, error\_type, const\_generics\]

`--no-experimental` < _NO\_EXPERIMENTAL_ \>

Comma separated list of all experimental features that will be disabled

\[possible values: new\_encoding, references, error\_type, const\_generics\]

`--aws-kms-signer` < _AWS\_KMS\_SIGNER_ \>

AWS KMS signer arn. If present forc-deploy will automatically use AWS KMS signer instead of forc-wallet

`-h`, `--help`

Print help (see a summary with '-h')

`-V`, `--version`

Print version

EXAMPLES:

## _Icon Link_ [Deploy a single contract](https://docs.fuel.network/docs/nightly/forc/plugins/forc_deploy/\#forc-deploy)

forc deploy bc09bfa7a11a04ce42b0a5abf04fd437387ee49bf4561d575177e2946468b408

## _Icon Link_ [Deploy a single contract from a different path](https://docs.fuel.network/docs/nightly/forc/plugins/forc_deploy/\#forc-deploy)

forc deploy bc09bfa7a11a04ce42b0a5abf04fd437387ee49bf4561d575177e2946468b408 --path {path}

## _Icon Link_ [Deploy to a custom network](https://docs.fuel.network/docs/nightly/forc/plugins/forc_deploy/\#forc-deploy)

forc deploy --node-url https://testnet.fuel.network/graphql

## _Icon Link_ [EXAMPLE](https://docs.fuel.network/docs/nightly/forc/plugins/forc_deploy/\#forc-deploy)

You can use `forc deploy`, which triggers a contract deployment transaction and sends it to a running node.

Alternatively, you can deploy your Sway contract programmatically using [fuels-rs _Icon Link_](https://github.com/FuelLabs/fuels-rs), our Rust SDK.

You can find an example within our [fuels-rs book _Icon Link_](https://rust.fuel.network/latest/).