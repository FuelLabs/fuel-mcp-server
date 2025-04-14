[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/) /

Using Different Wallets

## _Icon Link_ [Making Calls with Different Wallets or Providers](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/using-different-wallets/\#making-calls-with-different-wallets-or-providers)

This guide demonstrates how to make contract calls using different wallets and providers by passing either an [`Account` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.Account.html) or a [`Provider` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.Provider.html) to the contract on instantiation.

## _Icon Link_ [Changing Wallets](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/using-different-wallets/\#changing-wallets)

To change the wallet associated with a contract instance, assign a new wallet to the instance's `account` property. This allows you to make contract calls with different wallets in a concise manner:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnContextFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await ReturnContextFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Update the wallet
const newWallet = Wallet.generate({ provider });
contract.account = newWallet;
```

_Icon ClipboardText_

## _Icon Link_ [Changing Providers](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/using-different-wallets/\#changing-providers)

Similarly, you can assign a custom provider to a contract instance by modifying its provider property. This enables you to use a provider wrapper of your choice:

```fuel_Box fuel_Box-idXKMmm-css
const newProvider = new Provider(NEW_URL);
deployedContract.provider = newProvider;
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note:** When connecting a different wallet to an existing contract instance, the provider used to deploy the contract takes precedence over the newly set provider. If you have two wallets connected to separate providers (each communicating with a different fuel-core instance), the provider assigned to the deploying wallet will be used for contract calls. This behavior is only relevant when multiple providers (i.e. fuel-core instances) are present and can be ignored otherwise.