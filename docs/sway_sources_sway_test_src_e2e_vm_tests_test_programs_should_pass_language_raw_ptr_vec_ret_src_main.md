# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/raw_ptr/vec_ret/src/main.sw

```sway
script;

fn main() -> Vec<u64> {
    let mut vec = Vec::new();
    vec.push(124);
    vec.push(124);
    vec.push(124);
    vec
}

```
