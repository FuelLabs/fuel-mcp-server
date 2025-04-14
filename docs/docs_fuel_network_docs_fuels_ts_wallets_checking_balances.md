[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Wallets](https://docs.fuel.network/docs/fuels-ts/wallets/) /

Checking Balances

## _Icon Link_ [Checking balances](https://docs.fuel.network/docs/fuels-ts/wallets/checking-balances/\#checking-balances)

To check the balance of a specific asset, you can use [`getBalance` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Account.html#getBalance) method. This function aggregates the amounts of all unspent coins of the given asset in your wallet.

```fuel_Box fuel_Box-idXKMmm-css
import type { BN } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const myWallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// The returned amount is a BigNumber
const balance: BN = await myWallet.getBalance(await provider.getBaseAssetId());

```

_Icon ClipboardText_

To retrieve the balances of all assets in your wallet, use the [`getBalances` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Account.html#getBalances) method, it returns an array of [`CoinQuantity` _Icon Link_](https://fuels-ts-docs-api.vercel.app/types/_fuel_ts_account.CoinQuantity.html). This is useful for getting a comprehensive view of your holdings.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { WALLET_PVT_KEY_2, LOCAL_NETWORK_URL } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const myOtherWallet = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);

const { balances } = await myOtherWallet.getBalances();
```

_Icon ClipboardText_