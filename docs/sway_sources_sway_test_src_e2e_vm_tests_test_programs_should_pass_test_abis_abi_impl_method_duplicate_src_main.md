# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/test_abis/abi_impl_method_duplicate/src/main.sw

```sway
contract;

abi MyAbi
{
    // no interface methods
}
{
    fn method() -> u64 { 42 }
    fn method() -> u64 { 43 }    // error: duplicate impl method
}

```
