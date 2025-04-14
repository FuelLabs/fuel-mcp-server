[Docs](https://docs.fuel.network/) /

[Sway Libs](https://docs.fuel.network/docs/sway-libs/) /

[Getting Started](https://docs.fuel.network/docs/sway-libs/getting_started/) /

Running Tests

## _Icon Link_ [Running Tests](https://docs.fuel.network/docs/sway-libs/getting_started/running_tests/\#running-tests)

There are two sets of tests that should be run: inline tests and sdk-harness tests. Please make sure you are using `forc v0.63.3` and `fuel-core v0.34.0`. You can check what version you are using by running the `fuelup show` command.

Make sure you are in the source directory of this repository `sway-libs/<you are here>`.

Run the inline tests:

```fuel_Box fuel_Box-idXKMmm-css
forc test --path libs --release --locked
```

_Icon ClipboardText_

Once these tests have passed, run the sdk-harness tests:

```fuel_Box fuel_Box-idXKMmm-css
forc test --path tests --release --locked && cargo test --manifest-path tests/Cargo.toml
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE:**
> This may take a while depending on your hardware, future improvements to Sway will decrease build times. After this has been run once, individual test projects may be built on their own to save time.