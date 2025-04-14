[Docs](https://docs.fuel.network/) /

[GraphQL](https://docs.fuel.network/docs/graphql/) /

[Reference](https://docs.fuel.network/docs/graphql/reference/) /

Enums

## _Icon Link_ [Enums](https://docs.fuel.network/docs/graphql/reference/enums/\#enums)

## _Icon Link_ [`BlockVersion`](https://docs.fuel.network/docs/graphql/reference/enums/\#blockversion)

The version of the block.

`V1`:
Version 1.

## _Icon Link_ [`ConsensusParametersVersion`](https://docs.fuel.network/docs/graphql/reference/enums/\#consensusparametersversion)

The version of the consensus parameters.

`V1`:
Version 1.

## _Icon Link_ [`ContractParametersVersion`](https://docs.fuel.network/docs/graphql/reference/enums/\#contractparametersversion)

The version of the contract-specific consensus parameters.

`V1`:
Version 1.

## _Icon Link_ [`FeeParametersVersion`](https://docs.fuel.network/docs/graphql/reference/enums/\#feeparametersversion)

The version of the fee-specific consensus parameters.

`V1`:
Version 1.

## _Icon Link_ [`GasCostsVersion`](https://docs.fuel.network/docs/graphql/reference/enums/\#gascostsversion)

The version of the gas-specific consensus parameters.

`V1`:
Version 1.

## _Icon Link_ [`HeaderVersion`](https://docs.fuel.network/docs/graphql/reference/enums/\#headerversion)

The version of the header.

`V1`:
Version 1.

## _Icon Link_ [`MessageState`](https://docs.fuel.network/docs/graphql/reference/enums/\#messagestate)

The state of a message, either `UNSPENT`, `SPENT`, or `NOT_FOUND`.

`UNSPENT`:
The message is unspent.

`SPENT`:
The message is spent.

`NOT_FOUND`:
The message was not found.

## _Icon Link_ [`ReceiptType`](https://docs.fuel.network/docs/graphql/reference/enums/\#receipttype)

The receipt type indicating what kind of transaction generated the receipt.

`CALL`:
The receipt was generated from a contract call.

`RETURN`:
The receipt was generated from a transaction that returned without data.

`RETURN_DATA`:
The receipt was generated from a transaction that returned data.

`PANIC`:
The receipt was generated from a failed contract call that panicked.

`REVERT`:
The receipt was generated from a failed contract call that reverted.

`LOG`:
The receipt was generated from a log in the contract. The Log receipt is generated for non-reference types, namely `bool`, `u8`, `u16`, `u32`, and `u64`.

`LOG_DATA`:
The receipt was generated from a log in the contract. `LogData` is generated for reference types which include all types except for the non\_reference types mentioned above.

`TRANSFER`:
The receipt was generated from a transaction that transferred coins to a contract.

`TRANSFER_OUT`:
The receipt was generated from a transaction that transferred coins to an address (rather than a contract).

`SCRIPT_RESULT`:
The receipt was generated from a script.

`MESSAGE_OUT`:
The receipt was generated from a message.

`MINT`:
The receipt was generated from a mint.

`BURN`:
The receipt was generated from a burn.

## _Icon Link_ [`PredicateParametersVersion`](https://docs.fuel.network/docs/graphql/reference/enums/\#predicateparametersversion)

The version of the predicate-specific consensus parameters.

`V1`:
Version 1.

## _Icon Link_ [`ReturnType`](https://docs.fuel.network/docs/graphql/reference/enums/\#returntype)

The type of return response for a transaction

`RETURN`:
Indicates the transaction returned without any data.

`RETURN_DATA`:
Indicates the transaction returned some data.

`REVERT`:
Indicates the transaction reverted.

## _Icon Link_ [`RunState`](https://docs.fuel.network/docs/graphql/reference/enums/\#runstate)

The state of a [`RunResult`](https://docs.fuel.network/docs/graphql/reference/objects/#runresult).

`COMPLETED`:
All breakpoints have been processed, and the program has terminated.

`BREAKPOINT`:
The program stopped on a breakpoint.

## _Icon Link_ [`ScriptParametersVersion`](https://docs.fuel.network/docs/graphql/reference/enums/\#scriptparametersversion)

The version of the script-specific consensus parameters.

`V1`:
Version 1.

## _Icon Link_ [`TxParametersVersion`](https://docs.fuel.network/docs/graphql/reference/enums/\#txparametersversion)

The version of the transaction-specific consensus parameters.

`V1`:
Version 1.