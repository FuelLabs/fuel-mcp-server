# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/unused_variable_in_free_fn/src/main.sw

```sway
script;

fn free_fn() {
    let used = 1;
    
    let dead = used;
}

fn main() {
}

```
