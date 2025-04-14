[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Wallets](https://docs.fuel.network/docs/fuels-ts/wallets/) /

Mnemonic Wallet

## _Icon Link_ [Creating a wallet from mnemonic phrases](https://docs.fuel.network/docs/fuels-ts/wallets/mnemonic-wallet/\#creating-a-wallet-from-mnemonic-phrases)

A mnemonic phrase is a cryptographically-generated sequence of words that's used to derive a private key. For instance: `"oblige salon price punch saddle immune slogan rare snap desert retire surprise";` would generate the address `0xdf9d0e6c6c5f5da6e82e5e1a77974af6642bdb450a10c43f0c6910a212600185`.

In addition to that, we also support [Hierarchical Deterministic Wallets _Icon Link_](https://www.ledger.com/academy/crypto/what-are-hierarchical-deterministic-hd-wallets) and [derivation paths _Icon Link_](https://learnmeabitcoin.com/technical/derivation-paths), allowing multiple wallets to be derived from a single root mnemonic. You may recognize a derivation path like:

```fuel_Box fuel_Box-idXKMmm-css
"m/44'/60'/0'/0/0"
```

_Icon ClipboardText_

In simple terms, this structure enables the creation of multiple wallet addresses from the same mnemonic phrase.

The SDK gives you two wallets from mnemonic instantiation methods: one that takes a derivation path and one that uses the default derivation path, in case you don't want or don't need to configure that.

Here's how you can create wallets with both mnemonic phrases and derivation paths:

1 - Using the default derivation path `m/44'/60'/0'/0/0`

```fuel_Box fuel_Box-idXKMmm-css
const mnemonic =
  'oblige salon price punch saddle immune slogan rare snap desert retire surprise';

const wallet = Wallet.fromMnemonic(mnemonic);
```

_Icon ClipboardText_

2 - Using a Custom Derivation Path

```fuel_Box fuel_Box-idXKMmm-css
const mnemonic =
  'oblige salon price punch saddle immune slogan rare snap desert retire surprise';

const path = "m/44'/60'/1'/0/0";

const wallet = Wallet.fromMnemonic(mnemonic, path);
```

_Icon ClipboardText_