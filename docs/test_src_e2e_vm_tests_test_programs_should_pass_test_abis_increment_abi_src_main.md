# Example: test/src/e2e_vm_tests/test_programs/should_pass/test_abis/increment_abi/src/main.sw

```sway
library;

abi Incrementor {
    #[storage(read, write)]
    fn increment(initial_value: u64) -> u64;

    #[storage(read, write)]
    fn increment_or_not(initial_value: Option<u64>) -> u64;

    #[storage(read)]
    fn get() -> u64;
}

```
