[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Calling Contracts](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/) /

Cost Estimation

## _Icon Link_ [Estimating contract call cost](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/cost-estimation/\#estimating-contract-call-cost)

With the function `estimate_transaction_cost(tolerance: Option<f64>, block_horizon: Option<u32>)` provided by `CallHandler`, you can get a cost estimation for a specific call. The return type, `TransactionCost`, is a struct that contains relevant information for the estimation:

```fuel_Box fuel_Box-idXKMmm-css
pub struct TransactionCost {
    pub gas_price: u64,
    pub metered_bytes_size: u64,
    pub total_fee: u64,
    pub script_gas: u64,
    pub total_gas: u64,
}
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note** `script_gas` refers to the part of the gas spent on the script execution.

Below are examples that show how to get the estimated transaction cost from single and multi call transactions.

```fuel_Box fuel_Box-idXKMmm-css
let contract_instance = MyContract::new(contract_id, wallet);

let tolerance = Some(0.0);
let block_horizon = Some(1);
let transaction_cost = contract_instance
    .methods()
    .initialize_counter(42) // Build the ABI call
    .estimate_transaction_cost(tolerance, block_horizon) // Get estimated transaction cost
    .await?;
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
let call_handler_1 = contract_methods.initialize_counter(42);
let call_handler_2 = contract_methods.get_array([42; 2]);

let multi_call_handler = CallHandler::new_multi_call(wallet.clone())
    .add_call(call_handler_1)
    .add_call(call_handler_2);

let tolerance = Some(0.0);
let block_horizon = Some(1);
let transaction_cost = multi_call_handler
    .estimate_transaction_cost(tolerance, block_horizon) // Get estimated transaction cost
    .await?;
```

_Icon ClipboardText_

The transaction cost estimation can be used to set the gas limit for an actual call, or to show the user the estimated cost.

> _Icon InfoCircle_
>
> **Note** The same estimation interface is available for scripts.