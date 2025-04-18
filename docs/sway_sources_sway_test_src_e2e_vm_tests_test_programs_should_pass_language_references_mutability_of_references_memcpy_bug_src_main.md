# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/references/mutability_of_references_memcpy_bug/src/main.sw

```sway
contract;

pub mod lib;

use ::lib::weird;

abi MyContract {
    fn test_function(b: u256) -> u256;
}

impl MyContract for Contract {

    fn test_function(_b: u256) -> u256 {
        weird(_b);
        0x00u256
    }
}



#[test]
fn test() {
    let caller = abi(MyContract, CONTRACT_ID);
    let b = 0x02u256;

    let _ = caller.test_function(b);
}

```
