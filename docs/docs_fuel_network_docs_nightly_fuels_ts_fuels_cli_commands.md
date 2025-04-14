[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Fuels CLI](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/) /

Commands

## _Icon Link_ [Commands](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/\#commands)

The `fuels` CLI consists of a couple of commands.

## _Icon Link_ [`fuels init`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/\#fuels-init)

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 help init
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
Options:
  --path <path>                Path to project root (default: current directory)
  -w, --workspace <path>       Relative dir path to Forc workspace
  -c, --contracts [paths...]   Relative paths to Contracts
  -s, --scripts [paths...]     Relative paths to Scripts
  -p, --predicates [paths...]  Relative paths to Predicates
  -o, --output <path>          Relative dir path for Typescript generation output
  --forc-path <path>           Path to the `forc` binary
  --fuel-core-path <path>      Path to the `fuel-core` binary
  --auto-start-fuel-core       Auto-starts a `fuel-core` node during `dev` command
  --fuel-core-port <port>      Port to use when starting a local `fuel-core` node for dev mode
  -h, --help                   Display help
```

_Icon ClipboardText_

Creating a sample `fuel.config.ts` file:

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 init --contracts ./my-contracts/* --output ./src/sway-contracts-api
```

_Icon ClipboardText_

Using [Forc workspaces _Icon Link_](https://docs.fuel.network/docs/forc/workspaces/)? Try this instead:

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 init --workspace ./sway-programs --output ./src/sway-programs-api
```

_Icon ClipboardText_

This will give you a minimal configuration:

```fuel_Box fuel_Box-idXKMmm-css
import { createConfig } from 'fuels';

export default createConfig({
  workspace: './sway-programs', // forc workspace
  output: './src/sway-programs-api',
});
```

_Icon ClipboardText_

In a nutshell:

```fuel_Box fuel_Box-idXKMmm-css
.
├── sway-programs # <— forc workspace
├── src
│   └── sway-programs-api # <— output
├── fuels.config.ts
└── package.json
```

_Icon ClipboardText_

## _Icon Link_ [See more](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/\#see-more)

- [Forc workspaces _Icon Link_](https://docs.fuel.network/docs/forc/workspaces/)

## _Icon Link_ [`fuels build`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/\#fuels-build)

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 help build
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
Options:
  --path <path>  Path to project root (default: "/Users/anderson/Code/fuel/fuels-ts/apps/docs")
  -d, --deploy       Deploy contracts after build (auto-starts a `fuel-core` node if needed)
  -h, --help         Display help
```

_Icon ClipboardText_

Examples:

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 build
```

_Icon ClipboardText_

1. Build all Sway programs under your `workspace` using `forc` [1 _Icon Link_](https://docs.fuel.network/docs/forc/commands/forc_build/)
2. Generate types for them using `fuels-typegen` [2](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-typegen)

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 build --deploy
```

_Icon ClipboardText_

Using the `--deploy` flag will additionally:

1. Auto-start a short-lived `fuel-core` node if _needed_ ( [docs](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#autostartfuelcore))
2. Run `deploy` on that node

> _Icon InfoCircle_
>
> _This is useful when working with contracts because a contract's ID is generated only on deployment._

## _Icon Link_ [`fuels deploy`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/\#fuels-deploy)

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 deploy
```

_Icon ClipboardText_

The `fuels deploy` command does two things:

1. Deploy all Sway contracts under `workspace`.
2. Saves their deployed IDs to:
   - _`./src/sway-programs-api/contract-ids.json`_

```fuel_Box fuel_Box-idXKMmm-css
{
  "myContract1": "0x..",
  "myContract2": "0x.."
}
```

_Icon ClipboardText_

Use it when instantiating your contracts:

```fuel_Box fuel_Box-idXKMmm-css
import { Sample } from './sway-programs-api';
import contractsIds from './sway-programs-api/contract-ids.json';

/**
  * Get IDs using:
  *   contractsIds.<my-contract-name>
  */

const wallet = new Wallet.fromPrivateKey(process.env.PRIVATE_KEY);
const contract = new Sample(contractsIds.sample, wallet);

const { value } = await contract.functions.return_input(1337).dryRun();

expect(value.toHex()).toEqual(toHex(1337));
```

_Icon ClipboardText_

For a complete example, see:

- [Using Generated Types](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/using-generated-types/)

## _Icon Link_ [Proxy Contracts Deployment](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/\#proxy-contracts-deployment)

Automatic deployment of proxy contracts can be enabled in `Forc.toml`.

For more info, please check these docs:

- [Proxy Contracts _Icon Link_](https://docs.fuel.network/docs/forc/plugins/#proxy-contracts)
- [Sway Libs / Upgradability Library _Icon Link_](https://docs.fuel.network/docs/sway-libs/upgradability/#upgradability-library)
- [Sway Standards / SRC-14 - Simple Upgradable Proxies _Icon Link_](https://docs.fuel.network/docs/sway-standards/src-14-simple-upgradeable-proxies/#src-14-simple-upgradeable-proxies)

## _Icon Link_ [`fuels dev`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/\#fuels-dev)

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 dev
```

_Icon ClipboardText_

The `fuels dev` command does three things:

1. Auto-start a short-lived `fuel-core` node ( [docs](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#autostartfuelcore))
2. Runs `build` and `deploy` once at the start
3. Watches your Forc workspace and repeats the previous step on every change

> _Icon InfoCircle_
>
> _In `dev` mode, every time you update a contract on your Forc `workspace`, we re-generate type definitions and factory classes for it, following your pre-configured [`output`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/#output) directory. If it's part of another build system running in dev mode (i.e. `next dev`), you can expect it to re-build / auto-reload as well._

## _Icon Link_ [`fuels node`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/\#fuels-node)

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 node
```

_Icon ClipboardText_

Starts a short-lived `fuel-core` node and requires a `fuels.config.ts` config file.

Generate one with [`fuels init`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-init):

```fuel_Box fuel_Box-idXKMmm-css
import { createConfig } from 'fuels';

export default createConfig({
  workspace: './sway-programs', // forc workspace
  output: './src/sway-programs-api',
});
```

_Icon ClipboardText_

## _Icon Link_ [`fuels typegen`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/\#fuels-typegen)

Manually generates type definitions and factory classes from ABI JSON files.

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 help typegen
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
Options:
  -i, --inputs <path|glob...>  Input paths/globals to your Abi JSON files
  -o, --output <dir>           Directory path for generated files
  -c, --contract               Generate types for Contracts [default]
  -s, --script                 Generate types for Scripts
  -p, --predicate              Generate types for Predicates
  -S, --silent                 Omit output messages
```

_Icon ClipboardText_

For more info, check:

- [Generating Types from ABI](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/generating-types/)

## _Icon Link_ [`fuels versions`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/\#fuels-versions)

Check for version incompatibilities between your [Fuel Toolchain _Icon Link_](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/#the-fuel-toolchain) component versions, matching them against the ones supported by the Typescript SDK version that you have.

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 versions
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
┌───────────┬───────────┬────────────────┬─────────────┐
│           │ Supported │ Yours / System │ System Path │
├───────────┼───────────┼────────────────┼─────────────┤
│ Forc      │ 0.67.0    │ 0.67.0         │ forc        │
├───────────┼───────────┼────────────────┼─────────────┤
│ Fuel-Core │ 0.41.9    │ 0.41.9         │ fuel-core   │
└───────────┴───────────┴────────────────┴─────────────┘

You have all the right versions! ⚡
```

_Icon ClipboardText_