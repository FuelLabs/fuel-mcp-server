[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Cookbook](https://docs.fuel.network/docs/fuels-ts/cookbook/) /

Transactions With Multiple Signers

## _Icon Link_ [Transactions with Multiple Signers](https://docs.fuel.network/docs/fuels-ts/cookbook/transactions-with-multiple-signers/\#transactions-with-multiple-signers)

When a transaction contains a spendable input such as a coin, it must also contain the signature of the coin owner for it to be spent. If the coin owner is also submitting the transaction, then this is straightforward. However, if an external address is required to sign the transaction, then the transaction must contain multiple signatures. Within the SDK, an account signature can be added to a transaction by calling `addAccountWitnesses` on the transaction request.

Consider a script that requires two signatures to be spent:

```fuel_Box fuel_Box-idXKMmm-css
script;

use std::{b512::B512, ecr::ec_recover_address, tx::{tx_id, tx_witness_data}};

fn main(signer: b256) -> bool {
    let witness_data: B512 = tx_witness_data(1).unwrap();
    let address: b256 = ec_recover_address(witness_data, tx_id()).unwrap().bits();
    return address == signer;
}
```

_Icon ClipboardText_

In the snippet above, we use the built-in Sway function `tx_witness_data()` to retrieve the witness signatures and `tx_id()` for the transaction hash. Then, we retrieve the signing address to validate the script.

We would interact with this script in the SDK by creating a transaction request from an invocation scope. The same can be done for a contract. Consider the following script:

```fuel_Box fuel_Box-idXKMmm-css
import type { BN } from 'fuels';
import { Script, Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
  WALLET_PVT_KEY_3,
} from '../../../../env';
import { ScriptSigning } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const signer = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);
const receiver = Wallet.fromPrivateKey(WALLET_PVT_KEY_3, provider);

const amountToReceiver = 100;

const script = new Script(ScriptSigning.bytecode, ScriptSigning.abi, sender);
const { waitForResult } = await script.functions
  .main(signer.address.toB256())
  .addTransfer({
    destination: receiver.address,
    amount: amountToReceiver,
    assetId: await provider.getBaseAssetId(),
  })
  .addSigners(signer)
  .call<BN>();

const { value } = await waitForResult();
```

_Icon ClipboardText_

The same approach can be used for a predicate by instantiating it and adding it to a transaction request. Consider the following predicate:

```fuel_Box fuel_Box-idXKMmm-css
predicate;

use std::{b512::B512, ecr::ec_recover_address, tx::{tx_id, tx_witness_data}};

fn main(signer: b256) -> bool {
    let witness_data: B512 = tx_witness_data(1).unwrap();
    let address: b256 = ec_recover_address(witness_data, tx_id()).unwrap().bits();
    return address == signer;
}
```

_Icon ClipboardText_

We can interact with this predicate in the SDK with the following implementation:

```fuel_Box fuel_Box-idXKMmm-css
import { Predicate, Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
  WALLET_PVT_KEY_3,
} from '../../../../env';
import { PredicateSigning } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);

const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const signer = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);
const receiver = Wallet.fromPrivateKey(WALLET_PVT_KEY_3, provider);

const amountToReceiver = 100;

// Create and fund the predicate
const predicate = new Predicate<[string]>({
  bytecode: PredicateSigning.bytecode,
  abi: PredicateSigning.abi,
  provider,
  data: [signer.address.toB256()],
});
const baseAssetId = await provider.getBaseAssetId();

const tx = await sender.transfer(predicate.address, 200_000, baseAssetId);
await tx.waitForResult();

// Create the transaction request
const request = new ScriptTransactionRequest();
request.addCoinOutput(receiver.address, amountToReceiver, baseAssetId);

// Get the predicate resources and add them and predicate data to the request
const resources = await predicate.getResourcesToSpend([\
  {\
    assetId: baseAssetId,\
    amount: amountToReceiver,\
  },\
]);
request.addResources(resources);

// Estimate and fund the request
request.addWitness('0x');
await request.estimateAndFund(predicate, {
  signatureCallback: (txRequest) => txRequest.addAccountWitnesses(signer),
});

// Add the signer as a witness
await request.addAccountWitnesses(signer);

// Send the transaction
const res = await provider.sendTransaction(request);
await res.waitForResult();

```

Collapse_Icon ClipboardText_