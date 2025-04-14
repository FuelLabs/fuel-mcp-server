[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Wallets](https://docs.fuel.network/docs/fuels-rs/wallets/) /

Checking Balances and Coins

## _Icon Link_ [Checking balances and coins](https://docs.fuel.network/docs/fuels-rs/wallets/checking-balances-and-coins/\#checking-balances-and-coins)

In the Fuel network, each UTXO corresponds to a unique _coin_, and said _coin_ has a corresponding _amount_ (the same way a dollar bill has either 10$ or 5$ face value). So, when you want to query the balance for a given asset ID, you want to query the sum of the amount in each unspent coin. This querying is done very easily with a wallet:

```fuel_Box fuel_Box-idXKMmm-css
let asset_id = AssetId::zeroed();
let balance: u64 = wallet.get_asset_balance(&asset_id).await?;
```

_Icon ClipboardText_

If you want to query all the balances (i.e., get the balance for each asset ID in that wallet), you can use the `get_balances` method:

```fuel_Box fuel_Box-idXKMmm-css
let balances: HashMap<String, u128> = wallet.get_balances().await?;
```

_Icon ClipboardText_

The return type is a `HashMap`, where the key is the _asset ID's_ hex string, and the value is the corresponding balance. For example, we can get the base asset balance with:

```fuel_Box fuel_Box-idXKMmm-css
let asset_balance = balances.get(&asset_id.to_string()).unwrap();
```

_Icon ClipboardText_