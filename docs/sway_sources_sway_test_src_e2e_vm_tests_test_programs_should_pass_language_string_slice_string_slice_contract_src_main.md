# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/string_slice/string_slice_contract/src/main.sw

```sway
contract;

abi MyContract {
    fn test_function(a: str) -> str;
}

impl MyContract for Contract {
    fn test_function(a: str) -> str {
        a
    }
}

#[test]
fn test_success() {
    let caller = abi(MyContract, CONTRACT_ID); 
    let result = caller.test_function("a");
    assert(result == "a")
}

```
