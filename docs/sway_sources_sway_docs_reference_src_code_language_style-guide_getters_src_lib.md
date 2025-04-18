# Example: sway_sources/sway/docs/reference/src/code/language/style-guide/getters/src/lib.sw

```sway
library;

// ANCHOR: avoid
fn get_maximum_deposit() -> u64 {
    100
}
// ANCHOR_END: avoid
// ANCHOR: use
fn maximum_deposit() -> u64 {
    100
}
// ANCHOR_END: use

```
