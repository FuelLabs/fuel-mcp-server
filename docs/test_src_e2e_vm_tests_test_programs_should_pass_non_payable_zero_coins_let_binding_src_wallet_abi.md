# Example: test/src/e2e_vm_tests/test_programs/should_pass/non_payable_zero_coins_let_binding/src/wallet_abi.sw

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
