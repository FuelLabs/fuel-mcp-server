# Example: sway_sources/fluid-protocol/contracts/trove-manager-contract/src/data_structures.sw

```sway
library;

use libraries::trove_manager_interface::data_structures::Status;
pub struct Trove {
    pub debt: u64,
    pub coll: u64,
    pub stake: u64,
    pub array_index: u64,
    pub status: Status,
}
impl Trove {
    pub fn default() -> Self {
        Trove {
            debt: 0,
            coll: 0,
            stake: 0,
            array_index: 0,
            status: Status::NonExistent,
        }
    }
}
pub struct LocalVariablesOuterLiquidationFunction {
    pub price: u64,
    pub usdf_in_stability_pool: u64,
    pub liquidated_debt: u64,
    pub liquidated_coll: u64,
}
impl LocalVariablesOuterLiquidationFunction {
    pub fn default() -> Self {
        LocalVariablesOuterLiquidationFunction {
            price: 0,
            usdf_in_stability_pool: 0,
            liquidated_debt: 0,
            liquidated_coll: 0,
        }
    }
}
pub struct LocalVariablesLiquidationSequence {
    pub remaining_usdf_in_stability_pool: u64,
    pub i: u64,
    pub icr: u64,
    pub borrower: Identity,
}
impl LocalVariablesLiquidationSequence {
    pub fn default() -> Self {
        LocalVariablesLiquidationSequence {
            remaining_usdf_in_stability_pool: 0,
            i: 0,
            icr: 0,
            borrower: Identity::Address(Address::zero()),
        }
    }
}
pub struct LiquidationValues {
    pub entire_trove_debt: u64,
    pub entire_trove_coll: u64,
    pub debt_to_offset: u64,
    pub coll_to_send_to_sp: u64,
    pub debt_to_redistribute: u64,
    pub coll_to_redistribute: u64,
    pub coll_surplus: u64,
    pub coll_gas_compensation: u64,
    pub is_partial_liquidation: bool,
    pub remaining_trove_coll: u64,
    pub remaining_trove_debt: u64,
}
impl LiquidationValues {
    pub fn default() -> Self {
        LiquidationValues {
            entire_trove_debt: 0,
            entire_trove_coll: 0,
            debt_to_offset: 0,
            coll_to_send_to_sp: 0,
            debt_to_redistribute: 0,
            coll_to_redistribute: 0,
            coll_surplus: 0,
            coll_gas_compensation: 0,
            is_partial_liquidation: false,
            remaining_trove_coll: 0,
            remaining_trove_debt: 0,
        }
    }
}
pub struct LiquidationTotals {
    pub total_debt_to_offset: u64,
    pub total_coll_to_send_to_sp: u64,
    pub total_debt_to_redistribute: u64,
    pub total_coll_to_redistribute: u64,
    pub total_coll_gas_compensation: u64,
    pub total_coll_surplus: u64,
    pub total_debt_in_sequence: u64,
    pub total_coll_in_sequence: u64,
}
impl LiquidationTotals {
    pub fn default() -> Self {
        LiquidationTotals {
            total_debt_to_offset: 0,
            total_coll_to_send_to_sp: 0,
            total_debt_to_redistribute: 0,
            total_coll_to_redistribute: 0,
            total_coll_gas_compensation: 0,
            total_coll_surplus: 0,
            total_debt_in_sequence: 0,
            total_coll_in_sequence: 0,
        }
    }
}
pub struct LiquidatedTroveValsInner {
    pub trove_debt_to_repay: u64,
    pub trove_coll_liquidated: u64,
    pub is_partial_liquidation: bool,
}
pub struct EntireTroveDebtAndColl {
    pub entire_trove_debt: u64,
    pub entire_trove_coll: u64,
    pub pending_debt_rewards: u64,
    pub pending_coll_rewards: u64,
}
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

```
