[Docs](https://docs.fuel.network/) /

Nightly  /

[Specs](https://docs.fuel.network/docs/nightly/specs/) /

[Tx Format](https://docs.fuel.network/docs/nightly/specs/tx-format/) /

Input

## _Icon Link_ [Input](https://docs.fuel.network/docs/nightly/specs/tx-format/input/\#input)

```fuel_Box fuel_Box-idXKMmm-css
enum InputType : uint8 {
    Coin = 0,
    Contract = 1,
    Message = 2,
}
```

_Icon ClipboardText_

| name | type | description |
| --- | --- | --- |
| `type` | [`InputType`](https://docs.fuel.network/docs/nightly/specs/tx-format/input/#input) | Type of input. |
| `data` | One of [`InputCoin`](https://docs.fuel.network/docs/nightly/specs/tx-format/input/#inputcoin), [`InputContract`](https://docs.fuel.network/docs/nightly/specs/tx-format/input/#inputcontract), or [`InputMessage`](https://docs.fuel.network/docs/nightly/specs/tx-format/input/#inputmessage) | Input data. |

Transaction is invalid if:

- `type > InputType.Message`

## _Icon Link_ [`InputCoin`](https://docs.fuel.network/docs/nightly/specs/tx-format/input/\#inputcoin)

| name | type | description |
| --- | --- | --- |
| `txID` | `byte[32]` | Hash of transaction. |
| `outputIndex` | `uint16` | Index of transaction output. |
| `owner` | `byte[32]` | Owning address or predicate root. |
| `amount` | `uint64` | Amount of coins. |
| `asset_id` | `byte[32]` | Asset ID of the coins. |
| `txPointer` | [`TXPointer`](https://docs.fuel.network/docs/nightly/specs/tx-format/tx-pointer/) | Points to the TX whose output is being spent. |
| `witnessIndex` | `uint16` | Index of witness that authorizes spending the coin. |
| `predicateGasUsed` | `uint64` | Gas used by predicate. |
| `predicateLength` | `uint64` | Length of predicate, in instructions. |
| `predicateDataLength` | `uint64` | Length of predicate input data, in bytes. |
| `predicate` | `byte[]` | Predicate bytecode. |
| `predicateData` | `byte[]` | Predicate input data (parameters). |

Given helper `len()` that returns the number of bytes of a field.

Transaction is invalid if:

- `witnessIndex >= tx.witnessesCount`
- `predicateLength > MAX_PREDICATE_LENGTH`
- `predicateDataLength > MAX_PREDICATE_DATA_LENGTH`
- If `predicateLength > 0`; the computed predicate root (see below) is not equal `owner`
- `predicateLength * 4 != len(predicate)`
- `predicateDataLength != len(predicateData)`
- `predicateGasUsed > MAX_GAS_PER_PREDICATE`

> _Icon InfoCircle_
>
> **Note:** when signing a transaction, `txPointer` and `predicateGasUsed` are set to zero.
>
> **Note:** when verifying and estimating a predicate or executing a script, `txPointer` and `predicateGasUsed` are initialized to zero.

The predicate root is computed [here](https://docs.fuel.network/docs/nightly/specs/identifiers/predicate-id/).

## _Icon Link_ [`InputContract`](https://docs.fuel.network/docs/nightly/specs/tx-format/input/\#inputcontract)

| name | type | description |
| --- | --- | --- |
| `txID` | `byte[32]` | Hash of transaction. |
| `outputIndex` | `uint16` | Index of transaction output. |
| `balanceRoot` | `byte[32]` | Root of amount of coins owned by contract before transaction execution. |
| `stateRoot` | `byte[32]` | State root of contract before transaction execution. |
| `txPointer` | [`TXPointer`](https://docs.fuel.network/docs/nightly/specs/tx-format/tx-pointer/) | Points to the TX whose output is being spent. |
| `contractID` | `byte[32]` | Contract ID. |

Transaction is invalid if:

- there is not exactly one output of type `OutputType.Contract` with `inputIndex` equal to this input's index

> _Icon InfoCircle_
>
> **Note:** when signing a transaction, `txID`, `outputIndex`, `balanceRoot`, `stateRoot`, and `txPointer` are set to zero.
>
> **Note:** when verifying a predicate or executing a script, `txID`, `outputIndex`, `balanceRoot`, `stateRoot`, and `txPointer` are initialized to zero.

## _Icon Link_ [`InputMessage`](https://docs.fuel.network/docs/nightly/specs/tx-format/input/\#inputmessage)

| name | type | description |
| --- | --- | --- |
| `sender` | `byte[32]` | The address of the message sender. |
| `recipient` | `byte[32]` | The address or predicate root of the message recipient. |
| `amount` | `uint64` | Amount of base asset coins sent with message. |
| `nonce` | `byte[32]` | The message nonce. |
| `witnessIndex` | `uint16` | Index of witness that authorizes spending the coin. |
| `predicateGasUsed` | `uint64` | Gas used by predicate execution. |
| `dataLength` | `uint64` | Length of message data, in bytes. |
| `predicateLength` | `uint64` | Length of predicate, in instructions. |
| `predicateDataLength` | `uint64` | Length of predicate input data, in bytes. |
| `data` | `byte[]` | The message data. |
| `predicate` | `byte[]` | Predicate bytecode. |
| `predicateData` | `byte[]` | Predicate input data (parameters). |

Given helper `len()` that returns the number of bytes of a field.

Transaction is invalid if:

- `witnessIndex >= tx.witnessesCount`
- `dataLength > MAX_MESSAGE_DATA_LENGTH`
- `predicateLength > MAX_PREDICATE_LENGTH`
- `predicateDataLength > MAX_PREDICATE_DATA_LENGTH`
- If `predicateLength > 0`; the computed predicate root (see below) is not equal `recipient`
- `dataLength != len(data)`
- `predicateLength * 4 != len(predicate)`
- `predicateDataLength != len(predicateData)`
- `predicateGasUsed > MAX_GAS_PER_PREDICATE`

The predicate root is computed [here](https://docs.fuel.network/docs/nightly/specs/identifiers/predicate-id/).

> _Icon InfoCircle_
>
> **Note:** `InputMessages` with data length greater than zero are not considered spent until they are included in a transaction of type `TransactionType.Script` with a `ScriptResult` receipt where `result` is equal to `0` indicating a successful script exit
>
> **Note:** when signing a transaction, `predicateGasUsed` is set to zero.
>
> **Note:** when verifying and estimating a predicate, `predicateGasUsed` is initialized to zero.