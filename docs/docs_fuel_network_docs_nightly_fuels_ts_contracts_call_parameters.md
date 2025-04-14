[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/) /

Call Parameters

## _Icon Link_ [Call Parameters](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/call-parameters/\#call-parameters)

When interacting with contracts, you can configure specific parameters for contract calls using the `callParams` method. The available call parameters are:

1. `forward`
2. `gasLimit`

> _Icon InfoCircle_
>
> **Note**: Setting transaction parameters is also available when calling contracts. More information on this can be found at [Transaction Parameters](https://docs.fuel.network/docs/nightly/fuels-ts/transactions/adding-parameters/).

The contract in use in this section has the following implementation:

```fuel_Box fuel_Box-idXKMmm-css
impl ReturnContext for Contract {
    #[payable]
    fn return_context_amount() -> u64 {
        msg_amount()
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [Forward Parameter](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/call-parameters/\#forward-parameter)

The `forward` parameter allows the sending of a specific amount of coins to a contract when a function is called. This is useful when a contract function requires coins for its execution, such as paying fees or transferring funds. The forward parameter helps you control the resources allocated to the contract call and offers protection against potentially costly operations.

```fuel_Box fuel_Box-idXKMmm-css
const amountToForward = 10;

const { waitForResult } = await contract.functions
  .return_context_amount()
  .callParams({
    forward: [amountToForward, await provider.getBaseAssetId()],
  })
  .call();

const { value } = await waitForResult();

console.log('forwarded amount:', value.toNumber());
// forwarded amount: 10
```

_Icon ClipboardText_

## _Icon Link_ [Gas Limit Parameter](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/call-parameters/\#gas-limit-parameter)

The `gasLimit` refers to the maximum amount of gas that can be consumed specifically by the contract call itself, separate from the rest of the transaction.

```fuel_Box fuel_Box-idXKMmm-css
try {
  await contract.functions
    .return_context_amount()
    .callParams({
      forward: [10, await provider.getBaseAssetId()],
      gasLimit: 1,
    })
    .call();
} catch (e) {
  console.log('error', e);
  // error _FuelError: The transaction reverted with reason: "OutOfGas"
}
```

_Icon ClipboardText_

## _Icon Link_ [Call Parameter `gasLimit` vs Transaction Parameter `gasLimit`](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/call-parameters/\#call-parameter-gaslimit-vs-transaction-parameter-gaslimit)

The call parameter `gasLimit` sets the maximum gas allowed for the actual contract call, whereas the transaction parameter `gasLimit` _(see [Transaction Parameters](https://docs.fuel.network/docs/nightly/fuels-ts/transactions/adding-parameters/))_ sets the maximum gas allowed for the entire transaction and constrains the `gasLimit` call parameter. If the call parameter `gasLimit` is set to a value greater than the _available_ transaction gas, then the entire available transaction gas will be allocated for the contract call execution.

If you don't set the `gasLimit` for the call, the transaction `gasLimit` will be applied.

## _Icon Link_ [Setting Both Parameters](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/call-parameters/\#setting-both-parameters)

You can set both call parameters and transaction parameters within the same contract function call.

```fuel_Box fuel_Box-idXKMmm-css
const contractCallGasLimit = 4_000;
const transactionGasLimit = 100_000;

const call = await contract.functions
  .return_context_amount()
  .callParams({
    forward: [10, await provider.getBaseAssetId()],
    gasLimit: contractCallGasLimit,
  })
  .txParams({
    gasLimit: transactionGasLimit,
  })
  .call();
```

_Icon ClipboardText_