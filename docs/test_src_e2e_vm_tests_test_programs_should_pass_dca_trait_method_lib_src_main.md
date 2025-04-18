# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/trait_method_lib/src/main.sw

```sway
library;

pub struct MyStruct {

}

pub trait MyTrait {
    fn trait_method(self) -> bool;
} {
    fn method(self) -> MyStruct {
        MyStruct {}
    }
}

```
