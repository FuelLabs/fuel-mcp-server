# Example: test/src/e2e_vm_tests/test_programs/should_pass/unit_tests/script-contract-calls/script_multi_test/src/main.sw

```sway
script;

abi MyContract {
    fn test_false() -> bool;
}

fn main() {}

#[test]
fn test_contract_call() {
  let caller = abi(MyContract, contract_to_call::CONTRACT_ID);
  let result = caller.test_false();
  assert(result == false)
}

```
