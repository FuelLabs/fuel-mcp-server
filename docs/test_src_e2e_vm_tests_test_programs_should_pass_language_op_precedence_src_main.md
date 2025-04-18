# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/op_precedence/src/main.sw

```sway
script;

// this should compile, and the result should be false if it works.
fn main() -> bool {
    let a = 4 < 5 && false;
    a
}

```
