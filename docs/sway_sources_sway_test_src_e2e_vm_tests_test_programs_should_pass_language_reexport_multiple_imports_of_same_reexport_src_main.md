# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/reexport/multiple_imports_of_same_reexport/src/main.sw

```sway
script;

pub mod items_1;
pub mod lib_1_1;  // Item reexports of items_1
pub mod lib_1_2;  // Item reexports of items_1
pub mod items_2;
pub mod lib_2_1;  // Star reexports of items_2
pub mod lib_2_2;  // Star reexports of items_2
pub mod items_3;
pub mod lib_3_1;  // Star reexports of items_3
pub mod lib_3_2;  // Item reexports of items_3
pub mod items_4;
pub mod lib_4_1;  // Item reexports of items_4
pub mod lib_4_2;  // Star reexports of items_4

mod tests; // All tests

fn main() -> u64 {
    tests::run_all_tests()
}

```
