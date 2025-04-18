# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/configurable_dedup_decode/src/main.sw

```sway
script;

struct Wrapped {
    v: u64,
}

// These types decode fns should coalesce into 
// only one in the final IR
configurable {
    WRAPPED: Wrapped = Wrapped { v: 1 },
    TUPLE: (u64,) = (2,),
}

fn main() -> u64 {
    WRAPPED.v + TUPLE.0
}

```
