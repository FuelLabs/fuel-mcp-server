# Example: sway_sources/sway-applications/fundraiser/fundraiser-contract/src/data_structures/asset_info.sw

```sway
library;

/// Used to track the total amount pledged to an asset.
pub struct AssetInfo {
    /// The amount that is currently pledged.
    pub amount: u64,
}

impl AssetInfo {
    /// Creates a new `AssetInfo` with no pledges.
    ///
    /// # Returns
    ///
    /// * [AssetInfo] - The new `AssetInfo`.
    pub fn new() -> Self {
        Self { amount: 0 }
    }
}

```
