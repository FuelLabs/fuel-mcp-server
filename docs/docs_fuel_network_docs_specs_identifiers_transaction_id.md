[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

[Identifiers](https://docs.fuel.network/docs/specs/identifiers/) /

Transaction Id

## _Icon Link_ [Transaction ID](https://docs.fuel.network/docs/specs/identifiers/transaction-id/\#transaction-id)

The _transaction ID_ (also called _transaction hash_) of a transaction is computed as
the [hash](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#hashing) of `CHAIN_ID` and the
[serialized transaction](https://docs.fuel.network/docs/specs/tx-format/transaction/) with [fields zeroed out for signing](https://docs.fuel.network/docs/specs/tx-format/)
(see different inputs and outputs for which fields are set to zero), and without witness data. In other words, only
all non-witness data is hashed.

```fuel_Box fuel_Box-idXKMmm-css
sha256(CHAIN_ID ++ serialized_tx(tx))
```

_Icon ClipboardText_