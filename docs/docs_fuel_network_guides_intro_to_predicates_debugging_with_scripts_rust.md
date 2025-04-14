[Guides](https://docs.fuel.network/guides/) /

[Intro to Predicates](https://docs.fuel.network/guides/intro-to-predicates/) /

Logging in Rust Tests

## _Icon Link_ [Logging in Rust tests](https://docs.fuel.network/guides/intro-to-predicates/debugging-with-scripts-rust/\#logging-in-rust-tests)

## _Icon Link_ [Generating a Test Template in Rust](https://docs.fuel.network/guides/intro-to-predicates/debugging-with-scripts-rust/\#generating-a-test-template-in-rust)

To create your own test template using Rust, follow these steps with `cargo-generate` in the script project directory:

1. Install `cargo-generate`:

```fuel_Box fuel_Box-idXKMmm-css
cargo install cargo-generate --locked
```

_Icon ClipboardText_

2. Generate the template:

```fuel_Box fuel_Box-idXKMmm-css
cargo generate --init fuellabs/sway templates/sway-test-rs --name sway-store
```

_Icon ClipboardText_

## _Icon Link_ [Logging](https://docs.fuel.network/guides/intro-to-predicates/debugging-with-scripts-rust/\#logging)

We previously covered imports and setting up the predicate in an earlier introduction to Sway tutorial, specifically in the [Rust testing section _Icon Link_](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/). If you haven't checked that out yet, I highly recommend doing so.

Copy and paste the rust test below:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::{
    prelude::*,
    crypto::SecretKey
};

abigen!(Script(
    name = "MultiSigScript",
    abi = "./out/debug/predicate-script-logging-abi.json"
));

#[tokio::test]
async fn script_logs() -> Result<()> {
    // WALLET
    let private_key: SecretKey =
    "0xc2620849458064e8f1eb2bc4c459f473695b443ac3134c82ddd4fd992bd138fd"
        .parse()
        .unwrap();

    let mut wallet: WalletUnlocked = WalletUnlocked::new_from_private_key(private_key, None);

    // TOKENS

    let all_coins = [&wallet]
        .iter()
        .flat_map(|wallet| {
            setup_single_asset_coins(wallet.address(), AssetId::default(), 10, 1_000_000)
        })
        .collect::<Vec<_>>();

    // PROVIDER
    let node_config = NodeConfig::default();

    let provider = setup_test_provider(all_coins, vec![], Some(node_config), None).await.unwrap();

    [&mut wallet]
        .iter_mut()
        .for_each(|wallet| {
            wallet.set_provider(provider.clone());
        });

    let bin_path = "./out/debug/predicate-script-logging.bin";

    let instance = MultiSigScript::new(wallet.clone(), bin_path);

    let response = instance.main().call().await?;

    let logs = response.decode_logs();
    println!("{:?}", logs);
    Ok(())
    // Now you have an instance of your contract you can use to test each function
}
```

Collapse_Icon ClipboardText_

Now, I want to draw your attention to a specific portion of the code here:

```fuel_Box fuel_Box-idXKMmm-css
let bin_path = "./out/debug/predicate-script-logging.bin";

let instance = MultiSigScript::new(wallet.clone(), bin_path);

let response = instance.main().call().await?;

let logs = response.decode_logs();
println!("{:?}", logs);
```

_Icon ClipboardText_

We can now call `decode_logs` to extract our secret number, something we weren't able to do when testing with predicates.

To enable print outputs to appear in the console during tests, you can use the `nocapture` flag.

```fuel_Box fuel_Box-idXKMmm-css
cargo test -- --nocapture
```

_Icon ClipboardText_

Remembering this method is essential when developing more complex predicates, especially as debugging becomes increasingly challenging.