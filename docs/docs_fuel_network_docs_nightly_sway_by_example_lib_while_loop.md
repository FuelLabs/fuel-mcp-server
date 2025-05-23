[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway by Example Lib](https://docs.fuel.network/docs/nightly/sway-by-example-lib/) /

While Loop

## _Icon Link_ [While Loop](https://docs.fuel.network/docs/nightly/sway-by-example-lib/while-loop/\#while-loop)

Examples of while loop in Sway

```fuel_Box fuel_Box-idXKMmm-css
contract;

// While loops
// continue and break

abi MyContract {
    fn example_1() -> u64;
    fn example_2() -> u64;
    fn example_3() -> u64;
}

impl MyContract for Contract {
    fn example_1() -> u64 {
        let mut total = 0;
        let mut i = 0;
        while i < 5 {
            i += 1;
            total += i;
        }

        // total = 1 + 2 + 3 + 4 + 5
        total
    }

    fn example_2() -> u64 {
        // continue - sum odds
        let mut total = 0;
        let mut i = 0;
        while i < 5 {
            i += 1;
            // Skip if even
            if i % 2 == 0 {
                continue;
            }
            total += i;
        }

        // total = 1 + 3 + 5
        total
    }

    fn example_3() -> u64 {
        // break
        let mut total = 0;
        let mut i = 0;
        while i < 5 {
            i += 1;
            if i > 3 {
                // Exit loop
                break;
            }
            total += i;
        }

        // total = 1 + 2 + 3
        total
    }
}

```

Collapse_Icon ClipboardText_