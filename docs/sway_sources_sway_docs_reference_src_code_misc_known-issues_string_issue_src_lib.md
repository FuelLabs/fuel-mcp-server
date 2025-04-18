# Example: sway_sources/sway/docs/reference/src/code/misc/known-issues/string_issue/src/lib.sw

```sway
library;

fn single_quotes() {
    // ANCHOR: single_quotes
    // Will error if uncommented
    // let fuel = 'fuel';
    // ANCHOR_END: single_quotes
}

fn indexing() {
    // ANCHOR: indexing
    let fuel = "fuel";
    // Will error if uncommented
    // let f = fuel[0];
    // ANCHOR_END: indexing
}

```
