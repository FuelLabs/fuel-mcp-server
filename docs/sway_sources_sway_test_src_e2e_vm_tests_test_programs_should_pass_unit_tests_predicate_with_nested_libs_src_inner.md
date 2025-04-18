# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/unit_tests/predicate_with_nested_libs/src/inner.sw

```sway
library;

mod inner2;

#[test]
fn test_meaning_of_life_inner() {
    let meaning = 6 * 7;
    assert(meaning == 42);
}

```
