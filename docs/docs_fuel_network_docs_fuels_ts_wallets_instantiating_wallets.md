[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Wallets](https://docs.fuel.network/docs/fuels-ts/wallets/) /

Instantiating Wallets

## _Icon Link_ [Instantiating Wallets](https://docs.fuel.network/docs/fuels-ts/wallets/instantiating-wallets/\#instantiating-wallets)

Wallets can be instantiated in multiple ways within the SDK.

## _Icon Link_ [Generating new wallets](https://docs.fuel.network/docs/fuels-ts/wallets/instantiating-wallets/\#generating-new-wallets)

To generate a new, unlocked wallet, use the [`generate` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Wallet.html#generate) method. This method creates a new [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) instance, which is immediately ready for use.

```fuel_Box fuel_Box-idXKMmm-css
import { Wallet } from 'fuels';
import type { WalletUnlocked } from 'fuels';

const wallet: WalletUnlocked = Wallet.generate();
```

_Icon ClipboardText_

## _Icon Link_ [Instantiating Unlocked Wallets](https://docs.fuel.network/docs/fuels-ts/wallets/instantiating-wallets/\#instantiating-unlocked-wallets)

Creating [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) instances of your existing wallets is easy and can be done in several ways:

From a private key:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

const privateKey =
  '0x36ca81ba70f3e04b7cc8780bff42d907ebca508097d4ae3df5147c93fd217f7c';

const wallet: WalletUnlocked = Wallet.fromPrivateKey(privateKey);
```

_Icon ClipboardText_

From a mnemonic phrase:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

const mnemonic =
  'section gospel lady april mouse huge prosper boy urge fox tackle orient';

const wallet: WalletUnlocked = Wallet.fromMnemonic(mnemonic);
```

_Icon ClipboardText_

From a seed:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

const seed =
  '0xa5d42fd0cf8825fc846b2f257887a515573ee5b779e99f060dc945b3d5504bca';

const wallet: WalletUnlocked = Wallet.fromSeed(seed);
```

_Icon ClipboardText_

From a Hierarchical Deterministic (HD) derived key:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletUnlocked } from 'fuels';
import { HDWallet, Wallet } from 'fuels';

const seed =
  '0xa5d42fd0cf8825fc846b2f257887a515573ee5b779e99f060dc945b3d5504bca';

const extendedKey = HDWallet.fromSeed(seed).toExtendedKey();

const wallet: WalletUnlocked = Wallet.fromExtendedKey(extendedKey);
```

_Icon ClipboardText_

From a JSON wallet:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

const jsonWallet = `{"id":"83d1792f-3230-496a-92af-3b44a1524fd6","version":3,"address":"ada436e1b80f855f94d678771c384504e46335f571aa244f11b5a70fe3e61644","crypto":{"cipher":"aes-128-ctr","mac":"6911499ec31a6a6d240220971730374396efd666bd34123d4e3ce85e4cf248c6","cipherparams":{"iv":"40576cbd4f7c84e88b0532320e23b425"},"ciphertext":"3e5e77f23444aa86b397dbc62e14d8b7d3fd7c7fe209e066bb7df17eca398129","kdf":"scrypt","kdfparams":{"dklen":32,"n":8192,"p":1,"r":8,"salt":"b046520d85090ee2abd6285174f37bc01e28846b6bb5edc03ae5f7c13aec03d2"}}}`;

const password = 'password';

const wallet: WalletUnlocked = await Wallet.fromEncryptedJson(
  jsonWallet,
  password
);
```

_Icon ClipboardText_

It's possible to instantiate a `WalletUnlocked` from a `WalletLocked`:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletLocked, WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

const address =
  '0x4cb2b5d2bdbcc8dbdbf91cd00be3e2deedb0ea0f34c969c0ed741a1925111a87';
const privateKey =
  '0x9deba03f08676716e3a4247797672d8008a5198d183048be65415ef89447b890';

const lockedWallet: WalletLocked = Wallet.fromAddress(address);

const wallet: WalletUnlocked = lockedWallet.unlock(privateKey);
```

_Icon ClipboardText_

## _Icon Link_ [Instantiating Locked Wallets](https://docs.fuel.network/docs/fuels-ts/wallets/instantiating-wallets/\#instantiating-locked-wallets)

You can also instantiate [`WalletLocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletLocked.html) instances using just the wallet address:

```fuel_Box fuel_Box-idXKMmm-css
import type { B256Address, WalletLocked } from 'fuels';
import { Wallet } from 'fuels';

const address: B256Address = `0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f`;

const wallet: WalletLocked = Wallet.fromAddress(address);
```

_Icon ClipboardText_

## _Icon Link_ [Connecting to a Provider](https://docs.fuel.network/docs/fuels-ts/wallets/instantiating-wallets/\#connecting-to-a-provider)

While wallets can be used independently of a [`Provider` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Provider.html), operations requiring blockchain interaction will need one.

Connecting an existing wallet to a Provider:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletLocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_ADDRESS } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const wallet: WalletLocked = Wallet.fromAddress(WALLET_ADDRESS);
wallet.connect(provider);
```

_Icon ClipboardText_

Instantiating a wallet with a Provider:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletLocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_ADDRESS } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const wallet: WalletLocked = Wallet.fromAddress(WALLET_ADDRESS, provider);
```

_Icon ClipboardText_