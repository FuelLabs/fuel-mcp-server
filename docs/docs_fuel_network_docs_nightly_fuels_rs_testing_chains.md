[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Testing](https://docs.fuel.network/docs/nightly/fuels-rs/testing/) /

Chains

## _Icon Link_ [Increasing the block height](https://docs.fuel.network/docs/nightly/fuels-rs/testing/chains/\#increasing-the-block-height)

You can use `produce_blocks` to help achieve an arbitrary block height; this is useful when you want to do any testing regarding transaction maturity.

> _Icon InfoCircle_
>
> **Note**: For the `produce_blocks` API to work, it is imperative to have `manual_blocks_enabled = true` in the config for the running node. See example below.

```fuel_Box fuel_Box-idXKMmm-css
let wallets =
    launch_custom_provider_and_get_wallets(WalletsConfig::default(), None, None).await?;
let wallet = &wallets[0];
let provider = wallet.provider();

assert_eq!(provider.latest_block_height().await?, 0u32);

provider.produce_blocks(3, None).await?;

assert_eq!(provider.latest_block_height().await?, 3u32);
```

_Icon ClipboardText_

You can also set a custom block time as the second, optional argument. Here is an example:

```fuel_Box fuel_Box-idXKMmm-css
let block_time = 20u32; // seconds
let config = NodeConfig {
    // This is how you specify the time between blocks
    block_production: Trigger::Interval {
        block_time: std::time::Duration::from_secs(block_time.into()),
    },
    ..NodeConfig::default()
};
let wallets =
    launch_custom_provider_and_get_wallets(WalletsConfig::default(), Some(config), None)
        .await?;
let wallet = &wallets[0];
let provider = wallet.provider();

assert_eq!(provider.latest_block_height().await?, 0u32);
let origin_block_time = provider.latest_block_time().await?.unwrap();
let blocks_to_produce = 3;

provider.produce_blocks(blocks_to_produce, None).await?;
assert_eq!(provider.latest_block_height().await?, blocks_to_produce);
let expected_latest_block_time = origin_block_time
    .checked_add_signed(Duration::try_seconds((blocks_to_produce * block_time) as i64).unwrap())
    .unwrap();
assert_eq!(
    provider.latest_block_time().await?.unwrap(),
    expected_latest_block_time
);
```

_Icon ClipboardText_