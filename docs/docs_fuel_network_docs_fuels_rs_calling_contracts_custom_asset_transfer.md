[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Calling Contracts](https://docs.fuel.network/docs/fuels-rs/calling-contracts/) /

Custom Asset Transfer

## _Icon Link_ [Custom asset transfer](https://docs.fuel.network/docs/fuels-rs/calling-contracts/custom-asset-transfer/\#custom-asset-transfer)

The SDK provides the option to transfer assets within the same transaction, when making a contract call. By using `add_custom_asset()` you specify the asset ID, the amount, and the destination address:

```fuel_Box fuel_Box-idXKMmm-css
let amount = 1000;
let _ = contract_instance
    .methods()
    .initialize_counter(42)
    .add_custom_asset(
        AssetId::zeroed(),
        amount,
        Some(other_wallet.address().clone()),
    )
    .call()
    .await?;
```

_Icon ClipboardText_