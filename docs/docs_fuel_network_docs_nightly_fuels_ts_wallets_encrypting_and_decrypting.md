[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Wallets](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/) /

Encrypting and Decrypting

## _Icon Link_ [Encrypting and Decrypting](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/encrypting-and-decrypting/\#encrypting-and-decrypting)

JSON wallets are a standardized way of storing wallets securely. They follow a specific schema and are encrypted using a password. This makes it easier to manage multiple wallets and securely store them on disk. This guide will take you through the process of encrypting and decrypting JSON wallets using the Typescript SDK.

## _Icon Link_ [Encrypting a Wallet](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/encrypting-and-decrypting/\#encrypting-a-wallet)

We will be calling `encrypt` from the [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) instance which will take a password as the argument. It will encrypt the private key using a cipher and returns the JSON keystore wallet. You can then securely store this JSON wallet.

Here is an example of how you can accomplish this:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const wallet = Wallet.generate({ provider });

// Encrypt the wallet
const password = 'my-password';
const jsonWallet = await wallet.encrypt(password);

// Save the encrypted wallet to a file
// e.g. const jsonWallet = fs.writeFileSync('secure-path/my-wallet.json', jsonWallet);
```

_Icon ClipboardText_

Please note that `encrypt` must be called within an instance of [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html). This instance can only be achieved through passing a private key or mnemonic phrase to a locked wallet.

## _Icon Link_ [Decrypting a Wallet](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/encrypting-and-decrypting/\#decrypting-a-wallet)

To decrypt the JSON wallet and retrieve your private key, you can call `fromEncryptedJson` on a [Wallet _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.Wallet.html) instance. It takes the encrypted JSON wallet and the password as its arguments, and returns the decrypted wallet.

Here is an example:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const newJsonWallet = await Wallet.generate({
  provider,
}).encrypt('my-password');

// Load the encrypted wallet from a file
// const jsonWallet = fs.readFileSync('secure-path/my-wallet.json', 'utf-8');

// Decrypt the wallet
const newPassword = 'my-password';
const decryptedWallet = await Wallet.fromEncryptedJson(
  newJsonWallet,
  newPassword,
  provider
);

// Use the decrypted wallet
const myBalance = await decryptedWallet.getBalance();
```

_Icon ClipboardText_

In this example, `decryptedWallet` is an instance of [`WalletUnlocked` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html) class, now available for use.

## _Icon Link_ [Important](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/encrypting-and-decrypting/\#important)

Remember to securely store your encrypted JSON wallet and password. If you lose them, there will be no way to recover your wallet. For security reasons, avoid sharing your private key, encrypted JSON wallet or password with anyone.