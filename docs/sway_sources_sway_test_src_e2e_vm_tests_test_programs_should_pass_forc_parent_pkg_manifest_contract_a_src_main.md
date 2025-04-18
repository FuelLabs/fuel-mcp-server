# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/forc/parent_pkg_manifest/contract_a/src/main.sw

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
