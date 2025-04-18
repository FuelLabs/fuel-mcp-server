# Example: test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/auth_testing_contract/src/main.sw

```sway
contract;
use std::auth::caller_is_external;
use auth_testing_abi::AuthTesting;

impl AuthTesting for Contract {
    fn returns_gm_one() -> bool {
        caller_is_external()
    }
}

```
