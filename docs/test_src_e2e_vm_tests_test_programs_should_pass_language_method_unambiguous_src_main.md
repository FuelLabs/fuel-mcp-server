# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/method_unambiguous/src/main.sw

```sway
script;

fn main() -> u64 {
    let u256_value = u256::from(255_u8);
    assert(u256_value == 0x00000000000000000000000000000000000000000000000000000000000000ff_u256);

    let u256_value = u256::from(65535_u16);
    assert(u256_value == 0x000000000000000000000000000000000000000000000000000000000000ffff_u256);

    1
}

```
