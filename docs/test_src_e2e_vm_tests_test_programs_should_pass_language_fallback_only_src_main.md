# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/fallback_only/src/main.sw

```sway
contract;

use std::execution::run_external;

storage {
    SRC1822 {
        target: ContractId = ContractId::zero(),
    }
}

#[fallback]
#[storage(read)]
fn fallback() {
    run_external(storage::SRC1822.target.read())
}

```
