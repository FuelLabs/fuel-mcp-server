# Example: test/src/ir_generation/tests/impl_ret_int.sw

```sway
script;

fn main() -> u64 {
    42
}

// check: fn main() -> u64
// nextln: entry():
// nextln: $(ret_val=$VAL) = const u64 42
// nextln: ret u64 $ret_val

```
