# Example: test/src/e2e_vm_tests/test_programs/should_pass/test_abis/abi_impl_methods_callable/src/main.sw

```sway
contract;

abi MyAbi { }
{
    fn impl_method() -> u64 { 42 }
}

impl MyAbi for Contract { }

#[test]
fn tests() {
    let caller = abi(MyAbi, CONTRACT_ID);
    assert(caller.impl_method() == 42)
}

```
