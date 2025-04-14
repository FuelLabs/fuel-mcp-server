[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Cookbook](https://docs.fuel.network/docs/nightly/fuels-rs/cookbook/) /

Transfer All Assets

## _Icon Link_ [Transfer all assets](https://docs.fuel.network/docs/nightly/fuels-rs/cookbook/transfer-all-assets/\#transfer-all-assets)

The `transfer()` method lets you transfer a single asset, but what if you needed to move all of your assets to a different wallet? You could repeatably call `transfer()`, initiating a transaction each time, or you bundle all the transfers into a single transaction. This chapter guides you through crafting your custom transaction for transferring all assets owned by a wallet.

Lets quickly go over the setup:

```fuel_Box fuel_Box-idXKMmm-css
let wallet_1_signer = PrivateKeySigner::random(&mut thread_rng());

const NUM_ASSETS: u64 = 5;
const AMOUNT: u64 = 100_000;
const NUM_COINS: u64 = 1;
let (coins, _) =
    setup_multiple_assets_coins(wallet_1_signer.address(), NUM_ASSETS, NUM_COINS, AMOUNT);

let provider = setup_test_provider(coins, vec![], None, None).await?;

let wallet_1 = Wallet::new(wallet_1_signer, provider.clone());
let wallet_2 = Wallet::random(&mut thread_rng(), provider.clone());
```

_Icon ClipboardText_

We prepare two wallets with randomized addresses. Next, we want one of our wallets to have some random assets, so we set them up with `setup_multiple_assets_coins()`.

Transactions require us to define input and output coins. Let's assume we do not know the assets owned by `wallet_1`. We retrieve its balances, i.e. tuples consisting of a string representing the asset ID and the respective amount. This lets us use the helpers `get_asset_inputs_for_amount()`, `get_asset_outputs_for_amount()` to create the appropriate inputs and outputs.

We transfer only a part of the base asset balance so that the rest can cover transaction fees:

```fuel_Box fuel_Box-idXKMmm-css
let balances = wallet_1.get_balances().await?;

let consensus_parameters = provider.consensus_parameters().await?;
let mut inputs = vec![];
let mut outputs = vec![];
for (id_string, amount) in balances {
    let id = AssetId::from_str(&id_string)?;
    let amount = amount as u64;

    let input = wallet_1
        .get_asset_inputs_for_amount(id, amount, None)
        .await?;
    inputs.extend(input);

    // we don't transfer the full base asset so we can cover fees
    let output = if id == *consensus_parameters.base_asset_id() {
        wallet_1.get_asset_outputs_for_amount(wallet_2.address(), id, amount / 2)
    } else {
        wallet_1.get_asset_outputs_for_amount(wallet_2.address(), id, amount)
    };

    outputs.extend(output);
}
```

_Icon ClipboardText_

All that is left is to build the transaction via `ScriptTransactionBuilder`, have `wallet_1` add a witness to it and we can send it. We confirm this by checking the number of balances present in the receiving wallet and their amount:

```fuel_Box fuel_Box-idXKMmm-css
let mut tb =
    ScriptTransactionBuilder::prepare_transfer(inputs, outputs, TxPolicies::default());
wallet_1.add_witnesses(&mut tb)?;

let tx = tb.build(&provider).await?;

provider.send_transaction_and_await_commit(tx).await?;

let balances = wallet_2.get_balances().await?;

assert_eq!(balances.len(), NUM_ASSETS as usize);
for (id, balance) in balances {
    if id == *consensus_parameters.base_asset_id().to_string() {
        assert_eq!(balance, (AMOUNT / 2) as u128);
    } else {
        assert_eq!(balance, AMOUNT as u128);
    }
}
```

_Icon ClipboardText_