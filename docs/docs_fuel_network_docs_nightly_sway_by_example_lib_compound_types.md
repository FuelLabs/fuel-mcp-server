[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway by Example Lib](https://docs.fuel.network/docs/nightly/sway-by-example-lib/) /

Compound Types

## _Icon Link_ [Compound Types](https://docs.fuel.network/docs/nightly/sway-by-example-lib/compound-types/\#compound-types)

Examples of compound data types in Sway

```fuel_Box fuel_Box-idXKMmm-css
contract;

// Compound types
// - Tuples
// - destructuring
// - Structs
// - Arrays

struct Point {
    x: u64,
    y: u64,
}

abi MyContract {
    fn test_func() -> Point;
}

impl MyContract for Contract {
    fn test_func() -> Point {
        // Tuples
        let t: (u64, bool) = (42, true);
        // Access tuple value
        assert(t.0 == 42);
        assert(t.1);

        // Destructuring a tuple (type annotation is optional)
        let (num, boo) = t;

        // Tuple of length 1
        let one: (u64, ) = (123, );

        // Struct
        let p = Point { x: 1, y: 2 };
        // Access struct fields
        assert(p.x == 1);
        assert(p.y == 2);

        // Array
        let u_arr: [u8; 5] = [1, 2, 3, 4, 5];
        let s_arr: [str; 4] = ["cat", "dog", "snake", "fish"];

        let struct_arr: [Point; 2] = [Point { x: 1, y: 2 }, Point { x: 11, y: 22 }];

        // Mutating array
        let mut mut_arr: [bool; 2] = [true, false];
        mut_arr[1] = true;

        p
    }

}

```

Collapse_Icon ClipboardText_