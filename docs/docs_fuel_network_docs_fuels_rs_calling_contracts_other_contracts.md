[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Calling Contracts](https://docs.fuel.network/docs/fuels-rs/calling-contracts/) /

Other Contracts

## _Icon Link_ [Calling other contracts](https://docs.fuel.network/docs/fuels-rs/calling-contracts/other-contracts/\#calling-other-contracts)

If your contract method is calling other contracts you will have to add the appropriate `Inputs` and `Outputs` to your transaction. For your convenience, the `CallHandler` provides methods that prepare those inputs and outputs for you. You have two methods that you can use: `with_contracts(&[&contract_instance, ...])` and `with_contract_ids(&[&contract_id, ...])`.

`with_contracts(&[&contract_instance, ...])` requires contract instances that were created using the `abigen` macro. When setting the external contracts with this method, logs and require revert errors originating from the external contract can be propagated and decoded by the calling contract.

```fuel_Box fuel_Box-idXKMmm-css
let response = contract_caller_instance
    .methods()
    .increment_from_contract(lib_contract_id, 42)
    .with_contracts(&[&lib_contract_instance])
    .call()
    .await?;
```

_Icon ClipboardText_

If however, you do not need to decode logs or you do not have a contract instance that was generated using the `abigen` macro you can use `with_contract_ids(&[&contract_id, ...])` and provide the required contract ids.

```fuel_Box fuel_Box-idXKMmm-css
let response = contract_caller_instance
    .methods()
    .increment_from_contract(lib_contract_id, 42)
    .with_contract_ids(&[lib_contract_id.clone()])
    .call()
    .await?;
```

_Icon ClipboardText_