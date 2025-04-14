[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Cookbook](https://docs.fuel.network/docs/nightly/fuels-rs/cookbook/) /

Custom Chain

## _Icon Link_ [Custom chain](https://docs.fuel.network/docs/nightly/fuels-rs/cookbook/custom-chain/\#custom-chain)

This example demonstrates how to start a short-lived Fuel node with custom consensus parameters for the underlying chain.

First, we have to import `ConsensusParameters` and `ChainConfig`:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::{
    prelude::*,
    tx::{ConsensusParameters, FeeParameters, TxParameters},
};
```

_Icon ClipboardText_

Next, we can define some values for the consensus parameters:

```fuel_Box fuel_Box-idXKMmm-css
let tx_params = TxParameters::default()
    .with_max_gas_per_tx(1_000)
    .with_max_inputs(2);
let fee_params = FeeParameters::default().with_gas_price_factor(10);

let mut consensus_parameters = ConsensusParameters::default();
consensus_parameters.set_tx_params(tx_params);
consensus_parameters.set_fee_params(fee_params);

let chain_config = ChainConfig {
    consensus_parameters,
    ..ChainConfig::default()
};
```

_Icon ClipboardText_

Before we can start a node, we probably also want to define some genesis coins and assign them to an address:

```fuel_Box fuel_Box-idXKMmm-css
let signer = PrivateKeySigner::random(&mut thread_rng());
let coins = setup_single_asset_coins(
    signer.address(),
    Default::default(),
    DEFAULT_NUM_COINS,
    DEFAULT_COIN_AMOUNT,
);
```

_Icon ClipboardText_

Finally, we call `setup_test_provider()`, which starts a node with the given configurations and returns a
provider attached to that node:

```fuel_Box fuel_Box-idXKMmm-css
let node_config = NodeConfig::default();
let _provider =
    setup_test_provider(coins, vec![], Some(node_config), Some(chain_config)).await?;
```

_Icon ClipboardText_