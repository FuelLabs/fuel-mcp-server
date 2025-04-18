# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/static_analysis/cei_pattern_violation_in_intrinsic_call/src/main.sw

```sway
contract;

use std::storage::storage_api::write;

abi TestAbi {
  #[storage(write)]
  fn deposit(amount: u64);
}

impl TestAbi for Contract {
  #[storage(write)]
  fn deposit(amount: u64) {
    // 1st intrinsic argument is a code block with interaction
    // 2nd intrinsic argument is a code block with effect
    __add(
      {
        // interaction
        abi(TestAbi, 0x3dba0a4455b598b7655a7fb430883d96c9527ef275b49739e7b0ad12f8280eae).deposit(amount);
        21
      },
      {
        // effect -- therefore violation of CEI where effect should go before interaction
        // (assuming left-to-right function argument evaluation)
        write(0x3dba0a4455b598b7655a7fb430883d96c9527ef275b49739e7b0ad12f8280eae, 0, ());
        21
      }
    );
  }
}

```
