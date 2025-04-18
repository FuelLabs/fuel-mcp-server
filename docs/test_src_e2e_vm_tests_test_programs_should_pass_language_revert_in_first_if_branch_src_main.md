# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/revert_in_first_if_branch/src/main.sw

```sway
script;

fn main() {
    let cond = true;
    let _result = if cond == true { revert(42) } else { 0 };
}

```
