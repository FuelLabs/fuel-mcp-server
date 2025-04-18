# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/redundant_return/src/main.sw

```sway
script;

fn main() -> u64 {
    if true {
        return 1;
    } else {
        return 0;
    }
    return 2;
}

```
