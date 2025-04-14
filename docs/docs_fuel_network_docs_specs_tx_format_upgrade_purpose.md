[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

[Tx Format](https://docs.fuel.network/docs/specs/tx-format/) /

Upgrade Purpose

## _Icon Link_ [`UpgradePurposeType`](https://docs.fuel.network/docs/specs/tx-format/upgrade_purpose/\#upgradepurposetype)

```fuel_Box fuel_Box-idXKMmm-css
enum UpgradePurposeType : uint8 {
    ConsensusParameters = 0,
    StateTransition = 1,
}
```

_Icon ClipboardText_

| name | type | description |
| --- | --- | --- |
| `type` | [`UpgradePurposeType`](https://docs.fuel.network/docs/specs/tx-format/upgrade_purpose/#upgradepurposetype) | Type of upgrade purpose. |
| `data` | One of [`ConsensusParameters`](https://docs.fuel.network/docs/specs/tx-format/upgrade_purpose/#consensusparameters), [`StateTransition`](https://docs.fuel.network/docs/specs/tx-format/upgrade_purpose/#statetransition) | Upgrade purposes. |

Transaction is invalid if:

- `type` is not valid `UpgradePurposeType` value\`

## _Icon Link_ [`ConsensusParameters`](https://docs.fuel.network/docs/specs/tx-format/upgrade_purpose/\#consensusparameters)

| name | type | description |
| --- | --- | --- |
| `witnessIndex` | `uint16` | Index of witness that contains a serialized(with [postcard _Icon Link_](https://docs.rs/postcard/latest/postcard/)) consensus parameters. |
| `checksum` | `byte[32]` | The hash of the serialized consensus parameters. |

Given helper `deserialize_consensus_parameters()` that deserializes the consensus parameters from a witness by using [postcard _Icon Link_](https://docs.rs/postcard/latest/postcard/) algorithm.

Transaction is invalid if:

- `witnessIndex >= tx.witnessesCount`
- `checksum != sha256(tx.data.witnesses[witnessIndex])`
- `deserialize_consensus_parameters(tx.data.witnesses[witnessIndex])` returns an error.

## _Icon Link_ [`StateTransition`](https://docs.fuel.network/docs/specs/tx-format/upgrade_purpose/\#statetransition)

| name | type | description |
| --- | --- | --- |
| `bytecodeRoot` | `byte[32]` | The root of the new bytecode of the state transition function. |