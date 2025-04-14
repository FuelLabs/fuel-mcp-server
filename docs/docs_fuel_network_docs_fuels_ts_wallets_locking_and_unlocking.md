[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Wallets](https://docs.fuel.network/docs/fuels-ts/wallets/) /

Locking and Unlocking

## _Icon Link_ [Locking and Unlocking](https://docs.fuel.network/docs/fuels-ts/wallets/locking-and-unlocking/\#locking-and-unlocking)

The kinds of operations we can perform with a [`Wallet` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Wallet.html) instance depend on
whether or not we have access to the wallet's private key.

In order to differentiate between [`Wallet` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Wallet.html) instances that know their private key
and those that do not, we use the [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) and [`WalletLocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletLocked.html) types
respectively.

## _Icon Link_ [Wallet States](https://docs.fuel.network/docs/fuels-ts/wallets/locking-and-unlocking/\#wallet-states)

The [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) type represents a wallet whose private key is known and
stored internally in memory. A wallet must be of type [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) in order
to perform operations that involve [signing messages or transactions](https://docs.fuel.network/docs/fuels-ts/wallets/signing/).

The [`WalletLocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletLocked.html) type represents a wallet whose private key is _not_ known or stored
in memory. Instead, [`WalletLocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletLocked.html) only knows its public address. A [`WalletLocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletLocked.html) cannot be
used to sign transactions, however it may still perform a whole suite of useful
operations including listing transactions, assets, querying balances, and so on.

Note that the [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) type implements most methods available on the [`WalletLocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletLocked.html)
type. In other words, [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) can be thought of as a thin wrapper around [`WalletLocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletLocked.html) that
provides greater access via its private key.

## _Icon Link_ [Basic Example](https://docs.fuel.network/docs/fuels-ts/wallets/locking-and-unlocking/\#basic-example)

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

## _Icon Link_ [Optional Provider](https://docs.fuel.network/docs/fuels-ts/wallets/locking-and-unlocking/\#optional-provider)

You can choose not to pass through a provider argument on `Wallet` construction:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

// You can create a wallet, without a provider
let unlockedWalletWithoutProvider: WalletUnlocked = Wallet.generate();
unlockedWalletWithoutProvider = Wallet.fromPrivateKey(
  unlockedWalletWithoutProvider.privateKey
);

// All non-provider dependent methods are available
unlockedWalletWithoutProvider.lock();

// All provider dependent methods will throw
try {
  await unlockedWalletWithoutProvider.getCoins();
} catch (e) {
  console.log('error', e);
}
```

_Icon ClipboardText_

## _Icon Link_ [Transitioning States](https://docs.fuel.network/docs/fuels-ts/wallets/locking-and-unlocking/\#transitioning-states)

A [`WalletLocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletLocked.html) instance can be unlocked by providing the private key:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletLocked, WalletUnlocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet: WalletUnlocked = Wallet.generate({ provider });
const PRIVATE_KEY = wallet.privateKey;

// Lock an existing wallet
const lockedWallet: WalletLocked = Wallet.fromAddress(wallet.address, provider);

// Unlock an existing wallet
const someUnlockedWallet: WalletUnlocked = lockedWallet.unlock(PRIVATE_KEY);
```

_Icon ClipboardText_

A [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) instance can be locked using the `lock` method:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletUnlocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const unlockedWallet: WalletUnlocked = Wallet.generate({ provider });
const newlyLockedWallet = unlockedWallet.lock();
```

_Icon ClipboardText_

Most wallet constructors that create or generate a new wallet are provided on
the [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) type. Consider locking the wallet with the `lock` method after the new private
key has been handled in order to reduce the scope in which the wallet's private
key is stored in memory.

## _Icon Link_ [Design Guidelines](https://docs.fuel.network/docs/fuels-ts/wallets/locking-and-unlocking/\#design-guidelines)

When designing APIs that accept a wallet as an input, we should think carefully
about the kind of access that we require. API developers should aim to minimise
their usage of [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) in order to ensure private keys are stored in
memory no longer than necessary to reduce the surface area for attacks and
vulnerabilities in downstream libraries and applications.

## _Icon Link_ [Full Example](https://docs.fuel.network/docs/fuels-ts/wallets/locking-and-unlocking/\#full-example)

For a full example of how to lock and unlock a wallet, see the snippet below:

```fuel_Box fuel_Box-idXKMmm-css
import type { WalletLocked, WalletUnlocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

// We can use the `generate` to create a new unlocked wallet.
const provider = new Provider(LOCAL_NETWORK_URL);
const myWallet: WalletUnlocked = Wallet.generate({ provider });

// or use an Address to create a wallet
const someWallet: WalletLocked = Wallet.fromAddress(myWallet.address, provider);

const wallet: WalletUnlocked = Wallet.generate({ provider });
const PRIVATE_KEY = wallet.privateKey;

// Lock an existing wallet
const lockedWallet: WalletLocked = Wallet.fromAddress(
  myWallet.address,
  provider
);

// Unlock an existing wallet
const someUnlockedWallet: WalletUnlocked = lockedWallet.unlock(PRIVATE_KEY);

const unlockedWallet: WalletUnlocked = Wallet.generate({ provider });
const newlyLockedWallet = unlockedWallet.lock();

// You can create a wallet, without a provider
let unlockedWalletWithoutProvider: WalletUnlocked = Wallet.generate();
unlockedWalletWithoutProvider = Wallet.fromPrivateKey(
  unlockedWalletWithoutProvider.privateKey
);

// All non-provider dependent methods are available
unlockedWalletWithoutProvider.lock();

// All provider dependent methods will throw
await expect(() => unlockedWalletWithoutProvider.getCoins()).rejects.toThrow(
  /Provider not set/
);
```

Collapse_Icon ClipboardText_