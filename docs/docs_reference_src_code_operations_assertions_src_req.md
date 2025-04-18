# Example: docs/reference/src/code/operations/assertions/src/req.sw

```sway
library;

// ANCHOR: require
fn subtract(a: u64, b: u64) -> u64 {
    require(b <= a, "b is too large");
    a - b
}
// ANCHOR_END: require

```
