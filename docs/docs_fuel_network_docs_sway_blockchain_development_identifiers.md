[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Blockchain Development](https://docs.fuel.network/docs/sway/blockchain-development/) /

Identifiers

## _Icon Link_ [Identifiers](https://docs.fuel.network/docs/sway/blockchain-development/identifiers/\#identifiers)

Addresses in Sway are similar to EVM addresses. The two major differences are:

1. Sway addresses are 32 bytes long (instead of 20)
2. Sway addresses are computed with the SHA-256 hash of the public key instead of the keccak-256 hash.

Contracts, on the other hand, are uniquely identified with a contract ID rather than an address. A contract's ID is also 32 bytes long and is calculated [here](https://docs.fuel.network/docs/specs/identifiers/contract-id/).