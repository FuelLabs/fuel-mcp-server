# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/trait_method/src/main.sw

```sway
script;

use trait_method_lib::*;

pub trait MyTrait2 {
    fn trait_method2(self) -> bool;
} {
    fn method2(self) -> MyStruct {
        MyStruct {}
    }
}

impl MyTrait for MyStruct {
    fn trait_method(self) -> bool {
        true
    }
}

impl MyTrait2 for MyStruct {
    fn trait_method2(self) -> bool {
        true
    }
}

fn main() {
    let s = MyStruct {};
    let _b = s.trait_method();
    let _b = s.trait_method2();
}

```
