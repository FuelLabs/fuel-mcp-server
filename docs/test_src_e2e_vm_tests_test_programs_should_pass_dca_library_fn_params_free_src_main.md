# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/library/fn_params_free/src/main.sw

```sway
library;

struct S {}

pub fn free_fn(s: S) -> S {
    s
}

```
