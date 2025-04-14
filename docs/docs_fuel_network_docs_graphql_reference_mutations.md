[Docs](https://docs.fuel.network/) /

[GraphQL](https://docs.fuel.network/docs/graphql/) /

[Reference](https://docs.fuel.network/docs/graphql/reference/) /

Mutations

## _Icon Link_ [Mutations](https://docs.fuel.network/docs/graphql/reference/mutations/\#mutations)

## _Icon Link_ [`startSession`](https://docs.fuel.network/docs/graphql/reference/mutations/\#startsession)

Initialize a new debugger session, returning its `ID`.
A new VM instance is spawned for each session.
The session is run in a separate database transaction,
on top of the most recent node state.

## _Icon Link_ [`endSession`](https://docs.fuel.network/docs/graphql/reference/mutations/\#endsession)

End a debugger session.
Returns a `Boolean!` indicating whether the session was successfully ended.

**args:**

`id`: `ID!`

The session ID.

## _Icon Link_ [`reset`](https://docs.fuel.network/docs/graphql/reference/mutations/\#reset)

Reset the VM instance to the initial state.
Returns a `Boolean!` indicating whether the VM instance was successfully reset.

**args:**

`id`: `ID!`

The session ID.

## _Icon Link_ [`execute`](https://docs.fuel.network/docs/graphql/reference/mutations/\#execute)

Execute a single `fuel-asm` instruction.
Returns a `Boolean!` indicating whether the instruction was successfully executed.

**args:**

`id`: `ID!`

The session ID.

`op`: `String!`

The `fuel-asm` instruction to execute.

## _Icon Link_ [`setSingleStepping`](https://docs.fuel.network/docs/graphql/reference/mutations/\#setsinglestepping)

Set single-stepping mode for the VM instance.
Returns a `Boolean!` indicating whether the mutation successfully executed.

**args:**

`id`: `ID!`

The session ID.

`enable`: `boolean`

Whether to enable single-stepping mode.

## _Icon Link_ [`setBreakpoint`](https://docs.fuel.network/docs/graphql/reference/mutations/\#setbreakpoint)

Set a breakpoint for a VM instance.
Returns a `Boolean!` indicating whether the breakpoint was successfully set.

**args:**

`id`: `ID!`

The session ID.

`breakpoint`: [`Breakpoint!`](https://docs.fuel.network/docs/graphql/reference/objects/#breakpoint)

The breakpoint to set.

## _Icon Link_ [`startTx`](https://docs.fuel.network/docs/graphql/reference/mutations/\#starttx)

Run a single transaction in given session until it hits a breakpoint or completes.
Returns a `RunResult!`.

**args:**

`id`: `ID!`

The session ID.

`txJson`: `String!`

The transaction JSON string.

## _Icon Link_ [`continueTx`](https://docs.fuel.network/docs/graphql/reference/mutations/\#continuetx)

Resume execution of the VM instance after a breakpoint.
Runs until the next breakpoint or until the transaction completes.
Returns a `RunResult!`.

**args:**

`id`: `ID!`

The session ID.

## _Icon Link_ [`dryRun`](https://docs.fuel.network/docs/graphql/reference/mutations/\#dryrun)

Spin up a new temporary node from the current state and emulate a given transaction or set of transactions.
Returns a [`[Receipt!]!`](https://docs.fuel.network/docs/graphql/reference/objects/#receipt) for the emulated transaction.
You can optionally use UTXO validation.

**args:**

`txs`: [`[HexString!]!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

An array of transaction hex strings.

`utxoValidation`: `Boolean`

Whether or not to use UTXO validation.

`gasPrice`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas price for the multiple transactions ran during the dry run.

## _Icon Link_ [`produceBlocks`](https://docs.fuel.network/docs/graphql/reference/mutations/\#produceblocks)

Produce blocks that can be used for testing that requires block advancement.
Returns a [`U32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32).

**args:**

`startTimestamp`: [`Tai64Timestamp!`](https://docs.fuel.network/docs/graphql/reference/scalars/#tai64timestamp)

The start time of the produced block.

`blocksToProduce`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The number of blocks to produce.

## _Icon Link_ [`submit`](https://docs.fuel.network/docs/graphql/reference/mutations/\#submit)

Submit a transaction to the transaction pool.
Returns a [`Transaction!`](https://docs.fuel.network/docs/graphql/reference/objects/#transaction).

**args:**

`tx`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The transaction hex string.