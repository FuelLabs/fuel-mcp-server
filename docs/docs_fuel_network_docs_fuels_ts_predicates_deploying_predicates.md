[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Predicates](https://docs.fuel.network/docs/fuels-ts/predicates/) /

Deploying Predicates

## _Icon Link_ [Deploying Predicates](https://docs.fuel.network/docs/fuels-ts/predicates/deploying-predicates/\#deploying-predicates)

In order to optimize the cost of your recurring predicate executions, we recommend first deploying your predicate. This can be done using the [Fuels CLI](https://docs.fuel.network/docs/fuels-ts/fuels-cli/) and running the [deploy command](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands/#fuels-deploy).

By deploying the predicate, its bytecode is stored on chain as a blob. The SDK will then produce bytecode that can load the blob on demand to execute the original predicate. This far reduces the repeat execution cost of the predicate.

## _Icon Link_ [How to Deploy a Predicate](https://docs.fuel.network/docs/fuels-ts/predicates/deploying-predicates/\#how-to-deploy-a-predicate)

To deploy a predicate, we can use the [Fuels CLI](https://docs.fuel.network/docs/fuels-ts/fuels-cli/) and execute the [deploy command](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands/#fuels-deploy).

This will perform the following actions:

1. Compile the predicate using your `forc` version
2. Deploy the built predicate binary to the chain as a blob
3. Generate a new, smaller predicate that loads the deployed predicate's blob
4. Generate types for both the predicate and the loader that you can use in your application

We can then utilize the above generated types like so:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import {
  ConfigurablePin,
  ConfigurablePinLoader,
} from '../../../typegend/predicates';

const provider = new Provider(LOCAL_NETWORK_URL);

const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });
const baseAssetId = await provider.getBaseAssetId();

// We can deploy dynamically or via `fuels deploy`
const originalPredicate = new ConfigurablePin({
  provider,
});

const { waitForResult: waitForDeploy } = await originalPredicate.deploy(wallet);
await waitForDeploy();

// First, we will need to instantiate the script via it's loader bytecode.
// This can be imported from the typegen outputs that were created on `fuels deploy`.
// Then we can use the predicate as we would normally, such as overriding the configurables.
const loaderPredicate = new ConfigurablePinLoader({
  data: [23],
  provider,
  configurableConstants: {
    PIN: 23,
  },
});

// Now, let's fund the predicate
const fundTx = await wallet.transfer(
  loaderPredicate.address,
  100_000,
  baseAssetId
);
await fundTx.waitForResult();

// Then we'll execute the transfer and validate the predicate
const transferTx = await loaderPredicate.transfer(
  receiver.address,
  1000,
  baseAssetId
);
const { isStatusSuccess } = await transferTx.waitForResult();
```

Collapse_Icon ClipboardText_