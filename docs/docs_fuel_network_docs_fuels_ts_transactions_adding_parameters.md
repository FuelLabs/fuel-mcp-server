[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Transactions](https://docs.fuel.network/docs/fuels-ts/transactions/) /

Adding Parameters

## _Icon Link_ [Adding Parameters](https://docs.fuel.network/docs/fuels-ts/transactions/adding-parameters/\#adding-parameters)

Transaction parameters allow you to configure various aspects of your blockchain transactions. Dependent on these parameters, it may introduce a [transaction policy](https://docs.fuel.network/docs/fuels-ts/transactions/adding-policies/).

All available parameters are shown below:

```fuel_Box fuel_Box-idXKMmm-css
const txParams: TxParams = {
  gasLimit: bn(70935),
  maxFee: bn(69242),
  tip: bn(100),
  maturity: 1,
  witnessLimit: bn(5000),
  expiration: 200,
};
```

_Icon ClipboardText_

## _Icon Link_ [Gas Limit](https://docs.fuel.network/docs/fuels-ts/transactions/adding-parameters/\#gas-limit)

The maximum amount of gas you're willing to allow the transaction to consume. If the transaction requires more gas than this limit, it will fail.

```fuel_Box fuel_Box-idXKMmm-css
gasLimit: bn(70935),
```

_Icon ClipboardText_

## _Icon Link_ [Max Fee](https://docs.fuel.network/docs/fuels-ts/transactions/adding-parameters/\#max-fee)

The maximum amount you're willing to pay for the transaction using the base asset. This allows users to set an upper limit on the transaction fee they are willing to pay, preventing unexpected high costs due to sudden network congestion or fee spikes.

```fuel_Box fuel_Box-idXKMmm-css
maxFee: bn(69242),
```

_Icon ClipboardText_

## _Icon Link_ [Tip](https://docs.fuel.network/docs/fuels-ts/transactions/adding-parameters/\#tip)

An optional amount of the base asset to incentivise the block producer to include the transaction, ensuring faster processing for those willing to pay more. The value set here will be added to the transaction `maxFee`.

```fuel_Box fuel_Box-idXKMmm-css
tip: bn(100),
```

_Icon ClipboardText_

## _Icon Link_ [Maturity](https://docs.fuel.network/docs/fuels-ts/transactions/adding-parameters/\#maturity)

The number of blocks that must pass before the transaction can be included in a block. This is useful for time-sensitive transactions, such as those involving time-locked assets.

For example, if the chain produces a new block every second, setting Maturity to `10` means the transaction will be processed after approximately 10 seconds.

```fuel_Box fuel_Box-idXKMmm-css
maturity: 1,
```

_Icon ClipboardText_

## _Icon Link_ [Witness Limit](https://docs.fuel.network/docs/fuels-ts/transactions/adding-parameters/\#witness-limit)

The maximum byte length allowed for the transaction witnesses array. For instance, imagine a transaction that will deploy a contract. The contract bytecode will be one of the entries in the transaction witnesses. If you set this limit to `5000` and the contract bytecode length is `6000`, the transaction will be rejected because the witnesses bytes length exceeds the maximum value set.

```fuel_Box fuel_Box-idXKMmm-css
witnessLimit: bn(5000),
```

_Icon ClipboardText_

## _Icon Link_ [Expiration](https://docs.fuel.network/docs/fuels-ts/transactions/adding-parameters/\#expiration)

The block number after which the transaction can no longer be included in the blockchain. For example, if you set the expiration block for your transaction to 200, and the transaction remains in the queue waiting to be processed when block 200 is created, the transaction will be rejected.

```fuel_Box fuel_Box-idXKMmm-css
expiration: 200,
```

_Icon ClipboardText_

## _Icon Link_ [Variable Outputs](https://docs.fuel.network/docs/fuels-ts/transactions/adding-parameters/\#variable-outputs)

The number of variable outputs that should be added to the transaction request. You can read more about it on this [guide](https://docs.fuel.network/docs/fuels-ts/contracts/variable-outputs/)

> _Icon InfoCircle_
>
> **Note**: Setting transaction parameters is optional. If you don't specify them, the SDK will fetch some sensible defaults from the chain.

## _Icon Link_ [Setting Transaction Parameters](https://docs.fuel.network/docs/fuels-ts/transactions/adding-parameters/\#setting-transaction-parameters)

To set the transaction parameters, you have access to the `txParams` method on a transaction request.

```fuel_Box fuel_Box-idXKMmm-css
const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
  gasLimit: 100,
});
```

_Icon ClipboardText_

The same method is also accessible within a function invocation scope, so it can also be used when calling contract functions.

```fuel_Box fuel_Box-idXKMmm-css
const { waitForResult } = await contract.functions
  .increment_count(15) //
  .txParams(txParams)
  .call();

const {
  value,
  transactionResult: { isStatusSuccess },
} = await waitForResult();

console.log('Transaction request', transactionRequest);
console.log('Transaction status', isStatusSuccess);
console.log('Transaction value', value);

```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note:** When performing an action that results in a transaction (e.g. contract deployment, contract call with `.call()`, asset transfer), the SDK will automatically estimate the fee based on the gas limit and the transaction's byte size. This estimation is used when building the transaction. As a side effect, your wallet must own at least one coin of the base asset, regardless of the amount.

## _Icon Link_ [Full Example](https://docs.fuel.network/docs/fuels-ts/transactions/adding-parameters/\#full-example)

Here is the full example of the transaction parameters:

```fuel_Box fuel_Box-idXKMmm-css
import type { TxParams } from 'fuels';
import { bn, Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { CounterFactory } from '../../../typegend';
import { ScriptSum } from '../../../typegend/scripts';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await CounterFactory.deploy(wallet);

const { contract } = await deploy.waitForResult();

const txParams: TxParams = {
  gasLimit: bn(70935),
  maxFee: bn(69242),
  tip: bn(100),
  maturity: 1,
  witnessLimit: bn(5000),
  expiration: 200,
};

const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
  gasLimit: 100,
});

const { waitForResult } = await contract.functions
  .increment_count(15) //
  .txParams(txParams)
  .call();

const {
  value,
  transactionResult: { isStatusSuccess },
} = await waitForResult();

console.log('Transaction request', transactionRequest);
console.log('Transaction status', isStatusSuccess);
console.log('Transaction value', value);

```

Collapse_Icon ClipboardText_