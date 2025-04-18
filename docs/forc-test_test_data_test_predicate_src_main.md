# Example: forc-test/test_data/test_predicate/src/main.sw

```sway
predicate;

fn main() -> bool {
    false
}

#[test]
fn test_bam() {
  assert(1 == 1)
}

#[test]
fn test_bum() {
  assert(1 == 1)
}

```
