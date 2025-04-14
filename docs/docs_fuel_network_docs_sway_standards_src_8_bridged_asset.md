[Docs](https://docs.fuel.network/) /

[Sway Standards](https://docs.fuel.network/docs/sway-standards/) /

Src 8 Bridged Asset

## _Icon Link_ [SRC-8: Bridged Asset](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#src-8-bridged-asset)

The following standard attempts to define the retrieval of relevant on-chain metadata for any bridged [Native Assets _Icon Link_](https://docs.fuel.network/docs/sway/blockchain-development/native_assets). Any contract that implements the SRC-8 standard MUST implement the [SRC-7](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) and [SRC-20](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/) standards.

## _Icon Link_ [Motivation](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#motivation)

The SRC-8 standard seeks to enable relevant data for bridged assets on the Fuel Network. This data includes the origin chain, address, ID, decimals, and any arbitrary data. All metadata queries are done through a single function to facilitate cross-contract calls.

## _Icon Link_ [Prior Art](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#prior-art)

The use of generic metadata for [Native Assets _Icon Link_](https://docs.fuel.network/docs/sway/blockchain-development/native_assets) is defined in the [SRC-7](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) standard. This standard integrates into the existing [SRC-7](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) standard.

## _Icon Link_ [Specification](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#specification)

## _Icon Link_ [Asset Creation](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#asset-creation)

The `SubId` of the asset MUST be the digest of the `sha256(origin_chain_id, origin_asset_address, origin_asset_id)` hash where:

- `origin_chain_id` is a `String` of the chain ID where the asset was originally minted.
- `origin_asset_address` is a `b256` of the asset's address on the chain where the asset was originally minted.
- `origin_asset_id` is a `b256` of the asset's ID such as an NFT's ID on the chain where the asset was originally minted. IF there is no ID, `b256::zero()` SHALL be used.

## _Icon Link_ [SRC-20 Metadata](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#src-20-metadata)

Any bridged assets MUST use the name and symbol of the asset on the chain where the asset was originally minted.

## _Icon Link_ [SRC-7 Metadata](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#src-7-metadata)

## _Icon Link_ [`bridged:chain`](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#bridgedchain)

The key `bridged:chain` SHALL return an `String` variant of the chain ID where the asset was originally minted.

## _Icon Link_ [`bridged:address`](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#bridgedaddress)

The key `bridged:address` SHALL return a `B256` variant of the asset's address on the chain where the asset was originally minted. Native assets of a chain that do not have an address such as Ether on Ethereum SHALL use `b256::zero()`.

## _Icon Link_ [`bridged:id`](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#bridgedid)

The key `bridged:id` MAY return a `B256` variant of the asset's ID such as an NFT's ID on the chain where the asset was originally minted. IF there is no ID, `None` SHALL be returned.

## _Icon Link_ [`bridged:decimals`](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#bridgeddecimals)

The key `bridged:decimals` MAY return an `Int` variant of the asset's decimals on the chain where the asset was originally minted. IF there are no decimals, `None` SHALL be returned.

## _Icon Link_ [Rationale](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#rationale)

The SRC-8 standard should allow for data on any bridged assets on the Fuel Network. This standard builds off existing standards and should allow other contracts to query any relevant information on the bridged asset.

## _Icon Link_ [Backwards Compatibility](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#backwards-compatibility)

This standard is compatible with Fuel's [Native Assets _Icon Link_](https://docs.fuel.network/docs/sway/blockchain-development/native_assets), the [SRC-20](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/) standard, and the [SRC-7](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/) standard.

The standard is also compatible with both tokens and NFTs native to other ecosystems by introducing a token ID element of the original chain.

## _Icon Link_ [Security Considerations](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#security-considerations)

This standard does not call external contracts, nor does it define any mutations of the contract state.

## _Icon Link_ [Example](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/\#example)

```fuel_Box fuel_Box-idXKMmm-css
impl SRC7 for Contract {
    fn metadata(asset: AssetId, key: String) -> Option<Metadata> {
        if (asset != AssetId::default()) {
            return Option::None;
        }

        match key {
            String::from_ascii_str("bridged:chain") => {
                Option::Some(String::from_ascii_str("1"))
            },
            String::from_ascii_str("bridged:address") => {
                let origin_asset_address = b256::zero();
                Option::Some(Metadata::B256(origin_asset_address))
            },
            String::from_ascii_str("bridged:id") => {
                let origin_asset_id = b256::zero();
                Option::Some(Metadata::B256(origin_asset_id))
            },
            String::from_ascii_str("bridged:decimals") => {
                Option::Some(Metadata::Int(1))
            },
            _ => Option::None,
        }
    }
}

impl SRC20 for Contract {
    fn total_assets() -> u64 {
        1
    }

    fn total_supply(asset: AssetId) -> Option<u64> {
        match asset {
            AssetId::default() => Option::Some(1),
            _ => Option::None,
        }
    }

    fn name(asset: AssetId) -> Option<String> {
        match asset {
            AssetId::default() => Option::Some(String::from_ascii_str("Name")),
            _ => Option::None,
        }
    }

    fn symbol(asset: AssetId) -> Option<String> {
        match asset {
            AssetId::default() => Option::Some(String::from_ascii_str("Symbol")),
            _ => Option::None,
        }
    }

    fn decimals(asset: AssetId) -> Option<u8> {
        match asset {
            AssetId::default() => Option::Some(0u8),
            _ => Option::None,
        }
    }
}
```

Collapse_Icon ClipboardText_