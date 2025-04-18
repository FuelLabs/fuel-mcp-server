# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/bool_and_or/src/main.sw

```sway
script;

fn abort() -> bool {
    asm() {
        one: bool // Failure.
    }
}

fn main() -> u64 {
    if (true && false) && abort() {
        // Failure.
        2
    } else if (false || true) || abort() {
        // Success.
        42
    } else {
        // Failure.
        3
    }
}

```
