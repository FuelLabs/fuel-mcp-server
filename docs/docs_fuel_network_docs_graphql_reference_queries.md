[Docs](https://docs.fuel.network/) /

[GraphQL](https://docs.fuel.network/docs/graphql/) /

[Reference](https://docs.fuel.network/docs/graphql/reference/) /

Queries

## _Icon Link_ [Queries](https://docs.fuel.network/docs/graphql/reference/queries/\#queries)

## _Icon Link_ [`balance`](https://docs.fuel.network/docs/graphql/reference/queries/\#balance)

Returns the [`Balance!`](https://docs.fuel.network/docs/graphql/reference/objects/#balance) of a specific address for a given asset id.

**args:**

`owner`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The owner address.

`assetId`: [`AssetId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id.

## _Icon Link_ [`balances`](https://docs.fuel.network/docs/graphql/reference/queries/\#balances)

Returns a [`BalanceConnection!`](https://docs.fuel.network/docs/graphql/reference/objects/#balance) for an array of balances for each asset owned by a given address.

**args:**

`filter`: [`BalanceFilterInput!`](https://docs.fuel.network/docs/graphql/reference/objects/#balancefilterinput)

A filter to specify the wallet owner address.

## _Icon Link_ [`blob`](https://docs.fuel.network/docs/graphql/reference/queries/\#blob)

Returns information about a certain [`Blob`](https://docs.fuel.network/docs/graphql/reference/objects/#blob).

**args:**

`id`: [`BlobId`](https://docs.fuel.network/docs/graphql/reference/scalars/#blobid)

The transaction identifier for the blob.

## _Icon Link_ [`block`](https://docs.fuel.network/docs/graphql/reference/queries/\#block)

Returns information about a certain [`Block`](https://docs.fuel.network/docs/graphql/reference/objects/#block). Accepts either the block id or block height as an argument.

**args:**

`id`: [`BlockId`](https://docs.fuel.network/docs/graphql/reference/scalars/#blockid)

The block id.

`height`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The block height.

## _Icon Link_ [`blocks`](https://docs.fuel.network/docs/graphql/reference/queries/\#blocks)

Returns a [`BlockConnection!`](https://docs.fuel.network/docs/graphql/reference/objects/#block) for an array of all blocks produced.

## _Icon Link_ [`chain`](https://docs.fuel.network/docs/graphql/reference/queries/\#chain)

Returns [`ChainInfo!`](https://docs.fuel.network/docs/graphql/reference/objects/#chaininfo) about the target Fuel network used for the API.

## _Icon Link_ [`coin`](https://docs.fuel.network/docs/graphql/reference/queries/\#coin)

Returns details about a specific [`Coin`](https://docs.fuel.network/docs/graphql/reference/objects/#coin).

**args:**

`utxoId`: [`UtxoId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#utxoid)

A unique 32 byte identifier for the UTXO.

## _Icon Link_ [`coins`](https://docs.fuel.network/docs/graphql/reference/queries/\#coins)

Returns a [`CoinConnection!`](https://docs.fuel.network/docs/graphql/reference/objects/#coin) for an array of coins based on a given owner and/or asset id

**args:**

`filter`: [`CoinFilterInput!`](https://docs.fuel.network/docs/graphql/reference/objects/#coinfilterinput)

A filter with the owner address and optionally the asset id.

## _Icon Link_ [`coinsToSpend`](https://docs.fuel.network/docs/graphql/reference/queries/\#coinstospend)

Returns an array of spendable [`[[CoinType!]!]!`](https://docs.fuel.network/docs/graphql/reference/unions/#cointype) per asset.

**args:**

`owner`: [`Address`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The owner address of the coins.

`queryPerAsset`: [`[SpendQueryElementInput!]!`](https://docs.fuel.network/docs/graphql/reference/objects/#spendqueryelementinput)

The list of requested asset resources. Several entries with the same asset id are not allowed.

`excludedIds`: [`ExcludeInput`](https://docs.fuel.network/docs/graphql/reference/objects/#excludeinput)

The resources to exclude.

## _Icon Link_ [`consensusParameters`](https://docs.fuel.network/docs/graphql/reference/queries/\#consensusparameters)

Returns the [`ConsensusParameters`](https://docs.fuel.network/docs/graphql/reference/objects/#consensusparameters) for a given version.

**args:**

`version`: `Int!`

The version of the consensus parameters.

## _Icon Link_ [`contract`](https://docs.fuel.network/docs/graphql/reference/queries/\#contract)

Returns the [`Contract`](https://docs.fuel.network/docs/graphql/reference/objects/#contract) information for a given contract id.

**args:**

`id`: [`ContractId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#contractid)

The contract id of the requested contract.

## _Icon Link_ [`contractBalance`](https://docs.fuel.network/docs/graphql/reference/queries/\#contractbalance)

Returns the [`ContractBalance!`](https://docs.fuel.network/docs/graphql/reference/objects/#contractbalance) for a given contract and asset id.

**args:**

`contract`: [`ContractId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#contractid)

The contract that owns the balance.

`asset`: [`AssetId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id for the balance.

## _Icon Link_ [`contractBalances`](https://docs.fuel.network/docs/graphql/reference/queries/\#contractbalances)

Returns a [`ContractBalanceConnection!`](https://docs.fuel.network/docs/graphql/reference/objects/#contractbalance) for an array of balances for all assets owned by a given contract

**args:**

`filter`: [`ContractBalanceFilterInput!`](https://docs.fuel.network/docs/graphql/reference/objects/#contractbalancefilterinput)

A filter for the contract balances.

## _Icon Link_ [`estimateGasPrice`](https://docs.fuel.network/docs/graphql/reference/queries/\#estimategasprice)

Estimates the most expensive the gas price over a given block horizon, and returns [`EstimateGasPrice!`](https://docs.fuel.network/docs/graphql/reference/objects/#estimategasprice).

**args:**

`blockHorizon`: [`U32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The block horizon defines how many blocks in the future you are doing an estimate for.

## _Icon Link_ [`estimatePredicates`](https://docs.fuel.network/docs/graphql/reference/queries/\#estimatepredicates)

Estimate the predicate gas and returns a [`Transaction!`](https://docs.fuel.network/docs/graphql/reference/objects/#transaction).

**args:**

`tx`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The transaction hex string.

## _Icon Link_ [`health`](https://docs.fuel.network/docs/graphql/reference/queries/\#health)

Returns `true` if the API is running or `false` if the API is down.

## _Icon Link_ [`latestGasPrice`](https://docs.fuel.network/docs/graphql/reference/queries/\#latestgasprice)

Returns the [`LatestGasPrice!`](https://docs.fuel.network/docs/graphql/reference/objects/#latestgasprice) of the latest block.

## _Icon Link_ [`message`](https://docs.fuel.network/docs/graphql/reference/queries/\#message)

Returns the [`Message`](https://docs.fuel.network/docs/graphql/reference/objects/#message) for a given message nonce.

**args:**

`nonce`: [`Nonce!`](https://docs.fuel.network/docs/graphql/reference/scalars/#nonce)

The message nonce.

## _Icon Link_ [`messageProof`](https://docs.fuel.network/docs/graphql/reference/queries/\#messageproof)

Returns the [`MessageProof`](https://docs.fuel.network/docs/graphql/reference/objects/#messageproof) for a given message id or transaction.

**args:**

`transactionId`: [`TransactionId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#transactionid)

The transaction id for the message.

`nonce`: [`Nonce`](https://docs.fuel.network/docs/graphql/reference/scalars/#nonce)

The message nonce.

`commitBlockId`: [`BlockId`](https://docs.fuel.network/docs/graphql/reference/scalars/#blockid)

The block id.

`commitBlockHeight`: [`U32`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The block height.

## _Icon Link_ [`messages`](https://docs.fuel.network/docs/graphql/reference/queries/\#messages)

Returns a [`MessageConnection!`](https://docs.fuel.network/docs/graphql/reference/objects/#message) for an array of messages for a given owner.

**args:**

`owner`: [`Address`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The owner address of the messages.

## _Icon Link_ [`messageStatus`](https://docs.fuel.network/docs/graphql/reference/queries/\#messagestatus)

Returns the [`MessageStatus`](https://docs.fuel.network/docs/graphql/reference/objects/#messagestatus) for a given message [`Nonce`](https://docs.fuel.network/docs/graphql/reference/scalars/#nonce).

**args:**

`nonce`: [`Nonce`](https://docs.fuel.network/docs/graphql/reference/scalars/#nonce)

The nonce of the message.

## _Icon Link_ [`nodeInfo`](https://docs.fuel.network/docs/graphql/reference/queries/\#nodeinfo)

Returns [`NodeInfo!`](https://docs.fuel.network/docs/graphql/reference/objects/#nodeinfo) about the current node.

## _Icon Link_ [`relayedTransactionStatus`](https://docs.fuel.network/docs/graphql/reference/queries/\#relayedtransactionstatus)

Returns [`RelayedTransactionStatus`](https://docs.fuel.network/docs/graphql/reference/unions/#relayedtransactionstatus) details for a given relayed transaction id.

**args:**

`id`: [`RelayedTransactionId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#relayedtransactionid)

The ID for the relayed transaction.

## _Icon Link_ [`stateTransitionBytecodeByVersion`](https://docs.fuel.network/docs/graphql/reference/queries/\#statetransitionbytecodebyversion)

Returns [`StateTransitionBytecode`](https://docs.fuel.network/docs/graphql/reference/objects/#statetransitionbytecode) details for a given version.

**args:**

`version`: `Int!`

The version of the state transition function..

## _Icon Link_ [`stateTransitionBytecodeByRoot`](https://docs.fuel.network/docs/graphql/reference/queries/\#statetransitionbytecodebyroot)

Returns [`StateTransitionBytecode`](https://docs.fuel.network/docs/graphql/reference/objects/#statetransitionbytecode) details for a given root.

**args:**

`root`: [`[HexString!]`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The merkle root of the state transition bytecode.

## _Icon Link_ [`transaction`](https://docs.fuel.network/docs/graphql/reference/queries/\#transaction)

Returns [`Transaction`](https://docs.fuel.network/docs/graphql/reference/objects/#transaction) details for a given transaction id.

**args:**

`id`: [`TransactionId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#transactionid)

The ID for the transaction.

## _Icon Link_ [`transactions`](https://docs.fuel.network/docs/graphql/reference/queries/\#transactions)

Returns a [`TransactionConnection!`](https://docs.fuel.network/docs/graphql/reference/objects/#transaction) for an array of all transactions.

## _Icon Link_ [`transactionsByOwner`](https://docs.fuel.network/docs/graphql/reference/queries/\#transactionsbyowner)

Returns a [`TransactionConnection!`](https://docs.fuel.network/docs/graphql/reference/objects/#transaction) for an array of all transactions from a given address.

**args:**

`owner`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The owner address of the transactions.