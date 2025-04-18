# Example: sway_sources/sway/test/src/sdk-harness/test_artifacts/methods_abi/src/main.sw

```sway
library;

abi MethodsContract {
    #[storage(read, write)]
    fn test_function() -> bool;
}

```
