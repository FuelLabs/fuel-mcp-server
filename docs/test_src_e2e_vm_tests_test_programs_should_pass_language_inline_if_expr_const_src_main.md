# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/inline_if_expr_const/src/main.sw

```sway
script;

fn f(cond: bool) -> u64 {
    if cond {
        10
    } else {
        20
    }
}

fn main() {
    f(true);
    assert(f(false) == 20);
}

```
