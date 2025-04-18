# Example: test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/issue_6335_repro/src/main.sw

```sway
contract;

use std::bytes::*;

abi MyAbi {
    fn test() -> u64;
}

abi FakeAbi {
    fn test() -> Bytes;
}

impl MyAbi for Contract {
    fn test() -> u64 {
        64
    }
}

#[test]
fn test() {
    let caller = abi(FakeAbi, CONTRACT_ID);
    let res  = caller.test();
    assert(res.len() == 64);
    let s: str[30] = abi_decode(res.as_raw_slice());
}

```
