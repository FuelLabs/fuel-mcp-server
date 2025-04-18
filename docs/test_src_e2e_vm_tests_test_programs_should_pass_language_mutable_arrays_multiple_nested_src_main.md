# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/mutable_arrays_multiple_nested/src/main.sw

```sway
script;

fn main() -> u64 {
    let mut a = [[0,1]];
    a[0][0] = 1;
    a[0][0]
}

```
