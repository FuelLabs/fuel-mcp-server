# Example: sway_sources/sway/test/src/ir_generation/tests/state_store_quad.sw

```sway
script;

fn main() {
    let null = asm(output) { zero: raw_ptr };
    let _ = __state_store_quad(
      0x0000000000000000000000000000000000000000000000000000000000000001,
      null,
      1,
    );
}
// check: $(key=$VAL) = get_local ptr b256, key_for_storage, $(meta=$MD)
// check: $(ptr=$VAL) = int_to_ptr $VAL to ptr b256, $meta
// check: $(count=$VAL) = const u64 1, $MD
// check: $VAL = state_store_quad_word $ptr, key $key, $count, $meta

```
