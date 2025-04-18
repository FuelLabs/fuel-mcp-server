# Example: test/src/e2e_vm_tests/test_programs/should_pass/stdlib/if_type_revert/src/main.sw

```sway
script;

fn main() -> u64 {
    if true {
        revert(0) 
    } else {
        42
    }
}
```
