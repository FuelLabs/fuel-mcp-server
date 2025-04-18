# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/mutable_arrays/src/main.sw

```sway
script;

fn main() -> u64 {
    let mut my_array: [u64; 1] = [1];
    my_array[0] = 10;
    my_array[0]
}

```
