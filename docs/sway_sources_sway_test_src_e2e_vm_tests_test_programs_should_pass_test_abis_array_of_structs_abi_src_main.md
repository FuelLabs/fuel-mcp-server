# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/test_abis/array_of_structs_abi/src/main.sw

```sway
library;

pub struct Id {
    pub number: u64,
}

pub struct Wrapper {
    pub id: Id,
}

abi TestContract {
    fn return_array_of_structs(param: [Wrapper;
    2]) -> [Wrapper;
    2];

    fn return_element_of_array_of_structs(param: [Wrapper;
    2]) -> Wrapper;

    fn return_element_of_array_of_strings(param: [str[3];
    3]) -> str[3];
}

```
