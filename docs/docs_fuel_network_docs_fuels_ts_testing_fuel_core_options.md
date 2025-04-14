[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Testing](https://docs.fuel.network/docs/fuels-ts/testing/) /

Fuel Core Options

## _Icon Link_ [Fuel-Core Options](https://docs.fuel.network/docs/fuels-ts/testing/fuel-core-options/\#fuel-core-options)

The `launchTestNode` creates a temporary snapshot directory and configurations every time it runs. The path to this directory is passed to `fuel-core` via the `--snapshot` flag.

## _Icon Link_ [Default Snapshot](https://docs.fuel.network/docs/fuels-ts/testing/fuel-core-options/\#default-snapshot)

The default snapshot used is that of the current testnet network iteration.

Click [here _Icon Link_](https://github.com/FuelLabs/fuels-ts/blob/v0.100.1/.fuel-core/configs) to see what it looks like.

## _Icon Link_ [Custom Snapshot](https://docs.fuel.network/docs/fuels-ts/testing/fuel-core-options/\#custom-snapshot)

If you need a different snapshot, you can specify a `DEFAULT_CHAIN_SNAPSHOT_DIR` environment variable which points to your snapshot directory. `launchTestNode` will read that config and work with it instead, integrating all the functionality with it the same way it'd do with the default config.

How and where you specify the environment variable depends on your testing tool.

```fuel_Box fuel_Box-idXKMmm-css
process.env.DEFAULT_CHAIN_SNAPSHOT_DIR = mySnapshotDirPath;

const launchedWithCustomChainConfig = await launchTestNode();

const { provider: providerWithCustomChainConfig } =
  launchedWithCustomChainConfig;

const { name } = await providerWithCustomChainConfig.fetchChain();

```

_Icon ClipboardText_

## _Icon Link_ [Fuel-Core Node Options](https://docs.fuel.network/docs/fuels-ts/testing/fuel-core-options/\#fuel-core-node-options)

Besides the snapshot, you can provide arguments to the `fuel-core` node via the `nodeOptions.args` property. For a detailed list of all possible arguments run:

```fuel_Box fuel_Box-idXKMmm-css
fuel-core run --help
```

_Icon ClipboardText_

If you want _all_ your tests to run with the same arguments, consider specifying the `DEFAULT_FUEL_CORE_ARGS` environment variable.

```fuel_Box fuel_Box-idXKMmm-css
process.env.DEFAULT_FUEL_CORE_ARGS = `--tx-max-depth 20`;

// `nodeOptions.args` will override the above values if provided.

const nodeWithCustomArgs = await launchTestNode();
const { provider: providerWithCustomArgs } = nodeWithCustomArgs;

process.env.DEFAULT_FUEL_CORE_ARGS = '';
```

_Icon ClipboardText_