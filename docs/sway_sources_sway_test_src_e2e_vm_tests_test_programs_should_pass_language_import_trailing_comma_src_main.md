# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/import_trailing_comma/src/main.sw

```sway
script;

mod lib;
use lib::{B, C, D,};

fn main() -> u64 {
    let x = B {
        b: 0,
    };
    let y = C {
        c: 0,
    };
    let z = D {
        d: 0,
    };
    let foo = x.b + y.c + z.d;
    foo
}

```
