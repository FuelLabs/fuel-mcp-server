[Docs](https://docs.fuel.network/) /

[GraphQL](https://docs.fuel.network/docs/graphql/) /

[Reference](https://docs.fuel.network/docs/graphql/reference/) /

Subscriptions

## _Icon Link_ [Subscriptions](https://docs.fuel.network/docs/graphql/reference/subscriptions/\#subscriptions)

## _Icon Link_ [`statusChange`](https://docs.fuel.network/docs/graphql/reference/subscriptions/\#statuschange)

Returns a stream of [`TransactionStatus!`](https://docs.fuel.network/docs/graphql/reference/unions/#transactionstatus) updates for the given transaction id if the current status is `[TransactionStatus::Submitted]`.

This stream will wait forever so it's advised to use within a timeout. It is possible for the stream to miss an update if it is polled slower then the updates arrive. In such a case the stream will close without a status. If this occurs the stream can simply be restarted to return the latest status.

**args:**

`id`: [`TransactionId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#transactionid)

The id of the transaction to stream status updates for.

## _Icon Link_ [`submitAndAwait`](https://docs.fuel.network/docs/graphql/reference/subscriptions/\#submitandawait)

Submits a transaction to the `TxPool` and await returns the [`TransactionStatus!`](https://docs.fuel.network/docs/graphql/reference/unions/#transactionstatus).

**args:**

`tx`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The transaction hex string.

## _Icon Link_ [`submitAndAwaitStatus`](https://docs.fuel.network/docs/graphql/reference/subscriptions/\#submitandawaitstatus)

Submits the transaction to the `TxPool` and returns a stream of events. Compared to the [`submitAndAwait`](https://docs.fuel.network/docs/graphql/reference/subscriptions/#submitandawait), the stream also contains [`SubmittedStatus`](https://docs.fuel.network/docs/graphql/reference/objects/#submittedstatus) as an intermediate state.

**args:**

`tx`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The transaction hex string.