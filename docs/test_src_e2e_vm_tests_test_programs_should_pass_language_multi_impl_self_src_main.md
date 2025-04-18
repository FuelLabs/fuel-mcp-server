# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/multi_impl_self/src/main.sw

```sway
script;

struct MyStruct {
}

impl MyStruct {
    pub fn my_fun() -> u64 {
        fun()
    }
}

impl MyStruct {
}

fn fun() -> u64 {
    42
}

fn main() -> u64 {
    MyStruct::my_fun()
}

```
