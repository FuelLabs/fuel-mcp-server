# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/eq_and_neq/src/main.sw

```sway
script;

use std::b512::B512;

fn main() -> bool {
    // Primitive types
    assert(1u8 == 1u8);
    assert(1u8 != 2u8);

    assert(1u16 == 1u16);
    assert(1u16 != 2u16);

    assert(1u32 == 1u32);
    assert(1u32 != 2u32);

    assert(1u64 == 1u64);
    assert(1u64 != 2u64);

    assert(true == true);
    assert(true != false);

    let zero = 0x0000000000000000000000000000000000000000000000000000000000000000;
    let one = 0x0000000000000000000000000000000000000000000000000000000000000001;
    assert(zero == zero);
    assert(zero != one);

    // stdlib types
    assert(ContractId::from(zero) == ContractId::from(zero));
    assert(ContractId::from(zero) != ContractId::from(one));

    assert(Address::from(zero) == Address::from(zero));
    assert(Address::from(zero) != Address::from(one));

    assert(B512::from((zero, zero)) == B512::from((zero, zero)));
    assert(B512::from((zero, zero)) != B512::from((zero, one)));

    true
}

```
