[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

[Identifiers](https://docs.fuel.network/docs/specs/identifiers/) /

Predicate Id

## _Icon Link_ [Predicate ID](https://docs.fuel.network/docs/specs/identifiers/predicate-id/\#predicate-id)

For an input of type `InputType.Coin` or `InputType.Message`, `input`, the predicate owner is calculated as:
`sha256(0x4655454C ++ root(input.predicate))`, where `root` is the Merkle root of
[the binary Merkle tree](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#binary-merkle-tree) each leaf being 16KiB of instructions.
If the bytecode is not a multiple of 16 KiB, the final leaf should be zero-padded rounding up to the nearest multiple of 8 bytes.