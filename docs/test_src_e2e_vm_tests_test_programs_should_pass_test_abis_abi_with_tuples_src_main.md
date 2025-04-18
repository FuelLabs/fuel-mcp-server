# Example: test/src/e2e_vm_tests/test_programs/should_pass/test_abis/abi_with_tuples/src/main.sw

```sway
library;

pub mod some_module;

pub struct Person {
    pub age: u64
}

pub enum Location {
    Earth: ()
}

abi MyContract {
    fn bug1(param: (Person, u64)) -> bool;
    fn bug2(param: (Location, u64)) -> bool;

    fn struct_at_return() -> (some_module::SomeStruct,);
}

```
