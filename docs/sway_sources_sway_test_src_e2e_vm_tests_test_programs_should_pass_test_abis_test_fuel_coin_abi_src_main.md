# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/test_abis/test_fuel_coin_abi/src/main.sw

```sway
library;

abi TestFuelCoin {
    fn mint(mint_amount: u64);
    fn burn(burn_amount: u64);
    fn force_transfer(coins: u64, asset_id: AssetId, c_id: ContractId);
}

```
