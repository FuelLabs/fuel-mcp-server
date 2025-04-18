# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/array_of_structs_contract/src/main.sw

```sway
contract;

use array_of_structs_abi::{TestContract, Wrapper};

impl TestContract for Contract {
    fn return_array_of_structs(param: [Wrapper;
    2]) -> [Wrapper;
    2] {
        param
    }

    fn return_element_of_array_of_structs(param: [Wrapper;
    2]) -> Wrapper {
        param[0]
    }

    fn return_element_of_array_of_strings(param: [str[3];
    3]) -> str[3] {
        param[0]
    }
}

```
