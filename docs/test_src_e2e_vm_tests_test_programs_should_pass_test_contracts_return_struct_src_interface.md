# Example: test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/return_struct/src/interface.sw

```sway
library;

use ::data_structures::MyStruct;

abi MyContract {
    #[storage(read)]
    fn test_function() -> Option<MyStruct>;
}

```
