[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Wallets](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/) /

Private Keys

## _Icon Link_ [Creating a wallet from a private key](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/private-keys/\#creating-a-wallet-from-a-private-key)

A new wallet with a randomly generated private key can be created by supplying `Wallet.generate`.

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

Alternatively, you can create a wallet from a Private Key:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletLocked, WalletUnlocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_ADDRESS,
  WALLET_PVT_KEY,
} from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

// Generate a locked wallet
const lockedWallet: WalletLocked = Wallet.fromAddress(WALLET_ADDRESS, provider);

// Unlock an existing unlocked wallet
let unlockedWallet: WalletUnlocked = lockedWallet.unlock(WALLET_PVT_KEY);
// Or directly from a private key
unlockedWallet = Wallet.fromPrivateKey(WALLET_PVT_KEY);
```

_Icon ClipboardText_

You can obtain an address to a private key using the `Signer` package

```fuel_Box fuel_Box-idXKMmm-css
import { Signer } from 'fuels';

import { WALLET_PVT_KEY } from '../../../../env';

const signer = new Signer(WALLET_PVT_KEY);
```

_Icon ClipboardText_