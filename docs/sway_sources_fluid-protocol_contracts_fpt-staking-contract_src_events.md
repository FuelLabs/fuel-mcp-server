# Example: sway_sources/fluid-protocol/contracts/fpt-staking-contract/src/events.sw

```sway
library;

pub struct StakeEvent {
    pub user: Identity,
    pub amount: u64,
}

pub struct UnstakeEvent {
    pub user: Identity,
    pub amount: u64,
}

```
