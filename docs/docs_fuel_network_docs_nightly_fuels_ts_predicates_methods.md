[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Predicates](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/) /

Methods

## _Icon Link_ [Interacting With Predicates](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/\#interacting-with-predicates)

The `Predicate` class extends the [`Account` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/modules/_fuel_ts_account.html) class, inheriting all its methods. Therefore, there are multiple ways to interact with predicates, but broadly speaking, we can think about three:

- `Checking Balances`
- `Transactions`
- `Transfers`

## _Icon Link_ [Checking Balances](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/\#checking-balances)

## _Icon Link_ [`getBalances`](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/\#getbalances)

This will return the balances of all assets owned by the predicate.

See also: [Checking Wallet Balances _Icon Link_](https://docs.fuel.network/docs/fuels-ts/wallets/checking-balances/#getting-a-wallets-balance)

## _Icon Link_ [`getResourcesToSpend`](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/\#getresourcestospend)

This will return the resources owned by a predicate so that they can be added to a transaction request.

This method is called under the hood when using [`transfer`](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/#transfer) or [`createTransfer`](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/#createtransfer).

You may want to use this method when using a predicate in an existing transaction request.

```fuel_Box fuel_Box-idXKMmm-css
import { bn, Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnTruePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const funder = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const predicate = new ReturnTruePredicate({
  provider,
});

// Fund the predicate
const fundPredicate = await funder.transfer(
  predicate.address,
  100_000_000,
  baseAssetId
);
await fundPredicate.waitForResult();

// Instantiate the transaction request.
const transactionRequest = new ScriptTransactionRequest({
  gasLimit: 2000,
  maxFee: bn(0),
});

// Get the resources available to send from the predicate.
const predicateCoins = await predicate.getResourcesToSpend([\
  { amount: 2000, assetId: baseAssetId },\
]);

// Add the predicate input and resources.
transactionRequest.addResources(predicateCoins);
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Transactions](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/\#transactions)

## _Icon Link_ [`sendTransaction`](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/\#sendtransaction)

This is used to send a transaction to the node.

```fuel_Box fuel_Box-idXKMmm-css
import { bn, Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnTruePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const funder = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const predicate = new ReturnTruePredicate({
  provider,
});

// Fund the predicate
const fundPredicate = await funder.transfer(
  predicate.address,
  100_000_000,
  baseAssetId
);

await fundPredicate.waitForResult();

// Instantiate the transaction request.
const transactionRequest = new ScriptTransactionRequest({
  gasLimit: 2000,
  maxFee: bn(100),
});

// Get the resources available to send from the predicate.
const predicateCoins = await predicate.getResourcesToSpend([\
  { amount: 2000, assetId: baseAssetId },\
]);

// Add the predicate input and resources.
transactionRequest.addResources(predicateCoins);

// Estimate and fund the transaction
await transactionRequest.estimateAndFund(predicate);

// Send the transaction using the predicate
const result = await predicate.sendTransaction(transactionRequest);

await result.waitForResult();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [`simulateTransaction`](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/\#simulatetransaction)

You can use the `simulateTransaction` method to dry-run a predicate call without consuming resources. A typical use case of a dry-run call is to validate that sufficient funds are available to cover the transaction fees.

```fuel_Box fuel_Box-idXKMmm-css
import {
  bn,
  Provider,
  ReceiptType,
  ScriptTransactionRequest,
  Wallet,
} from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnTruePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const funder = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });

const predicate = new ReturnTruePredicate({
  provider,
});

const fundPredicate = await funder.transfer(
  predicate.address,
  100_000_000,
  baseAssetId
);
await fundPredicate.waitForResult();

// Instantiate the transaction request.
const transactionRequest = new ScriptTransactionRequest({
  gasLimit: 2000,
  maxFee: bn(0),
});

transactionRequest.addCoinOutput(receiver.address, 1000000, baseAssetId);

// Estimate and fund the transaction
await transactionRequest.estimateAndFund(predicate);

const result = await predicate.simulateTransaction(transactionRequest);

```

Collapse_Icon ClipboardText_

## _Icon Link_ [Transfers](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/\#transfers)

## _Icon Link_ [`createTransfer`](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/\#createtransfer)

The `createTransfer` method creates a transaction request with all the necessary transfer details. It automatically estimates the transaction costs via a dry-run call and funds the request with the required predicate resources. After this, one can submit the returned transaction request with greater certainty that it will succeed.

However, please remember that you can still modify the transfer request details and use its properties before submitting it to the node.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnTruePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const funder = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const predicate = new ReturnTruePredicate({
  provider,
});

// Fund the predicate
const fundPredicate = await funder.transfer(
  predicate.address,
  100_000_000,
  baseAssetId
);
await fundPredicate.waitForResult();

const receiver = Wallet.generate({ provider });
const amountToReceiver = 1000;

const transactionRequest = await predicate.createTransfer(
  receiver.address,
  amountToReceiver,
  baseAssetId,
  {
    gasLimit: 1000,
  }
);

const sendFromPredicate = await predicate.sendTransaction(transactionRequest);

await sendFromPredicate.waitForResult();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [`transfer`](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/methods/\#transfer)

You can send funds to another address using the `transfer` method.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnTruePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const funder = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const predicate = new ReturnTruePredicate({
  provider,
});

const fundPredicate = await funder.transfer(
  predicate.address,
  100_000_000,
  baseAssetId
);
await fundPredicate.waitForResult();

const receiver = Wallet.generate({ provider });
const amountToReceiver = 1000;

const transferPredicateCoins = await predicate.transfer(
  receiver.address,
  amountToReceiver,
  baseAssetId,
  {
    gasLimit: 1000,
  }
);

await transferPredicateCoins.waitForResult();
```

Collapse_Icon ClipboardText_