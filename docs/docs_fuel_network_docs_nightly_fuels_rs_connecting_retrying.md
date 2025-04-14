[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Connecting](https://docs.fuel.network/docs/nightly/fuels-rs/connecting/) /

Retrying

## _Icon Link_ [Retrying requests](https://docs.fuel.network/docs/nightly/fuels-rs/connecting/retrying/\#retrying-requests)

The [`Provider` _Icon Link_](https://docs.rs/fuels/0.62.0/fuels/accounts/provider/struct.Provider.html) can be configured to retry a request upon receiving a `io::Error`.

> _Icon InfoCircle_
>
> Note: Currently all node errors are received as `io::Error` s. So, if configured, a retry will happen even if, for example, a transaction failed to verify.

We can configure the number of retry attempts and the retry strategy as detailed below.

## _Icon Link_ [`RetryConfig`](https://docs.fuel.network/docs/nightly/fuels-rs/connecting/retrying/\#retryconfig)

The retry behavior can be altered by giving a custom `RetryConfig`. It allows for configuring the maximum number of attempts and the interval strategy used.

```fuel_Box fuel_Box-idXKMmm-css
#[derive(Clone, Debug)]
pub struct RetryConfig {
    max_attempts: NonZeroU32,
    interval: Backoff,
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
let retry_config = RetryConfig::new(3, Backoff::Fixed(Duration::from_secs(2)))?;
let provider = setup_test_provider(coins.clone(), vec![], None, None)
    .await?
    .with_retry_config(retry_config);
```

_Icon ClipboardText_

## _Icon Link_ [Interval strategy - `Backoff`](https://docs.fuel.network/docs/nightly/fuels-rs/connecting/retrying/\#interval-strategy---backoff)

`Backoff` defines different strategies for managing intervals between retry attempts.
Each strategy allows you to customize the waiting time before a new attempt based on the number of attempts made.

## _Icon Link_ [Variants](https://docs.fuel.network/docs/nightly/fuels-rs/connecting/retrying/\#variants)

- `Linear(Duration)`: `Default` Increases the waiting time linearly with each attempt.
- `Exponential(Duration)`: Doubles the waiting time with each attempt.
- `Fixed(Duration)`: Uses a constant waiting time between attempts.

```fuel_Box fuel_Box-idXKMmm-css
#[derive(Debug, Clone)]
pub enum Backoff {
    Linear(Duration),
    Exponential(Duration),
    Fixed(Duration),
}
```

_Icon ClipboardText_