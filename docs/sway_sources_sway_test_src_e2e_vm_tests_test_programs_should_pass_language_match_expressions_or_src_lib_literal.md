# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/match_expressions_or/src/lib_literal.sw

```sway
library;

fn match_literal(l: u64) -> u64 {
    match l {
        0 | 1 => { 
            return 101;
        },
        x => {
            return x + x;
        }
    }
}

pub fn test() -> u64 {
    let x = match_literal(0);
    assert(x == 101);

    let x = match_literal(1);
    assert(x == 101);

    let x = match_literal(21);
    assert(x == 42);

    42
}

```
