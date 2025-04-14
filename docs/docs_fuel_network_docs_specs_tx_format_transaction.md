[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

[Tx Format](https://docs.fuel.network/docs/specs/tx-format/) /

Transaction

## _Icon Link_ [Transaction](https://docs.fuel.network/docs/specs/tx-format/transaction/\#transaction)

```fuel_Box fuel_Box-idXKMmm-css
enum TransactionType : uint8 {
    Script = 0,
    Create = 1,
    Mint = 2,
    Upgrade = 3,
    Upload = 4,
    Blob = 5,
}
```

_Icon ClipboardText_

| name | type | description |
| --- | --- | --- |
| `type` | [`TransactionType`](https://docs.fuel.network/docs/specs/tx-format/transaction/#transaction) | Transaction type. |
| `data` | One of [`TransactionScript`](https://docs.fuel.network/docs/specs/tx-format/transaction/#transactionscript), [`TransactionCreate`](https://docs.fuel.network/docs/specs/tx-format/transaction/#transactioncreate), [`TransactionMint`](https://docs.fuel.network/docs/specs/tx-format/transaction/#transactionmint), [`TransactionUpgrade`](https://docs.fuel.network/docs/specs/tx-format/transaction/#transactionupgrade), or [`TransactionUpload`](https://docs.fuel.network/docs/specs/tx-format/transaction/#transactionupload) | Transaction data. |

Given helper `max_gas()` returns the maximum gas that the transaction can use.
Given helper `count_ones()` that returns the number of ones in the binary representation of a field.
Given helper `count_variants()` that returns the number of variants in an enum.
Given helper `sum_variants()` that sums all variants of an enum.

Transaction is invalid if:

- `type` is not valid `TransactionType` value
- `inputsCount > MAX_INPUTS`
- `outputsCount > MAX_OUTPUTS`
- `witnessesCount > MAX_WITNESSES`
- `size > MAX_TRANSACTION_SIZE`. The size of a transaction is calculated as the sum of the sizes of its static and dynamic parts, as determined by canonical serialization.
- No inputs are of type `InputType.Coin` or `InputType.Message` with `input.dataLength` == 0
- More than one output is of type `OutputType.Change` for any asset ID in the input set
- More than one output is of type `OutputType.Change` with identical `asset_id` fields.
- Any output is of type `OutputType.Change` for any asset ID not in the input set
- More than one input of type `InputType.Coin` for any [Coin ID](https://docs.fuel.network/docs/specs/identifiers/utxo-id/#coin-id) in the input set
- More than one input of type `InputType.Contract` for any [Contract ID](https://docs.fuel.network/docs/specs/identifiers/utxo-id/#contract-id) in the input set
- More than one input of type `InputType.Message` for any [Message ID](https://docs.fuel.network/docs/specs/identifiers/utxo-id/#message-id) in the input set
- if `type != TransactionType.Mint`
  - `max_gas(tx) > MAX_GAS_PER_TX`
  - No policy of type `PolicyType.MaxFee` is set
  - `count_ones(policyTypes) > count_variants(PolicyType)`
  - `policyTypes > sum_variants(PolicyType)`
  - `len(policies) > count_ones(policyTypes)`

When serializing a transaction, fields are serialized as follows (with inner structs serialized recursively):

1. `uint8`, `uint16`, `uint32`, `uint64`: big-endian right-aligned to 8 bytes.
2. `byte[32]`: as-is.
3. `byte[]`: as-is, with padding zeroes aligned to 8 bytes.

When deserializing a transaction, the reverse is done. If there are insufficient bytes or too many bytes, the transaction is invalid.

## _Icon Link_ [`TransactionScript`](https://docs.fuel.network/docs/specs/tx-format/transaction/\#transactionscript)

```fuel_Box fuel_Box-idXKMmm-css
enum ReceiptType : uint8 {
    Call = 0,
    Return = 1,
    ReturnData = 2,
    Panic = 3,
    Revert = 4,
    Log = 5,
    LogData = 6,
    Transfer = 7,
    TransferOut = 8,
    ScriptResult = 9,
    MessageOut = 10,
    Mint = 11,
    Burn = 12,
}
```

_Icon ClipboardText_

| name | type | description |
| --- | --- | --- |
| `scriptGasLimit` | `uint64` | Gas limits the script execution. |
| `receiptsRoot` | `byte[32]` | Merkle root of receipts. |
| `scriptLength` | `uint64` | Script length, in instructions. |
| `scriptDataLength` | `uint64` | Length of script input data, in bytes. |
| `policyTypes` | `uint32` | Bitfield of used policy types. |
| `inputsCount` | `uint16` | Number of inputs. |
| `outputsCount` | `uint16` | Number of outputs. |
| `witnessesCount` | `uint16` | Number of witnesses. |
| `script` | `byte[]` | Script to execute. |
| `scriptData` | `byte[]` | Script input data (parameters). |
| `policies` | [Policy](https://docs.fuel.network/docs/specs/tx-format/policy/) `[]` | List of policies, sorted by `PolicyType`. |
| `inputs` | [Input](https://docs.fuel.network/docs/specs/tx-format/input/) `[]` | List of inputs. |
| `outputs` | [Output](https://docs.fuel.network/docs/specs/tx-format/output/) `[]` | List of outputs. |
| `witnesses` | [Witness](https://docs.fuel.network/docs/specs/tx-format/witness/) `[]` | List of witnesses. |

Given helper `len()` that returns the number of bytes of a field.

Transaction is invalid if:

- Any output is of type `OutputType.ContractCreated`
- `scriptLength > MAX_SCRIPT_LENGTH`
- `scriptDataLength > MAX_SCRIPT_DATA_LENGTH`
- `scriptLength * 4 != len(script)`
- `scriptDataLength != len(scriptData)`

> _Icon InfoCircle_
>
> **Note:** when signing a transaction, `receiptsRoot` is set to zero.
>
> **Note:** when verifying a predicate or executing a script, `receiptsRoot` is initialized to zero.

The receipts root `receiptsRoot` is the root of the [binary Merkle tree](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#binary-merkle-tree) of receipts. If there are no receipts, its value is set to the root of the empty tree, i.e. `0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

## _Icon Link_ [`TransactionCreate`](https://docs.fuel.network/docs/specs/tx-format/transaction/\#transactioncreate)

| name | type | description |
| --- | --- | --- |
| `bytecodeWitnessIndex` | `uint16` | Witness index of contract bytecode to create. |
| `salt` | `byte[32]` | Salt. |
| `storageSlotsCount` | `uint64` | Number of storage slots to initialize. |
| `policyTypes` | `uint32` | Bitfield of used policy types. |
| `inputsCount` | `uint16` | Number of inputs. |
| `outputsCount` | `uint16` | Number of outputs. |
| `witnessesCount` | `uint16` | Number of witnesses. |
| `storageSlots` | `(byte[32], byte[32]])[]` | List of storage slots to initialize (key, value). |
| `policies` | [Policy](https://docs.fuel.network/docs/specs/tx-format/policy/) `[]` | List of policies. |
| `inputs` | [Input](https://docs.fuel.network/docs/specs/tx-format/input/) `[]` | List of inputs. |
| `outputs` | [Output](https://docs.fuel.network/docs/specs/tx-format/output/) `[]` | List of outputs. |
| `witnesses` | [Witness](https://docs.fuel.network/docs/specs/tx-format/witness/) `[]` | List of witnesses. |

Transaction is invalid if:

- Any input is of type `InputType.Contract` or `InputType.Message` where `input.dataLength > 0`
- Any input uses non-base asset.
- Any output is of type `OutputType.Contract` or `OutputType.Variable` or `OutputType.Message`
- Any output is of type `OutputType.Change` with non-base `asset_id`
- It does not have exactly one output of type `OutputType.ContractCreated`
- `tx.data.witnesses[bytecodeWitnessIndex].dataLength > CONTRACT_MAX_SIZE`
- `bytecodeWitnessIndex >= tx.witnessesCount`
- The keys of `storageSlots` are not in ascending lexicographic order
- The computed contract ID (see below) is not equal to the `contractID` of the one `OutputType.ContractCreated` output
- `storageSlotsCount > MAX_STORAGE_SLOTS`
- The [Sparse Merkle tree](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#sparse-merkle-tree) root of `storageSlots` is not equal to the `stateRoot` of the one `OutputType.ContractCreated` output

Creates a contract with contract ID as computed [here](https://docs.fuel.network/docs/specs/identifiers/contract-id/).

## _Icon Link_ [`TransactionMint`](https://docs.fuel.network/docs/specs/tx-format/transaction/\#transactionmint)

The transaction is created by the block producer and is not signed. Since it is not usable outside of block creation or execution, all fields must be fully set upon creation without any zeroing.
This means that the transaction ID must also include the correct `txPointer` value, not zeroed out.

| name | type | description |
| --- | --- | --- |
| `txPointer` | [`TXPointer`](https://docs.fuel.network/docs/specs/tx-format/tx-pointer/) | The location of the `Mint` transaction in the block. |
| `inputContract` | [`InputContract`](https://docs.fuel.network/docs/specs/tx-format/input/) | The contract UTXO that assets are minted to. |
| `outputContract` | [`OutputContract`](https://docs.fuel.network/docs/specs/tx-format/output/) | The contract UTXO that assets are being minted to. |
| `mintAmount` | `uint64` | The amount of funds minted. |
| `mintAssetId` | `byte[32]` | The asset IDs corresponding to the minted amount. |
| `gasPrice` | `uint64` | The gas price to be used in calculating all fees for transactions on block |

Transaction is invalid if:

- `txPointer` is zero or doesn't match the block.
- `outputContract.inputIndex` is not zero

## _Icon Link_ [`TransactionUpgrade`](https://docs.fuel.network/docs/specs/tx-format/transaction/\#transactionupgrade)

The `Upgrade` transaction allows upgrading either consensus parameters or state transition function used by the network to produce future blocks. The `Upgrade Purpose` type defines the purpose of the upgrade.

The `Upgrade` transaction is chargeable, and the sender should pay for it. Transaction inputs should contain only base assets.

Only the privileged address from [`ConsensusParameters`](https://docs.fuel.network/docs/specs/tx-format/consensus_parameters/) can upgrade the network. The privileged address can be either a real account or a predicate.

When the upgrade type is `UpgradePurposeType.ConsensusParameters` serialized consensus parameters are available in the witnesses and the `Upgrade` transaction is self-contained because it has all the required information.

When the upgrade type is `UpgradePurposeType.StateTransition`, the `bytecodeRoot` field contains the Merkle root of the new bytecode of the state transition function. The bytecode should already be available on the blockchain at the upgrade point; otherwise, the upgrade will fail. The bytecode can be part of the genesis block or can be uploaded via the `TransactionUpload` transaction.

The block header contains information about which versions of consensus parameters and state transition function are used to produce a block, and the `Upgrade` transaction defines behavior corresponding to the version. When the block executes the `Upgrade` transaction, it defines new behavior for either `BlockHeader.consensusParametersVersion + 1` or `BlockHeader.stateTransitionBytecodeVersion + 1`(it depends on the purpose of the upgrade).

When the `Upgrade` transaction is included in the block, it doesn't affect the current block execution. Since behavior is now defined, the inclusion of the `Upgrade` transaction allows the production of the next block with a new version. The block producer can still continue to use the previous version and start using a new version later unless the state transition function forbids it.

The behavior is set once per version. It is forbidden to override the behavior of the network. Each behavior should have its own version. The version should grow monotonically without jumps.

The `BlockHeader.consensusParametersVersion` and `BlockHeader.stateTransitionBytecodeVersion` are independent and can grow at different speeds.

| name | type | description |
| --- | --- | --- |
| `upgradePurpose` | [UpgradePurpose](https://docs.fuel.network/docs/specs/tx-format/upgrade_purpose/) | The purpose of the upgrade. |
| `policyTypes` | `uint32` | Bitfield of used policy types. |
| `inputsCount` | `uint16` | Number of inputs. |
| `outputsCount` | `uint16` | Number of outputs. |
| `witnessesCount` | `uint16` | Number of witnesses. |
| `policies` | [Policy](https://docs.fuel.network/docs/specs/tx-format/policy/) `[]` | List of policies. |
| `inputs` | [Input](https://docs.fuel.network/docs/specs/tx-format/input/) `[]` | List of inputs. |
| `outputs` | [Output](https://docs.fuel.network/docs/specs/tx-format/output/) `[]` | List of outputs. |
| `witnesses` | [Witness](https://docs.fuel.network/docs/specs/tx-format/witness/) `[]` | List of witnesses. |

Transaction is invalid if:

- Any input is of type `InputType.Contract` or `InputType.Message` where `input.dataLength > 0`
- Any input uses non-base asset.
- Any output is of type `OutputType.Contract` or `OutputType.Variable` or `OutputType.Message` or `OutputType.ContractCreated`
- Any output is of type `OutputType.Change` with non-base `asset_id`
- No input where `InputType.Message.owner == PRIVILEGED_ADDRESS` or `InputType.Coint.owner == PRIVILEGED_ADDRESS`
- The `UpgradePurpose` is invalid

## _Icon Link_ [`TransactionUpload`](https://docs.fuel.network/docs/specs/tx-format/transaction/\#transactionupload)

The `Upload` transaction allows the huge bytecode to be divided into subsections and uploaded slowly to the chain. The [Binary Merkle root](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#binary-merkle-tree) built on top of subsections is an identifier of the bytecode.

Each transaction uploads a subsection of the code and must contain proof of connection to the root. All subsections should be uploaded sequentially, which allows the concatenation of previously uploaded subsections with new subsection. The bytecode is considered final when the last subsection is uploaded, and future `Upload` transactions with the same `root` fields should be rejected.

When the bytecode is completed it can be used to upgrade the network.

The size of each subsection can be arbitrary; the only limit is the maximum number of subsections allowed by the network. The combination of the transaction gas limit and the number of subsections limits the final maximum size of the bytecode.

| name | type | description |
| --- | --- | --- |
| `root` | `byte[32]` | The root of the Merkle tree is created over the bytecode. |
| `witnessIndex` | `uint16` | The witness index of the subsection of the bytecode. |
| `subsectionIndex` | `uint16` | The index of the subsection of the bytecode. |
| `subsectionsNumber` | `uint16` | The total number of subsections on which bytecode was divided. |
| `proofSetCount` | `uint16` | Number of Merkle nodes in the proof. |
| `policyTypes` | `uint32` | Bitfield of used policy types. |
| `inputsCount` | `uint16` | Number of inputs. |
| `outputsCount` | `uint16` | Number of outputs. |
| `witnessesCount` | `uint16` | Number of witnesses. |
| `proofSet` | `byte[32][]` | The proof set of Merkle nodes to verify the connection of the subsection to the `root`. |
| `policies` | [Policy](https://docs.fuel.network/docs/specs/tx-format/policy/) `[]` | List of policies. |
| `inputs` | [Input](https://docs.fuel.network/docs/specs/tx-format/input/) `[]` | List of inputs. |
| `outputs` | [Output](https://docs.fuel.network/docs/specs/tx-format/output/) `[]` | List of outputs. |
| `witnesses` | [Witness](https://docs.fuel.network/docs/specs/tx-format/witness/) `[]` | List of witnesses. |

Transaction is invalid if:

- Any input is of type `InputType.Contract` or `InputType.Message` where `input.dataLength > 0`
- Any input uses non-base asset.
- Any output is of type `OutputType.Contract` or `OutputType.Variable` or `OutputType.Message` or `OutputType.ContractCreated`
- Any output is of type `OutputType.Change` with non-base `asset_id`
- `witnessIndex >= tx.witnessesCount`
- `subsectionIndex` >= `subsectionsNumber`
- `subsectionsNumber > MAX_BYTECODE_SUBSECTIONS`
- The [Binary Merkle tree](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#binary-merkle-tree) root calculated from `(witnesses[witnessIndex], subsectionIndex, subsectionsNumber, proofSet)` is not equal to the `root`. Root calculation is affected by all fields, so modification of one of them invalidates the proof.

## _Icon Link_ [`TransactionBlob`](https://docs.fuel.network/docs/specs/tx-format/transaction/\#transactionblob)

The `Blob` inserts a simple binary blob in the chain. It's raw immutable data that can be cheaply loaded by the VM and used as instructions or just data. Unlike `Create`, it doesn't hold any state or balances.

`Blob` s are content-addressed, i.e. the they are uniquely identified by hash of the data field. Programs running on the VM can load an already-posted blob just by the hash, without having to specify it in contract inputs.

| name | type | description |
| --- | --- | --- |
| `id` | `byte[32]` | Blob id, i.e. hash of the data. |
| `witnessIndex` | `uint16` | The witness index of the data. |
| `policyTypes` | `uint32` | Bitfield of used policy types. |
| `inputsCount` | `uint16` | Number of inputs. |
| `outputsCount` | `uint16` | Number of outputs. |
| `witnessesCount` | `uint16` | Number of witnesses. |
| `policies` | [Policy](https://docs.fuel.network/docs/specs/tx-format/policy/) `[]` | List of policies. |
| `inputs` | [Input](https://docs.fuel.network/docs/specs/tx-format/input/) `[]` | List of inputs. |
| `outputs` | [Output](https://docs.fuel.network/docs/specs/tx-format/output/) `[]` | List of outputs. |
| `witnesses` | [Witness](https://docs.fuel.network/docs/specs/tx-format/witness/) `[]` | List of witnesses. |

Transaction is invalid if:

- Any input is of type `InputType.Contract` or `InputType.Message` where `input.dataLength > 0`
- Any input uses non-base asset.
- Any output is of type `OutputType.Contract` or `OutputType.Variable` or `OutputType.Message` or `OutputType.ContractCreated`
- Any output is of type `OutputType.Change` with non-base `asset_id`
- `witnessIndex >= tx.witnessesCount`
- `sha256(witnesses[witnessIndex]) != id`