[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/fuels-ts/contracts/) /

Deploying Contracts

## _Icon Link_ [Deploying Contracts](https://docs.fuel.network/docs/fuels-ts/contracts/deploying-contracts/\#deploying-contracts)

To deploy a contract using the SDK, you can use the `ContractFactory`. This process involves collecting the contract artifacts, initializing the contract factory, and deploying the contract.

The SDK utilizes two different deployment processes, depending on the contract's size. The threshold for the contract size is dictated by the chain and can be queried:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const {
  consensusParameters: {
    contractParameters: { contractMaxSize },
  },
} = await provider.getChain();
```

_Icon ClipboardText_

It either uses a single create transaction to deploy the entire contract bytecode, or it splits the contract bytecode into multiple chunks, deploys them as blobs (on chain data accessible to the VM), and then generates a contract from the associated blob IDs. That generated contract is then deployed as a create transaction.

The `ContractFactory` offers the following methods for the different processes:

- `deploy` for deploying contacts of any size (will automatically choose the appropriate deployment process).
- `deployAsCreateTx` for deploying the entire contract bytecode in a single create transaction.
- `deployAsBlobTx` for deploying the contract in chunks as blobs, and then deploying the contract as a create transaction.

> _Icon InfoCircle_
>
> **Note:** If the contract is deployed via blob deployments, multiple transactions will be required to deploy the contract.

## _Icon Link_ [Deploying a Contract Guide](https://docs.fuel.network/docs/fuels-ts/contracts/deploying-contracts/\#deploying-a-contract-guide)

This guide will cover the process of deploying a contract using the `deploy` method, however all these methods can be used interchangeably dependent on the contract size. In the guide we use a contract factory that has been built using [Typegen](https://docs.fuel.network/docs/fuels-ts/fuels-cli/abi-typegen/). This tool provided by the [Fuels CLI](https://docs.fuel.network/docs/fuels-ts/fuels-cli/) provides a better developer experience and end to end type support for your smart contracts.

## _Icon Link_ [1\. Setup](https://docs.fuel.network/docs/fuels-ts/contracts/deploying-contracts/\#1-setup)

After writing a contract in Sway you can build the necessary deployment artifacts either by running `forc build` ( [read more _Icon Link_](https://docs.fuel.network/docs/sway/introduction/) on how to work with Sway) or by using the [Fuels CLI](https://docs.fuel.network/docs/fuels-ts/fuels-cli/) and running `fuels build` using your chosen package manager. We recommend using the Fuels CLI as it provides a more comprehensive usage including end to end type support.

Once you have the contract artifacts, it can be passed to the `ContractFactory` for deployment, like so:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { MyContractFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const factory = new MyContractFactory(wallet);
```

_Icon ClipboardText_

## _Icon Link_ [2\. Contract Deployment](https://docs.fuel.network/docs/fuels-ts/contracts/deploying-contracts/\#2-contract-deployment)

As mentioned earlier, there are two different processes for contract deployment handled by the `ContractFactory`. These can be used interchangeably, however, the `deploy` method is recommended as it will automatically choose the appropriate deployment process based on the contract size.

This call resolves as soon as the transaction to deploy the contract is submitted and returns three items: the `contractId`, a `waitForTransactionId` function and a `waitForResult` function.

```fuel_Box fuel_Box-idXKMmm-css
// Deploy the contract
const { waitForResult, contractId, waitForTransactionId } =
  await factory.deploy();
// Retrieve the transactionId
const transactionId = await waitForTransactionId();
// Await it's deployment
const { contract, transactionResult } = await waitForResult();
```

_Icon ClipboardText_

The `contract` instance will be returned only after calling `waitForResult` and waiting for it to resolve. To avoid blocking the rest of your code, you can attach this promise to a hook or listener that will use the contract only after it is fully deployed. Similarly, the transaction ID is only available once the underlying transaction has been funded. To avoid blocking the code until the ID is ready, you can use the `waitForTransactionId` function to await it's retrieval.

## _Icon Link_ [3\. Executing a Contract Call](https://docs.fuel.network/docs/fuels-ts/contracts/deploying-contracts/\#3-executing-a-contract-call)

Now that the contract is deployed, you can interact with it by submitting a contract call:

```fuel_Box fuel_Box-idXKMmm-css
// Call the contract
const { waitForResult: waitForCallResult } = await contract.functions
  .test_function()
  .call();
// Await the result of the call
const { value } = await waitForCallResult();
```

_Icon ClipboardText_

## _Icon Link_ [Deploying a Large Contract as Blobs](https://docs.fuel.network/docs/fuels-ts/contracts/deploying-contracts/\#deploying-a-large-contract-as-blobs)

In the above guide we use the recommended `deploy` method. If you are working with a contract that is too large to be deployed in a single transaction, then the SDK will chunk the contract for you and submit it as blobs, to then be accessed later by a create transaction. This process is handled by the [`ContractFactory.deployAsBlobTx` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_contract.index.ContractFactory.html#deployAsBlobTx) method.

```fuel_Box fuel_Box-idXKMmm-css
// Deploy the contract as blobs
const { waitForResult: waitForBlobsAndContractDeployment } =
  await factory.deployAsBlobTx({
    // setting chunk size multiplier to be 90% of the max chunk size
    chunkSizeMultiplier: 0.9,
  });

// Await its deployment
const { contract: contractFromBlobs } =
  await waitForBlobsAndContractDeployment();
```

_Icon ClipboardText_

In the above example, we also pass a `chunkSizeMultiplier` option to the deployment method. The SDK will attempt to chunk the contract to the most optimal about, however the transaction size can fluctuate and you can also be limited by request size limits against the node. By default we set a multiplier of 0.95, meaning the chunk size will be 95% of the potential maximum size, however you can adjust this to suit your needs and ensure the transaction passes. It must be set to a value between 0 and 1.

> _Icon InfoCircle_
>
> **Note:** Deploying large contracts using blob transactions will take more time. Each transaction is dependent and has to wait for a block to be produced before it gets mined. Then a create transaction is submitted as normal. So you will need to wait longer than usual for the contract to be fully deployed and can be interacted with.