# Example: test/src/e2e_vm_tests/test_programs/should_pass/stdlib/contract_id_type/src/main.sw

```sway
script;

use std::contract_id::*;

fn main() -> bool {
    let id_1 = ContractId::zero();
    let id_2 = ContractId::zero();
    let id_1_b256: b256 = id_1.into();
    
    assert(id_1 == id_2);
    assert(b256::zero() == id_1_b256);

    true
}

```
