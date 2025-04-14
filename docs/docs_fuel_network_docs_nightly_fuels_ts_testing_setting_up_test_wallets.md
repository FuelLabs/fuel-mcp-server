[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Testing](https://docs.fuel.network/docs/nightly/fuels-ts/testing/) /

Setting Up Test Wallets

## _Icon Link_ [Setting up test wallets](https://docs.fuel.network/docs/nightly/fuels-ts/testing/setting-up-test-wallets/\#setting-up-test-wallets)

You'll often want to create one or more test wallets when testing your contracts. Here's how to do it.

## _Icon Link_ [Create a single wallet](https://docs.fuel.network/docs/nightly/fuels-ts/testing/setting-up-test-wallets/\#create-a-single-wallet)

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletLocked, WalletUnlocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

// We can use the `generate` to create a new unlocked wallet.
const provider = new Provider(LOCAL_NETWORK_URL);
const myWallet: WalletUnlocked = Wallet.generate({ provider });

// or use an Address to create a wallet
const someWallet: WalletLocked = Wallet.fromAddress(myWallet.address, provider);
```

_Icon ClipboardText_

## _Icon Link_ [Setting up multiple test wallets](https://docs.fuel.network/docs/nightly/fuels-ts/testing/setting-up-test-wallets/\#setting-up-multiple-test-wallets)

You can set up multiple test wallets using the `launchTestNode` utility via the `walletsConfigs` option.

To understand the different configurations, check out the [walletsConfig](https://docs.fuel.network/docs/nightly/fuels-ts/testing/test-node-options/#walletsconfig) in the test node options guide.

```fuel_Box fuel_Box-idXKMmm-css
using launched = await launchTestNode({
  walletsConfig: {
    count: 3,
    assets: [TestAssetId.A, TestAssetId.B],
    coinsPerAsset: 5,
    amountPerCoin: 100_000,
  },
});

const {
  wallets: [wallet1, wallet2, wallet3],
} = launched;
```

_Icon ClipboardText_