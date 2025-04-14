[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

[Tx Format](https://docs.fuel.network/docs/specs/tx-format/) /

Output

## _Icon Link_ [Output](https://docs.fuel.network/docs/specs/tx-format/output/\#output)

```fuel_Box fuel_Box-idXKMmm-css
enum OutputType : uint8 {
    Coin = 0,
    Contract = 1,
    Change = 2,
    Variable = 3,
    ContractCreated = 4,
}
```

_Icon ClipboardText_

| name | type | description |
| --- | --- | --- |
| `type` | [`OutputType`](https://docs.fuel.network/docs/specs/tx-format/output/#output) | Type of output. |
| `data` | One of [`OutputCoin`](https://docs.fuel.network/docs/specs/tx-format/output/#outputcoin), [`OutputContract`](https://docs.fuel.network/docs/specs/tx-format/output/#outputcontract), [`OutputChange`](https://docs.fuel.network/docs/specs/tx-format/output/#outputchange), [`OutputVariable`](https://docs.fuel.network/docs/specs/tx-format/output/#outputvariable), or [`OutputContractCreated`](https://docs.fuel.network/docs/specs/tx-format/output/#outputcontractcreated). | Output data. |

Transaction is invalid if:

- `type > OutputType.ContractCreated`

## _Icon Link_ [`OutputCoin`](https://docs.fuel.network/docs/specs/tx-format/output/\#outputcoin)

| name | type | description |
| --- | --- | --- |
| `to` | `byte[32]` | Receiving address or predicate root. |
| `amount` | `uint64` | Amount of coins to send. |
| `asset_id` | `byte[32]` | Asset ID of coins. |

## _Icon Link_ [`OutputContract`](https://docs.fuel.network/docs/specs/tx-format/output/\#outputcontract)

| name | type | description |
| --- | --- | --- |
| `inputIndex` | `uint16` | Index of input contract. |
| `balanceRoot` | `byte[32]` | Root of amount of coins owned by contract after transaction execution. |
| `stateRoot` | `byte[32]` | State root of contract after transaction execution. |

Transaction is invalid if:

- `inputIndex >= tx.inputsCount`
- `tx.inputs[inputIndex].type != InputType.Contract`

> _Icon InfoCircle_
>
> **Note:** when signing a transaction, `balanceRoot` and `stateRoot` are set to zero.
>
> **Note:** when verifying a predicate or executing a script, `balanceRoot` and `stateRoot` are initialized to zero.

The balance root `balanceRoot` is the root of the [SMT](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#sparse-merkle-tree) of balance leaves. Each balance is a `uint64`, keyed by asset ID (a `byte[32]`).

The state root `stateRoot` is the root of the [SMT](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#sparse-merkle-tree) of storage slots. Each storage slot is a `byte[32]`, keyed by a `byte[32]`.

## _Icon Link_ [`OutputChange`](https://docs.fuel.network/docs/specs/tx-format/output/\#outputchange)

| name | type | description |
| --- | --- | --- |
| `to` | `byte[32]` | Receiving address or predicate root. |
| `amount` | `uint64` | Amount of coins to send. |
| `asset_id` | `byte[32]` | Asset ID of coins. |

Transaction is invalid if:

- any other output has type `OutputType.OutputChange` and asset ID `asset_id` (i.e. only one change output per asset ID is allowed)

> _Icon InfoCircle_
>
> **Note:** when signing a transaction, `amount` is set to zero.
>
> **Note:** when verifying a predicate or executing a script, `amount` is initialized to zero.

This output type indicates that the output's amount may vary based on transaction execution, but is otherwise identical to a [Coin](https://docs.fuel.network/docs/specs/tx-format/output/#outputcoin) output. An `amount` of zero after transaction execution indicates that the output is unspendable and can be pruned from the UTXO set.

## _Icon Link_ [`OutputVariable`](https://docs.fuel.network/docs/specs/tx-format/output/\#outputvariable)

| name | type | description |
| --- | --- | --- |
| `to` | `byte[32]` | Receiving address or predicate root. |
| `amount` | `uint64` | Amount of coins to send. |
| `asset_id` | `byte[32]` | Asset ID of coins. |

> _Icon InfoCircle_
>
> **Note:** when signing a transaction, `to`, `amount`, and `asset_id` are set to zero.
>
> **Note:** when verifying a predicate or executing a script, `to`, `amount`, and `asset_id` are initialized to zero.

This output type indicates that the output's amount and owner may vary based on transaction execution, but is otherwise identical to a [Coin](https://docs.fuel.network/docs/specs/tx-format/output/#outputcoin) output. An `amount` of zero after transaction execution indicates that the output is unspendable and can be pruned from the UTXO set.

## _Icon Link_ [`OutputContractCreated`](https://docs.fuel.network/docs/specs/tx-format/output/\#outputcontractcreated)

| name | type | description |
| --- | --- | --- |
| `contractID` | `byte[32]` | Contract ID. |
| `stateRoot` | `byte[32]` | Initial state root of contract. |