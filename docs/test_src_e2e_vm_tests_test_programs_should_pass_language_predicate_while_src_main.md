# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/predicate_while/src/main.sw

```sway
predicate;

fn main() -> bool {
    let mut x = 10;
    while x != 0 { x -= 1; }

    true
}

```
