[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Predicates](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/) /

Send and Spend Funds from Predicates

## _Icon Link_ [Send And Spend Funds From Predicates](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/send-and-spend-funds-from-predicates/\#send-and-spend-funds-from-predicates)

Predicates can be used to validate transactions. This implies that a predicate can safeguard assets, only allowing their transfer if the predicate conditions are met.

This guide will demonstrate how to send and spend funds using a predicate.

## _Icon Link_ [Predicate Example](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/send-and-spend-funds-from-predicates/\#predicate-example)

Consider the following predicate:

```fuel_Box fuel_Box-idXKMmm-css
predicate;

fn main(input_address: b256) -> bool {
    let valid_address = 0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4;

    input_address == valid_address
}
```

_Icon ClipboardText_

This predicate accepts an address of type `B256` and compares it with a hard-coded address of the same type. If both addresses are equal, the predicate returns true, otherwise it will return false.

## _Icon Link_ [Interacting with the Predicate Using SDK](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/send-and-spend-funds-from-predicates/\#interacting-with-the-predicate-using-sdk)

Let's use the above predicate to validate our transaction.

Once you've compiled the predicate ( `forc build`), you'll obtain two important artifacts: the JSON ABI and the predicate's binary code. These are needed to instantiate a new predicate.

This is where we also pass in the predicate's data. Note that the `main` function in our predicate example requires a parameter called `input_address` of type `B256`. We will pass this parameter to the `Predicate` constructor along with the bytecode and the JSON ABI.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { SimplePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });

const inputAddress =
  '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';

const predicate = new SimplePredicate({
  provider,
  data: [inputAddress],
});
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> Note: If you want to pass in the predicate data _after_ instantiating the `Predicate` or if you want to use a different data than the one passed in the constructor, you will have to create a new `Predicate` instance.

With the predicate instantiated, we can transfer funds to its address. This requires us to have a wallet with sufficient funds. If you're unsure about using wallets with the SDK, we recommend checking out our [wallet](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/) guide.

```fuel_Box fuel_Box-idXKMmm-css
// The amount of coins to send to the predicate
const amountToPredicate = 10_000_000;

// Fund the predicate with some funds from our wallet (sender)
const fundPredicateTx = await sender.transfer(
  predicate.address,
  amountToPredicate,
  baseAssetId,
  {
    gasLimit: 1000,
  }
);

// Wait for the transaction
await fundPredicateTx.waitForResult();
```

_Icon ClipboardText_

Now that our predicate holds funds, we can use it to validate a transaction and hence execute our transfer. We can achieve that by doing the following:

```fuel_Box fuel_Box-idXKMmm-css
// The amount of coins to send from the predicate, to our receiver wallet.
const amountToReceiver = 200;

// Transfer funds from the predicate, to our receiver wallet
const transferFromPredicateTx = await predicate.transfer(
  receiver.address,
  amountToReceiver,
  baseAssetId
);

// Wait for the transaction
await transferFromPredicateTx.waitForResult();
```

_Icon ClipboardText_

Note the method transfer has two parameters: the recipient's address and the intended transfer amount.

Once the predicate resolves with a return value `true` based on its predefined condition, our predicate successfully spends its funds by means of a transfer to a desired wallet.

* * *

In a similar approach, you can use the `createTransfer` method, which returns a [`ScriptTransactionRequest` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.ScriptTransactionRequest.html). Then, we can submit this transaction request by calling the `sendTransaction` method.

The following example, we are pre-staging a transaction and therefore we are able to know the transaction ID without actually submitting the transaction.

```fuel_Box fuel_Box-idXKMmm-css
// Create the transaction for transferring funds from the predicate.
const transactionRequest = await predicate.createTransfer(
  receiver.address,
  amountToReceiver,
  baseAssetId,
  {
    gasLimit: 1000,
  }
);

// We can obtain the transaction ID before submitting the transaction.
const chainId = await provider.getChainId();
const transactionId = transactionRequest.getTransactionId(chainId);

// We can submit the transaction and wait for the result.
const submitTransaction = await predicate.sendTransaction(transactionRequest);
await submitTransaction.waitForResult();
```

_Icon ClipboardText_

## _Icon Link_ [Spending Entire Predicate Held Amount](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/send-and-spend-funds-from-predicates/\#spending-entire-predicate-held-amount)

Trying to forward the entire amount held by the predicate results in an error because no funds are left to cover the transaction fees. Attempting this will result in an error message like:

```fuel_Box fuel_Box-idXKMmm-css
const errorMessage = `Insufficient funds or too many small value coins. Consider combining UTXOs.`;
```

_Icon ClipboardText_

## _Icon Link_ [Predicate Validation Failure](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/send-and-spend-funds-from-predicates/\#predicate-validation-failure)

What happens when a predicate fails to validate? Recall our predicate only validates if the `input_address` matches the hard-coded `valid_address`. Hence, if we set a different data from the `valid_address`, the predicate will fail to validate.

When a predicate fails to validate, the SDK throws an error that starts like this:

```fuel_Box fuel_Box-idXKMmm-css
const errorMessage = `PredicateVerificationFailed`;
```

_Icon ClipboardText_