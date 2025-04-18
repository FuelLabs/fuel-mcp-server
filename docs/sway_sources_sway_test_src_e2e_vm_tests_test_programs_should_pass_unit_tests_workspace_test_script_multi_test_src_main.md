# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/unit_tests/workspace_test/script_multi_test/src/main.sw

```sway
script;

fn main() {
    revert(0);
}

#[test]
fn test_foo() {
    assert(true);
}

#[test]
fn test_bar() {
    log("test");
    assert(4 / 2 == 2);
}

```
