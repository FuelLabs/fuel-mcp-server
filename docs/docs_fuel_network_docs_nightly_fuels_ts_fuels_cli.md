[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

Fuels CLI

## _Icon Link_ [Fuels CLI](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/\#fuels-cli)

The quickest way to build full stack Fuel dApps.

- [`fuels init`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-init) — Creates a new `fuels.config.ts` file
- [`fuels build`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-build) — Build `forc` workspace and generate Typescript types for everything
- [`fuels deploy`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-deploy) — Deploy workspace contracts and save their IDs to JSON file
- [`fuels dev`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-dev) — Start local Fuel Core _node_ and `build` \+ `deploy` on every file change

## _Icon Link_ [Getting started](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/\#getting-started)

Imagine you have this file structure:

```fuel_Box fuel_Box-idXKMmm-css
my-fuel-dapp # NextJS app or similar
├── sway-programs # Forc's workspace
│   ├── src
│   ├── ...
│   └── Forc.toml
├── public
│   └── ...
├── src
│   ├── app
│   ├── ...
├   └── sway-programs-api # Type-safe generated API
└── package.json
```

_Icon ClipboardText_

## _Icon Link_ [Prerequisites](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/\#prerequisites)

The [Fuel Toolchain _Icon Link_](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/#the-fuel-toolchain) and its components (namely `forc` and `fuel-core`) are pre-requisite for several operations with the Fuels CLI. For example:

- Building out contracts using [`fuels build`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-build) requires `forc`.
- Deploying contracts locally using [`fuels deploy`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-deploy) requires `fuel-core`.

Follow the [installation guide _Icon Link_](https://docs.fuel.network/guides/installation/) if you don't have them installed already.

## _Icon Link_ [Installation](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/\#installation)

Add it to your `my-fuel-dapp` project:

pnpmnpm

```console-vue
pnpm add fuels@0.100.1

```

_Icon ClipboardText_

## _Icon Link_ [Double-checking](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/\#double-checking)

```fuel_Box fuel_Box-idXKMmm-css
npx fuels@0.100.1 -v
```

_Icon ClipboardText_

## _Icon Link_ [Next Step](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/\#next-step)

Use [`fuels init`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/commands/#fuels-init) to create a [`fuel.config.ts`](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/config-file/) file.