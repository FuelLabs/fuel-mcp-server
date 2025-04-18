# Example: forc-plugins/forc-doc/src/tests/data/ops/src/lib.sw

```sway
library;

pub trait Add {
    fn add(self, other: Self) -> Self;
}

pub trait Subtract {
    fn subtract(self, other: Self) -> Self;
}
```
