[Docs](https://docs.fuel.network/) /

Nightly  /

[Specs](https://docs.fuel.network/docs/nightly/specs/) /

[Networks](https://docs.fuel.network/docs/nightly/specs/networks/) /

Poa

## _Icon Link_ [PoA Network](https://docs.fuel.network/docs/nightly/specs/networks/poa/\#poa-network)

## _Icon Link_ [Consensus Header](https://docs.fuel.network/docs/nightly/specs/networks/poa/\#consensus-header)

Wraps the [application header](https://docs.fuel.network/docs/nightly/specs/protocol/block-header/#application-header).

| name | type | description |
| --- | --- | --- |
| `prevRoot` | `byte[32]` | [Merkle root](https://docs.fuel.network/docs/nightly/specs/protocol/cryptographic-primitives/#binary-merkle-tree) of all previous consensus header hashes (i.e. not including this block). |
| `height` | `uint32` | Height of this block. |
| `timestamp` | `uint64` | Time this block was created, in [TAI64 _Icon Link_](https://cr.yp.to/libtai/tai64.html) format. |
| `applicationHash` | `byte[32]` | [Hash](https://docs.fuel.network/docs/nightly/specs/protocol/cryptographic-primitives/#hashing) of serialized [application header](https://docs.fuel.network/docs/nightly/specs/protocol/block-header/#application-header) for this block. |

Consensus for the consensus header is a single [signature](https://docs.fuel.network/docs/nightly/specs/protocol/cryptographic-primitives/#public-key-cryptography) from the authority over the [hash](https://docs.fuel.network/docs/nightly/specs/protocol/cryptographic-primitives/#hashing) of the serialized consensus header.

Since the system is secure under the assumption the authority is honest, there is no need for committing to the authority signatures in the header.