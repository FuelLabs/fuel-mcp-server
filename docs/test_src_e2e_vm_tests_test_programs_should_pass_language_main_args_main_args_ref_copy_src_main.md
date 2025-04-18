# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/main_args/main_args_ref_copy/src/main.sw

```sway
script;

struct TestStruct {
    val: u64,
}

fn main(baba: TestStruct, keke: u64) -> u64 {
    baba.val + keke
}

```
