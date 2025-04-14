[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Custom Transactions](https://docs.fuel.network/docs/nightly/fuels-rs/custom-transactions/) /

Custom Calls

## _Icon Link_ [Custom contract and script calls](https://docs.fuel.network/docs/nightly/fuels-rs/custom-transactions/custom-calls/\#custom-contract-and-script-calls)

When preparing a contract call via `CallHandler`, the Rust SDK uses a transaction builder in the background. You can fetch this builder and customize it before submitting it to the network. After the transaction is executed successfully, you can use the corresponding `CallHandler` to generate a [call response](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/call-response/). The call response can be used to decode return values and logs. Below are examples for both contract and script calls.

## _Icon Link_ [Custom contract call](https://docs.fuel.network/docs/nightly/fuels-rs/custom-transactions/custom-calls/\#custom-contract-call)

```fuel_Box fuel_Box-idXKMmm-css
let call_handler = contract_instance.methods().initialize_counter(counter);

let mut tb = call_handler.transaction_builder().await?;

// customize the builder...

wallet.adjust_for_fee(&mut tb, 0).await?;
wallet.add_witnesses(&mut tb)?;

let tx = tb.build(provider).await?;

let tx_id = provider.send_transaction(tx).await?;
tokio::time::sleep(Duration::from_millis(500)).await;

let tx_status = provider.tx_status(&tx_id).await?;

let response = call_handler.get_response(tx_status)?;

assert_eq!(counter, response.value);
```

_Icon ClipboardText_

## _Icon Link_ [Custom script call](https://docs.fuel.network/docs/nightly/fuels-rs/custom-transactions/custom-calls/\#custom-script-call)

```fuel_Box fuel_Box-idXKMmm-css
let script_call_handler = script_instance.main(1, 2);

let mut tb = script_call_handler.transaction_builder().await?;

// customize the builder...

wallet.adjust_for_fee(&mut tb, 0).await?;
wallet.add_witnesses(&mut tb)?;

let tx = tb.build(provider).await?;

let tx_id = provider.send_transaction(tx).await?;
tokio::time::sleep(Duration::from_millis(500)).await;
let tx_status = provider.tx_status(&tx_id).await?;

let response = script_call_handler.get_response(tx_status)?;

assert_eq!(response.value, "hello");
```

_Icon ClipboardText_