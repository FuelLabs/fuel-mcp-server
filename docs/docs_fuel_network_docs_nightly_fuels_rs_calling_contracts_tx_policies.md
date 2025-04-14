[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Calling Contracts](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/) /

Tx Policies

## _Icon Link_ [Transaction policies](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/tx-policies/\#transaction-policies)

Transaction policies are defined as follows:

```fuel_Box fuel_Box-idXKMmm-css
pub struct TxPolicies {
    tip: Option<u64>,
    witness_limit: Option<u64>,
    maturity: Option<u64>,
    expiration: Option<u64>,
    max_fee: Option<u64>,
    script_gas_limit: Option<u64>,
}
```

_Icon ClipboardText_

Where:

1. **Tip** \- amount to pay the block producer to prioritize the transaction.
2. **Witness Limit** \- The maximum amount of witness data allowed for the transaction.
3. **Maturity** \- Block until which the transaction cannot be included.
4. **Expiration** \- Block after which the transaction cannot be included.
5. **Max Fee** \- The maximum fee payable by this transaction.
6. **Script Gas Limit** \- The maximum amount of gas the transaction may consume for executing its script code.

When the **Script Gas Limit** is not set, the Rust SDK will estimate the consumed gas in the background and set it as the limit.

If the **Witness Limit** is not set, the SDK will set it to the size of all witnesses and signatures defined in the transaction builder.

You can configure these parameters by creating an instance of `TxPolicies` and passing it to a chain method called `with_tx_policies`:

```fuel_Box fuel_Box-idXKMmm-css
let contract_methods = MyContract::new(contract_id.clone(), wallet.clone()).methods();

let tx_policies = TxPolicies::default()
    .with_tip(1)
    .with_script_gas_limit(1_000_000)
    .with_maturity(0)
    .with_expiration(10_000);

let response = contract_methods
    .initialize_counter(42) // Our contract method
    .with_tx_policies(tx_policies) // Chain the tx policies
    .call() // Perform the contract call
    .await?; // This is an async call, `.await` it.
```

_Icon ClipboardText_

You can also use `TxPolicies::default()` to use the default values.

This way:

```fuel_Box fuel_Box-idXKMmm-css
let response = contract_methods
    .initialize_counter(42)
    .with_tx_policies(TxPolicies::default())
    .call()
    .await?;
```

_Icon ClipboardText_

As you might have noticed, `TxPolicies` can also be specified when deploying contracts or transferring assets by passing it to the respective methods.