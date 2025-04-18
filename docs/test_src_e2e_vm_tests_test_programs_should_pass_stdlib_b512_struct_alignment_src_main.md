# Example: test/src/e2e_vm_tests/test_programs/should_pass/stdlib/b512_struct_alignment/src/main.sw

```sway
script;

use std::b512::B512;

fn main() -> bool {
    let hi_bits: b256 = 0x7777777777777777777777777777777777777777777777777777777777777777;
    let lo_bits: b256 = 0x5555555555555555555555555555555555555555555555555555555555555555;

    let b: B512 = B512::from((hi_bits, lo_bits));

    (b.bits())[1] == lo_bits && (b.bits())[0] == hi_bits
}

```
