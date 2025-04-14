[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/) /

Multi Contract Calls

## _Icon Link_ [Multiple Contract Calls](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/multi-contract-calls/\#multiple-contract-calls)

You can execute multiple contract calls in a single transaction, either to the same contract or to different contracts. This can improve efficiency and reduce the overall transaction costs.

## _Icon Link_ [Same Contract Multi Calls](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/multi-contract-calls/\#same-contract-multi-calls)

Use the `multiCall` method to call multiple functions on the same contract in a single transaction:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const counterContractTx = await CounterFactory.deploy(deployer);
const { contract: counterContract } = await counterContractTx.waitForResult();

const { waitForResult } = await counterContract
  .multiCall([\
    counterContract.functions.get_count(),\
    counterContract.functions.increment_count(2),\
    counterContract.functions.increment_count(4),\
  ])
  .call();

const { value: results } = await waitForResult();
// results[0] == 0
// results[1] == 2
// results[2] == 6
```

_Icon ClipboardText_

## _Icon Link_ [Different Contracts Multi Calls](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/multi-contract-calls/\#different-contracts-multi-calls)

The `multiCall` method also allows you to execute multiple contract calls to distinct contracts within a single transaction:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory, EchoValuesFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const counterContractTx = await CounterFactory.deploy(deployer);
const { contract: counterContract } = await counterContractTx.waitForResult();
const echoContractTx = await EchoValuesFactory.deploy(deployer);
const { contract: echoContract } = await echoContractTx.waitForResult();

const { waitForResult } = await echoContract
  .multiCall([\
    echoContract.functions.echo_u8(17),\
    counterContract.functions.get_count(),\
    counterContract.functions.increment_count(5),\
  ])
  .call();

const { value: results } = await waitForResult();
// results[0] == 17
// results[1] == BN <0>
// results[2] == BN <5>
```

_Icon ClipboardText_

You can also chain supported contract call methods, like `callParams`, for each contract call:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { EchoValuesFactory, ReturnContextFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const echoContractTx = await EchoValuesFactory.deploy(deployer);
const { contract: echoContract } = await echoContractTx.waitForResult();
const returnContextTx = await ReturnContextFactory.deploy(deployer);
const { contract: returnContextContract } =
  await returnContextTx.waitForResult();

const { waitForResult } = await echoContract
  .multiCall([\
    echoContract.functions.echo_u8(10),\
    returnContextContract.functions.return_context_amount().callParams({\
      forward: [100, await provider.getBaseAssetId()],\
    }),\
  ])
  .call();

const { value: results } = await waitForResult();
// results[0] == 10
// results[1] == BN <100>
```

_Icon ClipboardText_

When using `multiCall`, the contract calls are queued and executed only after invoking one of the following methods: `.get`, `.simulate`, or `.call`.

## _Icon Link_ [Using `multiCall` for Read-Only Contract Calls](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/multi-contract-calls/\#using-multicall-for-read-only-contract-calls)

When you need to read data from multiple contracts, the `multiCall` method can perform multiple [read-only](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/methods/#get) calls in a single transaction. This minimizes the number of requests sent to the network and consolidates data retrieval, making your dApp interactions more efficient.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory, EchoValuesFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const counterContractTx = await CounterFactory.deploy(deployer);
const { contract: counterContract } = await counterContractTx.waitForResult();
const echoContractTx = await EchoValuesFactory.deploy(deployer);
const { contract: echoContract } = await echoContractTx.waitForResult();

const { waitForResult } = await echoContract
  .multiCall([\
    counterContract.functions.get_count(),\
    echoContract.functions.echo_u8(10),\
    echoContract.functions.echo_str('Fuel'),\
  ])
  .call();

const { value: results } = await waitForResult();
// results[0] == BN <0>
// results[1] == 10
// results[2] == 'Fuel'
```

_Icon ClipboardText_