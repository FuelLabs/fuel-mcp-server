[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway by Example Lib](https://docs.fuel.network/docs/nightly/sway-by-example-lib/) /

Options

## _Icon Link_ [Options](https://docs.fuel.network/docs/nightly/sway-by-example-lib/options/\#options)

Examples of options in Sway

```fuel_Box fuel_Box-idXKMmm-css
contract;

// Option<T> = Some(T) | None

abi MyContract {
    fn test_func() -> (Option<bool>, Option<bool>, Option<bool>);
}

impl MyContract for Contract {
    fn test_func() -> (Option<bool>, Option<bool>, Option<bool>) {
        let liked = Option::Some(true);
        let disliked = Option::Some(false);
        let none = Option::None;
        (liked, disliked, none)
    }
}

```

_Icon ClipboardText_