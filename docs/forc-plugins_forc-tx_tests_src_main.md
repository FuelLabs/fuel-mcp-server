# Example: forc-plugins/forc-tx/tests/src/main.sw

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
