# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/alias_lib/src/lib.sw

```sway
library;

pub enum MyEnum1 {
    A: u64,
    B: u64,
}

pub struct MyStruct1 {
    pub A: u64,
}

pub type MyIdentity1 = MyEnum1;
pub type MyIdentity2 = MyIdentity1;

pub type MyStruct2 = MyStruct1;
```
