# Example: sway_sources/sway/test/src/in_language_tests/test_programs/ops_inline_tests/src/main.sw

```sway
library;

#[test]
pub fn str_eq_test() {
    assert("" == "");
    assert("a" == "a");

    assert("a" != "");
    assert("" != "a");
    assert("a" != "b");
}

```
