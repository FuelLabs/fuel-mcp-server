# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/impl_self/src/main.sw

```sway
script;

struct MyStruct1 {}

impl MyStruct1 {
    fn foo() {}
}

fn main() {
    MyStruct1::foo();
}

```
