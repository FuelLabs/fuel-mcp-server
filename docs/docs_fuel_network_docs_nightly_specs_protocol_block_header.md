[Docs](https://docs.fuel.network/) /

Nightly  /

[Specs](https://docs.fuel.network/docs/nightly/specs/) /

[Protocol](https://docs.fuel.network/docs/nightly/specs/protocol/) /

Block Header

## _Icon Link_ [Block Header](https://docs.fuel.network/docs/nightly/specs/protocol/block-header/\#block-header)

## _Icon Link_ [Application Header](https://docs.fuel.network/docs/nightly/specs/protocol/block-header/\#application-header)

The application header is a network-agnostic block header. Different [networks](https://docs.fuel.network/docs/nightly/specs/networks/) may wrap the application header in a consensus header, depending on their consensus protocol.

| name | type | description |
| --- | --- | --- |
| `da_height` | `uint64` | Height of the data availability layer up to which (inclusive) input messages are processed. |
| `consensusParametersVersion` | `uint32` | The version of the consensus parameters used to execute this block. |
| `stateTransitionBytecodeVersion` | `uint32` | The version of the state transition bytecode used to execute this block. |
| `txCount` | `uint16` | Number of [transaction](https://docs.fuel.network/docs/nightly/specs/tx-format/transaction/) s in this block. |
| `message_receipt_count` | `uint32` | Number of [output message](https://docs.fuel.network/docs/nightly/specs/abi/receipts/#messageout-receipt) s in this block. |
| `txRoot` | `byte[32]` | [Merkle root](https://docs.fuel.network/docs/nightly/specs/protocol/cryptographic-primitives/#binary-merkle-tree) of [transaction](https://docs.fuel.network/docs/nightly/specs/tx-format/transaction/) s in this block. |
| `message_outbox_root` | `byte[32]` | [Merkle root](https://docs.fuel.network/docs/nightly/specs/protocol/cryptographic-primitives/#binary-merkle-tree) of [output message](https://docs.fuel.network/docs/nightly/specs/abi/receipts/#messageout-receipt) s [`messageId`](https://docs.fuel.network/docs/nightly/specs/identifiers/utxo-id/#message-id) in this block. |
| `event_inbox_root` | `byte[32]` | [Merkle root](https://docs.fuel.network/docs/nightly/specs/protocol/cryptographic-primitives/#binary-merkle-tree) of all [events](https://docs.fuel.network/docs/nightly/specs/protocol/relayer/) imported from L1 in this block. The order of the events added to the Merkle tree is the L1 block order, and the index of each event within each block |