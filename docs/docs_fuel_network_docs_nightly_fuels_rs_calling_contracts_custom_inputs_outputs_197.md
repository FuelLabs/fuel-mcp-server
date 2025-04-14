[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Calling Contracts](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/) /

Custom Inputs Outputs

## _Icon Link_ [Custom inputs and outputs](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/custom-inputs-outputs/\#custom-inputs-and-outputs)

If you need to add specific inputs and outputs to contract calls, you can use the `with_inputs` and `with_outputs` methods.

```fuel_Box fuel_Box-idXKMmm-css
let _ = contract_instance
    .methods()
    .initialize_counter(42)
    .with_inputs(custom_inputs)
    .with_outputs(custom_outputs)
    .add_signer(wallet_2.signer().clone())
    .call()
    .await?;
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note:** if custom inputs include coins that need to be signed, use the `add_signer` method to add the appropriate signer.