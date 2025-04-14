[Docs](https://docs.fuel.network/) /

[GraphQL](https://docs.fuel.network/docs/graphql/) /

[Reference](https://docs.fuel.network/docs/graphql/reference/) /

Objects

## _Icon Link_ [Objects](https://docs.fuel.network/docs/graphql/reference/objects/\#objects)

## _Icon Link_ [`Balance`](https://docs.fuel.network/docs/graphql/reference/objects/\#balance)

The balance of a particular asset for a wallet address.

**fields:**

`owner`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

An EOA account represented by 32 bytes.

`amount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of the selected asset id as an unsigned 64 bit number.

`assetId`: [`AssetId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

A 32 byte representation of the asset.

## _Icon Link_ [`BalanceFilterInput`](https://docs.fuel.network/docs/graphql/reference/objects/\#balancefilterinput)

The filter input type used to filter the `balances` query.

**fields:**

`owner`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The owner address of the balances.

## _Icon Link_ [`Blob`](https://docs.fuel.network/docs/graphql/reference/objects/\#blob)

Information about a blob transaction in the network.

**fields:**

`id`: [`BlobId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#blobid)

The transaction identifier for the blob.

`bytecode`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The blob bytecode.

## _Icon Link_ [`Block`](https://docs.fuel.network/docs/graphql/reference/objects/\#block)

Information about a block in the network.

**fields:**

`version`: [`BlockVersion!`](https://docs.fuel.network/docs/graphql/reference/enums/#blockversion)

The version of the block.

`id`: [`BlockId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#blockid)

A unique identifier for the block.

`height`: [`U32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The height of the block.

`header`: [`Header!`](https://docs.fuel.network/docs/graphql/reference/objects/#header)

Metadata about a block.

`consensus`: [`Consensus!`](https://docs.fuel.network/docs/graphql/reference/unions/#consensus)

The type of consensus used.

`transactionIds`: [`TransactionId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#transactionid)

An array of transaction ids included in the block only.

`transactions`: [`[Transaction!]!`](https://docs.fuel.network/docs/graphql/reference/objects/#transaction)

An array of transactions included in the block.

## _Icon Link_ [`Breakpoint`](https://docs.fuel.network/docs/graphql/reference/objects/\#breakpoint)

A breakpoint during debugging.
Defined as a tuple of a contract ID and relative `pc` offset inside it.

**fields:**

`contract`: [`ContractId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#contractid)

The contract address.

`pc`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The value of the program counter register `$pc`, which is the memory address of the current instruction.

## _Icon Link_ [`ChainInfo`](https://docs.fuel.network/docs/graphql/reference/objects/\#chaininfo)

Information about the base chain. At a very high level `chainInfo` helps you understand what Fuel chain you're connected to and the different parameters of this chain.

**fields:**

`name`: `String!`

The human-readable string name of the chain. i.e. `Upgradable Testnet`.

`latestBlock`: [`Block!`](https://docs.fuel.network/docs/graphql/reference/objects/#block)

The most recently created block.

`daHeight`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The height of the base chain via relayer (i.e. Ethereum or DA)

`consensusParameters`: [`ConsensusParameters!`](https://docs.fuel.network/docs/graphql/reference/objects/#consensusparameters)

The consensus parameters used to validate blocks.

`gasCosts`: [`GasCosts!`](https://docs.fuel.network/docs/graphql/reference/objects/#gascosts)

The gas cost of each opcode.

## _Icon Link_ [`ChangeOutput`](https://docs.fuel.network/docs/graphql/reference/objects/\#changeoutput)

A transaction output that changes the unspent coins in a UTXO.

**fields:**

`to`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The recipient address of the coins.

`amount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of coins.

`assetId`: [`AssetId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id for the coins.

## _Icon Link_ [`Coin`](https://docs.fuel.network/docs/graphql/reference/objects/\#coin)

Information about a coin.

**fields:**

`utxoId`: [`UtxoId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#utxoid)

A unique 32 byte identifier for a UTXO.

`owner`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The owner address of the coins.

`amount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of coins.

`assetId`: [`AssetId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id of the coin.

`blockCreated`: [`U32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The block when the coins were created.

`txCreatedIdx`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The index of the transaction that created this coin.

## _Icon Link_ [`CoinFilterInput`](https://docs.fuel.network/docs/graphql/reference/objects/\#coinfilterinput)

The filter input type for the `coins` query.

**fields:**

`owner`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The owner of the coins.

`assetId`: [`AssetId`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id of the coins.

## _Icon Link_ [`CoinOutput`](https://docs.fuel.network/docs/graphql/reference/objects/\#coinoutput)

A type representing a coin output.

**fields:**

`to`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The receiver address of the output coins.

`amount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of coins in the output.

`assetId`: [`AssetId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id for the output coins.

## _Icon Link_ [`ConsensusParameters`](https://docs.fuel.network/docs/graphql/reference/objects/\#consensusparameters)

The consensus parameters used for validating blocks.

**fields:**

`version`: [`ConsensusParametersVersion!`](https://docs.fuel.network/docs/graphql/reference/unions/#consensusparametersversion)

The version of the consensus parameters.

`txParams`: [`TxParameters!`](https://docs.fuel.network/docs/graphql/reference/objects/#txparameters)

The allowed parameters of transactions.

`predicateParams`: [`PredicateParameters!`](https://docs.fuel.network/docs/graphql/reference/objects/#predicateparameters)

The allowed parameters of predicates.

`scriptParams`: [`ScriptParameters!`](https://docs.fuel.network/docs/graphql/reference/objects/#scriptparameters)

The allowed parameters of scripts.

`contractParams`: [`ContractParameters!`](https://docs.fuel.network/docs/graphql/reference/objects/#contractparameters)

The allowed parameters of contracts.

`feeParams`: [`FeeParameters!`](https://docs.fuel.network/docs/graphql/reference/objects/#feeparameters)

The allowed parameters of fees.

`baseAssetId`: [`AssetId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id of the "base" asset used for gas fees.

`blockGasLimit`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum amount of gas spend allowed in a block.

`blockTransactionSizeLimit`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum transaction slots in a block.

`chainId`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

A unique identifier for the chain.

`gasCosts`: [`GasCosts!`](https://docs.fuel.network/docs/graphql/reference/objects/#gascosts)

The gas cost of each opcode.

`privilegedAddress`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The address used to authorize network upgrades via the `Upgrade` transaction.

## _Icon Link_ [`ConsensusParametersPurpose`](https://docs.fuel.network/docs/graphql/reference/objects/\#consensusparameterspurpose)

Details about the consensus parameters that are being upgraded.

**fields:**

`witnessIndex`: [`U16!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u16)

The index of the witness in the `witnesses` field that contains the serialized consensus parameters. For an upgrade to consensus parameters, the upgraded parameters are stored as a witness in the transaction.

`checksum`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The hash of the serialized consensus parameters.
Since the serialized consensus parameters live inside the transaction witnesses (which is malleable data), any party can override them. The `checksum` is used to verify that the data was not modified or tampered with.

## _Icon Link_ [`Contract`](https://docs.fuel.network/docs/graphql/reference/objects/\#contract)

An object representing a deployed contract.

**fields:**

`id`: [`ContractId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#contractid)

The contract address.

`bytecode`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The contract bytecode.

`salt`: [`Salt!`](https://docs.fuel.network/docs/graphql/reference/scalars/#salt)

A unique identifier for the contract.

## _Icon Link_ [`ContractBalance`](https://docs.fuel.network/docs/graphql/reference/objects/\#contractbalance)

An object representing the balance of a deployed contract for a certain asset.

**fields:**

`contract`: [`ContractId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#contractid)

The contract address.

`amount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The contract balance for the given asset.

`assetId`: [`AssetId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id for the coins.

## _Icon Link_ [`ContractBalanceFilterInput`](https://docs.fuel.network/docs/graphql/reference/objects/\#contractbalancefilterinput)

The filter input type for the `contractBalances` query.

**fields:**

`contract`: [`ContractId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#contractid)

The contract id that the query will return balances for.

## _Icon Link_ [`ContractCreated`](https://docs.fuel.network/docs/graphql/reference/objects/\#contractcreated)

The output type from deploying a contract.

**fields:**

`contract`: [`Contract!`](https://docs.fuel.network/docs/graphql/reference/objects/#contract)

The contract that was created.

`stateRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The initial state root of contract.

## _Icon Link_ [`ContractOutput`](https://docs.fuel.network/docs/graphql/reference/objects/\#contractoutput)

The output type from a transaction that changed the state of a contract.

**fields:**

`inputIndex`: `Int!`

The index of the input.

`balanceRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The root of amount of coins owned by contract after transaction execution.

`stateRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The state root of contract after transaction execution.

## _Icon Link_ [`ContractParameters`](https://docs.fuel.network/docs/graphql/reference/objects/\#contractparameters)

Contract-specific consensus parameters.

**fields:**

`version`: [`ContractParametersVersion!`](https://docs.fuel.network/docs/graphql/reference/unions/#contractparametersversion)

The version of the contract-specific consensus parameters.

`contractMaxSize`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

Maximum size of a contract in bytes.

`maxStorageSlots`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

Maximum number of storage slots.

## _Icon Link_ [`DryRunTransactionExecutionStatus`](https://docs.fuel.network/docs/graphql/reference/objects/\#dryruntransactionexecutionstatus)

Details about the status of a transaction dry run.

**fields:**

`id`: [`TransactionId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#transactionid)

The transaction ID.

`status`: [`DryRunTransactionStatus!`](https://docs.fuel.network/docs/graphql/reference/unions/#dryruntransactionstatus)

The status of the transaction dry run.

`receipts`: [`[Receipt!]!`](https://docs.fuel.network/docs/graphql/reference/objects/#receipt)

The receipts for the transaction dry run.

## _Icon Link_ [`DryRunFailureStatus`](https://docs.fuel.network/docs/graphql/reference/objects/\#dryrunfailurestatus)

The status details of a failed transaction dry run.

**fields:**

`programState`: [`ProgramState`](https://docs.fuel.network/docs/graphql/reference/objects/#programstate)

The state of the program execution.

`reason`: `String!`

The reason why the transaction dry run failed.

`receipts`: [`[Receipt!]!`](https://docs.fuel.network/docs/graphql/reference/objects/#receipt)

The transaction dry run receipts.

`totalGas`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The total amount of gas used.

`totalFee`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The total fee for the transaction.

## _Icon Link_ [`DryRunSuccessStatus`](https://docs.fuel.network/docs/graphql/reference/objects/\#dryrunsuccessstatus)

The status details of a successful transaction dry run.

**fields:**

`programState`: [`ProgramState`](https://docs.fuel.network/docs/graphql/reference/objects/#programstate)

The state of the program execution.

`receipts`: [`[Receipt!]!`](https://docs.fuel.network/docs/graphql/reference/objects/#receipt)

The transaction dry run receipts.

`totalGas`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The total amount of gas used.

`totalFee`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The total fee for the transaction.

## _Icon Link_ [`EstimateGasPrice`](https://docs.fuel.network/docs/graphql/reference/objects/\#estimategasprice)

The estimated gas price for a transaction.

**fields:**

`gasPrice`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

## _Icon Link_ [`ExcludeInput`](https://docs.fuel.network/docs/graphql/reference/objects/\#excludeinput)

The input type for the `resourcesToSpend` query that defines what UTXOs and messages to exclude.

**fields:**

`utxos`: [`[UtxoId!]!`](https://docs.fuel.network/docs/graphql/reference/scalars/#utxoid)

An array of UTXO IDs to exclude.

`messages`: [`[Nonce!]!`](https://docs.fuel.network/docs/graphql/reference/scalars/#nonce)

An array of message IDs to exclude.

## _Icon Link_ [`FailureStatus`](https://docs.fuel.network/docs/graphql/reference/objects/\#failurestatus)

The status type of a transaction that has failed.

**fields:**

`transactionId`: [`TransactionId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#transactionid)

A unique transaction id.

`blockHeight`: [`U32`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The block height for the failed transaction.

`block`: [`Block!`](https://docs.fuel.network/docs/graphql/reference/objects/#block)

The block number for the failed transaction.

`transaction`: [`Transaction!`](https://docs.fuel.network/docs/graphql/reference/objects/#transaction)

The transaction itself.

`time`: [`Tai64Timestamp!`](https://docs.fuel.network/docs/graphql/reference/scalars/#tai64timestamp)

The time the transaction failed.

`reason`: `String!`

The reason why the transaction failed.

`programState`: [`ProgramState`](https://docs.fuel.network/docs/graphql/reference/objects/#programstate)

The state of the program execution.

`receipts`: [`[Receipt!]!`](https://docs.fuel.network/docs/graphql/reference/objects/#receipt)

The receipts for the transaction.

`totalGas`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The total amount of gas used.

`totalFee`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The total fee for the transaction.

## _Icon Link_ [`FeeParameters`](https://docs.fuel.network/docs/graphql/reference/objects/\#feeparameters)

The consensus parameters for fees.

**fields:**

`version`: [`FeeParametersVersion!`](https://docs.fuel.network/docs/graphql/reference/unions/#feeparametersversion)

The version of the consensus parameters.

`gasPriceFactor`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The dynamic adjustment of gas costs.

`gasPerByte`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost per byte.

## _Icon Link_ [`GasCosts`](https://docs.fuel.network/docs/graphql/reference/objects/\#gascosts)

The breakdown of the gas costs of each opcode.

**fields:**

`version`: [`GasCostsVersion!`](https://docs.fuel.network/docs/graphql/reference/unions/#gascostsversion)

The version of the gas-specific consensus parameters.

`add`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$add` ALU opcode.

`addi`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$addi` ALU opcode.

`aloc`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$aloc` memory opcode.

`and`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$and` ALU opcode.

`andi`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$andi` ALU opcode.

`bal`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$bal` contract opcode.

`bhei`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$bhei` contract opcode.

`bhsh`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$bhsh` contract opcode.

`burn`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$burn` contract opcode.

`cb`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$cb` contract opcode.

`cfei`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$cfei` memory opcode.

`cfsi`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$cfsi` memory opcode.

`div`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$div` ALU opcode.

`divi`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$divi` ALU opcode.

`ecr1`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$ecr1` cryptographic opcode.

`eck1`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$eck1` cryptographic opcode.

`ed19`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$ed19` cryptographic opcode.

`eq`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$eq` ALU opcode.

`exp`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$exp` ALU opcode.

`expi`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$expi` ALU opcode.

`flag`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$flag` opcode.

`gm`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$gm` opcode.

`gt`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$gt` opcode.

`gtf`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$gtf` ALU opcode.

`ji`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$ji` control flow opcode.

`jmp`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$jmp` control flow opcode.

`jne`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$jne` control flow opcode.

`jnei`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$jnei` control flow opcode.

`jnzi`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$jnzi` control flow opcode.

`jmpf`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$jmpf` control flow opcode.

`jmpb`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$jmpb` control flow opcode.

`jnzf`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$jnzf` control flow opcode.

`jnzb`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$jnzb` control flow opcode.

`jnef`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$jnef` control flow opcode.

`jneb`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$jneb` control flow opcode.

`lb`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$lb` memory opcode.

`log`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$log` contract opcode.

`lt`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$lt` ALU opcode.

`lw`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$lw` memory opcode.

`mint`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$mint` contract opcode.

`mlog`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$mlog` ALU opcode.

`modOp`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$modOp` opcode.

`modi`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$modi` ALU opcode.

`moveOp`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$moveOp` ALU opcode.

`movi`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$movi` ALU opcode.

`mroo`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$mroo` ALU opcode.

`mul`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$mul` ALU opcode.

`muli`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$muli` ALU opcode.

`mldv`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$mldv` ALU opcode.

`noop`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$noop` ALU opcode.

`not`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$not` ALU opcode.

`or`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$or` ALU opcode.

`ori`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$ori` ALU opcode.

`poph`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$poph` opcode.

`popl`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$popl` opcode.

`pshh`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$pshh` opcode.

`pshl`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$pshl` opcode.

`ret`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$ret` opcode.

`rvrt`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$rvrt` contract opcode.

`sb`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$sb` memory opcode.

`sll`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$sll` ALU opcode.

`slli`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$slli` ALU opcode.

`srl`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$srl` ALU opcode.

`srli`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$srli` ALU opcode.

`srw`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$srw` contract opcode.

`sub`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$sub` ALU opcode.

`subi`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$subi` ALU opcode.

`sw`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$sw` memory opcode.

`sww`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$sww` contract opcode.

`time`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$time` contract opcode.

`tr`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$tr` contract opcode.

`tro`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$tro` contract opcode.

`wdcm`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wdcm` ALU opcode.

`wqcm`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wqcm` ALU opcode.

`wdop`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wdop` ALU opcode.

`wqop`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wqop` ALU opcode.

`wdml`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wdml` ALU opcode.

`wqml`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wqml` ALU opcode.

`wddv`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wddv` ALU opcode.

`wqdv`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wqdv` ALU opcode.

`wdmd`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wdmd` ALU opcode.

`wqmd`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wqmd` ALU opcode.

`wdam`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wdam` ALU opcode.

`wqam`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wqam` ALU opcode.

`wdmm`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wdmm` ALU opcode.

`wqmm`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$wqmm` ALU opcode.

`xor`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$xor` ALU opcode.

`xori`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of using the `$xori` ALU opcode.

`alocDependentCost`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$aloc` contract opcode.

`bldd`: [`DependentCost`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$bldd` contract opcode.

`bsiz`: [`DependentCost`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$bsiz` contract opcode.

`cfe`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$cfe` contract opcode.

`cfeiDependentCost`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$cfei` contract opcode.

`call`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$call` contract opcode.

`ccp`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$ccp` contract opcode.

`croo`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$croo` contract opcode.

`csiz`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$csiz` contract opcode.

`ed19DependentCost`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$ed19` contract opcode.

`k256`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$k256` cryptographic opcode.

`ldc`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$ldc` contract opcode.

`logd`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$logd` contract opcode.

`mcl`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$mcl` memory opcode.

`mcli`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$mcli` memory opcode.

`mcp`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$mcp` memory opcode.

`mcpi`: [`DependentCost`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$mcpi` memory opcode.

`meq`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$meq` memory opcode.

`retd`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$retd` contract opcode.

`s256`: [`DependentCost`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$mcpi` cryptographic opcode.

`scwq`: [`DependentCost`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$scwq` cryptographic opcode.

`smo`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$smo` contract opcode.

`srwq`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$srwq` contract opcode.

`swwq`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of using the `$swwq` contract opcode.

`contractRoot`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost calculating the `contractRoot`.

`stateRoot`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost calculating the `stateRoot`.

`vmInitialization`: [`DependentCost!`](https://docs.fuel.network/docs/graphql/reference/unions/#dependentcost)

The `dependent` gas cost of the `vmInitialization`.

`newStoragePerByte`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas cost of storage per byte.

## _Icon Link_ [`Genesis`](https://docs.fuel.network/docs/graphql/reference/objects/\#genesis)

The genesis consensus type.

**fields:**

`chainConfigHash`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The chain configuration hash. The chain configuration defines what consensus type to use, what settlement layer to use, and the rules of block validity.

`coinsRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The binary Merkle tree root of all genesis coins.

`contractsRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The binary Merkle tree root of state, balances, and the contracts code hash of each contract.

`messagesRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The binary merkle tree root of all genesis messages.

`transactionsRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The binary Merkle tree root of all previous transactions.

## _Icon Link_ [`HeavyOperation`](https://docs.fuel.network/docs/graphql/reference/objects/\#heavyoperation)

The operation dependent on the size of its inputs, and the time required per unit of input exceeding that of a single no-op operation

**fields:**

`base`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The minimum gas that this operation can cost

`gasPerUnit`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas is required to process a single unit

The header contains metadata about a certain block.

**fields:**

`version`: [`HeaderVersion!`](https://docs.fuel.network/docs/graphql/reference/enums/#headerversion)

The version of the header.

`id`: [`BlockId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#blockid)

The current block id.

`daHeight`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The block height for the data availability layer up to which (inclusive) input messages are processed.

`consensusParametersVersion`: [`U32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The version of the consensus parameters.

`stateTransitionBytecodeVersion`: [`U32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The version of the state transition bytecode.

`transactionsCount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The number of transactions in the block.

`messageReceiptCount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The number of receipt messages in the block.

`transactionsRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The merkle root of the transactions in the block.

`messageOutboxRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The Merkle root of the outgoing messages back to the data availability (DA) layer from Fuel, where the inputs are the IDs ( `MessageId`) of the messages. The IDs are produced by executing transactions and collecting IDs from the receipts of the `Message` outputs.

`eventInboxRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The Merkle root of the incoming events from the data availability (DA) layer to Fuel, where the tree inputs are the hashes of these events.

`height`: [`U32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The block height.

`prevRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The merkle root of all previous consensus header hashes (not including this block).

`time`: [`Tai64Timestamp!`](https://docs.fuel.network/docs/graphql/reference/scalars/#tai64timestamp)

The timestamp for the block.

`applicationHash`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The hash of the serialized application header for this block.

## _Icon Link_ [`InputCoin`](https://docs.fuel.network/docs/graphql/reference/objects/\#inputcoin)

Information about a coin input.

**fields:**

`utxoId`: [`UtxoId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#utxoid)

A unique 32 byte identifier for the UTXO.

`owner`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The owning address or predicate root.

`amount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of coins.

`assetId`: [`AssetId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset ID of the coins.

`txPointer`: [`TxPointer!`](https://docs.fuel.network/docs/graphql/reference/scalars/#txpointer)

A pointer to the transaction whose output is being spent.

`witnessIndex`: `Int!`

The index of the witness that authorizes spending the coin.

`predicateGasUsed`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of gas used in the predicate transaction.

`predicate`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The predicate bytecode.

`predicateData`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The predicate input parameters.

## _Icon Link_ [`InputContract`](https://docs.fuel.network/docs/graphql/reference/objects/\#inputcontract)

Information about a contract input.

**fields:**

`utxoId`: [`UtxoId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#utxoid)

A unique 32 byte identifier for the UTXO.

`balanceRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The root of amount of coins owned by contract before transaction execution.

`stateRoot`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The state root of contract before transaction execution.

`txPointer`: [`TxPointer!`](https://docs.fuel.network/docs/graphql/reference/scalars/#txpointer)

A pointer to the TX whose output is being spent.

`contractId`: [`ContractId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#contractid)

The input contract's ID.

## _Icon Link_ [`InputMessage`](https://docs.fuel.network/docs/graphql/reference/objects/\#inputmessage)

Information about a message input.

**fields:**

`sender`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The sender address of the message.

`recipient`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The recipient address of the message.

`amount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount sent in the message.

`nonce`: [`Nonce!`](https://docs.fuel.network/docs/graphql/reference/scalars/#nonce)

A nonce value for the message input, which is determined by the sending system and is published at the time the message is sent.

`witnessIndex`: `Int!`

The index of witness that authorizes spending the coin.

`predicateGasUsed`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of gas used in the predicate transaction.

`data`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The message data.

`predicate`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The predicate bytecode.

`predicateData`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The predicate input parameters.

## _Icon Link_ [`LatestGasPrice`](https://docs.fuel.network/docs/graphql/reference/objects/\#latestgasprice)

Information about the latest price of gas.

**fields:**

`gasPrice`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas price for the latest block produced.

`blockHeight`: [`U32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The block height for the latest block produced.

## _Icon Link_ [`LightOperation`](https://docs.fuel.network/docs/graphql/reference/objects/\#lightoperation)

The operation dependent on the size of its inputs, and the time required per unit of input less that of a single no-op operation

**fields:**

`base`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The minimum gas that this operation can cost

`unitsPerGas`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The units that can be processed with a single gas

## _Icon Link_ [`MerkleProof`](https://docs.fuel.network/docs/graphql/reference/objects/\#merkleproof)

Information about a merkle proof.

**fields:**

`proofSet`: [`[Bytes32!]!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The proof set of the message proof.

`proofIndex`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The index used to generate this proof.

## _Icon Link_ [`Message`](https://docs.fuel.network/docs/graphql/reference/objects/\#message)

Contains information about a message.

**fields:**

`amount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of base asset coins sent with the message.

`sender`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The address of the message sender.

`recipient`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The recipient of the message.

`nonce`: [`Nonce!`](https://docs.fuel.network/docs/graphql/reference/scalars/#nonce)

The nonce value for the message.

`data`: `[Int!]!`

The vector with the message data.

`daHeight`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The block height of the data availability layer up to which (inclusive) input messages are processed.

## _Icon Link_ [`MessageCoin`](https://docs.fuel.network/docs/graphql/reference/objects/\#messagecoin)

Information about message coin

**fields:**

`sender`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The address of the message sender.

`recipient`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The recipient of the message.

`nonce`: [`Nonce!`](https://docs.fuel.network/docs/graphql/reference/scalars/#nonce)

The nonce value for the message.

`amount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of base asset coins sent with the message.

`assetId`: [`AssetId`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id of the coins transferred.

`daHeight`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The block height of the data availability layer up to which (inclusive) input messages are processed.

## _Icon Link_ [`MessageProof`](https://docs.fuel.network/docs/graphql/reference/objects/\#messageproof)

Information about the message proof.

**fields:**

`messageProof`: [`MerkleProof!`](https://docs.fuel.network/docs/graphql/reference/objects/#merkleproof)

The merkle proof of the message.

`blockProof`: [`MerkleProof!`](https://docs.fuel.network/docs/graphql/reference/objects/#merkleproof)

The merkle proof of the block.

`messageBlockHeader`: [`Header!`](https://docs.fuel.network/docs/graphql/reference/objects/#header)

The merkle proof of the message.

`commitBlockHeader`: [`Header!`](https://docs.fuel.network/docs/graphql/reference/objects/#header)

The merkle proof of the block.

`sender`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The message sender.

`recipient`: [`Address!`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The message recipient.

`nonce`: [`Nonce!`](https://docs.fuel.network/docs/graphql/reference/scalars/#nonce)

The message nonce.

`amount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount sent in the message.

`data`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The data from the message.

## _Icon Link_ [`MessageStatus`](https://docs.fuel.network/docs/graphql/reference/objects/\#messagestatus)

The status type of a message.

**fields:**

`state`: [`MessageState`](https://docs.fuel.network/docs/graphql/reference/enums/#messagestate)

The state of the message.

## _Icon Link_ [`NodeInfo`](https://docs.fuel.network/docs/graphql/reference/objects/\#nodeinfo)

Information about a node.

**fields:**

`utxoValidation`: `Boolean!`

Whether or not the node is using UTXO validation.

`vmBacktrace`: `Boolean!`

Whether or not logging of backtraces from VM errors is enabled.

`maxTx`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum number of transactions.

`maxDepth`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum number of connected UTXOs allowed, excluding contracts.

`nodeVersion`: `String!`

The node version.

`peers`: [`PeerInfo!`](https://docs.fuel.network/docs/graphql/reference/objects/#peerinfo)!\`

The information about the node's peers.

## _Icon Link_ [`OutputBreakpoint`](https://docs.fuel.network/docs/graphql/reference/objects/\#outputbreakpoint)

A breakpoint during debugging.

**fields:**

`contract`: [`ContractId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#contractid)

The contract address.

`pc`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The value of the program counter register `$pc`, which is the memory address of the current instruction.

## _Icon Link_ [`PeerInfo`](https://docs.fuel.network/docs/graphql/reference/objects/\#peerinfo)

Information about a peer node.

**fields:**

`id`: `String!`

The `libp2p` ID of the peer node.

`addresses`: `[String!]!`

The advertised addresses that can be used to connect to this peer node.

`clientVersion`: `String`

The self-reported version of the client the peer node is using.

`blockHeight`: [`U32`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The last reported height of the peer node.

`lastHeartbeatMs`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The time of the last heartbeat from this peer node in Unix epoch time milliseconds.

`appScore`: `Float!`

The internal Fuel peer-to-peer reputation of this peer node.

## _Icon Link_ [`PoAConsensus`](https://docs.fuel.network/docs/graphql/reference/objects/\#poaconsensus)

The proof-of-authority (PoA) consensus type.

**fields:**

`signature`: [`Signature!`](https://docs.fuel.network/docs/graphql/reference/scalars/#signature)

The signature of the block produced by PoA consensus.

## _Icon Link_ [`ProgramState`](https://docs.fuel.network/docs/graphql/reference/objects/\#programstate)

An object representing the state of execution of a transaction.

**fields:**

`returnType`: [`ReturnType!`](https://docs.fuel.network/docs/graphql/reference/enums/#returntype)

The type of return response for the transaction.

`data`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The data returned from the transaction.

## _Icon Link_ [`Policies`](https://docs.fuel.network/docs/graphql/reference/objects/\#policies)

Information about the policies of a transaction.

**fields:**

`tip`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The user-defined `tip` is a new transaction policy that replaced the `GasPrice` transaction policy. `Tip` allows the user to specify how much they want to pay to the block producer to incentivize them to include the user's transaction in the block.

`witnessLimit`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The limit of witnesses that can be included in the transaction.

`maturity`: [`U32`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The minimum block height that the transaction can be included at.

`maxFee`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum fee allowed for the transaction to consume.

## _Icon Link_ [`PredicateParameters`](https://docs.fuel.network/docs/graphql/reference/objects/\#predicateparameters)

The consensus parameters for predicates.

**fields:**

`version`: [`PredicateParametersVersion!`](https://docs.fuel.network/docs/graphql/reference/unions/#predicateparametersversion)

The version of the consensus parameters.

`maxPredicateLength`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum length of a predicate.

`maxPredicateDataLength`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum length of predicate data.

`maxGasPerPredicate`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum amount of gas allowed for a predicate.

`maxMessageDataLength`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum length of message data for a predicate.

## _Icon Link_ [`Receipt`](https://docs.fuel.network/docs/graphql/reference/objects/\#receipt)

An object representing all possible types of receipts.

**fields:**

`id`: [`ContractId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#contractid)

The ID of the contract that produced the receipt.

`pc`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The value of the program counter register `$pc`, which is the memory address of the current instruction.

`is`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The value of register `$is`, which is the pointer to the start of the currently-executing code.

`to`: [`Contract`](https://docs.fuel.network/docs/graphql/reference/objects/#contract)

The recipient contract.

`toAddress`: [`Address`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The recipient address.

`amount`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of coins transferred.

`assetId`: [`AssetId`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id of the coins transferred.

`gas`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas used for the transaction.

`param1`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The first parameter for a `CALL` receipt type, holds the function selector.

`param2`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The second parameter for a `CALL` receipt type, typically used for the user-specified input to the ABI function being selected.

`val`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The value of registers at the end of execution, used for debugging.

`ptr`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The value of the pointer register, used for debugging.

`digest`: [`Bytes32`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

A 32-byte hash of `MEM[$rC, $rD]`. The syntax `MEM[x, y]` means the memory range starting at byte `x`, of length `y` bytes.

`reason`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The decimal string representation of an 8-bit unsigned integer for the panic reason. Only returned if the receipt type is `PANIC`.

`ra`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The value of register `$rA`.

`rb`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The value of register `$rB`.

`rc`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The value of register `$rC`.

`rd`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The value of register `$rD`.

`len`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The length of the receipt.

`receiptType`: [`ReceiptType!`](https://docs.fuel.network/docs/graphql/reference/enums/#receipttype)

The type of receipt.

`result`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

`0` if script exited successfully, `any` otherwise.

`gasUsed`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of gas consumed by the script.

`data`: [`HexString`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The receipt data.

`sender`: [`Address`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The address of the message sender.

`recipient`: [`Address`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The address of the message recipient.

`nonce`: [`Nonce`](https://docs.fuel.network/docs/graphql/reference/scalars/#nonce)

The nonce value for a message.

`contractId`: [`ContractId`](https://docs.fuel.network/docs/graphql/reference/scalars/#contractid)

The contract id.

`subId`: [`Bytes32`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The sub id.

## _Icon Link_ [`RelayedTransactionFailed`](https://docs.fuel.network/docs/graphql/reference/objects/\#relayedtransactionfailed)

Details about why a relayed transaction from an L1 failed.

**fields:**

`blockHeight`: `U32!`

The block height at the time the relayed transaction failed.

`failure`: `String!`

The reason why the transaction failed.

## _Icon Link_ [`RunResult`](https://docs.fuel.network/docs/graphql/reference/objects/\#runresult)

The result of a transaction execution.

**fields:**

`state`: `RunState!`

The state of the transaction execution.

`breakpoint`: `OutputBreakpoint`

A breakpoint during debugging.

`jsonReceipts`: `[String!]!`

The receipts of the transaction in JSON format.

## _Icon Link_ [`ScriptParameters`](https://docs.fuel.network/docs/graphql/reference/objects/\#scriptparameters)

The consensus parameters for a script.

**fields:**

`version`: [`ScriptParametersVersion!`](https://docs.fuel.network/docs/graphql/reference/unions/#scriptparametersversion)

The version of the consensus parameters.

`maxScriptLength`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum length of a script.

`maxScriptDataLength`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum length of script data.

## _Icon Link_ [`SpendQueryElementInput`](https://docs.fuel.network/docs/graphql/reference/objects/\#spendqueryelementinput)

A type used in the `queryPerAsset` argument for the `resourcesToSpend` query.

**fields:**

`assetId`: [`AssetId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id for the asset.

`amount`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of coins to send.

`max`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The max number of resources in the selection.

## _Icon Link_ [`SqueezedOutStatus`](https://docs.fuel.network/docs/graphql/reference/objects/\#squeezedoutstatus)

The status for a transaction that was squeezed out of the transaction pool.

**fields:**

`reason`: `String!`

The reason why the transaction was squeezed out.

## _Icon Link_ [`StateTransitionBytecode`](https://docs.fuel.network/docs/graphql/reference/objects/\#statetransitionbytecode)

The bytecode of a state transition upgrade.

**fields:**

`root`: [`[HexString!]`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The merkle root of the state transition bytecode.

`bytecode`: [`[UploadedBytecode!]`](https://docs.fuel.network/docs/graphql/reference/objects/#uploadedbytecode)

The bytecode of the state transition.

## _Icon Link_ [`StateTransitionPurpose`](https://docs.fuel.network/docs/graphql/reference/objects/\#statetransitionpurpose)

Details about a state transition upgrade.

**fields:**

`root`: [`Bytes32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The merkle root of the new state.

## _Icon Link_ [`SuccessStatus`](https://docs.fuel.network/docs/graphql/reference/objects/\#successstatus)

The status of a successful transaction.

**fields:**

`transactionId`: [`TransactionId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#transactionid)

The ID of the transaction.

`blockHeight`: [`U32`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The block height for the successful transaction.

`block`: [`Block!`](https://docs.fuel.network/docs/graphql/reference/objects/#block)

The block for the successful transaction.

`transaction`: [`Transaction!`](https://docs.fuel.network/docs/graphql/reference/objects/#transaction)

The transaction itself.

`time`: [`Tai64Timestamp!`](https://docs.fuel.network/docs/graphql/reference/scalars/#tai64timestamp)

The time of the transaction.

`programState`: [`ProgramState`](https://docs.fuel.network/docs/graphql/reference/objects/#programstate)

The state of the program execution.

`receipts`: [`[Receipt!]!`](https://docs.fuel.network/docs/graphql/reference/objects/#receipt)

The transaction receipts.

`totalGas`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The total amount of gas used.

`totalFee`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The total fee for the transaction.

## _Icon Link_ [`SubmittedStatus`](https://docs.fuel.network/docs/graphql/reference/objects/\#submittedstatus)

The status for a submitted transaction.

**fields:**

`time`: [`Tai64Timestamp!`](https://docs.fuel.network/docs/graphql/reference/scalars/#tai64timestamp)

The time a transaction was submitted

## _Icon Link_ [`Transaction`](https://docs.fuel.network/docs/graphql/reference/objects/\#transaction)

An object containing information about a transaction.

**fields:**

`id`: [`TransactionId!`](https://docs.fuel.network/docs/graphql/reference/scalars/#transactionid)

A unique transaction id.

`inputAssetIds`: [`[AssetId!]`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

An array of asset ids used for the transaction inputs.

`inputContracts`: [`[Contract!]`](https://docs.fuel.network/docs/graphql/reference/objects/#contract)

An array of contracts used for the transaction inputs.

`inputContract`: [`InputContract`](https://docs.fuel.network/docs/graphql/reference/objects/#inputcontract)

A contract used for the transaction input.

`policies`: [`Policies`](https://docs.fuel.network/docs/graphql/reference/objects/#policies)

The policies for the transaction.

`scriptGasLimit`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas limit for the transaction.

`maturity`: [`U32`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The minimum block height that the transaction can be included at.

`mintAmount`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount minted in the transaction.

`mintAssetId`: [`AssetId`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset ID for coins minted in the transaction.

`mintGasPrice`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The gas price at the time of minting the block.

`txPointer`: [`TxPointer`](https://docs.fuel.network/docs/graphql/reference/scalars/#txpointer)

The location of the transaction in the block.

`isScript`: `Boolean!`

Whether or not the transaction is a script.

`isCreate`: `Boolean!`

Whether or not the transaction is creating a new contract.

`isMint`: `Boolean!`

Whether or not the transaction is minting new coins.

`isUpgrade`: `Boolean!`

Whether or not the transaction is upgrading the network.

`isUpload`: `Boolean!`

Whether or not the transaction is uploading state transition data to prepare for upgrading the network.

`isBlob`: `Boolean!`

Whether or not the transaction is a blob.

`inputs`: [`[Input!]`](https://docs.fuel.network/docs/graphql/reference/unions/#input)

An array of inputs for the transaction.

`outputs`: [`[Output!]!`](https://docs.fuel.network/docs/graphql/reference/unions/#output)

An array of outputs for the transaction.

`outputContract`: [`ContractOutput`](https://docs.fuel.network/docs/graphql/reference/objects/#contractoutput)

The contract output for the transaction.

`witnesses`: [`[HexString!]`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

An array of witnesses.

`receiptsRoot`: [`Bytes32`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The root of the receipts.

`status`: [`TransactionStatus`](https://docs.fuel.network/docs/graphql/reference/unions/#transactionstatus)

The status of the transaction.

`script`: [`HexString`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The script to execute.

`scriptData`: [`HexString`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The script input parameters.

`bytecodeWitnessIndex`: `Int`

The witness index of contract bytecode.

`blobId`: [`BlobId`](https://docs.fuel.network/docs/graphql/reference/scalars/#blobid)

A unique hash identifier for a blob transaction.

`salt`: [`Salt`](https://docs.fuel.network/docs/graphql/reference/scalars/#salt)

The salt value for the transaction.

`storageSlots`: [`[HexString!]`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

An array of storage slot.

`bytecodeRoot`: [`Bytes32`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The Merkle tree root of the bytecode that is being uploaded.

`subsectionIndex`: [`U16`](https://docs.fuel.network/docs/graphql/reference/scalars/#u16)

The index of the subsection of the bytecode.

`subsectionsNumber`: [`U16`](https://docs.fuel.network/docs/graphql/reference/scalars/#u16)

The total number of subsections that the bytecode was divided into.

`proofSet`: [`[Bytes32!]`](https://docs.fuel.network/docs/graphql/reference/scalars/#bytes32)

The proof set helps to verify the connection of the subsection to the `root`.

`upgradePurpose`: [`UpgradePurpose`](https://docs.fuel.network/docs/graphql/reference/unions/#upgradepurpose)

The purpose of a network upgrade.

`rawPayload`: [`HexString!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

A hex string of the raw transaction payload.

## _Icon Link_ [`TxParameters`](https://docs.fuel.network/docs/graphql/reference/objects/\#txparameters)

The consensus parameters for a transaction.

**fields:**

`version`: [`TxParametersVersion!`](https://docs.fuel.network/docs/graphql/reference/unions/#txparametersversion)

The version of the consensus parameters.

`maxInputs`: [`U8!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u8)

The maximum number of inputs allowed for a transaction.

`maxOutputs`: [`U8!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u8)

The maximum number of outputs allowed for a transaction.

`maxWitnesses`: [`U32!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u32)

The maximum number of witnesses allowed for a transaction.

`maxGasPerTx`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum amount of gas allowed for a transaction.

`maxSize`: [`U64!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The maximum size allowed for a transaction.

`maxBytecodeSubsections`: [`U16!`](https://docs.fuel.network/docs/graphql/reference/scalars/#u16)

The maximum number of subsections the new executor bytecode can be broken into.

## _Icon Link_ [`UploadedBytecode`](https://docs.fuel.network/docs/graphql/reference/objects/\#uploadedbytecode)

**fields:**

`bytecode`: [`[HexString!]!`](https://docs.fuel.network/docs/graphql/reference/scalars/#hexstring)

The bytecode that is uploaded.

`uploadedSubsectionsNumber`: `Int`

The number of uploaded subsections.

`completed`: `Boolean!`

Whether or not the bytecode upload has completed.

## _Icon Link_ [`VariableOutput`](https://docs.fuel.network/docs/graphql/reference/objects/\#variableoutput)

The output type for a transaction that outputs an amount that may vary based on transaction execution.

**fields:**

`to`: [`Address`](https://docs.fuel.network/docs/graphql/reference/scalars/#address)

The address the coins were sent to.

`amount`: [`U64`](https://docs.fuel.network/docs/graphql/reference/scalars/#u64)

The amount of coins in the output.

`assetId`: [`AssetId`](https://docs.fuel.network/docs/graphql/reference/scalars/#assetid)

The asset id for the coins sent.