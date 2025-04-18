# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/unit_type_variants/src/main.sw

```sway
script;

enum E {
    A: (),
    B: (),
    C: (),
}

fn main() -> E {
    // Expected output is only 8 bytes because all the variants are unit types 
    //
    //  0000000000000002  # E.tag

    E::C
}

```
