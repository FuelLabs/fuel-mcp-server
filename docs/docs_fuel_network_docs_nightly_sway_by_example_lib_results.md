[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway by Example Lib](https://docs.fuel.network/docs/nightly/sway-by-example-lib/) /

Results

## _Icon Link_ [Results](https://docs.fuel.network/docs/nightly/sway-by-example-lib/results/\#results)

Examples of if statements in Sway

```fuel_Box fuel_Box-idXKMmm-css
contract;

// Result<T, E> = Ok(T) | Err(E)

enum MathError {
    DivByZero: (),
}

fn div(x: u64, y: u64) -> Result<u64, MathError> {
    if y == 0 {
        return Result::Err(MathError::DivByZero);
    }

    Result::Ok(x / y)
}

abi MyContract {
    fn test_div(x: u64, y: u64) -> u64;
}

impl MyContract for Contract {
    fn test_div(x: u64, y: u64) -> u64 {
        let res = div(x, y);
        match res {
            Result::Ok(val) => val,
            Result::Err(err) => revert(0),
        }
    }
}

```

_Icon ClipboardText_