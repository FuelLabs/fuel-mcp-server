# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/alias_unused/src/main.sw

```sway
script;

struct MyStruct1 {}


type Alias1 = MyStruct1;


type Alias2 = Alias1;

fn main() {
}

```
