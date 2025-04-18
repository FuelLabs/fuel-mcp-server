# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/u256/u256_abi/src/main.sw

```sway
script; 

configurable {
    SOME_U256: u256 = 0x00000000000000000000000000000000000000000000000000000001u256,
}

fn main() -> u256 {
    log(0x00000000000000000000000000000000000000000000000000000002u256);
    SOME_U256
}
```
