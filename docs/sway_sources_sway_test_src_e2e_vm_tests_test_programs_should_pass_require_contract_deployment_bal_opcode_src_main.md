# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/require_contract_deployment/bal_opcode/src/main.sw

```sway
script;

use balance_test_abi::BalanceTest;

#[cfg(experimental_new_encoding = false)]
const CONTRACT_ID = 0xf6cd545152ac83225e8e7df2efb5c6fa6e37bc9b9e977b5ea8103d28668925df;
#[cfg(experimental_new_encoding = true)]
const CONTRACT_ID = 0xe78343b4ba20a65a3d012ab5f33366c0138672c71032d0c17f3f0485bd820477; // AUTO-CONTRACT-ID ../../test_contracts/balance_test_contract --release

fn main() -> bool {
    let balance_test_contract = abi(BalanceTest, CONTRACT_ID);
    let number = balance_test_contract.get_42 {
        gas: u64::max()
    }
    ();

    let balance = asm(asset_bal, asset: AssetId::base(), id: CONTRACT_ID) {
        bal asset_bal asset id;
        asset_bal: u64
    };
    assert(balance == 0);
    assert(number == 42);

    true
}

```
