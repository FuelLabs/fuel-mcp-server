[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Connecting](https://docs.fuel.network/docs/fuels-rs/connecting/) /

Querying

## _Icon Link_ [Querying the blockchain](https://docs.fuel.network/docs/fuels-rs/connecting/querying/\#querying-the-blockchain)

Once you set up a provider, you can interact with the Fuel blockchain. Here are a few examples of what you can do with a provider; for a more in-depth overview of the API, check the [official provider API documentation _Icon Link_](https://docs.rs/fuels/latest/fuels/accounts/provider/struct.Provider.html).

- [Set up](https://docs.fuel.network/docs/fuels-rs/connecting/querying/#set-up)
- [Get all coins from an address](https://docs.fuel.network/docs/fuels-rs/connecting/querying/#get-all-coins-from-an-address)
- [Get spendable resources owned by an address](https://docs.fuel.network/docs/fuels-rs/connecting/querying/#get-spendable-resources-owned-by-an-address)
- [Get balances from an address](https://docs.fuel.network/docs/fuels-rs/connecting/querying/#get-balances-from-an-address)

## _Icon Link_ [Set up](https://docs.fuel.network/docs/fuels-rs/connecting/querying/\#set-up)

You might need to set up a test blockchain first. You can skip this step if you're connecting to an external blockchain.

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;

// Set up our test blockchain.

// Create a random wallet (more on wallets later).
let wallet = WalletUnlocked::new_random(None);

// How many coins in our wallet.
let number_of_coins = 1;

// The amount/value in each coin in our wallet.
let amount_per_coin = 3;

let coins = setup_single_asset_coins(
    wallet.address(),
    AssetId::zeroed(),
    number_of_coins,
    amount_per_coin,
);

let retry_config = RetryConfig::new(3, Backoff::Fixed(Duration::from_secs(2)))?;
let provider = setup_test_provider(coins.clone(), vec![], None, None)
    .await?
    .with_retry_config(retry_config);
```

_Icon ClipboardText_

## _Icon Link_ [Get all coins from an address](https://docs.fuel.network/docs/fuels-rs/connecting/querying/\#get-all-coins-from-an-address)

This method returns all unspent coins (of a given asset ID) from a wallet.

```fuel_Box fuel_Box-idXKMmm-css
let consensus_parameters = provider.consensus_parameters().await?;
let coins = provider
    .get_coins(wallet.address(), *consensus_parameters.base_asset_id())
    .await?;
assert_eq!(coins.len(), 1);
```

_Icon ClipboardText_

## _Icon Link_ [Get spendable resources owned by an address](https://docs.fuel.network/docs/fuels-rs/connecting/querying/\#get-spendable-resources-owned-by-an-address)

The following example shows how to fetch resources owned by an address. First, you create a `ResourceFilter` which specifies the target address, asset ID, and amount. You can also define UTXO IDs and message IDs that should be excluded when retrieving the resources:

```fuel_Box fuel_Box-idXKMmm-css
pub struct ResourceFilter {
    pub from: Bech32Address,
    pub asset_id: Option<AssetId>,
    pub amount: u64,
    pub excluded_utxos: Vec<UtxoId>,
    pub excluded_message_nonces: Vec<Nonce>,
}
```

_Icon ClipboardText_

The example uses default values for the asset ID and the exclusion lists. This resolves to the base asset ID and empty vectors for the ID lists respectively:

```fuel_Box fuel_Box-idXKMmm-css
let filter = ResourceFilter {
    from: wallet.address().clone(),
    amount: 1,
    ..Default::default()
};
let spendable_resources = provider.get_spendable_resources(filter).await?;
assert_eq!(spendable_resources.len(), 1);
```

_Icon ClipboardText_

## _Icon Link_ [Get balances from an address](https://docs.fuel.network/docs/fuels-rs/connecting/querying/\#get-balances-from-an-address)

Get all the spendable balances of all assets for an address. This is different from getting the coins because we only return the numbers (the sum of UTXOs coins amount for each asset ID) and not the UTXOs coins themselves.

```fuel_Box fuel_Box-idXKMmm-css
let _balances = provider.get_balances(wallet.address()).await?;
```

_Icon ClipboardText_