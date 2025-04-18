# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/reexport_paths_external_lib/program/src/main.sw

```sway
script;

mod tests; // All tests

fn main() -> u64 {
    tests::run_all_tests()
}

```
