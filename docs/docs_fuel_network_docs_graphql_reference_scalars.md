[Docs](https://docs.fuel.network/) /

[GraphQL](https://docs.fuel.network/docs/graphql/) /

[Reference](https://docs.fuel.network/docs/graphql/reference/) /

Scalars

## _Icon Link_ [Scalars](https://docs.fuel.network/docs/graphql/reference/scalars/\#scalars)

## _Icon Link_ [`Address`](https://docs.fuel.network/docs/graphql/reference/scalars/\#address)

An address of an externally owned account identified by a 32 byte string prefixed by `0x`.

## _Icon Link_ [`AssetId`](https://docs.fuel.network/docs/graphql/reference/scalars/\#assetid)

A 32 byte unique ID used to identify a coin. On the testnet, the `assetId` is `0x0000000000000000000000000000000000000000000000000000000000000000`.

## _Icon Link_ [`BlobId`](https://docs.fuel.network/docs/graphql/reference/scalars/\#blobid)

A unique hash identifier for a blob transaction.

## _Icon Link_ [`BlockId`](https://docs.fuel.network/docs/graphql/reference/scalars/\#blockid)

A unique hash identifier for a block.

## _Icon Link_ [`Bytes32`](https://docs.fuel.network/docs/graphql/reference/scalars/\#bytes32)

32 bytes to hold arbitrary data, usually as a hex string. `Bytes32` is the base type for cryptographic primitives like `Address` or `Message`.

## _Icon Link_ [`ContractId`](https://docs.fuel.network/docs/graphql/reference/scalars/\#contractid)

A wrapped 32byte hash that is used to uniquely identify a contract.

## _Icon Link_ [`HexString`](https://docs.fuel.network/docs/graphql/reference/scalars/\#hexstring)

A way to pass in bytes as hex data. This is used for variable byte length types. Predicates and predicate data are always a hex string.

## _Icon Link_ [`Nonce`](https://docs.fuel.network/docs/graphql/reference/scalars/\#nonce)

A random or pseudo-random number generated for a single use to ensure data freshness and prevent replay attacks.

## _Icon Link_ [`RelayedTransactionId`](https://docs.fuel.network/docs/graphql/reference/scalars/\#relayedtransactionid)

The ID for a relayed transaction.

## _Icon Link_ [`Salt`](https://docs.fuel.network/docs/graphql/reference/scalars/\#salt)

Sometimes referred to as a nonce. A unique, random value used to distinguish two things that are otherwise identical. This is used in contract deployments so you can deploy contracts that are otherwise exactly the same.

## _Icon Link_ [`Signature`](https://docs.fuel.network/docs/graphql/reference/scalars/\#signature)

A cryptographic signature used to authorize messages and transactions.

## _Icon Link_ [`Tai64Timestamp`](https://docs.fuel.network/docs/graphql/reference/scalars/\#tai64timestamp)

A TAI 64 timestamp.

## _Icon Link_ [`TransactionId`](https://docs.fuel.network/docs/graphql/reference/scalars/\#transactionid)

A unique 32 byte hash identifier for a transaction.

## _Icon Link_ [`TxPointer`](https://docs.fuel.network/docs/graphql/reference/scalars/\#txpointer)

The location of the transaction in the block. It can be used by UTXOs as a reference to the transaction or by the transaction itself to make it unique.

## _Icon Link_ [`U16`](https://docs.fuel.network/docs/graphql/reference/scalars/\#u16)

Unsigned 16 bit integer.

## _Icon Link_ [`U32`](https://docs.fuel.network/docs/graphql/reference/scalars/\#u32)

Unsigned 32 bit integer.

## _Icon Link_ [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/\#u64)

Unsigned 64 bit integer. The default GraphQL `int` scalar does not cover the range of values needed because the FuelVM word size is 64bit.

## _Icon Link_ [`UtxoId`](https://docs.fuel.network/docs/graphql/reference/scalars/\#utxoid)

A unique 32 byte identifier for a UTXO.