# Example: sway_sources/ruscet-contracts/contracts/assets/time-distributor/src/events.sw

```sway
// SPDX-License-Identifier: Apache-2.0
library;

pub struct Distribute {
    pub receiver: Identity,
    pub amount: u64
}

pub struct DistributionChange {
    pub receiver: Identity,
    pub amount: u64,
    pub reward_asset: AssetId
}

pub struct AssetsPerIntervalChange {
    pub receiver: Identity,
    pub amount: u64
}
```
