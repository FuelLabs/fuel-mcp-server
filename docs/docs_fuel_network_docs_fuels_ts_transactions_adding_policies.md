[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Transactions](https://docs.fuel.network/docs/fuels-ts/transactions/) /

Adding Policies

## _Icon Link_ [Adding Policies](https://docs.fuel.network/docs/fuels-ts/transactions/adding-policies/\#adding-policies)

Transaction policies are rules that can govern how a transaction is processed, introduced by the [transaction parameters](https://docs.fuel.network/docs/fuels-ts/transactions/adding-parameters/) that you pass to a transaction request. The available policies are as follows:

## _Icon Link_ [Tip](https://docs.fuel.network/docs/fuels-ts/transactions/adding-policies/\#tip)

Optional amount on the base asset to incentivise block producer to include transaction, ensuring faster processing for those willing to pay more. The value set here will be added to the transaction `maxFee`.

## _Icon Link_ [Witness Limit](https://docs.fuel.network/docs/fuels-ts/transactions/adding-policies/\#witness-limit)

The maximum byte length allowed for the transaction witnesses array.

## _Icon Link_ [Maturity](https://docs.fuel.network/docs/fuels-ts/transactions/adding-policies/\#maturity)

The number of blocks that must pass before the transaction can be included in a block.

## _Icon Link_ [Max Fee](https://docs.fuel.network/docs/fuels-ts/transactions/adding-policies/\#max-fee)

The maximum amount you're willing to pay for the transaction using the base asset.

## _Icon Link_ [Expiration](https://docs.fuel.network/docs/fuels-ts/transactions/adding-policies/\#expiration)

Block number after which the transaction can no longer be included in the blockchain.

## _Icon Link_ [Setting Transaction Policies](https://docs.fuel.network/docs/fuels-ts/transactions/adding-policies/\#setting-transaction-policies)

The following snippet shows which transaction parameters correspond to which policies:

```fuel_Box fuel_Box-idXKMmm-css
import { bn, ScriptTransactionRequest } from 'fuels';

const transactionRequest = new ScriptTransactionRequest({
  tip: bn(10), // Sets the tip policy
  witnessLimit: bn(1), // Sets the witness limit policy
  maturity: 1, // Sets the maturity policy
  maxFee: bn(1), // Sets the max fee policy
  expiration: 200, // Sets the block after which the transaction cannot be included.
});
```

_Icon ClipboardText_

## _Icon Link_ [Retrieving Transaction Policies from a Transaction](https://docs.fuel.network/docs/fuels-ts/transactions/adding-policies/\#retrieving-transaction-policies-from-a-transaction)

Policies used for a transaction can be retrieved from a transaction using a `TransactionResponse`. The below snippet will show how to retrieve the policies from a transaction:

```fuel_Box fuel_Box-idXKMmm-css
import type { Policy } from 'fuels';
import { Provider, Wallet, ScriptTransactionRequest, bn } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

/**
 * Instantiate the transaction request with transaction parameters
 * that will set the respective policies.
 */
const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
  gasLimit: bn(2000),
  tip: bn(10),
  witnessLimit: 900,
  maxFee: bn(2000),
  expiration: 200,
});

// Set the script main function arguments
const scriptArguments = [1];
transactionRequest.setData(ScriptSum.abi, scriptArguments);

// Fund the transaction
const resources = await wallet.getResourcesToSpend([\
  { amount: 1000, assetId: await provider.getBaseAssetId() },\
]);

transactionRequest.addResources(resources);

// Submit the transaction and retrieve the transaction response
const tx = await wallet.sendTransaction(transactionRequest);
const response = await tx.waitForResult();
const policies: Policy[] | undefined = response.transaction.policies;

console.log('policies', policies);
```

Collapse_Icon ClipboardText_