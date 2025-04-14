[Guides](https://docs.fuel.network/guides/) /

Contract Quickstart

## _Icon Link_ [Smart Contract Quickstart](https://docs.fuel.network/guides/contract-quickstart/\#smart-contract-quickstart)

Getting started with Fuel as a smart contract developer is as simple as:

1. [Installing](https://docs.fuel.network/guides/contract-quickstart/#installation) `fuelup`
2. [Generating a counter contract](https://docs.fuel.network/guides/contract-quickstart/#generating-a-counter-contract)
3. [Building the contract](https://docs.fuel.network/guides/contract-quickstart/#building-the-contract)
4. [Setting up a local wallet](https://docs.fuel.network/guides/contract-quickstart/#setting-up-a-local-wallet)
5. [Deploying the contract](https://docs.fuel.network/guides/contract-quickstart/#deploying-the-contract)

## _Icon Link_ [Installation](https://docs.fuel.network/guides/contract-quickstart/\#installation)

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

## _Icon Link_ [Already have `fuelup` installed?](https://docs.fuel.network/guides/contract-quickstart/\#already-have-fuelup-installed)

If you already have `fuelup` installed, run the commands below to make sure you are on the most up-to-date toolchain.

```fuel_Box fuel_Box-idXKMmm-css
fuelup self update
fuelup update
fuelup default latest
```

_Icon ClipboardText_

## _Icon Link_ [Generating a counter contract](https://docs.fuel.network/guides/contract-quickstart/\#generating-a-counter-contract)

Run the command below to generate a counter contract in Sway:

```fuel_Box fuel_Box-idXKMmm-css
forc new counter-contract
```

_Icon ClipboardText_

The contract will be in the `src/main.sw` file.

Here is the project that `forc` has initialized:

```fuel_Box fuel_Box-idXKMmm-css
tree counter-contract
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
counter-contract
├── Forc.toml
└── src
    └── main.sw

1 directory, 2 files
```

_Icon ClipboardText_

`forc.toml` is the _manifest file_ (similar to `Cargo.toml` for Cargo or `package.json` for Node) and defines project metadata such as the project name and dependencies.

## _Icon Link_ [Building the contract](https://docs.fuel.network/guides/contract-quickstart/\#building-the-contract)

To build a contract, move inside the `counter-contract` folder:

```fuel_Box fuel_Box-idXKMmm-css
cd counter-contract
```

_Icon ClipboardText_

Copy and paste the code below into your `src/main.sw` file

```fuel_Box fuel_Box-idXKMmm-css
contract;

storage {
    counter: u64 = 0,
}

abi Counter {
    #[storage(read, write)]
    fn increment();

    #[storage(read)]
    fn count() -> u64;
}

impl Counter for Contract {
    #[storage(read)]
    fn count() -> u64 {
        storage.counter.read()
    }

    #[storage(read, write)]
    fn increment() {
        let incremented = storage.counter.read() + 1;
        storage.counter.write(incremented);
    }
}
```

_Icon ClipboardText_

Next, run the `forc build` command:

```fuel_Box fuel_Box-idXKMmm-css
forc build
```

_Icon ClipboardText_

## _Icon Link_ [Setting up a local wallet](https://docs.fuel.network/guides/contract-quickstart/\#setting-up-a-local-wallet)

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

You can get test funds using the [faucet _Icon Link_](https://faucet-testnet.fuel.network/).

## _Icon Link_ [Deploying the contract](https://docs.fuel.network/guides/contract-quickstart/\#deploying-the-contract)

To deploy the contract to the testnet, you can run:

```fuel_Box fuel_Box-idXKMmm-css
forc deploy --testnet
```

_Icon ClipboardText_

The terminal will ask for the password of the wallet:

`Please provide the password of your encrypted wallet vault at "~/.fuel/wallets/.wallet":`

Once you have unlocked the wallet, the terminal will show a list of the accounts:

```fuel_Box fuel_Box-idXKMmm-css
Account 0 -- fuel18caanqmumttfnm8qp0eq7u9yluydxtqmzuaqtzdjlsww5t2jmg9skutn8n:
  Asset ID                                                           Amount
  0000000000000000000000000000000000000000000000000000000000000000 499999940
```

_Icon ClipboardText_

Just below the list, you'll see this prompt:

`Please provide the index of account to use for signing:`

Then you'll enter the number of the account of preference and press `Y` when prompted to accept the transaction.

Finally, you will get back the network endpoint where the contract was deployed, a `Contract ID` and the block where the transaction was signed.

## _Icon Link_ [Next Steps](https://docs.fuel.network/guides/contract-quickstart/\#next-steps)

Ready to learn more? Check out the following resources:

- Learn the step-by-step instructions for how to build a full-stack [counter contract dapp](https://docs.fuel.network/guides/counter-dapp/)
- Build a full-stack marketplace dapp with the [Intro to Sway](https://docs.fuel.network/guides/intro-to-sway/) guide
- Try building with [Predicates](https://docs.fuel.network/guides/intro-to-predicates/)
- Read the [Sway docs](https://docs.fuel.network/docs/sway/)