[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Wallets](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/) /

Fake Signer

## _Icon Link_ [Fake signer (impersonating another account)](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/fake_signer/\#fake-signer-impersonating-another-account)

To facilitate account impersonation, the Rust SDK provides the `FakeSigner`. We can use it to simulate ownership of assets held by an account with a given address. This also implies that we can impersonate contract calls from that address. A wallet with a `FakeSigner` will only succeed in unlocking assets if the network is set up with `utxo_validation = false`.

```fuel_Box fuel_Box-idXKMmm-css
let node_config = NodeConfig {
    utxo_validation: false,
    ..Default::default()
};
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
let provider = setup_test_provider(coins, vec![], Some(node_config), None).await?;
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// create impersonator for an address
let fake_signer = FakeSigner::new(some_address);
let impersonator = Wallet::new(fake_signer, provider.clone());

let contract_instance = MyContract::new(contract_id, impersonator.clone());

let response = contract_instance
    .methods()
    .initialize_counter(42)
    .call()
    .await?;

assert_eq!(42, response.value);
```

_Icon ClipboardText_