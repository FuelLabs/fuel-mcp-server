# Example: sway_sources/sway/test/src/in_language_tests/test_programs/revert_inline_tests/src/main.sw

```sway
library;

#[test(should_revert)]
fn revert_revert() {
    revert(0);
}

#[test(should_revert)]
fn revert_revert_require() {
    require(false, "error");
}

#[test]
fn pass_revert_require() {
    require(true, "error");
}

#[test(should_revert)]
fn revert_revert_with_log() {
    revert_with_log("error")
}

```
