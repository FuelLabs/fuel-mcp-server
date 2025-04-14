[Docs](https://docs.fuel.network/) /

[Sway by Example Lib](https://docs.fuel.network/docs/sway-by-example-lib/) /

Base Asset

## _Icon Link_ [Base Asset](https://docs.fuel.network/docs/sway-by-example-lib/base-asset/\#base-asset)

Examples of base asset in Sway

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::{
    auth::{
        msg_sender,
    },
    call_frames::{
        msg_asset_id,
    },
    contract_id::ContractId,
    context::{
        balance_of,
        msg_amount,
    },
    asset::{
        transfer,
    },
};

abi MyContract {
    #[payable]
    fn deposit();
    fn withdraw(amount: u64);
    fn get_balance() -> u64;
}

impl MyContract for Contract {
    #[payable]
    fn deposit() {
        require(msg_asset_id() == AssetId::base(), "not base asset");
        require(msg_amount() > 0, "amount = 0");
    }

    fn withdraw(amount: u64) {
        transfer(msg_sender().unwrap(), AssetId::base(), amount);
    }

    fn get_balance() -> u64 {
        balance_of(ContractId::this(), AssetId::base())
    }
}

```

Collapse_Icon ClipboardText_