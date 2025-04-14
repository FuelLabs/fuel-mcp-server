[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Calling Contracts](https://docs.fuel.network/docs/fuels-rs/calling-contracts/) /

Variable Outputs

## _Icon Link_ [Output variables](https://docs.fuel.network/docs/fuels-rs/calling-contracts/variable-outputs/\#output-variables)

Sometimes, the contract you call might transfer funds to a specific address, depending on its execution. The underlying transaction for such a contract call has to have the appropriate number of [variable outputs _Icon Link_](https://docs.fuel.network/docs/specs/tx-format/output/#outputvariable) to succeed.

Let's say you deployed a contract with the following method:

```fuel_Box fuel_Box-idXKMmm-css
fn transfer(coins: u64, asset_id: AssetId, recipient: Identity) {
    transfer(recipient, asset_id, coins);
}
```

_Icon ClipboardText_

When calling `transfer_coins_to_output` with the SDK, you can specify the number of variable outputs:

```fuel_Box fuel_Box-idXKMmm-css
let address = wallet.address();
let asset_id = contract_id.asset_id(&Bits256::zeroed());

// withdraw some tokens to wallet
let response = contract_methods
    .transfer(1_000_000, asset_id, address.into())
    .with_variable_output_policy(VariableOutputPolicy::Exactly(1))
    .call()
    .await?;
```

_Icon ClipboardText_

`with_variable_output_policy` sets the policy regarding variable outputs. You can either set the number of variable outputs yourself by providing `VariableOutputPolicy::Exactly(n)` or let the SDK estimate it for you with `VariableOutputPolicy::EstimateMinimum`. A variable output indicates that the amount and the owner may vary based on transaction execution.

> _Icon InfoCircle_
>
> **Note:** that the Sway `lib-std` function `mint_to_address` calls `transfer_to_address` under the hood, so you need to call `with_variable_output_policy` in the Rust SDK tests like you would for `transfer_to_address`.