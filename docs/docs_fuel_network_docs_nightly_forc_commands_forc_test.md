[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Commands](https://docs.fuel.network/docs/nightly/forc/commands/) /

Forc Test

## _Icon Link_ [Run](https://docs.fuel.network/docs/nightly/forc/commands/forc_test/\#forc-test)

NOTE: Previously this command was used to support Rust integration testing, however the provided behaviour served no benefit over running `cargo test` directly. The proposal to change the behaviour to support unit testing can be found at the following link: https://github.com/FuelLabs/sway/issues/1833

Sway unit tests are functions decorated with the `#[test]` attribute. Each test is compiled as a unique entry point for a single program and has access to the namespace of the module in which it is declared.

Unit tests decorated with the `#[test(script)]` attribute that are declared within `contract` projects may also call directly into their associated contract's ABI.

Upon successful compilation, test scripts are executed to their completion. A test is considered a failure in the case that a revert ( `rvrt`) instruction is encountered during execution. Otherwise, it is considered a success.

Usage: forc test \[OPTIONS\] \[FILTER\]

Arguments: \[FILTER\] When specified, only tests containing the given string will be executed

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

`-v`, `--verbose...`

Use verbose output

`--metrics-outfile` < _METRICS\_OUTFILE_ \>

Output compilation metrics into the specified file

`-s`, `--silent`

Silence all output

`--json-abi`

Minify JSON ABI files.

By default the JSON for ABIs is formatted for human readability. By using this option JSON output will be "minified", i.e. all on one line without whitespace.

`-L`, `--log-level` < _LOG\_LEVEL_ \>

Set the log level

`--json-storage-slots`

Minify JSON storage slot files.

By default the JSON for initial storage slots is formatted for human readability. By using this option JSON output will be "minified", i.e. all on one line without whitespace.

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

`--build-target` < _BUILD\_TARGET_ \>

Build target to use for code generation

\[default: fuel\] \[possible values: fuel, evm\]

`--pretty`

Pretty-print the logs emitted from tests

`-l`, `--logs`

Print `Log` and `LogData` receipts for tests

`--raw-logs`

Print the raw logs for tests

`--filter-exact`

When specified, only the test exactly matching the given string will be executed

`--test-threads` < _TEST\_THREADS_ \>

Number of threads to utilize when running the tests. By default, this is the number of threads available in your system

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

EXAMPLES:

## _Icon Link_ [Run test](https://docs.fuel.network/docs/nightly/forc/commands/forc_test/\#forc-test)

forc test

## _Icon Link_ [Run test with a filter](https://docs.fuel.network/docs/nightly/forc/commands/forc_test/\#forc-test)

forc test $filter

## _Icon Link_ [Run test without any output](https://docs.fuel.network/docs/nightly/forc/commands/forc_test/\#forc-test)

forc test --silent

## _Icon Link_ [Run test without creating or update the lock file](https://docs.fuel.network/docs/nightly/forc/commands/forc_test/\#forc-test)

forc test --locked