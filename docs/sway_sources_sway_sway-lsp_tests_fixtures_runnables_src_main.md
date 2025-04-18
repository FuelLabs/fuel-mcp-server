# Example: sway_sources/sway/sway-lsp/tests/fixtures/runnables/src/main.sw

```sway
script;

fn main() {
    revert(0);
}

#[test]
fn test_foo() {
    assert(true);
}

#[test]
fn test_bar() {
    log("test");
    assert(4 / 2 == 2);
}

```
