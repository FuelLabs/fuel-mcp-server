# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/abi_with_same_name_types/src/dep_2.sw

```sway
library;

pub struct MyStruct2 {
    bam: MyStructDuplicated,
}

pub struct MyStructDuplicated {
    bam: u64,
}

```
