[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

[Identifiers](https://docs.fuel.network/docs/specs/identifiers/) /

Blob Id

## _Icon Link_ [Blob ID](https://docs.fuel.network/docs/specs/identifiers/blob-id/\#blob-id)

The _blob ID_ (also called _blob hash_) of a transaction is computed as
the [hash](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#hashing) of the blob data.

Blob ID calculation doesn't vary between chains.

```fuel_Box fuel_Box-idXKMmm-css
sha256(blob_data)
```

_Icon ClipboardText_