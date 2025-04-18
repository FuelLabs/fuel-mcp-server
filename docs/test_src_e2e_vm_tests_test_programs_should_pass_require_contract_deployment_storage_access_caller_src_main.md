# Example: test/src/e2e_vm_tests/test_programs/should_pass/require_contract_deployment/storage_access_caller/src/main.sw

```sway
script;

use storage_access_abi::*;
use std::hash::*;

#[cfg(experimental_new_encoding = false)]
const CONTRACT_ID = 0x3bc28acd66d327b8c1b9624c1fabfc07e9ffa1b5d71c2832c3bfaaf8f4b805e9;
#[cfg(experimental_new_encoding = true)]
const CONTRACT_ID = 0x72c284ba7b906df994e63faf09382bfbf01aa7de8a9452665b66cdf0e3eb1978; // AUTO-CONTRACT-ID ../../test_contracts/storage_access_contract --release

fn main() -> bool {
    let caller = abi(StorageAccess, CONTRACT_ID);
    caller.set_boolean(true);
    assert(caller.get_boolean() == true);
    true
}

```
