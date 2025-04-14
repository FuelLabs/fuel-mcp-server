[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Plugins](https://docs.fuel.network/docs/nightly/forc/plugins/) /

Forc Submit

## _Icon Link_ [A](https://docs.fuel.network/docs/nightly/forc/plugins/forc_submit/\#forc-submit)

Usage: forc-submit \[OPTIONS\] <TX\_PATH>

Arguments:

< _TX\_PATH_ \> Path to the Transaction that is to be submitted to the Fuel node.

Paths to files ending with `.json` will be deserialized from JSON. Paths to files ending with `.bin` will be deserialized from bytes using the `fuel_tx::Transaction::try_from_bytes` constructor.

Options:

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

`--await` < _AWAIT_ \>

Whether or not to await confirmation that the transaction has been committed.

When `true`, await commitment and output the transaction status. When `false`, do not await confirmation and simply output the transaction ID.

\[default: true\] \[possible values: true, false\]

`--tx-status-json` < _JSON_ \>

Output the resulting transaction status as JSON rather than the default output

\[default: false\] \[possible values: true, false\]

`-h`, `--help`

Print help (see a summary with '-h')

`-V`, `--version`

Print version

EXAMPLES:

## _Icon Link_ [Submit a transaction from a json file](https://docs.fuel.network/docs/nightly/forc/plugins/forc_submit/\#forc-submit)

forc submit {path}/mint.json

## _Icon Link_ [Submit a transaction from a json file and wait for confirmation](https://docs.fuel.network/docs/nightly/forc/plugins/forc_submit/\#forc-submit)

forc submit {path}/mint.json --await true

## _Icon Link_ [Submit a transaction from a json file and get output in json](https://docs.fuel.network/docs/nightly/forc/plugins/forc_submit/\#forc-submit)

forc submit {path}/mint.json --tx-status-json true

## _Icon Link_ [Submit a transaction from a json file to testnet](https://docs.fuel.network/docs/nightly/forc/plugins/forc_submit/\#forc-submit)

forc submit {path}/mint.json --testnet

## _Icon Link_ [Submit a transaction from a json file to a local net](https://docs.fuel.network/docs/nightly/forc/plugins/forc_submit/\#forc-submit)

forc submit {path}/mint.json --target local