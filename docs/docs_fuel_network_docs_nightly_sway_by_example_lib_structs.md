[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway by Example Lib](https://docs.fuel.network/docs/nightly/sway-by-example-lib/) /

Structs

## _Icon Link_ [Structs](https://docs.fuel.network/docs/nightly/sway-by-example-lib/structs/\#structs)

Examples of structs in Sway

```fuel_Box fuel_Box-idXKMmm-css
contract;

// Structs
// - Create, read and update
// - Shorthand notation
// - Destructure

struct Point {
    x: u64,
    y: u64,
}

// Nested struct
struct Line {
    p0: Point,
    p1: Point,
}

abi MyContract {
    fn test_func() -> Line;
}

impl MyContract for Contract {
    fn test_func() -> Line {
        // Create, read and update
        let mut p0 = Point { x: 1, y: 2 };

        p0.x = 11;

        // Shorthand
        let x: u64 = 123;
        let y: u64 = 123;

        let p1 = Point { x, y };

        // Nested structs
        let line = Line { p0, p1 };

        // Destructure
        let Line {
            p0: Point { x: x0, y: y0 },
            p1: Point { x: x1, y: y1l },
        } = line;

        line
    }
}

```

Collapse_Icon ClipboardText_