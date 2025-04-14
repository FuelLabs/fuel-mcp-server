[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Wallets](https://docs.fuel.network/docs/fuels-ts/wallets/) /

Wallet Transferring

## _Icon Link_ [Wallet Transferring](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-transferring/\#wallet-transferring)

This guide provides instructions for transferring assets between wallets and contracts using the SDK. It includes methods to validate balances and initiate and configure transfer requests.

## _Icon Link_ [Transferring Assets Between Accounts](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-transferring/\#transferring-assets-between-accounts)

The `transfer` method initiates a transaction request that transfers an asset from one wallet to another. This method requires three parameters:

1. The receiver's wallet address
2. The amount of the asset to be transferred
3. The ID of the asset to be transferred (optional - defaults to the base asset ID)

Upon execution, this function returns a promise that resolves to a transaction response. To wait for the transaction to be processed, call `response.waitForResult()`.

## _Icon Link_ [Example](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-transferring/\#example)

Here is an example of how to use the `transfer` function:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const destination = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

const amountToTransfer = 500;

const response = await sender.transfer(
  destination.address,
  amountToTransfer,
  baseAssetId
);

await response.waitForResult();

// Retrieve balances
const balance = await destination.getBalance(baseAssetId);
```

_Icon ClipboardText_

In the previous example, we used the `transfer` method which creates a `ScriptTransactionRequest`, populates its data with the provided transfer information and submits the transaction.

However, there may be times when you need the Transaction ID before actually submitting it to the node. To achieve this, you can simply call the `createTransfer` method instead.

This method also creates a `ScriptTransactionRequest` and populates it with the provided data but returns the request object prior to submission.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const destination = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

const amountToTransfer = 200;
const baseAssetId = await provider.getBaseAssetId();

const transactionRequest = await sender.createTransfer(
  destination.address,
  amountToTransfer,
  baseAssetId
);

const chainId = await provider.getChainId();

const transactionId = transactionRequest.getTransactionId(chainId);

const response = await sender.sendTransaction(transactionRequest);

// The transaction id is the same one returned by the code above.
const { id } = await response.wait();
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note**: Any changes made to a transaction request will alter the transaction ID. Therefore, you should only get the transaction ID after all modifications have been made.

```fuel_Box fuel_Box-idXKMmm-css
import { bn, Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_PVT_KEY,
  WALLET_PVT_KEY_2,
} from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const destination = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

const amountToTransfer = 200;
const baseAssetId = await provider.getBaseAssetId();

const transactionRequest = await sender.createTransfer(
  destination.address,
  amountToTransfer,
  baseAssetId
);

const chainId = await provider.getChainId();

const transactionId = transactionRequest.getTransactionId(chainId);

/**
 * Modifying any property of the transaction request, except for the number
 * of witnesses within the ".witnesses" array, will generate a new transaction
 * hash, resulting in a different transaction ID.
 */
transactionRequest.gasLimit = bn(1000);

const response = await sender.sendTransaction(transactionRequest);

// The transaction id here is NOT the same one returned above.
const { id } = await response.wait();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Transferring Assets To Multiple Wallets](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-transferring/\#transferring-assets-to-multiple-wallets)

To transfer assets to multiple wallets, use the `Account.batchTransfer` method:

```fuel_Box fuel_Box-idXKMmm-css
import type { TransferParams } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const recipient1 = Wallet.generate({ provider });
const recipient2 = Wallet.generate({ provider });

const someOtherAssetId =
  '0x0101010101010101010101010101010101010101010101010101010101010101';
const transfersToMake: TransferParams[] = [\
  {\
    amount: 100,\
    assetId: baseAssetId,\
    destination: recipient1.address,\
  },\
  {\
    amount: 200,\
    assetId: baseAssetId,\
    destination: recipient2.address,\
  },\
  {\
    amount: 300,\
    assetId: someOtherAssetId,\
    destination: recipient2.address,\
  },\
];

const tx = await sender.batchTransfer(transfersToMake);
await tx.waitForResult();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Transferring Assets To Contracts](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-transferring/\#transferring-assets-to-contracts)

When transferring assets to a deployed contract, we use the `transferToContract` method, which shares a similar parameter structure with the `transfer` method.

However, instead of supplying the target wallet's address, as done in `destination.address` for the transfer method, we need to provide an instance of [Address](https://docs.fuel.network/docs/fuels-ts/types/address/) created from the deployed contract id.

If you have the [Contract](https://docs.fuel.network/docs/fuels-ts/contracts/) instance of the deployed contract, you can simply use its `id` property. However, if the contract was deployed with `forc deploy` or not by you, you will likely only have its ID in a hex string format. In such cases, you can create an [Address](https://docs.fuel.network/docs/fuels-ts/types/address/) instance from the contract ID using `new Address('0x123...')`.

Here's an example demonstrating how to use `transferToContract`:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await CounterFactory.deploy(sender);
const { contract } = await deploy.waitForResult();

const amountToTransfer = 400;
const assetId = await provider.getBaseAssetId();
const contractId = contract.id;

const tx = await sender.transferToContract(
  contractId,
  amountToTransfer,
  assetId
);

await tx.waitForResult();
```

_Icon ClipboardText_

_Note: Use `transferToContract` exclusively for transfers to a contract. For transfers to an account address, use `transfer` instead._

## _Icon Link_ [Transferring Assets To Multiple Contracts](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-transferring/\#transferring-assets-to-multiple-contracts)

Similar to the `Account.batchTransfer` method, you can transfer multiple assets to multiple contracts using the `Account.batchTransferToContracts` method. Here's how it works:

```fuel_Box fuel_Box-idXKMmm-css
import type { ContractTransferParams } from 'fuels';
import { Provider, Wallet } from 'fuels';
import { TestAssetId } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory, EchoValuesFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const baseAssetId = await provider.getBaseAssetId();
const assetA = TestAssetId.A.value;

const deploy1 = await CounterFactory.deploy(sender);
const deploy2 = await EchoValuesFactory.deploy(sender);

const { contract: contract1 } = await deploy1.waitForResult();
const { contract: contract2 } = await deploy2.waitForResult();

const contractTransferParams: ContractTransferParams[] = [\
  {\
    contractId: contract1.id,\
    amount: 999,\
    assetId: baseAssetId,\
  },\
  {\
    contractId: contract1.id,\
    amount: 550,\
    assetId: assetA,\
  },\
  {\
    contractId: contract2.id,\
    amount: 200,\
    assetId: assetA,\
  },\
];

const transfer = await sender.batchTransferToContracts(contractTransferParams);
await transfer.waitForResult();
```

Collapse_Icon ClipboardText_

Always remember to call the `waitForResult()` function on the transaction response. That ensures the transaction has been mined successfully before proceeding.

_Note: Use `batchTransferToContracts` solely for transferring assets to contracts. Do not use account addresses with this method. For multiple account transfers, use `batchTransfer` instead._

## _Icon Link_ [Checking Balances](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-transferring/\#checking-balances)

Before you transfer assets, please make sure your wallet has enough funds. Attempting a transfer without enough funds will result in the error: `The transaction does not have enough funds to cover its execution.`

You can see how to check your balance at the [`checking-balances`](https://docs.fuel.network/docs/fuels-ts/wallets/checking-balances/) page.