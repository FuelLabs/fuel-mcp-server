[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Calling Contracts](https://docs.fuel.network/docs/fuels-rs/calling-contracts/) /

Tx Dependency Estimation

## _Icon Link_ [Transaction dependency estimation](https://docs.fuel.network/docs/fuels-rs/calling-contracts/tx-dependency-estimation/\#transaction-dependency-estimation)

Previously, we mentioned that a contract call might require you to manually specify external contracts, variable outputs, or output messages. The SDK can also attempt to estimate and set these dependencies for you at the cost of running multiple simulated calls in the background.

The following example uses a contract call that calls an external contract and later mints assets to a specified address. Calling it without including the dependencies will result in a revert:

```fuel_Box fuel_Box-idXKMmm-css
let address = wallet.address();
let amount = 100;

let response = contract_methods
    .mint_then_increment_from_contract(called_contract_id, amount, address.into())
    .call()
    .await;

assert!(matches!(
    response,
    Err(Error::Transaction(Reason::Reverted { .. }))
));
```

_Icon ClipboardText_

As mentioned in previous chapters, you can specify the external contract and add an output variable to resolve this:

```fuel_Box fuel_Box-idXKMmm-css
let response = contract_methods
    .mint_then_increment_from_contract(called_contract_id, amount, address.into())
    .with_variable_output_policy(VariableOutputPolicy::Exactly(1))
    .with_contract_ids(&[called_contract_id.into()])
    .call()
    .await?;
```

_Icon ClipboardText_

But this requires you to know the contract ID of the external contract and the needed number of output variables. Alternatively, by chaining `.estimate_tx_dependencies()` instead, the dependencies will be estimated by the SDK and set automatically. The optional parameter is the maximum number of simulation attempts:

```fuel_Box fuel_Box-idXKMmm-css
let response = contract_methods
    .mint_then_increment_from_contract(called_contract_id, amount, address.into())
    .with_variable_output_policy(VariableOutputPolicy::EstimateMinimum)
    .determine_missing_contracts(Some(2))
    .await?
    .call()
    .await?;
```

_Icon ClipboardText_

The minimal number of attempts corresponds to the number of external contracts and output variables needed and defaults to 10.

> _Icon InfoCircle_
>
> **Note:** `estimate_tx_dependencies()` can also be used when working with script calls or multi calls. `estimate_tx_dependencies()` does not currently resolve the dependencies needed for logging from an external contract. For more information, see [here](https://docs.fuel.network/docs/fuels-rs/calling-contracts/logs/). If no resolution was found after exhausting all simulation attempts, the last received error will be propagated. The same will happen if an error is unrelated to transaction dependencies.