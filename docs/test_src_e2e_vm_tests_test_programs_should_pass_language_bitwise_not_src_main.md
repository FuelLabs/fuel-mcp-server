# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/bitwise_not/src/main.sw

```sway
script;

fn main() -> bool {
    assert(!2u8 == 253u8);
    assert(!2u16 == 65533u16);
    assert(!2u32 == 4294967293u32);
    assert(!2u64 == 18446744073709551613u64);

    true
}

```
