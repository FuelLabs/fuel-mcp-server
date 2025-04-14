[Docs](https://docs.fuel.network/) /

[Sway by Example Lib](https://docs.fuel.network/docs/sway-by-example-lib/) /

Constants

## _Icon Link_ [Constants](https://docs.fuel.network/docs/sway-by-example-lib/constants/\#constants)

Examples of constants in Sway

```fuel_Box fuel_Box-idXKMmm-css
contract;

// Constants

// 0x0000000000000000000000000000000000000000000000000000000000000000
const ZERO_B256: b256 = b256::min();
const ZERO_ADDRESS = Address::from(ZERO_B256);

// Associated constants
struct Point {
    x: u64,
    y: u64,
}

impl Point {
    const ZERO: Point = Point { x: 0, y: 0 };
}

abi MyContract {
    fn test_func() -> Point;
}

impl MyContract for Contract {
    fn test_func() -> Point {
        // Can also define a constant inside a function
        const MY_NUM: u64 = 123;
        Point::ZERO
    }
}

```

_Icon ClipboardText_