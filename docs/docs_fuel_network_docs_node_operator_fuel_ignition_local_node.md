[Docs](https://docs.fuel.network/) /

[Node Operator](https://docs.fuel.network/docs/node-operator/) /

[Fuel Ignition](https://docs.fuel.network/docs/node-operator/fuel-ignition/) /

Local Node

## _Icon Link_ [Running a local Fuel node](https://docs.fuel.network/docs/node-operator/fuel-ignition/local-node/\#running-a-local-fuel-node)

In addition to deploying and testing on the Fuel Testnet, you can also run a local Fuel Node.

There are two types of Fuel networks that can be run:

1. In-memory network (without persistence)
2. Local network with persistence

## _Icon Link_ [Using `forc node` to run a Local Node](https://docs.fuel.network/docs/node-operator/fuel-ignition/local-node/\#using-forc-node-to-run-a-local-node)

> _Icon InfoCircle_
>
> If you wish to still use the `fuel-core` binary directly, you can skip this section and continue with the steps below.

Make sure you have the [latest version of `fuelup` installed or updated _Icon Link_](https://docs.fuel.network/guides/contract-quickstart/#installation). `forc node` abstracts all the flags and configuration options of the `fuel-core` binary and is intended for ease of use. To run a local node using `forc`, you can use the following command:

```fuel_Box fuel_Box-idXKMmm-css
forc node local
```

_Icon ClipboardText_

This command will start a local node with the default configuration (with state persistence). The default configuration is highlighted in green at the top of the command output.

If you want to specify a custom configuration, you can use the `--help` flag to see the available options. For example:

```fuel_Box fuel_Box-idXKMmm-css
forc node local --help
```

_Icon ClipboardText_

## _Icon Link_ [Dry-run mode](https://docs.fuel.network/docs/node-operator/fuel-ignition/local-node/\#dry-run-mode)

Users of this new plugin may want to review the parameters before running the node. To accommodate this, `forc-node` includes a dry-run mode, which can be enabled using:

```fuel_Box fuel_Box-idXKMmm-css
forc-node --dry-run local
```

_Icon ClipboardText_

Instead of starting the node, this command will print the exact command that would be run, allowing you to verify the parameters beforehand.

## _Icon Link_ [Using `fuel-core` binary to run a local node](https://docs.fuel.network/docs/node-operator/fuel-ignition/local-node/\#using-fuel-core-binary-to-run-a-local-node)

If you wish to still use the `fuel-core` binary directly, you can follow the steps below.

## _Icon Link_ [In-memory local node (without state persistence)](https://docs.fuel.network/docs/node-operator/fuel-ignition/local-node/\#in-memory-local-node-without-state-persistence)

An in-memory node does not persist the blockchain state anywhere, it is only stored in memory as long as the node is active and running.

First ensure your environments [open files limit _Icon Link_](https://askubuntu.com/questions/162229/how-do-i-increase-the-open-files-limit-for-a-non-root-user) `ulimit` is increased, example:

```fuel_Box fuel_Box-idXKMmm-css
ulimit -S -n 32768
```

_Icon ClipboardText_

After ensuring your file limit is increased, to spin-up a local in-memory Fuel node download or copy the local snapshot from [here _Icon Link_](https://github.com/FuelLabs/chain-configuration/tree/master/local), then run the following command:

```fuel_Box fuel_Box-idXKMmm-css
fuel-core run --db-type in-memory --debug --snapshot ./your/path/to/chain_config_folder
```

_Icon ClipboardText_

To deploy a contract to the local node, run the following command:

```fuel_Box fuel_Box-idXKMmm-css
forc deploy <signing-key> --node-url 127.0.0.1:4000/v1/graphql
```

_Icon ClipboardText_

Or to deploy with the default signer that is pre-funded by fuel-core:

```fuel_Box fuel_Box-idXKMmm-css
forc deploy --default-signer --node-url 127.0.0.1:4000/v1/graphql
```

_Icon ClipboardText_

## _Icon Link_ [Chain Configuration](https://docs.fuel.network/docs/node-operator/fuel-ignition/local-node/\#chain-configuration)

To modify the initial state of the chain, you must configure the `state_config.json` file in your chain configuration folder.

For simplicity, clone the [repository _Icon Link_](https://github.com/FuelLabs/chain-configuration/tree/master) into the directory of your choice.

When using the `--snapshot` flag later, you can replace `./your/path/to/chain_config_folder` with the `local` folder of the repository you just cloned `./chain-configuration/local/`.

To start the node with a custom configuration, you can use the command below:

```fuel_Box fuel_Box-idXKMmm-css
fuel-core run --snapshot ./your/path/to/chain_config_folder --db-type in-memory --debug
```

_Icon ClipboardText_

To find an example `local` chain configuration folder for a specific `fuel-core` version, refer to the [`chain-configuration/local` _Icon Link_](https://github.com/FuelLabs/chain-configuration/tree/master/local) repo.

## _Icon Link_ [Funding a wallet locally](https://docs.fuel.network/docs/node-operator/fuel-ignition/local-node/\#funding-a-wallet-locally)

You can edit the `coins` array inside `state_config.json` to modify the initial assets owned by a given address.

The `owner` address must be a `B256` type address (begins with `0x`) instead of a `Bech32` type (begins with `fuel`).

The `amount` is a numerical value. In the example below, the value translates to 1 ETH.

```fuel_Box fuel_Box-idXKMmm-css
"coins": [\
  {\
    "tx_id": "0x0000000000000000000000000000000000000000000000000000000000000001",\
    "output_index": 0,\
    "tx_pointer_block_height": 0,\
    "tx_pointer_tx_idx": 0,\
    "owner": "0x488284d46414347c78221d3bad71dfebcff61ab2ae26d71129701d50796f714d",\
    "amount": 1000000000,\
    "asset_id": "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"\
  }\
]
```

_Icon ClipboardText_

## _Icon Link_ [Local node (with state persistence)](https://docs.fuel.network/docs/node-operator/fuel-ignition/local-node/\#local-node-with-state-persistence)

This node does persist the blockchain state locally.
To run a local node with persistence a chain configuration file is required.

To start the node, run the following command:

```fuel_Box fuel_Box-idXKMmm-css
fuel-core run --ip 127.0.0.1 --port 4000 --snapshot ./your/path/to/chain_config_folder --db-path ./.fueldb --debug
```

_Icon ClipboardText_

## _Icon Link_ [Connecting to the local node from a browser wallet](https://docs.fuel.network/docs/node-operator/fuel-ignition/local-node/\#connecting-to-the-local-node-from-a-browser-wallet)

To connect to the local node using a browser wallet, import the network address as:

```fuel_Box fuel_Box-idXKMmm-css
http://127.0.0.1:4000/v1/graphql
```

_Icon ClipboardText_