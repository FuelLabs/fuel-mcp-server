[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Provider](https://docs.fuel.network/docs/nightly/fuels-ts/provider/) /

Querying the Chain

## _Icon Link_ [Querying the Chain](https://docs.fuel.network/docs/nightly/fuels-ts/provider/querying-the-chain/\#querying-the-chain)

Once you have set up a provider, you're ready to interact with the Fuel blockchain.

- [Connecting to the Network](https://docs.fuel.network/docs/nightly/fuels-ts/getting-started/connecting-to-the-network/)

Let's look at a few examples below.

## _Icon Link_ [`getBaseAssetId`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/querying-the-chain/\#getbaseassetid)

The base asset is the underlying asset used to perform any transaction on a chain. This should be fetched from a provider to then be used in transactions.

```fuel_Box fuel_Box-idXKMmm-css
import { Address, Provider, ScriptTransactionRequest } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_ADDRESS } from '../../../../env';

// Fetch the base asset ID using the provider
const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();
// 0x...

// Instantiate our recipients address
const recipientAddress = new Address(WALLET_ADDRESS);

// Create a transaction request
const transactionRequest = new ScriptTransactionRequest();
// Use the base asset for an operation
transactionRequest.addCoinOutput(recipientAddress, 100, baseAssetId);
```

_Icon ClipboardText_

## _Icon Link_ [`getCoins`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/querying-the-chain/\#getcoins)

Returns UTXOs coins from an account address, optionally filtered by asset ID. This method supports [pagination](https://docs.fuel.network/docs/nightly/fuels-ts/provider/pagination/).

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const assetIdA =
  '0x0101010101010101010101010101010101010101010101010101010101010101';
const baseAssetId = await provider.getBaseAssetId();

// Fetches up to 100 coins that have an asset ID that is equal to the base asset ID
const { coins: coinsOnlyBaseAsset } = await provider.getCoins(
  wallet.address,
  baseAssetId
);
// [\
//   { amount: bn(100), assetId: baseAssetId },\
//   ...\
// ]

// Fetches up to 100 coins - irrespective of the asset ID
const { coins: coinsAnyAsset } = await provider.getCoins(wallet.address);
// [\
//   { amount: bn(100), assetId: baseAssetId }\
//   { amount: bn(100), assetId: assetIdA }\
//   ...\
// ]
```

_Icon ClipboardText_

This method is also implemented on the `Account` class and can be used without providing the `address`:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const baseAssetId = await provider.getBaseAssetId();

const { coins } = await wallet.getCoins(baseAssetId);
// [\
//   { amount: bn(100), assetId: baseAssetId },\
//   ...\
// ]
```

_Icon ClipboardText_

## _Icon Link_ [`getResourcesToSpend`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/querying-the-chain/\#getresourcestospend)

Returns spendable resources (coins or messages) for a transaction request. It accepts an optional third parameter, `excludedIds`, to exclude specific UTXO IDs or coin message nonces:

```fuel_Box fuel_Box-idXKMmm-css
import type { CoinQuantityLike, ExcludeResourcesOption } from 'fuels';
import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const assetIdA =
  '0x0101010101010101010101010101010101010101010101010101010101010101';

const baseAssetId = await provider.getBaseAssetId();

const quantities: CoinQuantityLike[] = [\
  { amount: 32, assetId: baseAssetId, max: 42 },\
  { amount: 50, assetId: assetIdA },\
];

const utxoId =
  '0x00000000000000000000000000000000000000000000000000000000000000010001';
const messageNonce =
  '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0';
const excludedIds: ExcludeResourcesOption = {
  utxos: [utxoId],
  messages: [messageNonce],
};

const spendableResources = await provider.getResourcesToSpend(
  wallet.address,
  quantities,
  excludedIds
);

const tx = new ScriptTransactionRequest();
tx.addResources(spendableResources);
```

Collapse_Icon ClipboardText_

This method is also available in the `Account` class and can be used without providing the `address`:

```fuel_Box fuel_Box-idXKMmm-css
import type { CoinQuantityLike, ExcludeResourcesOption } from 'fuels';
import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const assetIdA =
  '0x0101010101010101010101010101010101010101010101010101010101010101';

const baseAssetId = await provider.getBaseAssetId();

const quantities: CoinQuantityLike[] = [\
  { amount: 32, assetId: baseAssetId, max: 42 },\
  { amount: 50, assetId: assetIdA },\
];

const utxoId =
  '0x00000000000000000000000000000000000000000000000000000000000000010001';
const messageNonce =
  '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0';
const excludedIds: ExcludeResourcesOption = {
  utxos: [utxoId],
  messages: [messageNonce],
};

const spendableResources = await wallet.getResourcesToSpend(
  quantities,
  excludedIds
);

const tx = new ScriptTransactionRequest();
tx.addResources(spendableResources);
```

Collapse_Icon ClipboardText_

## _Icon Link_ [`getBalances`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/querying-the-chain/\#getbalances)

Returns the sum of all UTXOs coins and unspent message coins amounts for all assets. Unlike `getCoins`, it only returns the total amounts, not the individual coins:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const { balances } = await provider.getBalances(wallet.address);
// [\
//   { amount: bn(42), assetId: baseAssetId } // total amount of baseAssetId\
//   { amount: bn(100), assetId: assetIdA } // total amount of assetIdA\
// ]
```

_Icon ClipboardText_

This method is also available in the `Account` class and can be used without providing the `address` parameter:

```fuel_Box fuel_Box-idXKMmm-css
await wallet.getBalances();
```

_Icon ClipboardText_

## _Icon Link_ [`getBlocks`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/querying-the-chain/\#getblocks)

The `getBlocks` method returns blocks from the blockchain matching the given `paginationArgs` parameter, supporting [pagination](https://docs.fuel.network/docs/nightly/fuels-ts/provider/pagination/). The below code snippet shows how to get the last 10 blocks.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const blockToProduce = 3;

// Force-producing some blocks to make sure that blocks exist
await provider.produceBlocks(blockToProduce);

const { blocks } = await provider.getBlocks({
  last: blockToProduce,
});
```

_Icon ClipboardText_

## _Icon Link_ [`getMessageByNonce`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/querying-the-chain/\#getmessagebynonce)

You can use the `getMessageByNonce` method to retrieve a message by its nonce.

```fuel_Box fuel_Box-idXKMmm-css
import { launchTestNode, TestMessage } from 'fuels/test-utils';

const { provider } = await launchTestNode({
  nodeOptions: {
    snapshotConfig: {
      stateConfig: {
        messages: [\
          new TestMessage({\
            nonce:\
              '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0',\
          }).toChainMessage(),\
        ],
      },
    },
  },
});

const nonce =
  '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0';
const message = await provider.getMessageByNonce(nonce);
```

_Icon ClipboardText_

## _Icon Link_ [`getMessages`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/querying-the-chain/\#getmessages)

You can use the `getMessages` method to retrieve a list of messages from the blockchain.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

// Instantiate a provider and wallet
const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// Retrieves messages from the wallet
const { messages } = await wallet.getMessages();
```

_Icon ClipboardText_

## _Icon Link_ [`getMessageProof`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/querying-the-chain/\#getmessageproof)

A message proof is a cryptographic proof that a message was included in a block. You can use the `getMessageProof` method to retrieve a message proof for a given transaction ID and message ID.

You can retrieve a message proof by either using it's block ID:

```fuel_Box fuel_Box-idXKMmm-css
import type { TransactionResultMessageOutReceipt } from 'fuels';
import { sleep } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

using launched = await launchTestNode({
  nodeOptions: {
    args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
  },
});

const {
  provider,
  wallets: [sender, recipient],
} = launched;

// Performs a withdrawal transaction from sender to recipient, thus generating a message
const withdrawTx = await sender.withdrawToBaseLayer(
  recipient.address.toB256(),
  100
);
const result = await withdrawTx.waitForResult();

// Waiting for a new block to be committed (1 confirmation block)
// Retrieves the latest block
await sleep(1000);
const latestBlock = await provider.getBlock('latest');

// Retrieves the `nonce` via message out receipt from the initial transaction result
const { nonce } = result.receipts[0] as TransactionResultMessageOutReceipt;

// Retrieves the message proof for the transaction ID and nonce using the next block Id
const messageProofFromBlockId = await provider.getMessageProof(
  result.id,
  nonce,
  latestBlock?.id
);
```

Collapse_Icon ClipboardText_

Or by it's block height:

```fuel_Box fuel_Box-idXKMmm-css
import type { TransactionResultMessageOutReceipt } from 'fuels';
import { sleep } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

using launched = await launchTestNode({
  nodeOptions: {
    args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
  },
});

const {
  provider,
  wallets: [sender, recipient],
} = launched;

// Performs a withdrawal transaction from sender to recipient, thus generating a message
const withdrawTx = await sender.withdrawToBaseLayer(
  recipient.address.toB256(),
  100
);
const result = await withdrawTx.waitForResult();

// Waiting for a new block to be committed (1 confirmation block)
// Retrieves the latest block
await sleep(1000);
const latestBlock = await provider.getBlock('latest');

// Retrieves the `nonce` via message out receipt from the initial transaction result
const { nonce } = result.receipts[0] as TransactionResultMessageOutReceipt;

// Retrieves the message proof for the transaction ID and nonce using the block height
const messageProofFromBlockHeight = await provider.getMessageProof(
  result.id,
  nonce,
  undefined,
  latestBlock?.height
);
```

Collapse_Icon ClipboardText_

## _Icon Link_ [`getTransactions`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/querying-the-chain/\#gettransactions)

You can use the `getTransactions` method to retrieve a list of transactions from the blockchain. This is limited to 30 transactions per page.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const { transactions } = await provider.getTransactions();
```

_Icon ClipboardText_