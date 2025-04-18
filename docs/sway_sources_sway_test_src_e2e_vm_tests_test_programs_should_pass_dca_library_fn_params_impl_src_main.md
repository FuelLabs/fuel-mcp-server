# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/dca/library/fn_params_impl/src/main.sw

```sway
library;

struct S {}

pub struct F {}

impl F {
    pub fn free_fn(s: S) -> S {
        s
    }
}

```
