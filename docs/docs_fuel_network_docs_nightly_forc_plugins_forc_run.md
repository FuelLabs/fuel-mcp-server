[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Plugins](https://docs.fuel.network/docs/nightly/forc/plugins/) /

Forc Run

## _Icon Link_ [Run](https://docs.fuel.network/docs/nightly/forc/plugins/forc_run/\#forc-run)

Usage: forc run \[OPTIONS\] \[SIGNING\_KEY\]

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

`-o`, `--output-bin` < _BIN\_FILE_ \>

Create a binary file at the provided path representing the final bytecode

`-g`, `--output-debug` < _DEBUG\_FILE_ \>

Create a file at the provided path containing debug information.

If the file extension is .json, JSON format is used. Otherwise, an .elf file containing DWARF format is emitted.

`--build-profile` < _BUILD\_PROFILE_ \>

The name of the build profile to use

\[default: debug\]

`--release`

Use the release build profile.

The release profile can be customized in the manifest file.

`--error-on-warnings`

Treat warnings as errors

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

`-d`, `--data` < _DATA_ \>

Hex string of data to input to script

`--dry-run`

Only craft transaction and print it out

`-r`, `--pretty-print`

Pretty-print the outputs from the node

`--contract` < _CONTRACT_ \>

32-byte contract ID that will be called during the transaction

`--simulate`

Execute the transaction and return the final mutated transaction along with receipts (which includes whether the transaction reverted or not). The transaction is not inserted in the node's view of the blockchain, (i.e. it does not affect the chain state)

`--default-signer`

Sign the transaction with default signer that is pre-funded by fuel-core. Useful for testing against local node

`--unsigned`

Deprecated in favor of `--default-signer`

`--args` < _ARGS_ \>

Arguments to pass into main function with forc run

`--experimental` < _EXPERIMENTAL_ \>

Comma separated list of all experimental features that will be enabled

\[possible values: new\_encoding, references, error\_type, const\_generics\]

`--no-experimental` < _NO\_EXPERIMENTAL_ \>

Comma separated list of all experimental features that will be disabled

\[possible values: new\_encoding, references, error\_type, const\_generics\]

`-h`, `--help`

Print help (see a summary with '-h')

`-V`, `--version`

Print version