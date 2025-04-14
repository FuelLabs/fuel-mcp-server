[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Connecting](https://docs.fuel.network/docs/nightly/fuels-rs/connecting/) /

Short Lived

## _Icon Link_ [Running a short-lived Fuel node with the SDK](https://docs.fuel.network/docs/nightly/fuels-rs/connecting/short-lived/\#running-a-short-lived-fuel-node-with-the-sdk)

You can use the SDK to spin up a local, ideally short-lived Fuel node. Then, you can instantiate a Fuel client, pointing to this node.

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::{FuelService, Provider};

// Run the fuel node.
let server = FuelService::start(
    NodeConfig::default(),
    ChainConfig::default(),
    StateConfig::default(),
)
.await?;

// Create a client that will talk to the node created above.
let client = Provider::from(server.bound_address()).await?;
assert!(client.healthy().await?);
```

_Icon ClipboardText_

This approach is ideal for contract testing.

You can also use the test helper `setup_test_provider()` for this:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;

// Use the test helper to setup a test provider.
let provider = setup_test_provider(vec![], vec![], None, None).await?;

// Create the wallet.
let _wallet = Wallet::random(&mut thread_rng(), provider);
```

_Icon ClipboardText_

You can also use `launch_provider_and_get_wallet()`, which abstracts away the `setup_test_provider()` and the wallet creation, all in one single method:

```fuel_Box fuel_Box-idXKMmm-css
let wallet = launch_provider_and_get_wallet().await?;
```

_Icon ClipboardText_

## _Icon Link_ [Features](https://docs.fuel.network/docs/nightly/fuels-rs/connecting/short-lived/\#features)

## _Icon Link_ [Fuel-core lib](https://docs.fuel.network/docs/nightly/fuels-rs/connecting/short-lived/\#fuel-core-lib)

The `fuel-core-lib` feature allows us to run a `fuel-core` node without installing the `fuel-core` binary on the local machine. Using the `fuel-core-lib` feature flag entails downloading all the dependencies needed to run the fuel-core node.

```fuel_Box fuel_Box-idXKMmm-css
fuels = { version = "0.71.0", features = ["fuel-core-lib"] }
```

_Icon ClipboardText_

## _Icon Link_ [RocksDB](https://docs.fuel.network/docs/nightly/fuels-rs/connecting/short-lived/\#rocksdb)

The `rocksdb` is an additional feature that, when combined with `fuel-core-lib`, provides persistent storage capabilities while using `fuel-core` as a library.

```fuel_Box fuel_Box-idXKMmm-css
fuels = { version = "0.71.0", features = ["rocksdb"] }
```

_Icon ClipboardText_