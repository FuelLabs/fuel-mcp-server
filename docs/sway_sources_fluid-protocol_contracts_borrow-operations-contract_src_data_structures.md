# Example: sway_sources/fluid-protocol/contracts/borrow-operations-contract/src/data_structures.sw

```sway
library;

pub struct AssetContracts {
    pub trove_manager: ContractId,
    pub oracle: ContractId,
}

pub struct LocalVariablesOpenTrove {
    pub price: u64,
    pub usdf_fee: u64,
    pub net_debt: u64,
    pub icr: u64,
    pub nicr: u64,
    pub stake: u64,
    pub array_index: u64,
}

impl LocalVariablesOpenTrove {
    pub fn new() -> Self {
        LocalVariablesOpenTrove {
            price: 0,
            usdf_fee: 0,
            net_debt: 0,
            icr: 0,
            nicr: 0,
            stake: 0,
            array_index: 0,
        }
    }
}

pub struct LocalVariablesAdjustTrove {
    pub price: u64,
    pub coll_change: u64,
    pub net_debt_change: u64,
    pub is_coll_increase: bool,
    pub debt: u64,
    pub coll: u64,
    pub old_icr: u64,
    pub new_icr: u64,
    pub new_tcr: u64,
    pub usdf_fee: u64,
    pub new_debt: u64,
    pub new_coll: u64,
    pub stake: u64,
}

impl LocalVariablesAdjustTrove {
    pub fn new() -> Self {
        LocalVariablesAdjustTrove {
            price: 0,
            coll_change: 0,
            net_debt_change: 0,
            is_coll_increase: false,
            debt: 0,
            coll: 0,
            old_icr: 0,
            new_icr: 0,
            new_tcr: 0,
            usdf_fee: 0,
            new_debt: 0,
            new_coll: 0,
            stake: 0,
        }
    }
}

```
