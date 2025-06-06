[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Cookbook](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/) /

Resubmitting Failed Transactions

## _Icon Link_ [Resubmitting Failed Transactions](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/resubmitting-failed-transactions/\#resubmitting-failed-transactions)

In certain scenarios, you might need to implement a solution to resubmit failed transactions to the Fuel Network. While this approach can be effective, there are important considerations to remember.

## _Icon Link_ [Submission and Processing](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/resubmitting-failed-transactions/\#submission-and-processing)

When submitting a transaction, you will first get a response.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const baseAssetId = await provider.getBaseAssetId();

const transferAmount = 1000;

const transactionRequest = await wallet.createTransfer(
  wallet.address,
  transferAmount,
  baseAssetId
);

const response = await wallet.sendTransaction(transactionRequest);
```

_Icon ClipboardText_

If the `sendTransaction` method resolves without an error, we know that the transaction was successfully submitted and accepted by the network. However, this does not guarantee that the transaction has been processed; it only indicates that the transaction has been accepted and placed in a queue for processing.

To determine whether the transaction has been processed, you must call `waitForResult`, which will either resolve (with the processed transaction) or reject with an error.

```fuel_Box fuel_Box-idXKMmm-css
const result = await response.waitForResult();
```

_Icon ClipboardText_

In other words:

- If `sendTransaction` is rejected with an error, the transaction was not accepted by the network and is not processed.
- If `waitForResult` is rejected with an error, the transaction was accepted but reverted during processing.

## _Icon Link_ [Resources Spent When a Transaction Is Processed](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/resubmitting-failed-transactions/\#resources-spent-when-a-transaction-is-processed)

If a transaction is reverted during processing, the Fuel VM will still consume the funded resources to cover the gas used up to the point of failure. After deducting the gas cost, the remaining funds will be added to a new UTXO (Unspent Transaction Output) addressed to the owner.

Attempting to resubmit the same transaction request that failed during processing will likely result in an error, as the initially spent resources no longer exist.

```fuel_Box fuel_Box-idXKMmm-css
const transactionRequest = await wallet.createTransfer(
  wallet.address,
  transferAmount,
  baseAssetId
);

// Set the gasLimit to 0 to force revert with OutOfGas error
transactionRequest.gasLimit = bn(0);

// Transaction will be successfully submitted
const response = await wallet.sendTransaction(transactionRequest);
// let error: FuelError | undefined;
try {
  await response.waitForResult();
} catch (error) {
  if (/OutOfGas/.test((<FuelError>error).message)) {
    transactionRequest.gasLimit = bn(1000);

    // Re-submission will fail
    await wallet.sendTransaction(transactionRequest).catch((error2) => {
      console.log('error2', error2);
    });
  }
}
```

_Icon ClipboardText_

The attempt from the above snippet will result in the error:

```fuel_Box fuel_Box-idXKMmm-css
FuelError: Transaction is not inserted. UTXO does not exist: {{utxoId}}
```

_Icon ClipboardText_

To safely retry a transaction that failed during processing, you should reassemble the request from scratch and resubmit it.

```fuel_Box fuel_Box-idXKMmm-css
try {
  await response.waitForResult();
} catch (error) {
  if (/OutOfGas/.test((<FuelError>error).message)) {
    const transactionRequest2 = await wallet.createTransfer(
      wallet.address,
      transferAmount,
      baseAssetId
    );

    await wallet.sendTransaction(transactionRequest2);
  }
}
```

_Icon ClipboardText_