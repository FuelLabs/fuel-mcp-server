# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/nested_struct_args_contract/src/main.sw

```sway
contract;

use nested_struct_args_abi::*;

impl NestedStructArgs for Contract {
    fn foo(input1: StructOne, input2: StructTwo) -> u64 {
        let v = input1.inn.foo + input2.foo;
        v + 1
    }
}

```
