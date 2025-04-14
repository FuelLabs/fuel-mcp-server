[Docs](https://docs.fuel.network/) /

Nightly  /

[Node Operator](https://docs.fuel.network/docs/nightly/node-operator/) /

[Fuel Ignition](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/) /

Testnet Node

## _Icon Link_ [Running a local Fuel node connected to Testnet using P2P](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#running-a-local-fuel-node-connected-to-testnet-using-p2p)

> _Icon InfoCircle_
>
> Fuel is getting ready for our next major client release, which will upgrade the network from version 0.40.x to 0.41.x. This will be a required upgrade for any node operators.
> We are targeting **February 20 for the testnet upgrade**. You can upgrade immediately to the [0.41.6 _Icon Link_](https://github.com/FuelLabs/fuel-core/releases/tag/v0.41.6) release and sync with the current network using the latest release.
> This update includes several improvements, such as database optimizations for some API queries. To fully benefit from these changes, you will need to re-sync the chain from the genesis block. While this isn't required for operation, it is recommended for optimal performance.

## _Icon Link_ [Installation](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#installation)

To install the Fuel toolchain, you can use the `fuelup-init` script.
This will install `forc`, `forc-client`, `forc-fmt`, `forc-lsp`, `forc-wallet` as well as `fuel-core` in `~/.fuelup/bin`.

```fuel_Box fuel_Box-idXKMmm-css
curl https://install.fuel.network | sh
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> Having problems? Visit the [installation guide _Icon Link_](https://docs.fuel.network/guides/installation/) or post your question in our [forum _Icon Link_](https://forum.fuel.network/).

## _Icon Link_ [Getting a Sepolia (Ethereum Testnet) API Key](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#getting-a-sepolia-ethereum-testnet-api-key)

An API key from any RPC provider that supports the Sepolia network will work. Relayers will help listen to events from the Ethereum network. We recommend either [Infura _Icon Link_](https://www.infura.io/) or [Alchemy _Icon Link_](https://www.alchemy.com/)

The endpoints should look like the following:

## _Icon Link_ [Infura](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#infura)

```fuel_Box fuel_Box-idXKMmm-css
https://sepolia.infura.io/v3/{YOUR_API_KEY}
```

_Icon ClipboardText_

## _Icon Link_ [Alchemy](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#alchemy)

```fuel_Box fuel_Box-idXKMmm-css
https://eth-sepolia.g.alchemy.com/v2/{YOUR_API_KEY}
```

_Icon ClipboardText_

Note that using other network endpoints will result in the relayer failing to start.

## _Icon Link_ [Using `forc node` to run a Testnet Node](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#using-forc-node-to-run-a-testnet-node)

> _Icon InfoCircle_
>
> If you wish to still use the `fuel-core` binary directly, you can skip this section and continue with the steps below.

Make sure you have the [latest version of `fuelup` installed or updated _Icon Link_](https://docs.fuel.network/guides/contract-quickstart/#installation). `forc node` abstracts all the flags and configuration options of the `fuel-core` binary and is intended for ease of use. To run a testnet node using `forc`, you can use the following command:

```fuel_Box fuel_Box-idXKMmm-css
forc node testnet
```

_Icon ClipboardText_

This command will prompt for two things:

1. You will be asked to create a keypair if you don't already have one.
2. You will be asked to provide an Ethereum RPC endpoint that you retrieved from the [Getting a Sepolia (Ethereum Testnet) API Key](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/#getting-a-sepolia-ethereum-testnet-api-key) section above.

The default configuration is highlighted in green at the top of the command output.

If you want to specify a custom configuration, you can use the `--help` flag to see the available options. For example:

```fuel_Box fuel_Box-idXKMmm-css
forc node testnet --help
```

_Icon ClipboardText_

## _Icon Link_ [Dry-run mode](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#dry-run-mode)

Users of this new plugin may want to review the parameters before running the node. To accommodate this, `forc-node` includes a dry-run mode, which can be enabled using:

```fuel_Box fuel_Box-idXKMmm-css
forc-node --dry-run testnet
```

_Icon ClipboardText_

Instead of starting the node, this command will print the exact command that would be run, allowing you to verify the parameters beforehand.

## _Icon Link_ [Using `fuel-core` binary to run a local node](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#using-fuel-core-binary-to-run-a-local-node)

If you wish to still use the `fuel-core` binary directly, you can follow the steps below.

## _Icon Link_ [Generating a P2P Key](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#generating-a-p2p-key)

Generate a new P2P key pairing by running the following command:

```fuel_Box fuel_Box-idXKMmm-css
fuel-core-keygen new --key-type peering
{
  "peer_id":"16Uiu2HAmEtVt2nZjzpXcAH7dkPcFDiL3z7haj6x78Tj659Ri8nrs",
  "secret":"b0ab3227974e06d236d265bd1077bb0522d38ead16c4326a5dff2f30edf88496",
  "type":"peering"
}
### Do not share or lose this private key! Press any key to complete. ###
```

_Icon ClipboardText_

Make sure you save this somewhere safe so you don't need to generate a new key pair in the future.

## _Icon Link_ [Chain Configuration](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#chain-configuration)

To run a local node with persistence, you must have a folder with the following chain configuration files:

For simplicity, clone the [repository _Icon Link_](https://github.com/FuelLabs/chain-configuration/tree/master) into the directory of your choice.

When using the `--snapshot` flag later, you can replace `./your/path/to/chain_config_folder` with the `ignition-test` folder of the repository you just cloned `./chain-configuration/ignition-test/`.

## _Icon Link_ [Running a Local Node](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#running-a-local-node)

First ensure your environments [open files limit _Icon Link_](https://askubuntu.com/questions/162229/how-do-i-increase-the-open-files-limit-for-a-non-root-user) `ulimit` is increased, example:

```fuel_Box fuel_Box-idXKMmm-css
ulimit -S -n 32768
```

_Icon ClipboardText_

Finally to put everything together to start the node, run the following command:

```fuel_Box fuel_Box-idXKMmm-css
fuel-core run \
--service-name=fuel-sepolia-testnet-node \
--keypair {P2P_PRIVATE_KEY} \
--relayer {ETHEREUM_RPC_ENDPOINT} \
--ip=0.0.0.0 --port=4000 --peering-port=30333 \
--db-path=~/.fuel-sepolia-testnet \
--snapshot ./your/path/to/chain_config_folder \
--utxo-validation --poa-instant false --enable-p2p \
--bootstrap-nodes /dnsaddr/testnet.fuel.network \
--sync-header-batch-size 50 \
--enable-relayer \
--relayer-v2-listening-contracts=0x01855B78C1f8868DE70e84507ec735983bf262dA \
--relayer-da-deploy-height=5827607 \
--relayer-log-page-size=500 \
--sync-block-stream-buffer-size 30
```

_Icon ClipboardText_

For the full description details of each flag above, run:

```fuel_Box fuel_Box-idXKMmm-css
fuel-core run --help
```

_Icon ClipboardText_

## _Icon Link_ [Connecting to the local node from a browser wallet](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/\#connecting-to-the-local-node-from-a-browser-wallet)

To connect to the local node using a browser wallet, import the network address as:

```fuel_Box fuel_Box-idXKMmm-css
http://0.0.0.0:4000/v1/graphql
```

_Icon ClipboardText_