# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/alias_type_ascription_generic/src/main.sw

```sway
script;

struct MyStruct1 {}

struct MyStruct2<T> {}

type Alias1 = MyStruct1;

fn main() {
    let _bar: MyStruct2<Alias1> = MyStruct2 {};
}

```
