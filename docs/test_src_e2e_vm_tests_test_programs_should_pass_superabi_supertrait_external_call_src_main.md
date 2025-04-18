# Example: test/src/e2e_vm_tests/test_programs/should_pass/superabi_supertrait_external_call/src/main.sw

```sway
contract;

trait MySuperTrait {
    fn method() -> u64;
}

abi MyAbi : MySuperTrait {
    //fn method() -> u64;
}

impl MySuperTrait for Contract {
    fn method() -> u64 { 42 }
}

impl MyAbi for Contract {}

#[test]
fn tests() {
    let caller = abi(MyAbi, CONTRACT_ID);
    assert(caller.method() == 0xBAD)
}

```
