[Guides](https://docs.fuel.network/guides/) /

Frontend Quickstart

## _Icon Link_ [Next.js Fullstack Quickstart](https://docs.fuel.network/guides/frontend-quickstart/\#nextjs-fullstack-quickstart)

> _Icon InfoCircle_
>
> A non-NextJs app will be available once this [issue _Icon Link_](https://github.com/FuelLabs/fuels-ts/issues/2781) is resolved

Getting started with Fuel as a frontend or fullstack developer is as simple as:

1. [Installing](https://docs.fuel.network/guides/frontend-quickstart/#installation) `fuelup`
2. [Generating a counter dapp](https://docs.fuel.network/guides/frontend-quickstart/#generating-a-counter-dapp)
3. [Running the project locally](https://docs.fuel.network/guides/frontend-quickstart/#running-the-project-locally)

## _Icon Link_ [Installation](https://docs.fuel.network/guides/frontend-quickstart/\#installation)

To install the Fuel toolchain, you can use the `fuelup-init` script.
This will install `forc`, `forc-client`, `forc-fmt`, `forc-lsp`, `forc-wallet` as well as `fuel-core` in `~/.fuelup/bin`.

```fuel_Box fuel_Box-idXKMmm-css
curl https://install.fuel.network | sh
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> Having problems? Visit the [installation guide](https://docs.fuel.network/guides/installation/) or post your question in our [forum _Icon Link_](https://forum.fuel.network/).

If you're using VSCode, we recommend installing the [Sway extension _Icon Link_](https://marketplace.visualstudio.com/items?itemName=FuelLabs.sway-vscode-plugin).

## _Icon Link_ [Already have `fuelup` installed?](https://docs.fuel.network/guides/frontend-quickstart/\#already-have-fuelup-installed)

If you already have `fuelup` installed, run the commands below to make sure you are on the most up-to-date toolchain.

```fuel_Box fuel_Box-idXKMmm-css
fuelup self update
fuelup update
fuelup default latest
```

_Icon ClipboardText_

## _Icon Link_ [Generating a counter dapp](https://docs.fuel.network/guides/frontend-quickstart/\#generating-a-counter-dapp)

You can generate a full-stack counter dapp in seconds with the `create fuels` CLI:

pnpmnpm

```fuel_Box fuel_Box-idXKMmm-css
pnpm create fuels
```

_Icon ClipboardText_

## _Icon Link_ [Running the project locally](https://docs.fuel.network/guides/frontend-quickstart/\#running-the-project-locally)

Move into the project directory. Assuming you named the project `my-fuel-project`, you can run:

```fuel_Box fuel_Box-idXKMmm-css
cd my-fuel-project
```

_Icon ClipboardText_

Next, run the following command to start a local development node:

pnpmnpm

```fuel_Box fuel_Box-idXKMmm-css
pnpm fuels:dev
```

_Icon ClipboardText_

The local endpoint for node will be `http://localhost:4000/v1/graphql`.

Next, open a new terminal in the project directory, and run the following command to start the frontend:

pnpmnpm

```fuel_Box fuel_Box-idXKMmm-css
pnpm dev
```

_Icon ClipboardText_

The frontend will be running at [`http://localhost:3000` _Icon Link_](http://localhost:3000/).

While the local node is running, any changes you make to the Sway contract inside the `sway-contract` folder will automatically trigger several updates:

1. The contract gets rebuilt using the `forc build` command.
2. The contract will be redeployed to the local node using the `forc deploy` command .
3. New TypeScript types for the contract and a file called `contract-ids.json` with the new contract ID will be generated in the `src/sway-api` folder.

This means you don't need to worry about updating the contract ID, ABI, or TypeScript types while you develop.

## _Icon Link_ [Next Steps](https://docs.fuel.network/guides/frontend-quickstart/\#next-steps)

Ready to learn more? Check out the following resources:

- Learn the step-by-step instructions for how to build and deploy a full-stack [counter contract dapp](https://docs.fuel.network/guides/counter-dapp/)
- Learn more about the [fuels CLI](https://docs.fuel.network/docs/fuels-ts/fuels-cli/)
- Learn about [wallet connectors](https://docs.fuel.network/docs/wallet/dev/connectors/)