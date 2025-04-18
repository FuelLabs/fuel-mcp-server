# Example: sway_sources/sway/docs/reference/src/code/language/built-ins/constants/src/lib.sw

```sway
library;

struct S {}

impl S {
    const ID = 0;
}

// ANCHOR: id
fn returns_id() -> u64 {
    S::ID
}
// ANCHOR_END: id

```
