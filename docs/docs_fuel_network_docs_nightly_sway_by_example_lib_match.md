[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway by Example Lib](https://docs.fuel.network/docs/nightly/sway-by-example-lib/) /

Match

## _Icon Link_ [Match Statements](https://docs.fuel.network/docs/nightly/sway-by-example-lib/match/\#match-statements)

Examples of match statements in Sway

```fuel_Box fuel_Box-idXKMmm-css
contract;

// Control flow
// Assign variable
// Enum

abi MyContract {
    fn test_function(x: u64, y: Option<u64>) -> u64;
}

fn do_something() {}

fn do_something_else() {}

impl MyContract for Contract {
    fn test_function(x: u64, y: Option<u64>) -> u64 {
        // Control flow
        match x {
            0 => do_something(),
            _ => do_something_else(),
        }

        // Assign variable
        let res: str = match x {
            0 => "a",
            1 => "b",
            2 => "c",
            _ => "d",
        };

        // Enum
        let z = match y {
            Option::Some(val) => val + 1,
            Option::None => 0,
        };

        z
    }
}

```

Collapse_Icon ClipboardText_