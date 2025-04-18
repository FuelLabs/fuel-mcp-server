# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/unit_tests/should_revert/src/lib.sw

```sway
library;

#[test(should_revert)]
fn should_revert_test() {
  assert(0 == 1)
}

#[test(should_revert = "18446744073709486084")]
fn should_revert_test_with_exact_code() {
  assert(0 == 1)
}

```
