# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/match_expressions_explicit_rets/src/main.sw

```sway
script;

// Explicit returns from each arm of a match expression. Was causing mistyped dead IR to be
// generated.

fn main() -> bool {
    match true {
        true => {
            return true;
        },
        false => {
            return false;
        }
    }
}

```
