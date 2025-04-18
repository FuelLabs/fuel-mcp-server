# Example: sway_sources/sway/test/src/sdk-harness/test_projects/contract_bytecode/src/main.sw

```sway
contract;

use std::external::bytecode_root;

abi ContractBytecodeTest {
    fn get_contract_bytecode_root(contract_id: ContractId) -> b256;
}

impl ContractBytecodeTest for Contract {
    fn get_contract_bytecode_root(contract_id: ContractId) -> b256 {
        bytecode_root(contract_id)
    }
}

```
