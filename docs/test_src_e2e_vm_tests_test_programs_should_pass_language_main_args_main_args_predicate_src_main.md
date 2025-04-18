# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/main_args/main_args_predicate/src/main.sw

```sway
predicate;

fn main(baba: u64, keke: u64) -> bool {
    let sum = baba + keke;
    sum == 1337
}

```
