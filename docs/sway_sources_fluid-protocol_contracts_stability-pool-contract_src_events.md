# Example: sway_sources/fluid-protocol/contracts/stability-pool-contract/src/events.sw

```sway
library;

pub struct ProvideToStabilityPoolEvent {
    pub user: Identity,
    pub amount_to_deposit: u64,
    pub initial_amount: u64,
    pub compounded_amount: u64,
}

pub struct WithdrawFromStabilityPoolEvent {
    pub user: Identity,
    pub amount_to_withdraw: u64,
    pub initial_amount: u64,
    pub compounded_amount: u64,
}

pub struct StabilityPoolLiquidationEvent {
    pub asset_id: AssetId,
    pub debt_to_offset: u64,
    pub collateral_to_offset: u64,
}

```
