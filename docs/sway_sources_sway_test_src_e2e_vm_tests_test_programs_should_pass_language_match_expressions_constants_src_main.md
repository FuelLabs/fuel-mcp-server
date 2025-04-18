# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/match_expressions_constants/src/main.sw

```sway
script;

pub mod lib;
mod top_level;
mod in_structs;

fn main() -> u64 {
    ::top_level::test();
    ::in_structs::test();
    42
}

```
