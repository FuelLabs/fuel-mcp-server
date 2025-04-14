[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Calling Contracts](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/) /

Logs

## _Icon Link_ [Logs](https://docs.fuel.network/docs/nightly/fuels-rs/calling-contracts/logs/\#logs)

Whenever you log a value within a contract method, the resulting log entry is added to the log receipt and the variable type is recorded in the contract's ABI. The SDK lets you parse those values into Rust types.

Consider the following contract method:

```fuel_Box fuel_Box-idXKMmm-css
fn produce_logs_variables() {
    let f: u64 = 64;
    let u: b256 = 0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a;
    let e: str[4] = __to_str_array("Fuel");
    let l: [u8; 3] = [1u8, 2u8, 3u8];

    log(f);
    log(u);
    log(e);
    log(l);
}
```

_Icon ClipboardText_

You can access the logged values in Rust by calling `decode_logs_with_type::<T>` from a `CallResponse`, where `T` is the type of the logged variables you want to retrieve. The result will be a `Vec<T>`:

```fuel_Box fuel_Box-idXKMmm-css
let contract_methods = contract_instance.methods();
let response = contract_methods.produce_logs_variables().call().await?;

let log_u64 = response.decode_logs_with_type::<u64>()?;
let log_bits256 = response.decode_logs_with_type::<Bits256>()?;
let log_string = response.decode_logs_with_type::<SizedAsciiString<4>>()?;
let log_array = response.decode_logs_with_type::<[u8; 3]>()?;

let expected_bits256 = Bits256([\
    239, 134, 175, 169, 105, 108, 240, 220, 99, 133, 226, 196, 7, 166, 225, 89, 161, 16, 60,\
    239, 183, 226, 174, 6, 54, 251, 51, 211, 203, 42, 158, 74,\
]);

assert_eq!(log_u64, vec![64]);
assert_eq!(log_bits256, vec![expected_bits256]);
assert_eq!(log_string, vec!["Fuel"]);
assert_eq!(log_array, vec![[1, 2, 3]]);
```

_Icon ClipboardText_

You can use the `decode_logs()` function to retrieve a `LogResult` struct containing a `results` field that is a vector of `Result<String>` values representing the success or failure of decoding each log.

```fuel_Box fuel_Box-idXKMmm-css
let contract_methods = contract_instance.methods();
let response = contract_methods.produce_multiple_logs().call().await?;
let logs = response.decode_logs();
```

_Icon ClipboardText_

Due to possible performance hits, it is not recommended to use `decode_logs()` outside of a debugging scenario.

> _Icon InfoCircle_
>
> **Note:** String slices cannot be logged directly. Use the `__to_str_array()` function to convert it to a `str[N]` first.