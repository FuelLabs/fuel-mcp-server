[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Fuels CLI](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/) /

Config File

## _Icon Link_ [Config File](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#config-file)

Here, you can learn more about all configuration options.

## _Icon Link_ [`workspace`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#workspace)

Relative directory path to Forc workspace.

```fuel_Box fuel_Box-idXKMmm-css
workspace: './sway-programs',
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> _The property `workspace` is incompatible with [`contracts`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#contracts), [`predicates`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#predicates), and [`scripts`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#scripts)._

## _Icon Link_ [`contracts`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#contracts)

List of relative directory paths to Sway contracts.

```fuel_Box fuel_Box-idXKMmm-css
contracts: ['./sway-programs/contracts'],
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> _The property `contracts` is incompatible with [`workspace`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#workspace)._

## _Icon Link_ [`predicates`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#predicates)

List of relative directory paths to Sway predicates.

```fuel_Box fuel_Box-idXKMmm-css
predicates: ['./sway-programs/predicates'],
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> _The property `predicates` is incompatible with [`workspace`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#workspace)._

## _Icon Link_ [`scripts`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#scripts)

List of relative directory paths to Sway scripts.

```fuel_Box fuel_Box-idXKMmm-css
scripts: ['./sway-programs/scripts'],
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> _The property `scripts` is incompatible with [`workspace`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#workspace)._

## _Icon Link_ [`output`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#output)

Relative directory path to use when generating Typescript definitions.

```fuel_Box fuel_Box-idXKMmm-css
output: './src/sway-programs-api',
```

_Icon ClipboardText_

## _Icon Link_ [`providerUrl`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#providerurl)

The URL to use when deploying contracts.

```fuel_Box fuel_Box-idXKMmm-css
// Default: http://127.0.0.1:4000/v1/graphql
providerUrl: 'http://network:port/v1/graphql',
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> _When [`autostartFuelCore`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#autostartfuelcore) property is set to `true`, the `providedUrl` is overridden by that of the local short-lived `fuel-core` node started by the [`fuels dev`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-dev) command._

## _Icon Link_ [`privateKey`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#privatekey)

Wallet private key, used when deploying contracts.

This property should ideally come from env — `process.env.MY_PRIVATE_KEY`.

```fuel_Box fuel_Box-idXKMmm-css
privateKey: '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298',
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> _When [`autostartFuelCore`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#autostartfuelcore) property is set to `true`, the `privateKey` is overridden with the `consensusKey` of the local short-lived `fuel-core` node started by the [`fuels dev`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-dev) command._

## _Icon Link_ [`snapshotDir`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#snapshotdir)

> _Icon InfoCircle_
>
> - _Used by [`fuels dev`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-dev) only_.

Relative path to directory containing custom configurations for `fuel-core`, such as:

- `chainConfig.json`
- `metadata.json`
- `stateConfig.json`

This will take effect only when [`autoStartFuelCore`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#autostartfuelcore) is `true`.

```fuel_Box fuel_Box-idXKMmm-css
snapshotDir: './my/snapshot/dir',
```

_Icon ClipboardText_

## _Icon Link_ [`autoStartFuelCore`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#autostartfuelcore)

> _Icon InfoCircle_
>
> - _Used by [`fuels dev`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-dev) only_.

When set to `true`, it will automatically:

1. Starts a short-lived `fuel-core` node as part of the [`fuels dev`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-dev) command
2. Override property [`providerUrl`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#providerurl) with the URL for the recently started `fuel-core` node

```fuel_Box fuel_Box-idXKMmm-css
autoStartFuelCore: true,
```

_Icon ClipboardText_

If set to `false`, you must spin up a `fuel-core` node by yourself and set the URL for it via [`providerUrl`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#providerurl).

## _Icon Link_ [`fuelCorePort`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#fuelcoreport)

> _Icon InfoCircle_
>
> - _Used by [`fuels dev`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-dev) only_.
> - _Ignored when [`autoStartFuelCore`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#autostartfuelcore) is set to `false`._

Port to use when starting a local `fuel-core` node.

```fuel_Box fuel_Box-idXKMmm-css
// Default: first free port, starting from 4000
fuelCorePort: 4000,
```

_Icon ClipboardText_

## _Icon Link_ [`forcBuildFlags`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#forcbuildflags)

> _Icon InfoCircle_
>
> - _Used by [`fuels build`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-build) and [`fuels deploy`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-deploy)_.

Sway programs are compiled in `debug` mode by default.

Here you can customize all build flags, e.g. to build programs in `release` mode.

```fuel_Box fuel_Box-idXKMmm-css
// Default: []
forcBuildFlags: ['--release'],
```

_Icon ClipboardText_

Check also:

- [Forc docs _Icon Link_](https://docs.fuel.network/docs/forc/commands/forc_build/#forc-build)

## _Icon Link_ [`deployConfig`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#deployconfig)

You can supply a ready-to-go deploy configuration object:

```fuel_Box fuel_Box-idXKMmm-css
deployConfig: {},
```

_Icon ClipboardText_

Or use a function for crafting dynamic deployment flows:

- If you need to fetch and use configs or data from a remote data source
- If you need to use IDs from already deployed contracts — in this case, we can use the `options.contracts` property to get the necessary contract ID. For example:

```fuel_Box fuel_Box-idXKMmm-css
deployConfig: async (options: ContractDeployOptions) => {
  // ability to fetch data remotely
  await Promise.resolve(`simulating remote data fetch`);

  // get contract by name
  const { contracts } = options;

  const contract = contracts.find(({ name }) => {
    const found = name === MY_FIRST_DEPLOYED_CONTRACT_NAME;
    return found;
  });

  if (!contract) {
    throw new Error('Contract not found!');
  }

  return {
    storageSlots: [\
      {\
        key: '0x..',\
        /**\
         * Here we could initialize a storage slot,\
         * using the relevant contract ID.\
         */\
        value: contract.contractId,\
      },\
    ],
  };
},
```

_Icon ClipboardText_

## _Icon Link_ [`onBuild`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#onbuild)

A callback function that is called after a build event has been successful.

Parameters:

- `config` — The loaded config ( `fuels.config.ts`)

```fuel_Box fuel_Box-idXKMmm-css
onBuild: (config: FuelsConfig): void | Promise<void> => {
  console.log('fuels:onBuild', { config });
},
```

_Icon ClipboardText_

## _Icon Link_ [`onDeploy`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#ondeploy)

A callback function that is called after a deployment event has been successful.

Parameters:

- `config` — The loaded config ( `fuels.config.ts`)
- `data` — The data (an array of deployed contracts)

```fuel_Box fuel_Box-idXKMmm-css
onDeploy: (config: FuelsConfig, data: DeployedData): void | Promise<void> => {
  console.log('fuels:onDeploy', { config, data });
},
```

_Icon ClipboardText_

## _Icon Link_ [`onDev`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#ondev)

A callback function that is called after the [`fuels dev`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-dev) command has successfully restarted.

Parameters:

- `config` — The loaded config ( `fuels.config.ts`)

```fuel_Box fuel_Box-idXKMmm-css
onDev: (config: FuelsConfig): void | Promise<void> => {
  console.log('fuels:onDev', { config });
},
```

_Icon ClipboardText_

## _Icon Link_ [`onNode`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#onnode)

A callback function that is called after the [`fuels node`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-node) command has successfully refreshed.

Parameters:

- `config` — The loaded config ( `fuels.config.ts`)

```fuel_Box fuel_Box-idXKMmm-css
onNode: (config: FuelsConfig): void | Promise<void> => {
  console.log('fuels:onNode', { config });
},
```

_Icon ClipboardText_

## _Icon Link_ [`onFailure`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#onfailure)

Pass a callback function to be called in case of errors.

Parameters:

- `config` — The loaded config ( `fuels.config.ts`)
- `error` — Original error object

```fuel_Box fuel_Box-idXKMmm-css
onFailure: (config: FuelsConfig, error: Error): void | Promise<void> => {
  console.log('fuels:onFailure', { config, error });
},
```

_Icon ClipboardText_

## _Icon Link_ [`forcPath`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#forcpath)

Path to the `forc` binary.

When not supplied, will default to using the `system` binaries ( `forc`).

```fuel_Box fuel_Box-idXKMmm-css
// Default: 'forc',
forcPath: '~/.fuelup/bin/forc',
```

_Icon ClipboardText_

## _Icon Link_ [`fuelCorePath`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#fuelcorepath)

Path to the `fuel-core` binary.

When not supplied, will default to using the `system` binaries ( `fuel-core`).

```fuel_Box fuel_Box-idXKMmm-css
// Default: 'fuel-core'
fuelCorePath: '~/.fuelup/bin/fuel-core',
```

_Icon ClipboardText_

## _Icon Link_ [Loading environment variables](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/\#loading-environment-variables)

If you want to load environment variables from a `.env` file, you can use the `dotenv` package.

First, install it:

pnpmnpm

```fuel_Box fuel_Box-idXKMmm-css
pnpm install dotenv
```

_Icon ClipboardText_

Then, you can use it in your `fuels.config.ts` file:

```fuel_Box fuel_Box-idXKMmm-css
import { createConfig } from 'fuels';
import dotenv from 'dotenv';
import { providerUrl } from './src/lib';

dotenv.config({
  path: ['.env.local', '.env'],
});

// If your node is running on a port other than 4000, you can set it here
const fuelCorePort = +(process.env.VITE_FUEL_NODE_PORT as string) || 4000;

export default createConfig({
  workspace: './sway-programs', // Path to your Sway workspace
  output: './src/sway-api', // Where your generated types will be saved
  fuelCorePort,
  providerUrl,
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
});
```

_Icon ClipboardText_