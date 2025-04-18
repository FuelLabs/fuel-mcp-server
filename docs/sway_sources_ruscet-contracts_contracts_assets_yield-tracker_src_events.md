# Example: sway_sources/ruscet-contracts/contracts/assets/yield-tracker/src/events.sw

```sway
// SPDX-License-Identifier: Apache-2.0
library;

pub struct SetGov {
    pub gov: Identity,
}

pub struct SetYieldAssetContract {
    pub yield_asset_contr: ContractId,
}

pub struct SetTimeDistributor {
    pub time_distributor: ContractId,
}
```
