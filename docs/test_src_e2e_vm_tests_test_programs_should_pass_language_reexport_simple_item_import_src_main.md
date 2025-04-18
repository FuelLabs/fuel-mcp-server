# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/simple_item_import/src/main.sw

```sway
script;

pub mod items_1;
pub mod lib_1;  // Item reexports of items_1
pub mod items_2;
pub mod lib_2;  // Item reexports of items_2

mod tests; // All tests

fn main() -> u64 {
    tests::run_all_tests()
}

```
