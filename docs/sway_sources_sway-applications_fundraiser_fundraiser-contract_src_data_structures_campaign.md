# Example: sway_sources/sway-applications/fundraiser/fundraiser-contract/src/data_structures/campaign.sw

```sway
library;

/// Used to track the campaigns that a user has created.
pub struct Campaign {
    /// The unique identifier for the campaign.
    pub id: u64,
}

impl Campaign {
    /// Creates a new campaign.
    ///
    /// # Arguments
    ///
    /// * `id`: [u64] - The unique identifier for the campaign.
    pub fn new(id: u64) -> Self {
        Self { id }
    }
}

```
