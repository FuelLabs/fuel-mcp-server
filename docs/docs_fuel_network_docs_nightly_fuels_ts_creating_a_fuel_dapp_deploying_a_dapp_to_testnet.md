[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Creating a Fuel Dapp](https://docs.fuel.network/docs/nightly/fuels-ts/creating-a-fuel-dapp/) /

Deploying a Dapp to Testnet

## _Icon Link_ [Deploying a dApp to Testnet](https://docs.fuel.network/docs/nightly/fuels-ts/creating-a-fuel-dapp/deploying-a-dapp-to-testnet/\#deploying-a-dapp-to-testnet)

In this guide, we will deploy a full-stack dApp bootstrapped with `npm create fuels` to the Fuel testnet.

> _Icon InfoCircle_
>
> Make sure you have already bootstrapped a dApp using `npm create fuels`. If you haven't, please follow [this guide](https://docs.fuel.network/docs/nightly/).

There are mainly two steps to get our dApp live on the testnet:

1. Deploying the Contract to the Testnet
2. Deploying the Frontend to the Cloud

## _Icon Link_ [Deploying the Contract](https://docs.fuel.network/docs/nightly/fuels-ts/creating-a-fuel-dapp/deploying-a-dapp-to-testnet/\#deploying-the-contract)

We will be using [`forc` _Icon Link_](https://docs.fuel.network/docs/forc/) to deploy our contracts to the testnet. `forc` is a part of the Fuel Toolchain.

> _Icon InfoCircle_
>
> If you don't have the Fuel Toolchain installed, follow [this guide _Icon Link_](https://docs.fuel.network/guides/installation/) to install it.

The first step is to `cd` into the directory containing your contract:

```fuel_Box fuel_Box-idXKMmm-css
cd sway-programs/contract
```

_Icon ClipboardText_

And then, run the following command and follow the instructions to deploy the contract to the testnet:

```fuel_Box fuel_Box-idXKMmm-css
forc deploy --testnet
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> You can check out [this guide _Icon Link_](https://docs.fuel.network/docs/intro/quickstart-contract/#deploy-to-testnet) for more information on deploying a contract to the testnet.

You should see a message similar to this:

```fuel_Box fuel_Box-idXKMmm-css
Contract deploy-to-testnet Deployed!

Network: https://testnet.fuel.network
Contract ID: 0x8342d413de2a678245d9ee39f020795800c7e6a4ac5ff7daae275f533dc05e08
Deployed in block 0x4ea52b6652836c499e44b7e42f7c22d1ed1f03cf90a1d94cd0113b9023dfa636
```

_Icon ClipboardText_

Copy the contract ID and save it for later use.

## _Icon Link_ [Deploying the Frontend](https://docs.fuel.network/docs/nightly/fuels-ts/creating-a-fuel-dapp/deploying-a-dapp-to-testnet/\#deploying-the-frontend)

Let's now prepare our frontend so that we can deploy it to the cloud.

Go to your `.env.local` file and add a new variable named `VITE_TESTNET_CONTRACT_ID`. Set its value to the contract ID you had copied earlier after deploying your contract.

```fuel_Box fuel_Box-idXKMmm-css
VITE_TESTNET_CONTRACT_ID=0x8342d413de2a678245d9ee39f020795800c7e6a4ac5ff7daae275f533dc05e08
```

_Icon ClipboardText_

If you are curious, this environment variable is used here in the `src/lib.tsx` file to set the contract ID:

```fuel_Box fuel_Box-idXKMmm-css
export const localContractId = contractIds.testContract;
export const testnetContractId = process.env.VITE_TESTNET_CONTRACT_ID as string;
export const contractId = isLocal ? localContractId : testnetContractId;
```

_Icon ClipboardText_

You will notice that this piece of code is getting the contract ID depending on the current environment. If the environment is `local`, it will use the contract ID from the auto-generated `contract-ids.json` file. Otherwise, for a testnet deployment, it will use the contract ID provided by you.

The `CURRENT_ENVIRONMENT` variable is defined in the `lib.tsx` file:

```fuel_Box fuel_Box-idXKMmm-css
export const environments = { LOCAL: 'local', TESTNET: 'testnet' };
export const environment = process.env.VITE_DAPP_ENVIRONMENT || environments.LOCAL;
export const isLocal = environment === environments.LOCAL;
export const isTestnet = environment === environments.TESTNET;
```

_Icon ClipboardText_

As you can see, it depends on the `VITE_DAPP_ENVIRONMENT` environment variable. If you go to your `.env.local` file, you will see that it is set to `local` by default. If you change this value to `testnet`, the frontend will now be connected to the testnet instead of your local node.

Go ahead and change the `VITE_DAPP_ENVIRONMENT` value to `testnet` in your `.env.local` file.
If you run your frontend now, you should be able to interact with your contract on the testnet.

To deploy your frontend to the cloud, you can use any service like [Vercel _Icon Link_](https://vercel.com/). Make sure that you setup your environment variables correctly and that your contract ID is correct. Your environment variables should look something like this:

```fuel_Box fuel_Box-idXKMmm-css
VITE_DAPP_ENVIRONMENT=testnet
VITE_TESTNET_CONTRACT_ID=0x8342d413de2a678245d9ee39f020795800c7e6a4ac5ff7daae275f533dc05e08

(the rest of the environment variables are optional)
```

_Icon ClipboardText_

## _Icon Link_ [Conclusion](https://docs.fuel.network/docs/nightly/fuels-ts/creating-a-fuel-dapp/deploying-a-dapp-to-testnet/\#conclusion)

Congratulations! You have successfully deployed your Fuel dApp to the testnet.

To recap, to deploy your dApp to the testnet, you need to:

1. Deploy your contract to the testnet using `forc deploy --testnet`.
2. Specify this contract ID in your frontend's environment variables. ( `VITE_TESTNET_CONTRACT_ID`)
3. Set the `VITE_DAPP_ENVIRONMENT` environment variable to `testnet`.