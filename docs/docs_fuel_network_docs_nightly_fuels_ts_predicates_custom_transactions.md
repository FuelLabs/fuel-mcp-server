[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Predicates](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/) /

Custom Transactions

## _Icon Link_ [Custom Transactions](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/custom-transactions/\#custom-transactions)

Utilizing predicate logic unlocks a wide range of possibilities for your dApps when creating transactions. Therefore, pairing predicates with custom transactions can help you achieve more complex use cases. This can be achieved by instantiating a custom transaction, appending the predicate resources, and submitting the transaction via a successfully validated predicate.

Custom transactions can be shaped via a `ScriptTransactionRequest` instance. For more information on crafting custom transactions and the methods available to them, please refer to the [Transaction Request](https://docs.fuel.network/docs/nightly/fuels-ts/transactions/modifying-the-request/) guide.

However, this guide will demonstrate how to use a predicate in a custom transaction. Consider the following predicate, where a configurable pin must be used to validate the predicate and unlock the funds:

```fuel_Box fuel_Box-idXKMmm-css
predicate;

configurable {
    PIN: u64 = 1337,
}

fn main(pin: u64) -> bool {
    return PIN == pin;
}

```

_Icon ClipboardText_

We can interact with the above and include it in a custom transaction like so:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { ConfigurablePin } from '../../../typegend';
import type { ConfigurablePinInputs } from '../../../typegend/predicates/ConfigurablePin';

// Setup
const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });
const assetId = await provider.getBaseAssetId();
const amountToFundPredicate = 300_000;
const amountToReceiver = 100_000;

// Instantiate the predicate using valid predicate data, aka the pin we need
// to send the funds to the receiver
const data: ConfigurablePinInputs = [1337];
const predicate = new ConfigurablePin({ provider, data });

// Fund the predicate, so that we can send these funds via predicate logic
// to the receiver
const fundPredicateTx = await sender.transfer(
  predicate.address,
  amountToFundPredicate,
  assetId
);
await fundPredicateTx.waitForResult();
const initialPredicateBalance = await predicate.getBalance(assetId);

// Instantiate the script request
const customRequest = new ScriptTransactionRequest();

// Get the predicate resources that we would like to transfer
const predicateResources = await predicate.getResourcesToSpend([\
  { assetId, amount: amountToReceiver },\
]);

// Add the resources for the transfer of the asset to the receiver. The resources
// adds the required inputs, and the output is for the transfer to the receiver address
customRequest.addResources(predicateResources);
customRequest.addCoinOutput(receiver.address, amountToReceiver, assetId);

// Estimate the transaction cost and fund accordingly
await customRequest.estimateAndFund(predicate);

// Submit the transaction and await it's result
const predicateTx = await predicate.sendTransaction(customRequest);
await predicateTx.waitForResult();
```

Collapse_Icon ClipboardText_