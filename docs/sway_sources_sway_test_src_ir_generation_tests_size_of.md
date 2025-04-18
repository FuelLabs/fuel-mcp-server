# Example: sway_sources/sway/test/src/ir_generation/tests/size_of.sw

```sway
script;

fn main() {
    let _ = __size_of::<b256>();
}

// check: $VAL = const u64 32


```
