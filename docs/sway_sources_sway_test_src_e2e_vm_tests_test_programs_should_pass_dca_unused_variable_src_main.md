# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/unused_variable/src/main.sw

```sway
script;

fn my_fn() {
    let used = 1;
    let dead = used;
}

fn main() {
    my_fn();
}
```
