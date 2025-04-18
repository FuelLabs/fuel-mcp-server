# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/implicit_casting/src/main.sw

```sway
script;

struct MyStruct<T> {
    #[allow(dead_code)]
    a: T
}

fn main() -> u64 {
    let _a: Result<u32, u8> = Ok(5);

    let _b: MyStruct<u32> = MyStruct{ a:5 };

    42
}

```
