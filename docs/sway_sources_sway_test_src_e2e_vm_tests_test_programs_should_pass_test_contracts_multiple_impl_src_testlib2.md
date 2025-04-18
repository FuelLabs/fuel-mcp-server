# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/test_contracts/multiple_impl/src/testlib2.sw

```sway
library;

pub fn bar() {
    log(2); // This log should never be logged.
    assert(false); // This function should never be called.
}

```
