# Example: test/src/e2e_vm_tests/test_programs/should_pass/unit_tests/script-contract-calls/contract_to_call/src/main.sw

```sway
contract;

abi MyContract {
    fn test_false() -> bool;
}

impl MyContract for Contract {
    fn test_false() -> bool {
    	false
    }
}

```
