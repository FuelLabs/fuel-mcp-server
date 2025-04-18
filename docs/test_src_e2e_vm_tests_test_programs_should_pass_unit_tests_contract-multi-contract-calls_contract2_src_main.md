# Example: test/src/e2e_vm_tests/test_programs/should_pass/unit_tests/contract-multi-contract-calls/contract2/src/main.sw

```sway
contract;

abi MyContract2 {
    fn test_false() -> bool;
}

impl MyContract2 for Contract {
    fn test_false() -> bool {
    	false
    }
}

```
