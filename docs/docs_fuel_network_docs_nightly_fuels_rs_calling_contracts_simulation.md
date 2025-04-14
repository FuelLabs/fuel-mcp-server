[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Calling Contracts](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/) /

Simulation

## _Icon Link_ [Simulating calls](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/simulation/\#simulating-calls)

Sometimes you want to simulate a call to a contract without changing the state of the blockchain. This can be achieved by calling `.simulate` instead of `.call` and passing in the desired execution context:

- `.simulate(Execution::Realistic)` simulates the transaction in a manner that closely resembles a real call. You need a wallet with base assets to cover the transaction cost, even though no funds will be consumed. This is useful for validating that a real call would succeed if made at that moment. It allows you to debug issues with your contract without spending gas.

```fuel_Box fuel_Box-idXKMmm-css
// you would mint 100 coins if the transaction wasn't simulated
let counter = contract_methods
    .mint_coins(100)
    .simulate(Execution::Realistic)
    .await?;
```

_Icon ClipboardText_

- `.simulate(Execution::StateReadOnly)` disables many validations, adds fake gas, extra variable outputs, blank witnesses, etc., enabling you to read state even with an account that has no funds.

```fuel_Box fuel_Box-idXKMmm-css
// you don't need any funds to read state
let balance = contract_methods
    .get_balance(contract_id, AssetId::zeroed())
    .simulate(Execution::StateReadOnly)
    .await?
    .value;
```

_Icon ClipboardText_