# Example: test/src/e2e_vm_tests/test_programs/should_pass/test_abis/nested_struct_args_abi/src/main.sw

```sway
library;

pub struct Inner {
    pub foo: u64
}

pub struct StructOne {
    pub inn: Inner,
}

pub struct StructTwo {
    pub foo: u64,
}

abi NestedStructArgs {
    fn foo(input1: StructOne, input2: StructTwo) -> u64;
}

```
