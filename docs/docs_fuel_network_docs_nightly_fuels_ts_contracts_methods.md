[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/) /

Methods

## _Icon Link_ [Interacting With Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/methods/\#interacting-with-contracts)

There are 4 ways to interact with contracts: `get`, `dryRun`, `simulate`, `call`.

## _Icon Link_ [`get`](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/methods/\#get)

The `get` method should be used to read data from the blockchain without using resources. It can be used with an unfunded wallet or even without a wallet at all:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await CounterFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Read from the blockchain
const { value } = await contract.functions.get_count().get();
// 0
```

_Icon ClipboardText_

## _Icon Link_ [`dryRun`](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/methods/\#dryrun)

The `dryRun` method should be used to dry-run a contract call. It does not spend resources and can be used with an unfunded wallet or even without a wallet at all:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await CounterFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Perform a dry-run of the transaction
const { value } = await contract.functions.increment_count(1).dryRun();
```

_Icon ClipboardText_

## _Icon Link_ [`simulate`](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/methods/\#simulate)

The `simulate` method should be used to dry-run a contract call, ensuring that the wallet used has sufficient funds to cover the transaction fees, without consuming any resources.

A funded wallet it's required:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await CounterFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Simulate the transaction
const { value } = await contract.functions.increment_count(10).simulate();
```

_Icon ClipboardText_

## _Icon Link_ [`call`](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/methods/\#call)

The `call` method submits a real contract call transaction to the node, resolving immediately upon submission and returning a `transactionId` along with a `waitForResult` callback to wait for transaction execution. This behavior aligns with the natural behaviour of blockchains, where transactions may take a few seconds before being recorded on the chain.

Real resources are consumed, and any operations executed by the contract function will be processed on the blockchain.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await CounterFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Perform the transaction
const { waitForResult } = await contract.functions.increment_count(10).call();

const { value } = await waitForResult();
```

_Icon ClipboardText_

## _Icon Link_ [`isReadOnly` (utility)](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/methods/\#isreadonly-utility)

If you want to figure out whether a function is read-only, you can use the `isReadOnly` method:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await CounterFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

const isReadOnly = contract.functions.get_count.isReadOnly();

if (isReadOnly) {
  await contract.functions.get_count().get();
} else {
  const { waitForResult } = await contract.functions.get_count().call();
  await waitForResult();
}
```

_Icon ClipboardText_

If the function is read-only, you can use the `get` method to retrieve onchain data without spending gas.

If the function is not read-only you will have to use the `call` method to submit a transaction onchain which incurs a gas fee.