[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Wallets](https://docs.fuel.network/docs/fuels-ts/wallets/) /

Wallet Manager

## _Icon Link_ [Wallet Manager](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#wallet-manager)

The `WalletManager` is a robust tool designed for managing vaults of wallets. It offers robust management of vaults, including support for custom storage and powerful encryption of all held vaults.

## _Icon Link_ [Key Features](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#key-features)

## _Icon Link_ [Managing Vaults with `WalletManager`](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#managing-vaults-with-walletmanager)

This includes adding new wallets to specific vaults, retrieving all wallets from a vault, exporting specific vaults, and exporting private keys. The `WalletManager` class currently supports two types of vaults: `PrivateKeyVault` and `MnemonicVault`.

## _Icon Link_ [Custom Storage Solutions](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#custom-storage-solutions)

The `WalletManager` supports defining a custom storage solution, allowing you to specify how and where the encrypted vaults are saved. With support for custom storage, you can make the `WalletManager` to fit your specific needs and security requirements.

## _Icon Link_ [Locking and Unlocking `WalletManager`](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#locking-and-unlocking-walletmanager)

The `WalletManager` implements an automatic encryption mechanism, securely saving the wallet's held vaults. This not only preserves the state of your vaults but also ensures robust protection of the stored information. When needed, you can easily unlock and decrypt the vaults using the previously defined password.

## _Icon Link_ [Getting Started with `WalletManager`](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#getting-started-with-walletmanager)

This guide provides step-by-step instructions on how to use `WalletManager`.

## _Icon Link_ [Instantiating `WalletManager`](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#instantiating-walletmanager)

The `WalletManager` constructor accepts an optional object to define its storage. The storage describes how and where the `WalletManager` will store its vaults of wallets. If storage is not provided, the `WalletManager` uses a default one that does not persist data.

For now, let's keep it simple and not worry about the storage. Later we will discuss it in more detail.

To instantiate a `WalletManager` you can simply:

```fuel_Box fuel_Box-idXKMmm-css

// Initialize a WalletManager
const walletManager = new WalletManager();
```

_Icon ClipboardText_

## _Icon Link_ [Setting `WalletManager` Password](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#setting-walletmanager-password)

By default, a `WalletManager` instance is locked when created. Before using it, you need to unlock it by setting a password. You can do this by calling the `unlock` method.

```fuel_Box fuel_Box-idXKMmm-css
const password = 'my-password';

await walletManager.unlock(password);
```

_Icon ClipboardText_

Once your `WalletManager` is unlocked, it can manage your wallets.

## _Icon Link_ [Managing Vaults with `WalletManager`](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#managing-vaults-with-walletmanager-1)

A vault in `WalletManager` serves as a secure container for wallets. The `WalletManager` manages wallets by interacting with these vaults, supporting operations such as `getAccounts`, which returns public information about all wallets stored in the vault, and `exportAccount`, which exports a private key for a given wallet address.

To add a vault, we utilize the `addVault` method. Here's how we can create a private key vault and add a private key from a wallet we own:

```fuel_Box fuel_Box-idXKMmm-css
// Initialize a Provider
const provider = new Provider(LOCAL_NETWORK_URL);
const myWallet = Wallet.generate({
  provider,
});

const privateKey = myWallet.privateKey;

await walletManager.addVault({
  type: 'privateKey',
  secret: privateKey,
  title: 'My first private key vault',
});
```

_Icon ClipboardText_

The `addVault` method requires an object with three properties: `type`, `secret`, and `title`. The `WalletManager` currently supports two types of vaults: `privateKeyVault` and `mnemonicVault`. For the `secret`, we use our wallet's private key, and for the `title`, we can provide a custom name.

By running this code, `WalletManager` creates a new vault instance of the type `privateKey` and adds one account (our wallet) to this newly created vault.

A key feature of the `WalletManager` is its ability to manage multiple vaults, even of the same type. This implies that if you run the `addVault` method again, with the same parameters, `WalletManager` will create another vault of the type `privateKey`, holding the same wallet. Here's an example:

```fuel_Box fuel_Box-idXKMmm-css
await walletManager.addVault({
  type: 'privateKey',
  secret: privateKey,
  title: 'My second private key vault',
});
```

_Icon ClipboardText_

After executing this, you will find that your `WalletManager` is managing two `privateKey` vaults, both storing the same wallet.

Remember, both `title` and `secret` are optional when adding vaults, but providing a `title` makes it easier to manage your vaults and wallets. If you add a vault without providing a `secret`, this will result in one new account (wallet) being generated by the vault it self.

## _Icon Link_ [Using The `WalletManager`](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#using-the-walletmanager)

With your `WalletManager` set up, you can now access your vaults and wallets. Here's how to retrieve the details of your vaults:

```fuel_Box fuel_Box-idXKMmm-css
const vaults = walletManager.getVaults();
```

_Icon ClipboardText_

This will output something like this:

```fuel_Box fuel_Box-idXKMmm-css
// [\
//     {\
//         title: 'My first private key vault',\
//         type: 'privateKey',\
//         vaultId: 0\
//     },\
//     {\
//         title: 'My second private key vault',\
//         type: 'privateKey',\
//         vaultId: 1\
//     }\
// ]
```

_Icon ClipboardText_

As you can see, the `WalletManager` assigns unique `vaultIds` for each vault. The first vault you added has a `vaultId` of `0`, and the second one has a `vaultId` of `1`.

Let's retrieve your wallet instance with the `getWallet` method:

```fuel_Box fuel_Box-idXKMmm-css
const retrievedWallet = walletManager.getWallet(myWallet.address);
```

_Icon ClipboardText_

This guide walked through the steps to instantiate a `WalletManager`, set up its first vault, and retrieve vault information. The following sections will explore more functionalities of `WalletManager`, and go deeper into the usage of its vaults and the details of its storage system.

## _Icon Link_ [Locking and Unlocking `WalletManager`](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#locking-and-unlocking-walletmanager-1)

This guide will walk you through the process of managing the lock state of your wallets using the `WalletManager`.

## _Icon Link_ [Initializing and Unlocking the `WalletManager`](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#initializing-and-unlocking-the-walletmanager)

As mentioned earlier, a `WalletManager` instance begins in a locked state. Before usage, you need to unlock it by providing a password via the unlock method.

```fuel_Box fuel_Box-idXKMmm-css
const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

const walletManager = new WalletManager();

await walletManager.unlock(password);
```

_Icon ClipboardText_

## _Icon Link_ [Locking the `WalletManager`](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#locking-the-walletmanager)

When you lock the `WalletManager` using the `lock` method, all its vaults and associated accounts (wallets) are cleared. This clearance is possible due to the encryption and saving of all data by the storage system. `WalletManager` frequently uses the storage system to preserve its state. Consequently, sensitive operations including exporting vaults, private keys, accessing wallets, and saving/loading the `WalletManager` state are not possible when it is locked.

```fuel_Box fuel_Box-idXKMmm-css
await walletManager.lock();
```

_Icon ClipboardText_

Remember, it's crucial to lock your `WalletManager` when it's not in use to ensure the safety of your funds.

## _Icon Link_ [Reaccessing Your Wallets by Unlocking the `WalletManager`](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#reaccessing-your-wallets-by-unlocking-the-walletmanager)

The `unlock` method requires the previously set password to unlock the `WalletManager` and all its vaults. The password decrypts the stored vaults, allowing `WalletManager` to load its saved data.

```fuel_Box fuel_Box-idXKMmm-css
await walletManager.unlock(password);
```

_Icon ClipboardText_

Providing an incorrect password will result in an error. However, when unlocked successfully, `WalletManager` is ready for use again.

## _Icon Link_ [Verifying the Lock State](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#verifying-the-lock-state)

You can confirm the current lock state of the `WalletManager` by using the `isLocked` method:

```fuel_Box fuel_Box-idXKMmm-css
const isLocked = walletManager.isLocked;

```

_Icon ClipboardText_

## _Icon Link_ [Updating the Password](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#updating-the-password)

To change the current password, invoke the `updatePassphrase` method, and provide both the old and new passwords:

```fuel_Box fuel_Box-idXKMmm-css
const newPassword = 'my-new-password';

await walletManager.updatePassphrase(password, newPassword);
```

_Icon ClipboardText_

## _Icon Link_ [Reminder: Always Lock Your `WalletManager`](https://docs.fuel.network/docs/fuels-ts/wallets/wallet-manager/\#reminder-always-lock-your-walletmanager)

Always ensure you lock the `WalletManager` after completing operations. This step is critical for securing your wallets.

```fuel_Box fuel_Box-idXKMmm-css
await walletManager.unlock(newPassword);

// perform your tasks...

walletManager.lock(); // Always lock your WalletManager when you're done
```

_Icon ClipboardText_

By using `WalletManager` to manage lock and unlock states, you introduce an additional layer of security. Never forget to lock your `WalletManager` when it's not in use.