# Example: test/src/e2e_vm_tests/test_programs/should_pass/unit_tests/predicate_multi_test/src/main.sw

```sway
predicate;

fn main() -> bool {
    false
}

#[test]
fn test_baz() {
    let a = 1;
    let b = 2;
    assert(a + b == 3);
    assert(a * b == 2);
}

#[test]
fn test_qux() {
    assert(true);
}

```
