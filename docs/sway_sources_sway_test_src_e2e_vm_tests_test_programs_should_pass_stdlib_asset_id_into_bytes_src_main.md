# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/stdlib/asset_id_into_bytes/src/main.sw

```sway
script;

fn main() -> bool {
    use std::bytes::Bytes;
    
    let my_asset = AssetId::zero();
    let my_bytes: Bytes = my_asset.into();

    true
}

```
