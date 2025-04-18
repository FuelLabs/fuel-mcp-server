# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/main_returns_unit/src/main.sw

```sway
script;

fn ten() -> u64 {
    10
}

fn nop() {
    ten();
}

fn main() {
    nop()
}

```
