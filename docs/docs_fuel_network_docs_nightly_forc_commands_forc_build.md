[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Commands](https://docs.fuel.network/docs/nightly/forc/commands/) /

Forc Build

## _Icon Link_ [Compile](https://docs.fuel.network/docs/nightly/forc/commands/forc_build/\#forc-build)

The output produced will depend on the project's program type.

- `script`, `predicate` and `contract` projects will produce their bytecode in binary format `<project-name>.bin`.
- `script` projects will also produce a file containing the hash of the bytecode binary `<project-name>-bin-hash` (using `fuel_cypto::Hasher`).
- `predicate` projects will also produce a file containing the **root** hash of the bytecode binary `<project-name>-bin-root` (using `fuel_tx::Contract::root_from_code`).
- `contract` and `library` projects will also produce the public ABI in JSON format `<project-name>-abi.json`.

Usage: forc build \[OPTIONS\]

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

`--tests`

Also build all tests within the project

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

## _Icon Link_ [Compile the current projectx](https://docs.fuel.network/docs/nightly/forc/commands/forc_build/\#forc-build)

forc build

## _Icon Link_ [Compile the current project from a different path](https://docs.fuel.network/docs/nightly/forc/commands/forc_build/\#forc-build)

forc build --path

## _Icon Link_ [Compile the current project without updating dependencies](https://docs.fuel.network/docs/nightly/forc/commands/forc_build/\#forc-build)

forc build --path --locked

## _Icon Link_ [EXAMPLE](https://docs.fuel.network/docs/nightly/forc/commands/forc_build/\#forc-build)

Compile the sway files of the current project.

```fuel_Box fuel_Box-idXKMmm-css
$ forc build
Compiled script "my-fuel-project".
Bytecode size is 28 bytes.

```

_Icon ClipboardText_

The output produced will depend on the project's program type. Building script, predicate and contract projects will produce their bytecode in binary format `<project-name>.bin`. Building contracts and libraries will also produce the public ABI in JSON format `<project-name>-abi.json`.

By default, these artifacts are placed in the `out/` directory.

If a `Forc.lock` file did not yet exist, it will be created in order to pin each of the dependencies listed in `Forc.toml` to a specific commit or version.