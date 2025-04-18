# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/unit_tests/lib_single_test/src/lib.sw

```sway
library;

#[test]
fn test_meaning_of_life() {
    let meaning = 6 * 7;
    assert(meaning == 42);
}

```
