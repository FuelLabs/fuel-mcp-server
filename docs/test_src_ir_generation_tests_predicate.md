# Example: test/src/ir_generation/tests/predicate.sw

```sway
predicate;

fn main() -> bool {
    // Nope.
    false
}


// not: script {
// check: predicate {

// check: fn main() -> bool

```
