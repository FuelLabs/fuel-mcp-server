# Example: test/src/e2e_vm_tests/test_programs/should_pass/static_analysis/storage_annotations_unused_write/src/main.sw

```sway
contract;

abi MyContract {
    #[storage(write)] // Or any other storage annotation
    fn foo() -> u64;
}

impl MyContract for Contract {
    #[storage(write)] // Or any other storage annotation
    fn foo() -> u64 {
        0
    }
}

```
