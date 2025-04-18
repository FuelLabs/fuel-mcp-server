# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/alias_type_ascription/src/main.sw

```sway
script;

struct MyStruct1 {}

type Alias1 = MyStruct1;

fn main() {
    let _bar: Alias1 = MyStruct1 {};
}

```
