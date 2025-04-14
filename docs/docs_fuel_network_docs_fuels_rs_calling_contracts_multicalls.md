[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Calling Contracts](https://docs.fuel.network/docs/fuels-rs/calling-contracts/) /

Multicalls

## _Icon Link_ [Multiple contract calls](https://docs.fuel.network/docs/fuels-rs/calling-contracts/multicalls/\#multiple-contract-calls)

With `CallHandler`, you can execute multiple contract calls within a single transaction. To achieve this, you first prepare all the contract calls that you want to bundle:

```fuel_Box fuel_Box-idXKMmm-css
let contract_methods = MyContract::new(contract_id, wallet.clone()).methods();

let call_handler_1 = contract_methods.initialize_counter(42);
let call_handler_2 = contract_methods.get_array([42; 2]);
```

_Icon ClipboardText_

You can also set call parameters, variable outputs, or external contracts for every contract call, as long as you don't execute it with `call()` or `simulate()`.

Next, you provide the prepared calls to your `CallHandler` and optionally configure transaction policies:

```fuel_Box fuel_Box-idXKMmm-css
let multi_call_handler = CallHandler::new_multi_call(wallet.clone())
    .add_call(call_handler_1)
    .add_call(call_handler_2);
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note:** any transaction policies configured on separate contract calls are disregarded in favor of the parameters provided to the multi-call `CallHandler`.

Furthermore, if you need to separate submission from value retrieval for any reason, you can do so as follows:

```fuel_Box fuel_Box-idXKMmm-css
let submitted_tx = multi_call_handler.submit().await?;
tokio::time::sleep(Duration::from_millis(500)).await;
let (counter, array): (u64, [u64; 2]) = submitted_tx.response().await?.value;
```

_Icon ClipboardText_

## _Icon Link_ [Output values](https://docs.fuel.network/docs/fuels-rs/calling-contracts/multicalls/\#output-values)

To get the output values of the bundled calls, you need to provide explicit type annotations when saving the result of `call()` or `simulate()` to a variable:

```fuel_Box fuel_Box-idXKMmm-css
let (counter, array): (u64, [u64; 2]) = multi_call_handler.call().await?.value;
```

_Icon ClipboardText_

You can also interact with the `CallResponse` by moving the type annotation to the invoked method:

```fuel_Box fuel_Box-idXKMmm-css
let response = multi_call_handler.call::<(u64, [u64; 2])>().await?;
```

_Icon ClipboardText_