[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Wallets](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/) /

Access

## _Icon Link_ [Wallet Access](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/access/\#wallet-access)

The kinds of operations we can perform with a `Wallet` instance depend on
whether or not the wallet has a signer attached to it.

In order to differentiate between `Wallet` instances that have a signer
and those that do not, we use the `Wallet<Unlocked<S>>` and `Wallet<Locked>` types
respectively.

## _Icon Link_ [Wallet States](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/access/\#wallet-states)

The `Wallet<Unlocked<S>>` type represents a wallet that has a signer. A wallet must be of type `Wallet<Unlocked<S>>` in order to perform operations that involve signing messages or transactions.

You can learn more about signing [here](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/signing/).

The `Wallet<Locked>` type represents a wallet without a signer. Instead, `Wallet<Locked>` only knows its public address. A `Wallet<Locked>` cannot be used to sign transactions, however it may still perform a whole suite of useful operations including listing transactions, assets, querying balances, and so on.

## _Icon Link_ [Transitioning States](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/access/\#transitioning-states)

A `Wallet<Unlocked<S>>` instance can be locked using the `lock` method:

```fuel_Box fuel_Box-idXKMmm-css
let wallet_locked = wallet_unlocked.lock();
```

_Icon ClipboardText_

## _Icon Link_ [Design Guidelines](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/access/\#design-guidelines)

When designing APIs that accept a wallet as an input, we should think carefully
about the kind of access that we require. API developers should aim to minimise
their usage of `Wallet<Unlocked<S>>` in order to ensure signers are stored in
memory no longer than necessary to reduce the surface area for attacks and
vulnerabilities in downstream libraries and applications.