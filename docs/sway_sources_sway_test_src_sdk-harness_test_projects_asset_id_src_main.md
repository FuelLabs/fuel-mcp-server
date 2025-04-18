# Example: sway_sources/sway/test/src/sdk-harness/test_projects/asset_id/src/main.sw

```sway
contract;

abi AssetIdTestContract {
    fn get_base_asset_id() -> AssetId;
}

impl AssetIdTestContract for Contract {
    fn get_base_asset_id() -> AssetId {
        AssetId::base()
    }
}

```
