# Example: docs/reference/src/code/operations/logging/src/lib.sw

```sway
library;

// ANCHOR: logging
fn log_data(number: u64) {
    // generic T = `number` of type `u64`
    log(number);
}
// ANCHOR_END: logging

```
