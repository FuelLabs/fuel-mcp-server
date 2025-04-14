[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

[Identifiers](https://docs.fuel.network/docs/specs/identifiers/) /

Utxo Id

## _Icon Link_ [UTXO ID](https://docs.fuel.network/docs/specs/identifiers/utxo-id/\#utxo-id)

## _Icon Link_ [Coin ID](https://docs.fuel.network/docs/specs/identifiers/utxo-id/\#coin-id)

Is represented as an _outpoint_: a pair of [transaction ID](https://docs.fuel.network/docs/specs/identifiers/transaction-id/) as `byte[32]` and output index as a `uint16`.

## _Icon Link_ [Message ID](https://docs.fuel.network/docs/specs/identifiers/utxo-id/\#message-id)

The ID of a message is computed as the [hash](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#hashing) of:

1. the sender address as `byte[32]`,
2. the recipient address as `byte[32]`,
3. the [Message nonce](https://docs.fuel.network/docs/specs/identifiers/utxo-id/#message-nonce) as `byte[32]`,
4. the amount being sent with the message as `uint64`,
5. the message data as `byte[]`

`hash(byte[32] ++ byte[32] ++ byte[32] ++ uint64 ++ byte[])`. The address values are serialized as a byte array of length 32 left-padded with zeroes, and all other value types are serialized according to the standard [transaction serialization](https://docs.fuel.network/docs/specs/tx-format/transaction/). Note that the message data length is not included since there is only one dynamically sized field and can be implicitly determined by the hash preimage size.

## _Icon Link_ [Message Nonce](https://docs.fuel.network/docs/specs/identifiers/utxo-id/\#message-nonce)

The nonce value for `InputMessage` is determined by the sending system and is published at the time the message is sent. The nonce value for `OutputMessage` is computed as the [hash](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#hashing) of the [Transaction ID](https://docs.fuel.network/docs/specs/identifiers/transaction-id/) that emitted the message and the index of the message receipt `uint16` (with canonical encoding): `hash(byte[32] ++ canonical(uint16))`.

## _Icon Link_ [Fee ID](https://docs.fuel.network/docs/specs/identifiers/utxo-id/\#fee-id)

The UTXO ID of collected fees in a block is the block height as a 32-byte big-endian unsigned integer (i.e. the first byte of the 32-byte array is the most significant byte, and so on).