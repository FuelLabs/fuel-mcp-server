[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

Glossary

## _Icon Link_ [Glossary](https://docs.fuel.network/docs/fuels-rs/glossary/\#glossary)

## _Icon Link_ [Contract](https://docs.fuel.network/docs/fuels-rs/glossary/\#contract)

A contract, in the SDK, is an abstraction that represents a connection to a specific smart contract deployed on the Fuel Network. This contract instance can be used as a regular Rust object, with methods attached to it that reflect those in its smart contract equivalent.

## _Icon Link_ [Provider](https://docs.fuel.network/docs/fuels-rs/glossary/\#provider)

A Provider is a struct that provides an abstraction for a connection to a Fuel node. It provides read-only access to the node. You can use this provider as-is or through the wallet.

## _Icon Link_ [Wallet and signer](https://docs.fuel.network/docs/fuels-rs/glossary/\#wallet-and-signer)

A `Wallet` is a struct with direct or indirect access to a private key. You can use a `Wallet` to sign messages and transactions to authorize the network to charge your account to perform operations. The terms wallet and signer in the SDK are often used interchangeably, but, technically, a `Signer` is simply a Rust trait to enable the signing of transactions and messages; the `Wallet` implements the `Signer` trait.