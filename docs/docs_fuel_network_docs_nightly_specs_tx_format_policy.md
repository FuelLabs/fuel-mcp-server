[Docs](https://docs.fuel.network/) /

Nightly  /

[Specs](https://docs.fuel.network/docs/nightly/specs/) /

[Tx Format](https://docs.fuel.network/docs/nightly/specs/tx-format/) /

Policy

## _Icon Link_ [Policy](https://docs.fuel.network/docs/nightly/specs/tx-format/policy/\#policy)

```fuel_Box fuel_Box-idXKMmm-css
// index using powers of 2 for efficient bitmasking
enum PolicyType : uint32 {
    Tip = 1,
    WitnessLimit = 2,
    Maturity = 4,
    MaxFee = 8,
    Expiration = 16,
}
```

_Icon ClipboardText_

| name | type | description |
| --- | --- | --- |
| `data` | One of [`Tip`](https://docs.fuel.network/docs/nightly/specs/tx-format/policy/#tip), [`WitnessLimit`](https://docs.fuel.network/docs/nightly/specs/tx-format/policy/#witnesslimit), [`Maturity`](https://docs.fuel.network/docs/nightly/specs/tx-format/policy/#maturity) or [`Expiration`](https://docs.fuel.network/docs/nightly/specs/tx-format/policy/#expiration) | Policy data. |

## _Icon Link_ [`Tip`](https://docs.fuel.network/docs/nightly/specs/tx-format/policy/\#tip)

| name | type | description |
| --- | --- | --- |
| `tip` | `uint64` | Additional, optional fee in `BASE_ASSET` to incentivize block producer to include transaction |

## _Icon Link_ [`WitnessLimit`](https://docs.fuel.network/docs/nightly/specs/tx-format/policy/\#witnesslimit)

| name | type | description |
| --- | --- | --- |
| `witnessLimit` | `uint64` | The maximum amount of witness data allowed for the transaction |

Given helper `len()` that returns the number of bytes of a field.

Transaction is invalid if:

- `len(tx.witnesses) > witnessLimit`

## _Icon Link_ [`Maturity`](https://docs.fuel.network/docs/nightly/specs/tx-format/policy/\#maturity)

| name | type | description |
| --- | --- | --- |
| `maturity` | `uint32` | Block until which the transaction cannot be included. |

Transaction is invalid if:

- `blockheight() < maturity`

## _Icon Link_ [`Expiration`](https://docs.fuel.network/docs/nightly/specs/tx-format/policy/\#expiration)

| name | type | description |
| --- | --- | --- |
| `expiration` | `uint32` | Block after which the transaction cannot be included. |

Transaction is invalid if:

- `blockheight() > expiration`

## _Icon Link_ [`MaxFee`](https://docs.fuel.network/docs/nightly/specs/tx-format/policy/\#maxfee)

| name | type | description |
| --- | --- | --- |
| `max_fee` | `uint64` | Required policy to specify the maximum fee payable by this transaction using `BASE_ASSET`. This is used to check transactions before the actual `gas_price` is known. |

Transaction is invalid if:

- `max_fee > sum_inputs(tx, BASE_ASSET_ID) - sum_outputs(tx, BASE_ASSET_ID)`
- `max_fee < max_fee(tx, BASE_ASSET_ID, gas_price)`