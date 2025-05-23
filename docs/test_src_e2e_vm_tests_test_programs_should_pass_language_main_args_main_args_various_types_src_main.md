# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/main_args/main_args_various_types/src/main.sw

```sway
script;

mod types;

use types::{S as AliasedS};

fn eq_str_3(a: str[3], b: str) -> bool {
    let ptr_b = b.as_ptr();
    asm(a: a, b: ptr_b, len: 3, r) {
        meq r a b len;
        r: bool
    }
}

enum SignedNum {
    Positive: u64,
    Negative: u64,
}

struct OpName {
    val: str[3]
}

fn main(ops: [(OpName, SignedNum); 2]) -> AliasedS {
    __log(ops);
    assert(eq_str_3(ops[0].0.val, "set"));
    assert(match ops[0].1 {
        SignedNum::Positive(n) => n,
        _ => revert(1),
    } == 1338);

    assert(eq_str_3(ops[1].0.val, "add"));
    assert(match ops[1].1 {
        SignedNum::Negative(n) => n,
        _ => revert(2),
    } == 1);

    AliasedS{
        v: 1
    }
}

```
