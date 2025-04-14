[Guides](https://docs.fuel.network/guides/) /

[Intro to Predicates](https://docs.fuel.network/guides/intro-to-predicates/) /

Prerequisites

## _Icon Link_ [Prerequisites](https://docs.fuel.network/guides/intro-to-predicates/prerequisites/\#prerequisites)

## _Icon Link_ [Installation](https://docs.fuel.network/guides/intro-to-predicates/prerequisites/\#installation)

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

## _Icon Link_ [Already have `fuelup` installed?](https://docs.fuel.network/guides/intro-to-predicates/prerequisites/\#already-have-fuelup-installed)

If you already have `fuelup` installed, run the commands below to make sure you are on the most up-to-date toolchain.

```fuel_Box fuel_Box-idXKMmm-css
fuelup self update
fuelup update
fuelup default latest
```

_Icon ClipboardText_

## _Icon Link_ [Project Setup](https://docs.fuel.network/guides/intro-to-predicates/prerequisites/\#project-setup)

Start with a new empty folder and name it `multisig-predicate`.

```fuel_Box fuel_Box-idXKMmm-css
mkdir multisig-predicate
```

_Icon ClipboardText_

Go into the `multisig-predicate` folder:

```fuel_Box fuel_Box-idXKMmm-css
cd multisig-predicate
```

_Icon ClipboardText_

Within your terminal start by creating a new sway project called `predicate`:

```fuel_Box fuel_Box-idXKMmm-css
forc new --predicate predicate
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> Tip: Notice the `--predicate` flag, which tells `forc` that you want to create a project based on a **predicate**, rather than the default **contract** program type.

Your project structure generated from the `forc` command should like this:

```fuel_Box fuel_Box-idXKMmm-css
tree predicate
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
predicate
├── Forc.toml
└── src
    └── main.sw

1 directory, 2 files
```

_Icon ClipboardText_

Move into your predicate folder:

```fuel_Box fuel_Box-idXKMmm-css
cd predicate
```

_Icon ClipboardText_

In VSCode, navigate to the `src` folder within the `predicate` folder, where you will find a file named `main.sw`. This is the file where your Sway predicate will be written.