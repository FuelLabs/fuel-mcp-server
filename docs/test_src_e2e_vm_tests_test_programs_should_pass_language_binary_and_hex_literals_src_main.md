# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/binary_and_hex_literals/src/main.sw

```sway
script;

fn main() -> bool {
    // Hex
    let _x = 0xF;
    let _x = 0xFF;
    let _x = 0xFFF;
    let _x = 0xAAAA;
    let _x = 0xB_3333;
    let _x = 0xFFFF_4444;
    let _x = 0x1111_1111_1111;
    let _x = 0xFFFF_FFFFFFFFFFFF;
    let _x = 0xFFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF;
    let _x = 0xFFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF;

    // Binary
    let _y = 0b1;
    let _y = 0b11;
    let _y = 0b111;
    let _y = 0b1111;
    let _y = 0b1_1111;
    let _y = 0b1111_0000;
    let _y = 0b1111_1111_1111;
    let _y = 0b1111_111111111111;
    let _y = 0b1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111;
    let _y = 0b1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111;

    true
}

```
