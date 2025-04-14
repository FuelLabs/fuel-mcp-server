[Docs](https://docs.fuel.network/) /

[Sway by Example Lib](https://docs.fuel.network/docs/sway-by-example-lib/) /

Predicate

## _Icon Link_ [Predicate](https://docs.fuel.network/docs/sway-by-example-lib/predicate/\#predicate)

Examples of a predicate program type in Sway

|  | Predicates | Contracts |
| --- | --- | --- |
| Access data on chain | ❌ | ✅ |
| Read data from smart contracts | ❌ | ✅ |
| Check date or time | ❌ | ✅ |
| Read block hash or number | ❌ | ✅ |
| Read input coins | ✅ | ✅ |
| Read output coins | ✅ | ✅ |
| Read transaction scripts | ✅ | ✅ |
| Read transaction bytecode | ✅ | ✅ |

```fuel_Box fuel_Box-idXKMmm-css
predicate;

use std::{
    auth::predicate_address,
    inputs::{
        input_amount,
    },
    outputs::{
        output_amount,
    },
    tx::{
        tx_id,
        tx_witnesses_count
    },
    constants::ZERO_B256,
};

// Configurables
configurable {
    FLOOR: u64 = 1,
}

fn input_output_checks() -> bool {
    if (100 >= input_amount(0).unwrap() && 100 >= output_amount(0).unwrap()) {
        return true
    }
    return false
}

// Primitive Arguments
fn main(a: u64, b: str, c: bool, d: b256) -> bool {
    // This predicate's own address
    let this_predicate_root = predicate_address();

    if (a == 0 || b == "a" || c == false ||  d == ZERO_B256) {
        return false
    }

    if tx_witnesses_count() < 1 {
        return false
    }

    // While loop
    let mut x = 10;
    while x != FLOOR {
        x -= 1;
    }

    return input_output_checks()
}

```

Collapse_Icon ClipboardText_