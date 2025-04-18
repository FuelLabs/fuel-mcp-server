# Example: sway_sources/sway/test/src/ir_generation/tests/implicit_return.sw

```sway
script;

fn main() -> u64 {
    while false {
    };
    42
}

// check: $(ret_val=$VAL) = const u64 42
// nextln: ret u64 $ret_val

```
