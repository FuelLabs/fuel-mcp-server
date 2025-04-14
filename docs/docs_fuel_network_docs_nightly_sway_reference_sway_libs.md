[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Reference](https://docs.fuel.network/docs/nightly/sway/reference/) /

Sway Libs

## _Icon Link_ [Sway Libraries](https://docs.fuel.network/docs/nightly/sway/reference/sway_libs/\#sway-libraries)

The purpose of Sway Libraries is to contain libraries which users can import and use that are not part of the standard library.

These libraries contain helper functions and other tools valuable to blockchain development.

For more information on how to use a Sway-Libs library, please refer to the [Sway-Libs Book](https://docs.fuel.network/docs/nightly/sway-libs/getting_started/).

## _Icon Link_ [Assets Libraries](https://docs.fuel.network/docs/nightly/sway/reference/sway_libs/\#assets-libraries)

Asset Libraries are any libraries that use [Native Assets](https://docs.fuel.network/docs/nightly/sway/blockchain-development/native_assets/) on the Fuel Network.

- [Asset Library](https://docs.fuel.network/docs/nightly/sway-libs/asset/); provides helper functions for the [SRC-20](https://docs.fuel.network/docs/nightly/sway-standards/src-20-native-asset/), [SRC-3](https://docs.fuel.network/docs/nightly/sway-standards/src-3-minting-and-burning/), and [SRC-7](https://docs.fuel.network/docs/nightly/sway-standards/src-7-asset-metadata/) standards.

## _Icon Link_ [Access Control and Security Libraries](https://docs.fuel.network/docs/nightly/sway/reference/sway_libs/\#access-control-and-security-libraries)

Access Control and Security Libraries are any libraries that are built and intended to provide additional safety when developing smart contracts.

- [Ownership Library](https://docs.fuel.network/docs/nightly/sway-libs/ownership/); used to apply restrictions on functions such that only a **single** user may call them. This library provides helper functions for the [SRC-5; Ownership Standard](https://docs.fuel.network/docs/nightly/sway-standards/src-5-ownership/).
- [Admin Library](https://docs.fuel.network/docs/nightly/sway-libs/admin/); used to apply restrictions on functions such that only a select few users may call them like a whitelist.
- [Pausable Library](https://docs.fuel.network/docs/nightly/sway-libs/pausable/); allows contracts to implement an emergency stop mechanism.
- [Reentrancy Guard Library](https://docs.fuel.network/docs/nightly/sway-libs/reentrancy/); used to detect and prevent reentrancy attacks.

## _Icon Link_ [Cryptography Libraries](https://docs.fuel.network/docs/nightly/sway/reference/sway_libs/\#cryptography-libraries)

Cryptography Libraries are any libraries that provided cryptographic functionality beyond what the std-lib provides.

- [Bytecode Library](https://docs.fuel.network/docs/nightly/sway-libs/bytecode/); used for on-chain verification and computation of bytecode roots for contracts and predicates.
- [Merkle Proof Library](https://docs.fuel.network/docs/nightly/sway-libs/merkle/); used to verify Binary Merkle Trees computed off-chain.

## _Icon Link_ [Math Libraries](https://docs.fuel.network/docs/nightly/sway/reference/sway_libs/\#math-libraries)

Math Libraries are libraries which provide mathematic functions or number types that are outside of the std-lib's scope.

- [Signed Integers Library](https://docs.fuel.network/docs/nightly/sway-libs/signed_integers/); an interface to implement signed integers.

## _Icon Link_ [Data Structures Libraries](https://docs.fuel.network/docs/nightly/sway/reference/sway_libs/\#data-structures-libraries)

Data Structure Libraries are libraries which provide complex data structures which unlock additional functionality for Smart Contracts.

- [Queue Library](https://docs.fuel.network/docs/nightly/sway-libs/queue/); a linear data structure that provides First-In-First-Out (FIFO) operations.