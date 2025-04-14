[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Testing](https://docs.fuel.network/docs/sway/testing/) /

Testing With Rust

## _Icon Link_ [Testing with Rust](https://docs.fuel.network/docs/sway/testing/testing-with-rust/\#testing-with-rust)

A common use of Sway is for writing contracts or scripts that exist as part of a
wider Rust application. In order to test the interaction between our Sway code
and our Rust code we can add integration testing.

## _Icon Link_ [Adding Rust Integration Testing](https://docs.fuel.network/docs/sway/testing/testing-with-rust/\#adding-rust-integration-testing)

To add Rust integration testing to a Forc project we can use [the `sway-test-rs`\\
cargo generate\\
template _Icon Link_](https://github.com/FuelLabs/sway/tree/v0.67.0/templates/sway-test-rs).
This template makes it easier for Sway developers to add the boilerplate required when
setting up their Rust integration testing.

Let's add a Rust integration test to [the fresh project we created in the introduction](https://docs.fuel.network/docs/sway/introduction/forc_project/).

## _Icon Link_ [1\. Enter the project](https://docs.fuel.network/docs/sway/testing/testing-with-rust/\#1-enter-the-project)

To recap, here's what our empty project looks like:

```fuel_Box fuel_Box-idXKMmm-css
$ cd my-fuel-project
$ tree .
├── Forc.toml
└── src
    └── main.sw
```

_Icon ClipboardText_

## _Icon Link_ [2\. Install `cargo generate`](https://docs.fuel.network/docs/sway/testing/testing-with-rust/\#2-install-cargo-generate)

We're going to add a Rust integration test harness using a cargo generate
template. Let's make sure we have the `cargo generate` command installed!

```fuel_Box fuel_Box-idXKMmm-css
cargo install cargo-generate
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> _**Note**: You can learn more about cargo generate by visiting the_
> _[cargo-generate repository _Icon Link_](https://github.com/cargo-generate/cargo-generate)._

## _Icon Link_ [3\. Generate the test harness](https://docs.fuel.network/docs/sway/testing/testing-with-rust/\#3-generate-the-test-harness)

Let's generate the default test harness with the following:

```fuel_Box fuel_Box-idXKMmm-css
cargo generate --init fuellabs/sway templates/sway-test-rs --name my-fuel-project --force
```

_Icon ClipboardText_

`--force` forces your `--name` input to retain your desired casing for the `{{project-name}}`
placeholder in the template. Otherwise, `cargo-generate` automatically converts it to `kebab-case`.
With `--force`, this means that both `my_fuel_project` and `my-fuel-project` are valid project names,
depending on your needs.

> _Icon InfoCircle_
>
> \_ **Note**: `templates/sway-test-rs` can be replaced with `templates/sway-script-test-rs` or `templates/sway-predicate-test-rs` to generate a test
> harness for scripts and predicates respectively.

If all goes well, the output should look as follows:

```fuel_Box fuel_Box-idXKMmm-css
⚠️   Favorite `fuellabs/sway` not found in config, using it as a git repository: https://github.com/fuellabs/sway
🤷   Project Name : my-fuel-project
🔧   Destination: /home/user/path/to/my-fuel-project ...
🔧   Generating template ...
[1/3]   Done: Cargo.toml
[2/3]   Done: tests/harness.rs
[3/3]   Done: tests
🔧   Moving generated files into: `/home/user/path/to/my-fuel-project`...
✨   Done! New project created /home/user/path/to/my-fuel-project
```

_Icon ClipboardText_

Let's have a look at the result:

```fuel_Box fuel_Box-idXKMmm-css
$ tree .
├── Cargo.toml
├── Forc.toml
├── build.rs
├── src
│   └── main.sw
└── tests
    └── harness.rs
```

_Icon ClipboardText_

We have three new files!

- The `Cargo.toml` is the manifest for our new test harness and specifies the
required dependencies including `fuels` the Fuel Rust SDK.
- The `tests/harness.rs` contains some boilerplate test code to get us started,
though doesn't call any contract methods just yet.
- The `build.rs` is a build script that compiles the Sway project with `forc build`
whenever `cargo test` is run.

## _Icon Link_ [4\. Build the forc project](https://docs.fuel.network/docs/sway/testing/testing-with-rust/\#4-build-the-forc-project)

Before running the tests, we need to build our contract so that the necessary
ABI, storage and bytecode artifacts are available. We can do so with `forc build`:

```fuel_Box fuel_Box-idXKMmm-css
$ forc build
  Creating a new `Forc.lock` file. (Cause: lock file did not exist)
    Adding std git+https://github.com/fuellabs/sway?tag=v0.24.5#e695606d8884a18664f6231681333a784e623bc9
   Created new lock file at /home/user/path/to/my-fuel-project/Forc.lock
  Compiled library "std".
  Compiled contract "my-fuel-project".
  Bytecode size is 60 bytes.
```

_Icon ClipboardText_

At this point, our project should look like the following:

```fuel_Box fuel_Box-idXKMmm-css
$ tree
├── Cargo.toml
├── Forc.lock
├── Forc.toml
├── build.rs
├── out
│   └── debug
│       ├── my-fuel-project-abi.json
│       ├── my-fuel-project.bin
│       └── my-fuel-project-storage_slots.json
├── src
│   └── main.sw
└── tests
    └── harness.rs
```

_Icon ClipboardText_

We now have an `out` directory with our required JSON files!

> _Icon InfoCircle_
>
> _**Note**: This step may no longer be required in the future as we plan to_
> _enable the integration testing to automatically build the artifacts as_
> _necessary so that files like the ABI JSON are always up to date._

## _Icon Link_ [5\. Build and run the tests](https://docs.fuel.network/docs/sway/testing/testing-with-rust/\#5-build-and-run-the-tests)

Now we're ready to build and run the default integration test.

```fuel_Box fuel_Box-idXKMmm-css
$ cargo test
    Updating crates.io index
   Compiling version_check v0.9.4
   Compiling proc-macro2 v1.0.46
   Compiling quote v1.0.21
   ...
   Compiling fuels v0.24.0
   Compiling my-fuel-project v0.1.0 (/home/user/path/to/my-fuel-project)
    Finished test [unoptimized + debuginfo] target(s) in 1m 03s
     Running tests/harness.rs (target/debug/deps/integration_tests-373971ac377845f7)

running 1 test
test can_get_contract_id ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.36s
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> _**Note**: The first time we run `cargo test`, cargo will spend some time_
> _fetching and building the dependencies for Fuel's Rust SDK. This might take a_
> _while, but only the first time!_

If all went well, we should see some output that looks like the above!

## _Icon Link_ [Writing Tests](https://docs.fuel.network/docs/sway/testing/testing-with-rust/\#writing-tests)

Now that we've learned how to setup Rust integration testing in our project,
let's try to write some of our own tests!

First, let's update our contract code with a simple counter example:

```fuel_Box fuel_Box-idXKMmm-css
contract;

abi TestContract {
    #[storage(write)]
    fn initialize_counter(value: u64) -> u64;

    #[storage(read, write)]
    fn increment_counter(amount: u64) -> u64;
}

storage {
    counter: u64 = 0,
}

impl TestContract for Contract {
    #[storage(write)]
    fn initialize_counter(value: u64) -> u64 {
        storage.counter.write(value);
        value
    }

    #[storage(read, write)]
    fn increment_counter(amount: u64) -> u64 {
        let incremented = storage.counter.read() + amount;
        storage.counter.write(incremented);
        incremented
    }
}

```

_Icon ClipboardText_

To test our `initialize_counter` and `increment_counter` contract methods from
the Rust test harness, we could update our `tests/harness.rs` file with the
following:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::{prelude::*, types::ContractId};

// Load abi from json
abigen!(Contract(
    name = "MyContract",
    abi = "out/debug/my-fuel-project-abi.json"
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
        "./out/debug/my-fuel-project.bin",
        LoadConfiguration::default().set_storage_configuration(
            StorageConfiguration::load_from(
                "./out/debug/my-fuel-project-storage_slots.json",
            )
            .unwrap(),
        ),
    )
    .unwrap()
    .deploy(&wallet, TxPolicies::default())
    .await
    .unwrap();

    let instance = MyContract::new(id.clone(), wallet);

    (instance, id.into())
}

#[tokio::test]
async fn initialize_and_increment() {
    let (contract_instance, _id) = get_contract_instance().await;
    // Now you have an instance of your contract you can use to test each function

    let result = contract_instance
        .methods()
        .initialize_counter(42)
        .call()
        .await
        .unwrap();

    assert_eq!(42, result.value);

    // Call `increment_counter()` method in our deployed contract.
    let result = contract_instance
        .methods()
        .increment_counter(10)
        .call()
        .await
        .unwrap();

    assert_eq!(52, result.value);
}
```

Collapse_Icon ClipboardText_

Let's build our project once more and run the test:

```fuel_Box fuel_Box-idXKMmm-css
forc build
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
$ cargo test
   Compiling my-fuel-project v0.1.0 (/home/mindtree/programming/sway/my-fuel-project)
    Finished test [unoptimized + debuginfo] target(s) in 11.61s
     Running tests/harness.rs (target/debug/deps/integration_tests-373971ac377845f7)

running 1 test
test initialize_and_increment ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 1.25s
```

_Icon ClipboardText_

When cargo runs our test, our test uses the SDK to spin up a local in-memory
Fuel network, deploy our contract to it, and call the contract methods via the
ABI.

You can add as many functions decorated with `#[tokio::test]` as you like, and
`cargo test` will automatically test each of them!