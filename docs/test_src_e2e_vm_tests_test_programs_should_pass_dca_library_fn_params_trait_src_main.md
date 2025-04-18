# Example: test/src/e2e_vm_tests/test_programs/should_pass/dca/library/fn_params_trait/src/main.sw

```sway
library;

struct S {}

pub struct F {}

trait T {
    fn bar(t: S) -> S; // pub by default
}

impl T for F {
    fn bar(s: S) -> S {
        s
    }
}

```
