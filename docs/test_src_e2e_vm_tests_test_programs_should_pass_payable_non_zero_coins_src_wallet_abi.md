# Example: test/src/e2e_vm_tests/test_programs/should_pass/payable_non_zero_coins/src/wallet_abi.sw

```sway
library;

abi Wallet {
    #[payable, storage(read, write)]
    fn receive_funds();

    // non-payable method
    #[storage(read, write)]
    fn send_funds(amount_to_send: u64, recipient_address: Address);
}

```
