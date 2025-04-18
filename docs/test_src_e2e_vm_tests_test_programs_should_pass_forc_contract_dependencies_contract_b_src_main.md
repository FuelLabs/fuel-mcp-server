# Example: test/src/e2e_vm_tests/test_programs/should_pass/forc/contract_dependencies/contract_b/src/main.sw

```sway
contract;

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}

```
