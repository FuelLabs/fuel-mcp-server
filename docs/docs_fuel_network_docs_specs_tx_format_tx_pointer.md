[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

[Tx Format](https://docs.fuel.network/docs/specs/tx-format/) /

Tx Pointer

## _Icon Link_ [`TXPointer`](https://docs.fuel.network/docs/specs/tx-format/tx-pointer/\#txpointer)

The location of the transaction in the block. It can be used by UTXOs as a reference to the transaction or by the transaction itself to make it unique.

| name | type | description |
| --- | --- | --- |
| `blockHeight` | `uint32` | Block height. |
| `txIndex` | `uint16` | Transaction index. |