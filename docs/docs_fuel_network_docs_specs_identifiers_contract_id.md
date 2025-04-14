[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

[Identifiers](https://docs.fuel.network/docs/specs/identifiers/) /

Contract Id

## _Icon Link_ [Contract ID](https://docs.fuel.network/docs/specs/identifiers/contract-id/\#contract-id)

For a transaction of type `TransactionType.Create`, `tx`, the contract ID is
`sha256(0x4655454C ++ tx.data.salt ++ root(tx.data.witnesses[bytecodeWitnessIndex].data) ++ root_smt(tx.storageSlots))`,
where `root` is the Merkle root of [the binary Merkle tree](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#binary-merkle-tree) with
each leaf being 16KiB of instructions, and `root_smt` is the
[Sparse Merkle tree](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#sparse-merkle-tree) root of the provided key-value pairs.
If the bytecode is not a multiple of 16 KiB, the final leaf should be zero-padded rounding up to the nearest multiple
of 8 bytes.