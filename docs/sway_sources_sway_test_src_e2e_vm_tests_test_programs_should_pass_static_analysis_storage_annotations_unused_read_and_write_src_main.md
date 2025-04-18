# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/static_analysis/storage_annotations_unused_read_and_write/src/main.sw

```sway
contract;

abi MyContract {
    #[storage(read, write)]
    fn foo() -> u64;
}

impl MyContract for Contract {
    #[storage(read, write)]
    fn foo() -> u64 {
        0
    }
}

```
