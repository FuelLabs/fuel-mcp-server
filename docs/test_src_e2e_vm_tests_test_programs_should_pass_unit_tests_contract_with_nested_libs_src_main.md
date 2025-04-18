# Example: test/src/e2e_vm_tests/test_programs/should_pass/unit_tests/contract_with_nested_libs/src/main.sw

```sway
contract;

mod inner;

abi MyContract {
    fn foo();
}

impl MyContract for Contract {
    fn foo() { }
}


#[test]
fn test_meaning_of_life() {
    let meaning = 6 * 7;
    assert(meaning == 42);
}

#[test]
fn log_test() {
    log(1u32);
}

```
