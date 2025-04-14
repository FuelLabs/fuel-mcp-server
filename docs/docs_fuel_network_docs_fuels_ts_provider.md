[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

Provider

## _Icon Link_ [Provider](https://docs.fuel.network/docs/fuels-ts/provider/\#provider)

The [`Provider` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Provider.html) lets you connect to a Fuel node ( [_docs_](https://docs.fuel.network/docs/fuels-ts/getting-started/connecting-to-the-network/)) and interact with it, encapsulating common client operations in the SDK. Those operations include querying the blockchain for network, block, and transaction-related info (and [more _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Provider.html)), as well as sending [transactions](https://docs.fuel.network/docs/fuels-ts/transactions/) to the blockchain.

All higher-level abstractions (e.g. [`Wallet`](https://docs.fuel.network/docs/fuels-ts/wallets/), [`Contract`](https://docs.fuel.network/docs/fuels-ts/contracts/)) that interact with the blockchain go through the `Provider`, so it's used for various actions like getting a wallet's balance, deploying contracts, querying their state, etc.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, WalletUnlocked } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

// Create the provider
const provider = new Provider(LOCAL_NETWORK_URL);

// Querying the blockchain
const { consensusParameters } = await provider.getChain();

// Create a new wallet
const wallet = WalletUnlocked.generate({ provider });

// Get the balances of the wallet (this will be empty until we have assets)
const { balances } = await wallet.getBalances();
// []
```

_Icon ClipboardText_

You can find more examples of `Provider` usage [here](https://docs.fuel.network/docs/fuels-ts/provider/querying-the-chain/).