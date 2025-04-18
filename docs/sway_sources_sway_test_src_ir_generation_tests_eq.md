# Example: sway_sources/sway/test/src/ir_generation/tests/eq.sw

```sway
script;

fn main() {
   let _ = __eq(1, 2);
}

// check: $(l=$VAL) = const u64 1, $MD
// check: $(r=$VAL) = const u64 2, $MD
// check: $VAL = cmp eq $l $r

```
