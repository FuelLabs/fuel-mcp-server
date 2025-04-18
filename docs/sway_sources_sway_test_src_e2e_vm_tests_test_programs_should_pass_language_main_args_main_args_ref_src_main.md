# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/main_args/main_args_ref/src/main.sw

```sway
script;

struct TestStruct {
    val: u64,
}

fn main(baba: TestStruct) -> u64 {
    baba.val + 1
}

```
