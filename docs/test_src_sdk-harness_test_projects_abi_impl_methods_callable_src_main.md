# Example: test/src/sdk-harness/test_projects/abi_impl_methods_callable/src/main.sw

```sway
contract;

abi MyAbi {
    fn interface_method();
} {
    fn impl_method() -> u64 {
        42
    }
}

impl MyAbi for Contract {
    fn interface_method() {}
}

```
