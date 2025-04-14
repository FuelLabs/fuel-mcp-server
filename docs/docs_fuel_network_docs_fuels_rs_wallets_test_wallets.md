[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Wallets](https://docs.fuel.network/docs/fuels-rs/wallets/) /

Test Wallets

## _Icon Link_ [Setting up test wallets](https://docs.fuel.network/docs/fuels-rs/wallets/test-wallets/\#setting-up-test-wallets)

You'll often want to create one or more test wallets when testing your contracts. Here's how to do it.

## _Icon Link_ [Setting up multiple test wallets](https://docs.fuel.network/docs/fuels-rs/wallets/test-wallets/\#setting-up-multiple-test-wallets)

If you need multiple test wallets, they can be set up using the `launch_custom_provider_and_get_wallets` method.

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;
// This helper will launch a local node and provide 10 test wallets linked to it.
// The initial balance defaults to 1 coin per wallet with an amount of 1_000_000_000
let wallets =
    launch_custom_provider_and_get_wallets(WalletsConfig::default(), None, None).await?;
```

_Icon ClipboardText_

You can customize your test wallets via `WalletsConfig`.

```fuel_Box fuel_Box-idXKMmm-css
let num_wallets = 5;
let coins_per_wallet = 3;
let amount_per_coin = 100;

let config = WalletsConfig::new(
    Some(num_wallets),
    Some(coins_per_wallet),
    Some(amount_per_coin),
);
// Launches a local node and provides test wallets as specified by the config
let wallets = launch_custom_provider_and_get_wallets(config, None, None).await?;
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note** Wallets generated with `launch_provider_and_get_wallet` or `launch_custom_provider_and_get_wallets`
> will have deterministic addresses.

## _Icon Link_ [Setting up a test wallet with multiple random assets](https://docs.fuel.network/docs/fuels-rs/wallets/test-wallets/\#setting-up-a-test-wallet-with-multiple-random-assets)

You can create a test wallet containing multiple assets (including the base asset to pay for gas).

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;
let mut wallet = WalletUnlocked::new_random(None);
let num_assets = 5; // 5 different assets
let coins_per_asset = 10; // Per asset id, 10 coins in the wallet
let amount_per_coin = 15; // For each coin (UTXO) of the asset, amount of 15

let (coins, asset_ids) = setup_multiple_assets_coins(
    wallet.address(),
    num_assets,
    coins_per_asset,
    amount_per_coin,
);
let provider = setup_test_provider(coins.clone(), vec![], None, None).await?;
wallet.set_provider(provider);
```

_Icon ClipboardText_

- coins: `Vec<(UtxoId, Coin)>` has `num_assets` \\* `coins_per_assets` coins (UTXOs)
- asset\_ids: `Vec<AssetId>` contains the `num_assets` randomly generated `AssetId` s (always includes the base asset)

## _Icon Link_ [Setting up a test wallet with multiple custom assets](https://docs.fuel.network/docs/fuels-rs/wallets/test-wallets/\#setting-up-a-test-wallet-with-multiple-custom-assets)

You can also create assets with specific `AssetId` s, coin amounts, and number of coins.

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;
use rand::Fill;

let mut wallet = WalletUnlocked::new_random(None);
let mut rng = rand::thread_rng();

let asset_base = AssetConfig {
    id: AssetId::zeroed(),
    num_coins: 2,
    coin_amount: 4,
};

let mut asset_id_1 = AssetId::zeroed();
asset_id_1.try_fill(&mut rng)?;
let asset_1 = AssetConfig {
    id: asset_id_1,
    num_coins: 6,
    coin_amount: 8,
};

let mut asset_id_2 = AssetId::zeroed();
asset_id_2.try_fill(&mut rng)?;
let asset_2 = AssetConfig {
    id: asset_id_2,
    num_coins: 10,
    coin_amount: 12,
};

let assets = vec![asset_base, asset_1, asset_2];

let coins = setup_custom_assets_coins(wallet.address(), &assets);
let provider = setup_test_provider(coins, vec![], None, None).await?;
wallet.set_provider(provider);
```

Collapse_Icon ClipboardText_

This can also be achieved directly with the `WalletsConfig`.

```fuel_Box fuel_Box-idXKMmm-css
let num_wallets = 1;
let wallet_config = WalletsConfig::new_multiple_assets(num_wallets, assets);
let wallets = launch_custom_provider_and_get_wallets(wallet_config, None, None).await?;
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note** In this case, you need to manually add the base asset and the corresponding number of
> coins and coin amount

## _Icon Link_ [Setting up assets](https://docs.fuel.network/docs/fuels-rs/wallets/test-wallets/\#setting-up-assets)

The Fuel blockchain holds many different assets; you can create your asset with its unique `AssetId` or create random assets for testing purposes.

You can use only one asset to pay for transaction fees and gas: the base asset, whose `AssetId` is `0x000...0`, a 32-byte zeroed value.

For testing purposes, you can configure coins and amounts for assets. You can use `setup_multiple_assets_coins`:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;
let mut wallet = WalletUnlocked::new_random(None);
let num_assets = 5; // 5 different assets
let coins_per_asset = 10; // Per asset id, 10 coins in the wallet
let amount_per_coin = 15; // For each coin (UTXO) of the asset, amount of 15

let (coins, asset_ids) = setup_multiple_assets_coins(
    wallet.address(),
    num_assets,
    coins_per_asset,
    amount_per_coin,
);
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note** If setting up multiple assets, one of these assets will always be the base asset.

If you want to create coins only with the base asset, then you can use:

```fuel_Box fuel_Box-idXKMmm-css
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
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note** Choosing a large number of coins and assets for `setup_multiple_assets_coins` or `setup_single_asset_coins` can lead to considerable runtime for these methods. This will be improved in the future but for now, we recommend using up to **1\_000\_000** coins, or **1000** coins and assets simultaneously.