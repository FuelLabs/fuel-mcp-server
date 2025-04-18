# Example: test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/abi_with_alias/src/main.sw

```sway
contract;

type AliasedTuple = (u64, u64);

abi MyContract {
    fn tuple(arg1: (u64, u64)); // Inline
    fn aliased_tuple(arg1: AliasedTuple); // Alias
}

impl MyContract for Contract {
    fn tuple(_arg1: (u64, u64)) {
    }
    fn aliased_tuple(arg1: AliasedTuple) {
    }
}

```
