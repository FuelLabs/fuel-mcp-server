[Docs](https://docs.fuel.network/) /

[Specs](https://docs.fuel.network/docs/specs/) /

[Identifiers](https://docs.fuel.network/docs/specs/identifiers/) /

Asset

## _Icon Link_ [Asset ID](https://docs.fuel.network/docs/specs/identifiers/asset/\#asset-id)

The _asset ID_ (also called _asset hash_) of a asset is computed as
the [hash](https://docs.fuel.network/docs/specs/protocol/cryptographic-primitives/#hashing) of the `CONTRACT_ID` and a 256-bit `SUB_IDENTIFIER`.

```fuel_Box fuel_Box-idXKMmm-css
sha256(CONTRACT_ID ++ SUB_IDENTIFIER)
```

_Icon ClipboardText_