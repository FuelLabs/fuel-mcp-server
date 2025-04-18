# Example: sway_sources/sway/forc-plugins/forc-client/test/data/contract_with_dep_with_salt_conflict/src/main.sw

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
