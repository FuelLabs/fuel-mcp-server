# Example: sway_sources/sway/test/src/ir_generation/tests/state_load_word.sw

```sway
script;

fn main() {
    let _ = __state_load_word(
      0x0000000000000000000000000000000000000000000000000000000000000001,
    );
}

// check: v0 = get_local ptr b256, key_for_storage,
// check: v1 = const b256 0x0000000000000000000000000000000000000000000000000000000000000001,
// check: store v1 to v0,
// check: v2 = state_load_word key v0,
// check: v3 = get_local ptr u64, _,
// check: store v2 to v3,

```
