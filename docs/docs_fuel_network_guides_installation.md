[Guides](https://docs.fuel.network/guides/) /

Installation

## _Icon Link_ [Toolchain installation](https://docs.fuel.network/guides/installation/\#toolchain-installation)

This guide will help you to install the Fuel toolchain binaries and prerequisites.

This guide covers the following topics:

1. [Installing the Fuel toolchain using `fuelup`](https://docs.fuel.network/guides/installation/#installing-the-fuel-toolchain-using-fuelup)
2. [Changing your default toolchain](https://docs.fuel.network/guides/installation/#changing-your-default-toolchain)
3. [Setting up a local wallet](https://docs.fuel.network/guides/installation/#setting-up-a-local-wallet)
4. [Installing Rust](https://docs.fuel.network/guides/installation/#installing-rust)

## _Icon Link_ [Installing the Fuel toolchain using fuelup](https://docs.fuel.network/guides/installation/\#installing-the-fuel-toolchain-using-fuelup)

`fuelup` is the official package manager for Fuel that installs the Fuel toolchain
from the official release channels, enabling you to easily switch between different
toolchains and keep them updated. It makes building and maintaining Sway applications simpler with [`forc`](https://docs.fuel.network/docs/forc/) and [`fuel-core` _Icon Link_](https://github.com/FuelLabs/fuel-core) for common platforms.

> _Icon InfoCircle_
>
> 💡 Check out the [fuelup docs _Icon Link_](https://install.fuel.network/latest/) for more information.

## _Icon Link_ [Running `fuelup-init`](https://docs.fuel.network/guides/installation/\#running-fuelup-init)

To install the Fuel toolchain, you can use the `fuelup-init` script.
This will install `forc`, `forc-client`, `forc-fmt`, `forc-lsp`, `forc-wallet` as well as `fuel-core` in `~/.fuelup/bin`.

👉 Just paste the following line in your terminal and press _Enter_.

```fuel_Box fuel_Box-idXKMmm-css
curl https://install.fuel.network | sh
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> 🚧 Be aware that currently we do not natively support Windows. If you wish to use `fuelup` on Windows, please use Windows Subsystem for Linux.

## _Icon Link_ [Setup PATH](https://docs.fuel.network/guides/installation/\#setup-path)

Once the script is downloaded, it will be executed automatically.
The `fuelup-init` script will prompt you with the question below:

```fuel_Box fuel_Box-idXKMmm-css
fuelup uses "/home/username/.fuelup" as its home directory to manage the Fuel toolchain, and will install binaries there.

To use the toolchain, you will have to configure your PATH, which tells your machine where to locate `fuelup` and the Fuel toolchain.

If permitted, fuelup-init will configure your PATH for you by running the following:

    echo "export PATH="$HOME/.fuelup/bin:$PATH"" >> /home/username/.bashrc

Would you like fuelup-init to modify your PATH variable for you? (N/y)
```

_Icon ClipboardText_

👉 Press the `Y` key in your terminal and press _Enter_ to modify your PATH.

## _Icon Link_ [Checking the installation](https://docs.fuel.network/guides/installation/\#checking-the-installation)

After allowing the `fuelup-init` script to modify your `PATH` variable, you will see a lot of information about packages being downloaded and installed. If everything goes as expected you will see the following message:

```fuel_Box fuel_Box-idXKMmm-css
The Fuel toolchain is installed and up to date

fuelup 0.20.0 has been installed in /home/username/.fuelup/bin.
To fetch the latest toolchain containing the forc and fuel-core binaries, run 'fuelup toolchain install latest'.
To generate completions for your shell, run 'fuelup completions --shell=SHELL'.
```

_Icon ClipboardText_

👉 Use `fuelup --version` any time to check which version of the package you are using.

```fuel_Box fuel_Box-idXKMmm-css
 fuelup --version
```

_Icon ClipboardText_

That will output your current `fuelup` version:

```fuel_Box fuel_Box-idXKMmm-css
fuelup 0.21.0
```

_Icon ClipboardText_

## _Icon Link_ [VSCode extensions](https://docs.fuel.network/guides/installation/\#vscode-extensions)

If you're using VSCode, we recommend installing the [Sway extension _Icon Link_](https://marketplace.visualstudio.com/items?itemName=FuelLabs.sway-vscode-plugin).

## _Icon Link_ [Changing your default toolchain](https://docs.fuel.network/guides/installation/\#changing-your-default-toolchain)

Just as in [Rust _Icon Link_](https://rust-lang.github.io/rustup/concepts/toolchains.html), Fuel supports multiple toolchains.
A toolchain is a collection of tools (such as the compiler, LSP, etc).
By default, `fuelup` includes a series of packages tested to work with each other, providing a reliable set of tools.

The default toolchain configured when you install `fuelup` is the `latest` toolchain, which is the stable toolchain compatible with the current `testnet` network.

## _Icon Link_ [Updating fuelup](https://docs.fuel.network/guides/installation/\#updating-fuelup)

Make sure you have the latest version of `fuelup` so you can access the latest features and have the best performance.

👉 Update `fuelup` by running the following command:

```fuel_Box fuel_Box-idXKMmm-css
fuelup self update
```

_Icon ClipboardText_

Then you will get an output like this:

```fuel_Box fuel_Box-idXKMmm-css
Fetching binary from https://github.com/FuelLabs/fuelup/releases/download/v0.19.5/fuelup-0.19.5-aarch64-apple-darwin.tar.gz
Downloading component fuelup without verifying checksum
Unpacking and moving fuelup to /var/folders/tp/0l8zdx9j4s9_n609ykwxl0qw0000gn/T/.tmpiNJQHt
Moving /var/folders/tp/0l8zdx9j4s9_n609ykwxl0qw0000gn/T/.tmpiNJQHt/fuelup to /Users/.fuelup/bin/fuelup
```

_Icon ClipboardText_

## _Icon Link_ [Using the latest toolchain](https://docs.fuel.network/guides/installation/\#using-the-latest-toolchain)

To properly interact with the testnet network it is necessary to use the `latest` toolchain, which is installed by default.

👉 Run the following command to verify the installation of `latest` toolchain:

```fuel_Box fuel_Box-idXKMmm-css
fuelup show
```

_Icon ClipboardText_

If the toolchain was successfully installed, you will see this output:

```fuel_Box fuel_Box-idXKMmm-css
installed toolchains
--------------------
latest-x86_64-unknown-linux-gnu (default)

active toolchain
-----------------
latest-x86_64-unknown-linux-gnu (default)
...
```

_Icon ClipboardText_

## _Icon Link_ [Installing `nightly` toolchain](https://docs.fuel.network/guides/installation/\#installing-nightly-toolchain)

In case you want to try out the unreleased features of the Fuel toolchain, you can install the `nightly` toolchain.

👉 Run the following command to install the `nightly` toolchain:

```fuel_Box fuel_Box-idXKMmm-css
fuelup toolchain install nightly
```

_Icon ClipboardText_

If the toolchain was successfully installed, you will see this output:

```fuel_Box fuel_Box-idXKMmm-css
The Fuel toolchain is installed and up to date
```

_Icon ClipboardText_

The toolchain was installed correctly, however is not in use yet. Next, you need to configure `fuelup` to use the `nightly` toolchain as the default.

👉 Set `nightly` as your default toolchain with the following command:

```fuel_Box fuel_Box-idXKMmm-css
fuelup default nightly
```

_Icon ClipboardText_

You will get the following output indicating that you have successfully set `nightly` as your default toolchain.

```fuel_Box fuel_Box-idXKMmm-css
default toolchain set to nightly
```

_Icon ClipboardText_

## _Icon Link_ [Checking your current toolchain](https://docs.fuel.network/guides/installation/\#checking-your-current-toolchain)

Sometimes you might end up using multiple toolchains at once.
Don't worry if you get confused about which toolchain you are using, since you can check your current toolchain anytime.

👉 Run the `fuelup show` command to see the toolchain and the versions of each tool you are using.

```fuel_Box fuel_Box-idXKMmm-css
fuelup show
```

_Icon ClipboardText_

This command will give you the following output

```fuel_Box fuel_Box-idXKMmm-css
active toolchain
-----------------
beta-4-x86_64-unknown-linux-gnu (default)
  forc : 0.45.0
    - forc-client
      - forc-deploy : 0.45.0
      - forc-run : 0.45.0
    - forc-doc : 0.45.0
    - forc-explore : 0.28.1
    - forc-fmt : 0.45.0
    - forc-index : 0.20.7
    - forc-lsp : 0.45.0
    - forc-tx : 0.45.0
    - forc-wallet : 0.3.0
  fuel-core : 0.20.4
  fuel-core-keygen : Error getting version string

fuels versions
---------------
forc : 0.45
forc-wallet : 0.45
```

_Icon ClipboardText_

## _Icon Link_ [Setting up a local wallet](https://docs.fuel.network/guides/installation/\#setting-up-a-local-wallet)

The `forc-wallet` plugin is packaged alongside the default distributed toolchains when installed using `fuelup`, so you should already have this installed if you've followed the instructions above.

To initialize a new wallet with `forc-wallet`, you can run the command below:

```fuel_Box fuel_Box-idXKMmm-css
forc wallet new
```

_Icon ClipboardText_

After typing in a password, be sure to save the mnemonic phrase that is output.

Next, create a new wallet account with:

```fuel_Box fuel_Box-idXKMmm-css
forc wallet account new
```

_Icon ClipboardText_

With this, you'll get a fuel address that looks something like this: `fuel1efz7lf36w9da9jekqzyuzqsfrqrlzwtt3j3clvemm6eru8fe9nvqj5kar8`.

If you need to list your accounts, you can run the command below:

```fuel_Box fuel_Box-idXKMmm-css
forc wallet accounts
```

_Icon ClipboardText_

## _Icon Link_ [Installing Rust](https://docs.fuel.network/guides/installation/\#installing-rust)

If you want to develop with the `fuels` Rust SDK, you will need to install Rust on your machine. To install Rust, you can use the `rustup` tool.

> _Icon InfoCircle_
>
> You don't need to install Rust if you don't plan on using the Rust SDK.

Run the following command in your shell; this downloads and runs `rustup-init.sh`, which in turn downloads and runs the correct version of the `rustup-init` executable for your platform.

```fuel_Box fuel_Box-idXKMmm-css
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

_Icon ClipboardText_

Check the official Rust documentation to get more information on [installing the Rust toolchain _Icon Link_](https://www.rust-lang.org/tools/install).

## _Icon Link_ [What's next?](https://docs.fuel.network/guides/installation/\#whats-next)

Now you are ready to start building with Fuel.

👉 Check out the [counter dapp guide](https://docs.fuel.network/guides/counter-dapp/) to deploy your first smart contract.

## _Icon Link_ [Beyond the basics](https://docs.fuel.network/guides/installation/\#beyond-the-basics)

## _Icon Link_ [Custom toolchains](https://docs.fuel.network/guides/installation/\#custom-toolchains)

You can create your own set of specific versions, this is known as 'custom toolchains'.

👉 Visit the [Fuelup docs _Icon Link_](https://install.fuel.network/master/concepts/toolchains.html) to learn how to set up your own custom toolchains.

## _Icon Link_ [Build from source](https://docs.fuel.network/guides/installation/\#build-from-source)

You can always build the Fuel packages from source.

👉 Visit the [Fuelup docs _Icon Link_](https://install.fuel.network/master/installation/other.html) to get more details about other types of installation.

## _Icon Link_ [Github Codespaces](https://docs.fuel.network/guides/installation/\#github-codespaces)

It's always possible to run a development environment in the browser.

👉 Visit our guide on [Github Codespaces](https://docs.fuel.network/guides/installation/codespace/) to use the Fuel toolchain in the browser.