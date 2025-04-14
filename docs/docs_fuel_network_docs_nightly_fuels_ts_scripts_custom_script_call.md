[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Scripts](https://docs.fuel.network/docs/nightly/fuels-ts/scripts/) /

Custom Script Call

## _Icon Link_ [Preparing a Script Transaction](https://docs.fuel.network/docs/nightly/fuels-ts/scripts/custom-script-call/\#preparing-a-script-transaction)

Akin to Contracts, we can configure the [call parameters](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/call-parameters/) and [transaction parameters](https://docs.fuel.network/docs/nightly/fuels-ts/transactions/adding-parameters/) for Scripts, as well as retrieve the entire transaction request or transaction ID prior to submission.

```fuel_Box fuel_Box-idXKMmm-css
const myMainScript = new Script(ScriptSum.bytecode, ScriptSum.abi, wallet);

const tx = myMainScript.functions.main(argument);

// Set the call parameters
tx.callParams({ gasLimit: 7500 });

// Get the entire transaction request prior to
const txRequest = await tx.getTransactionRequest();

// Get the transaction ID
const txId = await tx.getTransactionId();

// Retrieve the value of the call and the actual gas used
const { waitForResult: waitForActualGasUsed } = await tx.call();
const { value: valueOfActualGasUsed, gasUsed: gasUsedOfActualGasUsed } =
  await waitForActualGasUsed();
```

_Icon ClipboardText_