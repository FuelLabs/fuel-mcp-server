[Docs](https://docs.fuel.network/) /

[GraphQL](https://docs.fuel.network/docs/graphql/) /

[Reference](https://docs.fuel.network/docs/graphql/reference/) /

Unions

## _Icon Link_ [Union Types](https://docs.fuel.network/docs/graphql/reference/unions/\#union-types)

## _Icon Link_ [`CoinType`](https://docs.fuel.network/docs/graphql/reference/unions/\#cointype)

The type of coin being used.

**Types:**

[`Coin`](https://docs.fuel.network/docs/graphql/reference/objects/#coin): A standard coin.

[`MessageCoin`](https://docs.fuel.network/docs/graphql/reference/objects/#messagecoin): A message coin.

## _Icon Link_ [`Consensus`](https://docs.fuel.network/docs/graphql/reference/unions/\#consensus)

The type of consensus mechanism used to validate a block.

**Types:**

[`Genesis`](https://docs.fuel.network/docs/graphql/reference/objects/#genesis): Genesis consensus

[`PoAConsensus`](https://docs.fuel.network/docs/graphql/reference/objects/#poaconsensus): PoA
consensus

## _Icon Link_ [`DependentCost`](https://docs.fuel.network/docs/graphql/reference/unions/\#dependentcost)

Contains the dependent cost of opcodes.

**Types:**

[`LightOperation`](https://docs.fuel.network/docs/graphql/reference/objects/#lightoperation): Operations that can process many units with 1 gas

[`HeavyOperation`](https://docs.fuel.network/docs/graphql/reference/objects/#heavyoperation): Operations that require more than 1 gas to process a single unit

## _Icon Link_ [`DryRunTransactionStatus`](https://docs.fuel.network/docs/graphql/reference/unions/\#dryruntransactionstatus)

The status of a transaction dry run.

**Types:**

[`DryRunSuccessStatus`](https://docs.fuel.network/docs/graphql/reference/objects/#dryrunsuccessstatus): The transaction dry run was successful.

[`DryRunFailureStatus`](https://docs.fuel.network/docs/graphql/reference/objects/#dryrunfailurestatus): The transaction dry run failed.

## _Icon Link_ [`Input`](https://docs.fuel.network/docs/graphql/reference/unions/\#input)

An input type for a transaction.

**Types:**

[`InputCoin`](https://docs.fuel.network/docs/graphql/reference/objects/#inputcoin): An input type for
a coin.

[`InputContract`](https://docs.fuel.network/docs/graphql/reference/objects/#inputcontract): An input
type for a contract.

[`InputMessage`](https://docs.fuel.network/docs/graphql/reference/objects/#inputmessage): An input
type for a message.

## _Icon Link_ [`Output`](https://docs.fuel.network/docs/graphql/reference/unions/\#output)

An output type for a transaction.

**Types:**

[`CoinOutput`](https://docs.fuel.network/docs/graphql/reference/objects/#coinoutput): Indicates coins
were forwarded from one address to another.
Can be used during transaction creation when the recipient, asset, and amount is known.

[`ContractOutput`](https://docs.fuel.network/docs/graphql/reference/objects/#contractoutput):
Indicates the transaction updated the state of a contract.

[`ChangeOutput`](https://docs.fuel.network/docs/graphql/reference/objects/#changeoutput): Indicates
that the output's amount may vary based on transaction execution, but is
otherwise identical to a Coin output. Output changes are always guaranteed to
have an amount of zero since they're only set after execution terminates.

[`VariableOutput`](https://docs.fuel.network/docs/graphql/reference/objects/#variableoutput): Similar
to `ChangeOutput`, this output type indicates that the output's amount may vary
based on transaction execution, but is otherwise identical to a Coin output. On
initialization, the amount on variable outputs is zero, but during execution
they could be set to a non-zero value.

[`ContractCreated`](https://docs.fuel.network/docs/graphql/reference/objects/#contractcreated):
Indicates a contract was deployed.

## _Icon Link_ [`RelayedTransactionStatus`](https://docs.fuel.network/docs/graphql/reference/unions/\#relayedtransactionstatus)

The status of a relayed transaction from a L1. If the transaction is valid, it will be included in part of a block. If the transaction is invalid, it will be skipped.

**Types:**

[`RelayedTransactionFailed`](https://docs.fuel.network/docs/graphql/reference/objects/#relayedtransactionfailed): Details about why the relayed transaction failed.

## _Icon Link_ [`TransactionStatus`](https://docs.fuel.network/docs/graphql/reference/unions/\#transactionstatus)

The status type of a transaction.

**Types:**

[`SubmittedStatus`](https://docs.fuel.network/docs/graphql/reference/objects/#submittedstatus): The transaction has been submitted.

[`SuccessStatus`](https://docs.fuel.network/docs/graphql/reference/objects/#successstatus): The transaction has succeeded.

[`SqueezedOutStatus`](https://docs.fuel.network/docs/graphql/reference/objects/#squeezedoutstatus): The transaction was kicked out of the mempool.

[`FailureStatus`](https://docs.fuel.network/docs/graphql/reference/objects/#failurestatus): The transaction has failed.

## _Icon Link_ [`UpgradePurpose`](https://docs.fuel.network/docs/graphql/reference/unions/\#upgradepurpose)

The purpose of a network upgrade.

**Types:**

[`ConsensusParametersPurpose`](https://docs.fuel.network/docs/graphql/reference/objects/#consensusparameterspurpose): The consensus parameters are being upgraded.

[`StateTransitionPurpose`](https://docs.fuel.network/docs/graphql/reference/objects/#statetransitionpurpose): The state transition is being upgraded.