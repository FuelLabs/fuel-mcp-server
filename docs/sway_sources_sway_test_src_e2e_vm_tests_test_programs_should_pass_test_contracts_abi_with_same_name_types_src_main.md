# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/abi_with_same_name_types/src/main.sw

```sway
contract;

mod dep_1;
mod dep_2;

use dep_1::*;
use dep_2::*;

abi MyContract {
    fn function(
        arg1: MyStruct1,
        arg2: MyStruct2,
        arg3: Option<u64>,
    ) -> str[6];
}

impl MyContract for Contract {
    fn function(
        _arg1: MyStruct1,
        _arg2: MyStruct2,
        _arg3: Option<u64>,
    ) -> str[6] {
        __to_str_array("fuel42")
    }
}

```
