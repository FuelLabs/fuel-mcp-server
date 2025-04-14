[Guides](https://docs.fuel.network/guides/) /

[Counter Dapp](https://docs.fuel.network/guides/counter-dapp/) /

Building a Smart Contract

## _Icon Link_ [Writing A Sway Smart Contract](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#writing-a-sway-smart-contract)

## _Icon Link_ [Installation](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#installation)

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

## _Icon Link_ [Already have `fuelup` installed?](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#already-have-fuelup-installed)

If you already have `fuelup` installed, run the commands below to make sure you are on the most up-to-date toolchain.

```fuel_Box fuel_Box-idXKMmm-css
fuelup self update
fuelup update
fuelup default latest
```

_Icon ClipboardText_

## _Icon Link_ [Your First Sway Project](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#your-first-sway-project)

We'll build a simple counter contract with two functions: one to increment the counter, and one to return the value of the counter.

**Start by creating a new, empty folder. We'll call it `fuel-project`.**

```fuel_Box fuel_Box-idXKMmm-css
mkdir fuel-project
```

_Icon ClipboardText_

## _Icon Link_ [Writing the Contract](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#writing-the-contract)

Move inside of your `fuel-project` folder:

```fuel_Box fuel_Box-idXKMmm-css
cd fuel-project
```

_Icon ClipboardText_

Then create a contract project using `forc`:

```fuel_Box fuel_Box-idXKMmm-css
forc new counter-contract
```

_Icon ClipboardText_

You will get this output:

```fuel_Box fuel_Box-idXKMmm-css
To compile, use `forc build`, and to run tests use `forc test`
----
Read the Docs:
- Sway Book: https://docs.fuel.network/docs/sway
- Forc Book: https://docs.fuel.network/docs/forc
- Rust SDK Book: https://docs.fuel.network/docs/fuels-rs
- TypeScript SDK: https://docs.fuel.network/docs/fuels-ts

Join the Community:
- Follow us @SwayLang: https://twitter.com/SwayLang
- Ask questions on Discourse: https://forum.fuel.network/

Report Bugs:
- Sway Issues: https://github.com/FuelLabs/sway/issues/new
```

_Icon ClipboardText_

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

Open your project in a code editor and delete everything in `src/main.sw` apart from the first line.

Every Sway file must start with a declaration of what type of program the file contains; here, we've declared that this file is a contract.
You can learn more about Sway program types in the [Sway Book](https://docs.fuel.network/docs/sway/sway-program-types/).

```fuel_Box fuel_Box-idXKMmm-css
contract;
```

_Icon ClipboardText_

Next, we'll define a storage value.
In our case, we have a single counter that we'll call `counter` of type `u64` (a 64-bit unsigned integer) and initialize it to 0.

```fuel_Box fuel_Box-idXKMmm-css
storage {
    counter: u64 = 0,
}
```

_Icon ClipboardText_

## _Icon Link_ [ABI](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#abi)

ABI stands for Application Binary Interface.
An ABI defines an interface for a contract.
A contract must either define or import an ABI declaration.

It is considered best practice to define your ABI in a separate library and import it into your contract.
This allows callers of the contract to import and use the ABI more easily.

For simplicity, we will define the ABI directly in the contract file itself.

```fuel_Box fuel_Box-idXKMmm-css
abi Counter {
    #[storage(read, write)]
    fn increment();

    #[storage(read)]
    fn count() -> u64;
}
```

_Icon ClipboardText_

## _Icon Link_ [Implement ABI](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#implement-abi)

Below your ABI definition, you will write the implementation of the functions defined in your ABI.

```fuel_Box fuel_Box-idXKMmm-css
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

> _Icon InfoCircle_
>
> `storage.counter.read()` is an implicit return and is equivalent to `return storage.counter.read();`.

Here's what your code should look like so far:

File: `./counter-contract/src/main.sw`

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

## _Icon Link_ [Build the Contract](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#build-the-contract)

Navigate to your contract folder:

```fuel_Box fuel_Box-idXKMmm-css
cd counter-contract
```

_Icon ClipboardText_

Then run the following command to build your contract:

```fuel_Box fuel_Box-idXKMmm-css
forc build
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
  Compiled library "core".
  Compiled library "std".
  Compiled contract "counter-contract".
  Bytecode size: 84 bytes.
```

_Icon ClipboardText_

Let's have a look at the content of the `counter-contract` folder after building:

```fuel_Box fuel_Box-idXKMmm-css
tree .
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
.
├── Forc.lock
├── Forc.toml
├── out
│   └── debug
│       ├── counter-contract-abi.json
│       ├── counter-contract-storage_slots.json
│       └── counter-contract.bin
└── src
    └── main.sw

3 directories, 6 files
```

_Icon ClipboardText_

We now have an `out` directory that contains our build artifacts such as the JSON representation of our ABI and the contract bytecode.

## _Icon Link_ [Testing your Contract with Rust](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#testing-your-contract-with-rust)

> _Icon InfoCircle_
>
> Don't want to test with Rust? Skip this section and jump to [Deploy the Contract](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/#deploy-the-contract).

We will start by adding a Rust integration test harness using a Cargo generate template.
If you don't already have `Rust` installed, you can install it by running this command:

```fuel_Box fuel_Box-idXKMmm-css
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

_Icon ClipboardText_

Next, if you don't already have it installed, let's install [`cargo generate` _Icon Link_](https://github.com/cargo-generate/cargo-generate):

```fuel_Box fuel_Box-idXKMmm-css
cargo install cargo-generate --locked
```

_Icon ClipboardText_

Now, let's generate the default test harness with the following command:

```fuel_Box fuel_Box-idXKMmm-css
cargo generate --init fuellabs/sway templates/sway-test-rs --name counter-contract
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
⚠️   Favorite `fuellabs/sway` not found in config, using it as a git repository: https://github.com/fuellabs/sway.git
🔧   Destination: /home/user/path/to/counter-contract ...
🔧   project-name: counter-contract ...
🔧   Generating template ...
🔧   Moving generated files into: `/home/user/path/to/counter-contract`...
✨   Done! New project created /home/user/path/to/counter-contract
```

_Icon ClipboardText_

Let's have a look at the result:

```fuel_Box fuel_Box-idXKMmm-css
tree .
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
.
├── Cargo.toml
├── Forc.lock
├── Forc.toml
├── out
│   └── debug
│       ├── counter-contract-abi.json
│       ├── counter-contract-storage_slots.json
│       └── counter-contract.bin
├── src
│   └── main.sw
└── tests
    └── harness.rs

4 directories, 8 files
```

_Icon ClipboardText_

We have two new files!

- The `Cargo.toml` is the manifest for our new test harness and specifies the required dependencies including `fuels` (the Fuel Rust SDK).
- The `tests/harness.rs` contains some boilerplate test code to get us started, though doesn't call any contract methods just yet.

Open your `Cargo.toml` file and check the version of `fuels` used under `dev-dependencies`. Change the version to `0.66.1` if it's not already:

```fuel_Box fuel_Box-idXKMmm-css
[dev-dependencies]
fuels = "0.66.1"
tokio = { version = "1.12", features = ["rt", "macros"] }
```

_Icon ClipboardText_

Now that we have our default test harness, let's add a useful test to it.

At the bottom of `test/harness.rs` below the `can_get_contract_id()` test, add the `test_increment` test function below to verify that the value of the counter gets incremented:

```fuel_Box fuel_Box-idXKMmm-css
#[tokio::test]
async fn test_increment() {
    let (instance, _id) = get_contract_instance().await;

    // Increment the counter
    instance.methods().increment().call().await.unwrap();

    // Get the current value of the counter
    let result = instance.methods().count().call().await.unwrap();

    // Check that the current value of the counter is 1.
    // Recall that the initial value of the counter was 0.
    assert_eq!(result.value, 1);
}
```

_Icon ClipboardText_

Here is what your file should look like:

File: `./counter-contract/tests/harness.rs`

```fuel_Box fuel_Box-idXKMmm-css
use fuels::{prelude::*, types::ContractId};

// Load abi from json
abigen!(Contract(
    name = "MyContract",
    abi = "out/debug/counter-contract-abi.json"
));

async fn get_contract_instance() -> (MyContract<WalletUnlocked>, ContractId) {
    // Launch a local network and deploy the contract
    let mut wallets = launch_custom_provider_and_get_wallets(
        WalletsConfig::new(
            Some(1),             /* Single wallet */
            Some(1),             /* Single coin (UTXO) */
            Some(1_000_000_000), /* Amount per coin */
        ),
        None,
        None,
    )
    .await
    .unwrap();
    let wallet = wallets.pop().unwrap();

    let id = Contract::load_from(
        "./out/debug/counter-contract.bin",
        LoadConfiguration::default(),
    )
    .unwrap()
    .deploy(&wallet, TxPolicies::default())
    .await
    .unwrap();

    let instance = MyContract::new(id.clone(), wallet);

    (instance, id.into())
}

#[tokio::test]
async fn can_get_contract_id() {
    let (_instance, _id) = get_contract_instance().await;

    // Now you have an instance of your contract you can use to test each function
}

#[tokio::test]
async fn test_increment() {
    let (instance, _id) = get_contract_instance().await;

    // Increment the counter
    instance.methods().increment().call().await.unwrap();

    // Get the current value of the counter
    let result = instance.methods().count().call().await.unwrap();

    // Check that the current value of the counter is 1.
    // Recall that the initial value of the counter was 0.
    assert_eq!(result.value, 1);
}
```

Collapse_Icon ClipboardText_

Run `cargo test` in the terminal:

```fuel_Box fuel_Box-idXKMmm-css
cargo test
```

_Icon ClipboardText_

If all goes well, the output should look as follows:

```fuel_Box fuel_Box-idXKMmm-css
  ...
  running 2 tests
  test can_get_contract_id ... ok
  test test_increment ... ok
  test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.25s
```

_Icon ClipboardText_

## _Icon Link_ [Deploy the Contract](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#deploy-the-contract)

It's now time to deploy . We will show how to do this using `forc` from the command line, but you can also do it using the [Rust SDK](https://docs.fuel.network/docs/fuels-rs/deploying/) or the [TypeScript SDK](https://docs.fuel.network/docs/fuels-ts/contracts/deploying-contracts/).

In order to deploy a contract, you need to have a wallet to sign the transaction and coins to pay for gas. `Fuelup` will guide you in this process.

## _Icon Link_ [Setting up a local wallet](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#setting-up-a-local-wallet)

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

## _Icon Link_ [Deploy To Testnet](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#deploy-to-testnet)

Now, you can deploy the contract to the latest testnet with the `forc deploy` command.

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

Save the `Contract ID`, as you'll need this later to connect the frontend.

```fuel_Box fuel_Box-idXKMmm-css
Contract counter-contract Deployed!

Network: https://testnet.fuel.network
Contract ID: 0x8342d413de2a678245d9ee39f020795800c7e6a4ac5ff7daae275f533dc05e08
Deployed in block 0x4ea52b6652836c499e44b7e42f7c22d1ed1f03cf90a1d94cd0113b9023dfa636
```

_Icon ClipboardText_

## _Icon Link_ [Congrats, you have completed your first smart contract on Fuel ⛽](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#congrats-you-have-completed-your-first-smart-contract-on-fuel-)

[Here is the repo for this project _Icon Link_](https://github.com/FuelLabs/docs-hub/tree/master/docs/guides/examples/counter-dapp). If you run into any problems, a good first step is to compare your code to this repo and resolve any differences.

Tweet us [@fuel\_network _Icon Link_](https://twitter.com/fuel_network) letting us know you just built a dapp on Fuel, you might get invited to a private group of builders, be invited to the next Fuel dinner, get alpha on the project, or something 👀.

## _Icon Link_ [Need Help?](https://docs.fuel.network/guides/counter-dapp/building-a-smart-contract/\#need-help)

Get help from the team by posting your question in the [Fuel Forum _Icon Link_](https://forum.fuel.network/).