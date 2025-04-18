# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/simple_path_access/src/main.sw

```sway
script;

mod items_1;
mod lib_1;  // Item reexports of items_1
mod items_2;
mod lib_2;  // Item reexports of items_1

mod tests; // All tests

fn main() -> u64 {
    tests::run_all_tests()
}

```
