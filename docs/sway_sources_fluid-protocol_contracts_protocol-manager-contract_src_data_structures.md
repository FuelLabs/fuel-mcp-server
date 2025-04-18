# Example: sway_sources/fluid-protocol/contracts/protocol-manager-contract/src/data_structures.sw

```sway
library;

pub struct RedemptionTotals {
    pub remaining_usdf: u64,
    pub total_usdf_to_redeem: u64,
    pub total_asset_drawn: u64,
    pub asset_fee: u64,
    pub asset_to_send_to_redeemer: u64,
    pub price: u64,
    pub total_usdf_supply_at_start: u64,
}

impl RedemptionTotals {
    pub fn default() -> Self {
        RedemptionTotals {
            remaining_usdf: 0,
            total_usdf_to_redeem: 0,
            total_asset_drawn: 0,
            asset_fee: 0,
            asset_to_send_to_redeemer: 0,
            price: 0,
            total_usdf_supply_at_start: 0,
        }
    }
}

pub struct AssetInfo {
    pub assets: Vec<AssetId>,
    pub asset_contracts: Vec<AssetContracts>,
    pub prices: Vec<u64>,
    pub system_debts: Vec<u64>,
    pub redemption_totals: Vec<RedemptionTotals>,
    pub current_borrowers: Vec<Identity>,
    pub current_crs: Vec<u64>,
}

pub struct AssetContracts {
    pub trove_manager: ContractId,
    pub oracle: ContractId,
    pub asset_address: AssetId,
}

```
