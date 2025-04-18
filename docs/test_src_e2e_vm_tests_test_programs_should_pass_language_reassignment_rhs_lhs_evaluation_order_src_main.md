# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/reassignment_rhs_lhs_evaluation_order/src/main.sw

```sway
script;

// In Sway, like in Rust, we first evaluate the RHS.

fn inc_i(ref mut i: u64) -> u64 {
    i += 1;
    i
}

fn main() -> u64 {
    let mut array = [0, 0, 0];
    let mut i = 0;

    array[inc_i(i)] = inc_i(i);

    assert_eq(array[0], 0);
    assert_eq(array[1], 0);
    assert_eq(array[2], 1);

    1
}

```
