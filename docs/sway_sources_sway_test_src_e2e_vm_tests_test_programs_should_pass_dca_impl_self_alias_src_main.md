# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/impl_self_alias/src/main.sw

```sway
script;

struct MyStruct1 {}

type Alias1 = MyStruct1;

type Alias2 = MyStruct1;

impl Alias1 {
    fn foo() {}
}

fn main() {
    Alias1::foo();
}

```
