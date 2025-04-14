[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

Wallets

## _Icon Link_ [Wallets](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/\#wallets)

Wallets can be used for many important things, for instance:

1. Checking your balance;
2. Transferring coins to a destination address or contract;
3. Signing messages and transactions;
4. Paying for network fees when sending transactions or deploying smart contracts.

## _Icon Link_ [Wallets Instances](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/\#wallets-instances)

The SDK has multiple classes related to a Wallet instance:

- [Wallet _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.Wallet.html): Works simply like a wrapper providing methods to create and instantiating `WalletUnlocked` and `WalletLocked` instances.

- [WalletLocked _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.WalletLocked.html): Provides the functionalities for a locked wallet.

- [WalletUnlocked _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.WalletUnlocked.html): Provides the functionalities for an unlocked wallet.

- [Account _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.Account.html): Provides an abstraction with basic functionalities for wallets or accounts to interact with the network. It is essential to notice that both `WalletLocked` and `WalletUnlocked` extend from the `Account` class.


Let's explore these different approaches in the following sub-chapters.

> _Icon InfoCircle_
>
> **Note:** Keep in mind that you should never share your private/secret key. And in the case of wallets that were derived from a mnemonic phrase, never share your mnemonic phrase. If you're planning on storing the wallet on disk, do not store the plain private/secret key and do not store the plain mnemonic phrase. Instead, use `WalletManager` to encrypt its content first before saving it to disk.