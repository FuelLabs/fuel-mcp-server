# Example: test/src/e2e_vm_tests/test_programs/should_pass/test_abis/abi_impl_methods_in_json_abi/src/main.sw

```sway
contract;

abi MyAbi
{
    fn interface_method();
}
{
    fn impl_method() { }
}

impl MyAbi for Contract {
    fn interface_method() { }
}

```
