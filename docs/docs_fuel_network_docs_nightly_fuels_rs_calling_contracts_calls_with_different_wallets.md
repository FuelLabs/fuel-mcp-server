[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Calling Contracts](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/) /

Calls With Different Wallets

## _Icon Link_ [Calls with different wallets](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/calls-with-different-wallets/\#calls-with-different-wallets)

You can use the `with_account()` method on an existing contract instance as a shorthand for creating a new instance connected to the provided wallet. This lets you make contracts calls with different wallets in a chain like fashion.

```fuel_Box fuel_Box-idXKMmm-css
// Create contract instance with wallet_1
let contract_instance = MyContract::new(contract_id, wallet_1.clone());

// Perform contract call with wallet_2
let response = contract_instance
    .with_account(wallet_2) // Connect wallet_2
    .methods() // Get contract methods
    .get_msg_amount() // Our contract method
    .call() // Perform the contract call.
    .await?; // This is an async call, `.await` for it.
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note:** connecting a different wallet to an existing instance ignores its set provider in favor of the provider used to deploy the contract. If you have two wallets connected to separate providers (each communicating with a separate fuel-core), the one assigned to the deploying wallet will also be used for contract calls. This behavior is only relevant if multiple providers (i.e. fuel-core instances) are present and can otherwise be ignored.