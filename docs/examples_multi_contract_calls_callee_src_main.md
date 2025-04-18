# Example: examples/multi_contract_calls/callee/src/main.sw

```sway
contract;

abi CalleeContract {
    fn test_true() -> bool;
}

impl CalleeContract for Contract {
    fn test_true() -> bool {
        true
    }
}

```
