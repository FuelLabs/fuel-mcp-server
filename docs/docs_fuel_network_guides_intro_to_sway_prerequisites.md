[Guides](https://docs.fuel.network/guides/) /

[Intro to Sway](https://docs.fuel.network/guides/intro-to-sway/) /

Prerequisites

## _Icon Link_ [Prerequisites](https://docs.fuel.network/guides/intro-to-sway/prerequisites/\#prerequisites)

## _Icon Link_ [Installation](https://docs.fuel.network/guides/intro-to-sway/prerequisites/\#installation)

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

## _Icon Link_ [Already have `fuelup` installed?](https://docs.fuel.network/guides/intro-to-sway/prerequisites/\#already-have-fuelup-installed)

If you already have `fuelup` installed, run the commands below to make sure you are on the most up-to-date toolchain.

```fuel_Box fuel_Box-idXKMmm-css
fuelup self update
fuelup update
fuelup default latest
```

_Icon ClipboardText_

## _Icon Link_ [Fuel Wallet](https://docs.fuel.network/guides/intro-to-sway/prerequisites/\#fuel-wallet)

Our frontend application will allow users to connect with a wallet, so you'll need to have a browser wallet installed.

Before going to the next steps, install the [Fuel Wallet _Icon Link_](https://chromewebstore.google.com/detail/fuel-wallet/dldjpboieedgcmpkchcjcbijingjcgok) extension.

Once you've setup your wallet, click the "Faucet" button in the wallet to get some testnet tokens.

Additionally for this guide, ensure you're using Node.js/npm version `18.20.3 || ^20.0.0 || ^22.0.0`.
You can check your Node.js version with:

```fuel_Box fuel_Box-idXKMmm-css
node -v
```

_Icon ClipboardText_

## _Icon Link_ [Project Setup](https://docs.fuel.network/guides/intro-to-sway/prerequisites/\#project-setup)

Start with a Fuel template and name it `sway-store`.

```fuel_Box fuel_Box-idXKMmm-css
pnpm create fuels --pnpm sway-store
```

_Icon ClipboardText_

Go into the `sway-store` folder:

```fuel_Box fuel_Box-idXKMmm-css
cd sway-store
```

_Icon ClipboardText_

There should already be a folder called `sway-programs` inside, where your Sway programs will live. Ignore the other programs as we will only focus on the `contract` program type in this tutorial. Move into your `contract` folder:

```fuel_Box fuel_Box-idXKMmm-css
cd sway-programs/contract
```

_Icon ClipboardText_

Open up the `contract` folder in VSCode, and inside the `src` folder you should see a file called `main.sw`. This is where you will write your Sway contract.

Since we're creating a brand new contract you can delete everything in this file except for the `contract` keyword.

```fuel_Box fuel_Box-idXKMmm-css
contract;
```

_Icon ClipboardText_

The first line of the file is specifically reserved to inform the compiler whether we are writing a contract, script, predicate, or library. To designate the file as a contract, use the `contract` keyword.