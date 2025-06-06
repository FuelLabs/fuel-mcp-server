[Docs](https://docs.fuel.network/) /

[Sway by Example Lib](https://docs.fuel.network/docs/sway-by-example-lib/) /

Tuples

## _Icon Link_ [Tuples](https://docs.fuel.network/docs/sway-by-example-lib/tuples/\#tuples)

Examples of tuples in Sway

```fuel_Box fuel_Box-idXKMmm-css
contract;

// Tuples
// - Create, read, update
// - Nested
// - Destructure and "_"

abi MyContract {
    fn test_func() -> (u64, (str, bool));
}

impl MyContract for Contract {
    fn test_func() -> (u64, (str, bool)) {
        let mut tuple: (u64, bool, u64) = (1, false, 2);
        tuple.0 = 123;
        let x = tuple.0;

        let nested = (1, ("Fuel", false));
        let s = nested.1.0;

        let (n, (s, b)) = nested;
        // Skip variables for 0 and 1.1
        let (_, (s, _)) = nested;

        nested
    }
}

```

_Icon ClipboardText_