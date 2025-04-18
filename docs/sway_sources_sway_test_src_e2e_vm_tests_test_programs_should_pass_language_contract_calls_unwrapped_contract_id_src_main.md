# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/contract_calls_unwrapped_contract_id/src/main.sw

```sway
script;

const ADDRESS: b256 = 0x000000000000000000000000000000000000000000000000000000000000002A;
const IDENTITY: Identity = Identity::ContractId(ContractId::from(ADDRESS));

abi MyAbi {
    fn abi_method();
}

impl MyAbi for Contract {
    fn abi_method() { }
}

fn main() -> u64 {
    let caller = abi(MyAbi, IDENTITY.as_contract_id().unwrap().into());
    caller.abi_method();
    0
}

```
