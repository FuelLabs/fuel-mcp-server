[Guides](https://docs.fuel.network/guides/) /

[Intro to Predicates](https://docs.fuel.network/guides/intro-to-predicates/) /

Rust Testing

## _Icon Link_ [Testing the predicate](https://docs.fuel.network/guides/intro-to-predicates/rust-sdk/\#testing-the-predicate)

Let's jump back into our MultiSig project again!

```fuel_Box fuel_Box-idXKMmm-css
cd ../../multisig-predicate/predicate
```

_Icon ClipboardText_

## _Icon Link_ [Generating a Test Template in Rust](https://docs.fuel.network/guides/intro-to-predicates/rust-sdk/\#generating-a-test-template-in-rust)

Again follow these steps with `cargo-generate` in the predicate project directory like we did previously:

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

3. Update the Cargo.toml file

```fuel_Box fuel_Box-idXKMmm-css
[package]
name = "predicate"
description = "A cargo-generate template for Rust + Sway integration testing."
version = "0.1.0"
edition = "2021"
authors = ["Call Delegation <106365423+calldelegation@users.noreply.github.com>"]
license = "Apache-2.0"

[dev-dependencies]
fuels = { version = "0.66.10" }
fuel-core-client = { version = "0.40" }
tokio = { version = "1.12", features = ["rt", "macros"] }

[[test]]
harness = true
name = "integration_tests"
path = "tests/harness.rs"
```

_Icon ClipboardText_

## _Icon Link_ [Imports](https://docs.fuel.network/guides/intro-to-predicates/rust-sdk/\#imports)

Delete the templated code and copy the following imports into your harness file. It's important to pay attention to two main imports: `predicates`, for obvious reasons, and the `ScriptTransactionBuilder`, which we'll use to create transactions. These transactions must be signed before being broadcasted to our local network.

```fuel_Box fuel_Box-idXKMmm-css
use fuels::{
    crypto::SecretKey,
    accounts::{
        predicate::Predicate,
        wallet::WalletUnlocked,
        Account,
    },
    client::{
        FuelClient,
        PaginationRequest
    },
    prelude::*,
    types::transaction_builders::{ScriptTransactionBuilder, BuildableTransaction},
};

use fuel_core_client::client::types::TransactionStatus;
```

_Icon ClipboardText_

Similar to Rust testing for contracts, we'll import the predicate ABI (Application Binary Interface) to interact with it. Ensure the name of your predicate matches the one you're working with.

```fuel_Box fuel_Box-idXKMmm-css
abigen!(Predicate(
    name = "MultiSig",
    abi = "./out/debug/predicate-abi.json"
));
```

_Icon ClipboardText_

## _Icon Link_ [Setup](https://docs.fuel.network/guides/intro-to-predicates/rust-sdk/\#setup)

If you're familiar with Rust testing for Sway projects, much of the setup will be similar. Copy and paste the `setup_wallets_and_network` function into your harness file.

```fuel_Box fuel_Box-idXKMmm-css
async fn setup_wallets_and_network() -> (Vec<WalletUnlocked>, Provider, AssetId) {
    // WALLETS
    let private_key_0: SecretKey =
        "0xc2620849458064e8f1eb2bc4c459f473695b443ac3134c82ddd4fd992bd138fd"
            .parse()
            .unwrap();
    let private_key_1: SecretKey =
        "0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd"
            .parse()
            .unwrap();
    let private_key_2: SecretKey =
        "0x976e5c3fa620092c718d852ca703b6da9e3075b9f2ecb8ed42d9f746bf26aafb"
            .parse()
            .unwrap();

    let mut wallet_0: WalletUnlocked = WalletUnlocked::new_from_private_key(private_key_0, None);
    let mut wallet_1: WalletUnlocked = WalletUnlocked::new_from_private_key(private_key_1, None);
    let mut wallet_2: WalletUnlocked = WalletUnlocked::new_from_private_key(private_key_2, None);

    // TOKENS
    let asset_id = AssetId::default();

    let all_coins = [&wallet_0, &wallet_1, &wallet_2]
        .iter()
        .flat_map(|wallet| {
            setup_single_asset_coins(wallet.address(), AssetId::default(), 10, 1_000_000)
        })
        .collect::<Vec<_>>();

    // NETWORKS
    let node_config = NodeConfig::default();

    let provider = setup_test_provider(all_coins, vec![], Some(node_config), None).await.unwrap();

    [&mut wallet_0, &mut wallet_1, &mut wallet_2]
        .iter_mut()
        .for_each(|wallet| {
            wallet.set_provider(provider.clone());
        });

    return (
        vec![wallet_0, wallet_1, wallet_2],
        provider,
        asset_id,
    );
}

async fn get_accumulated_fee(client: &FuelClient) -> u64 {
    let status = client
        .transactions(PaginationRequest {
            cursor: None,
            results: 1,
            direction: fuels::client::PageDirection::Forward,
        })
        .await
        .unwrap()
        .results[0]
        .status
        .clone();

    let mut accumulated_fee = 0;

    if let TransactionStatus::Success { total_fee, .. } = status {
        accumulated_fee = total_fee;
    }

    accumulated_fee
}
```

Collapse_Icon ClipboardText_

The three key setup steps include:

1. Configuring the wallets that will act as owners of our multisig, through the configurables you'll see later in the tests.

```fuel_Box fuel_Box-idXKMmm-css
// WALLETS
let private_key_0: SecretKey =
    "0xc2620849458064e8f1eb2bc4c459f473695b443ac3134c82ddd4fd992bd138fd"
        .parse()
        .unwrap();
let private_key_1: SecretKey =
    "0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd"
        .parse()
        .unwrap();
let private_key_2: SecretKey =
    "0x976e5c3fa620092c718d852ca703b6da9e3075b9f2ecb8ed42d9f746bf26aafb"
        .parse()
        .unwrap();

let mut wallet_0: WalletUnlocked = WalletUnlocked::new_from_private_key(private_key_0, None);
let mut wallet_1: WalletUnlocked = WalletUnlocked::new_from_private_key(private_key_1, None);
let mut wallet_2: WalletUnlocked = WalletUnlocked::new_from_private_key(private_key_2, None);
```

_Icon ClipboardText_

2. Setting up the default token (zeroth address) and loading some tokens into each wallet.

```fuel_Box fuel_Box-idXKMmm-css
// TOKENS
let asset_id = AssetId::default();

let all_coins = [&wallet_0, &wallet_1, &wallet_2]
    .iter()
    .flat_map(|wallet| {
        setup_single_asset_coins(wallet.address(), AssetId::default(), 10, 1_000_000)
    })
    .collect::<Vec<_>>();
```

_Icon ClipboardText_

3. Preparing the network to broadcast our transaction, enabling us to successfully unlock the tokens from the predicate later.

```fuel_Box fuel_Box-idXKMmm-css
// NETWORKS
let node_config = NodeConfig::default();

let provider = setup_test_provider(all_coins, vec![], Some(node_config), None).await.unwrap();
```

_Icon ClipboardText_

Since the predicate address is deterministic, we don't need to copy it as we do with smart contracts, which are deployed with a different address each time. We can leverage SDKs to build the predicate, ensuring we're working with the correct address without error!

4. Gas isn't just used by the script itself; you also pay for the size of the transaction, signature checks, VM initialization, etc. These costs do not count towards the script gas so it might be hidden.

```fuel_Box fuel_Box-idXKMmm-css
async fn get_accumulated_fee(client: &FuelClient) -> u64 {
    let status = client
        .transactions(PaginationRequest {
            cursor: None,
            results: 1,
            direction: fuels::client::PageDirection::Forward,
        })
        .await
        .unwrap()
        .results[0]
        .status
        .clone();

    let mut accumulated_fee = 0;

    if let TransactionStatus::Success { total_fee, .. } = status {
        accumulated_fee = total_fee;
    }

    accumulated_fee
}
```

_Icon ClipboardText_

## _Icon Link_ [Test Cases](https://docs.fuel.network/guides/intro-to-predicates/rust-sdk/\#test-cases)

## _Icon Link_ [Valid 2 of 3 signatures](https://docs.fuel.network/guides/intro-to-predicates/rust-sdk/\#valid-2-of-3-signatures)

Now, let's review the sequence of actions we'll take to simulate a real-world scenario, copy and paste the first test below and let's break it down step by step:

```fuel_Box fuel_Box-idXKMmm-css
#[tokio::test]
async fn multisig_two_of_three() -> Result<()> {
    let (wallets, provider, asset_id) = setup_wallets_and_network().await;
    let client = FuelClient::new(provider.url()).unwrap();

    // CONFIGURABLES
    let required_signatures = 2;
    let signers: [Address; 3] = [\
        wallets[0].address().into(),\
        wallets[1].address().into(),\
        wallets[2].address().into(),\
    ];

    let configurables = MultiSigConfigurables::default()
        .with_REQUIRED_SIGNATURES(required_signatures)?
        .with_SIGNERS(signers)?;

    // PREDICATE
    let predicate_binary_path = "./out/debug/predicate.bin";
    let predicate: Predicate = Predicate::load_from(predicate_binary_path)?
        .with_provider(provider.clone())
        .with_configurables(configurables);

    // FUND PREDICATE
    let multisig_amount = 100;
    let wallet_0_amount = provider.get_asset_balance(wallets[0].address(), asset_id).await?;

    wallets[0]
        .transfer(predicate.address(), multisig_amount, asset_id, TxPolicies::default())
        .await?;
    let mut accumulated_fee = get_accumulated_fee(&client).await;

    // BUILD TRANSACTION
    let mut tb: ScriptTransactionBuilder = {
        let input_coin = predicate.get_asset_inputs_for_amount(asset_id, 1, None).await?;
        let output_coin =
            predicate.get_asset_outputs_for_amount(wallets[0].address().into(), asset_id, multisig_amount - 1); // minus 1 for gas

        ScriptTransactionBuilder::prepare_transfer(
            input_coin,
            output_coin,
            TxPolicies::default(),
        )
    };

    // SIGN TRANSACTION
    tb.add_signer(wallets[0].clone())?;
    tb.add_signer(wallets[1].clone())?;

    assert_eq!(provider.get_asset_balance(predicate.address(), asset_id).await?, multisig_amount);
    assert_eq!(provider.get_asset_balance(wallets[0].address(), asset_id).await?, wallet_0_amount - multisig_amount - accumulated_fee);

    // SPEND PREDICATE
    let tx: ScriptTransaction = tb.build(provider.clone()).await?;
    provider.send_transaction_and_await_commit(tx).await?;
    accumulated_fee += get_accumulated_fee(&client).await;

    assert_eq!(provider.get_asset_balance(predicate.address(), asset_id).await?, 0);
    assert_eq!(provider.get_asset_balance(wallets[0].address(), asset_id).await?, wallet_0_amount - accumulated_fee);

    Ok(())
}
```

Collapse_Icon ClipboardText_

1. A group or individuals create their multisig by specifying the wallets that will safeguard the funds.
2. Funding the predicate.
3. Extracting the tokens when needed by building a transaction and getting the original wallets to sign it.
4. Broadcasting the transaction to unlock the funds from the predicate.

For step 1, as mentioned earlier, when we configure the number of required signatures (up to 3) and the 3 addresses that will safeguard our funds. Importing the ABI will automatically load a `PredicateNameConfigurable` type. In our case, that will be `MultiSigConfigurables`. There will be a corresponding with\_configurable function to help you load each configurable. In our case, `with_REQUIRED_SIGNATURES` and `with_SIGNERS` are both loaded in!

How convenient!

```fuel_Box fuel_Box-idXKMmm-css
// CONFIGURABLES
let required_signatures = 2;
let signers: [Address; 3] = [\
    wallets[0].address().into(),\
    wallets[1].address().into(),\
    wallets[2].address().into(),\
];

let configurables = MultiSigConfigurables::default()
    .with_REQUIRED_SIGNATURES(required_signatures)?
    .with_SIGNERS(signers)?;
```

_Icon ClipboardText_

Next, we'll load our original predicate binary with our new configurables to generate our personalized predicate instance. Simply input your configurables using the `with_configurables` function, and this will give us a unique predicate root based on our inputs.

```fuel_Box fuel_Box-idXKMmm-css
// PREDICATE
let predicate_binary_path = "./out/debug/predicate.bin";
let predicate: Predicate = Predicate::load_from(predicate_binary_path)?
    .with_provider(provider.clone())
    .with_configurables(configurables);
```

_Icon ClipboardText_

For step 2, transferring funds to our newly generated predicate root is as straightforward as any other blockchain transfer.

```fuel_Box fuel_Box-idXKMmm-css
// FUND PREDICATE
let multisig_amount = 100;
let wallet_0_amount = provider.get_asset_balance(wallets[0].address(), asset_id).await?;

wallets[0]
    .transfer(predicate.address(), multisig_amount, asset_id, TxPolicies::default())
    .await?;
let mut accumulated_fee = get_accumulated_fee(&client).await;
```

_Icon ClipboardText_

In step 3, when the multisig holders decide to use the locked funds, we build a transaction specifying the inputs and outputs. Pay close attention to the outputs; we need to specify where the tokens from the predicate are going, which native asset they involve, and the amount. We're essentially extracting a portion of the original base asset sent into the predicate.

```fuel_Box fuel_Box-idXKMmm-css
// BUILD TRANSACTION
let mut tb: ScriptTransactionBuilder = {
    let input_coin = predicate.get_asset_inputs_for_amount(asset_id, 1, None).await?;
    let output_coin =
        predicate.get_asset_outputs_for_amount(wallets[0].address().into(), asset_id, multisig_amount - 1); // minus 1 for gas

    ScriptTransactionBuilder::prepare_transfer(
        input_coin,
        output_coin,
        TxPolicies::default(),
    )
};
```

_Icon ClipboardText_

The correct wallet addresses configured in the configurables must sign the transactions. This information, loaded as witness data, will evaluate our predicate to true. It's crucial to provide enough correct, unique signatures; otherwise, the transaction will fail, as demonstrated in later tests. Since our test only requires 2 signatures, we need to provide just those.

```fuel_Box fuel_Box-idXKMmm-css
// SIGN TRANSACTION
tb.add_signer(wallets[0].clone())?;
tb.add_signer(wallets[1].clone())?;
```

_Icon ClipboardText_

After the evaluation is correctly done, all we need to do is broadcast the transaction, and the requested funds should return to wallet 1.

```fuel_Box fuel_Box-idXKMmm-css
// SPEND PREDICATE
let tx: ScriptTransaction = tb.build(provider.clone()).await?;
provider.send_transaction_and_await_commit(tx).await?;
accumulated_fee += get_accumulated_fee(&client).await;
```

_Icon ClipboardText_

## _Icon Link_ [Valid unordered 3 of 3 signatures](https://docs.fuel.network/guides/intro-to-predicates/rust-sdk/\#valid-unordered-3-of-3-signatures)

The setup for the second test, `multisig_mixed_three_of_three`, follows the same scheme, showcasing that the transaction signing can be done in any order by valid wallets.

```fuel_Box fuel_Box-idXKMmm-css
#[tokio::test]
async fn multisig_mixed_three_of_three() -> Result<()> {
    let (wallets, provider, asset_id) = setup_wallets_and_network().await;
    let client = FuelClient::new(provider.url()).unwrap();

    // CONFIGURABLES
    let required_signatures = 3;
    let signers: [Address; 3] = [\
        wallets[0].address().into(),\
        wallets[1].address().into(),\
        wallets[2].address().into(),\
    ];

    let configurables = MultiSigConfigurables::default()
        .with_REQUIRED_SIGNATURES(required_signatures)?
        .with_SIGNERS(signers)?;

    // PREDICATE
    let predicate_binary_path = "./out/debug/predicate.bin";
    let predicate: Predicate = Predicate::load_from(predicate_binary_path)?
        .with_provider(provider.clone())
        .with_configurables(configurables);

    let multisig_amount = 100;
    let wallet_0_amount = provider.get_asset_balance(wallets[0].address(), asset_id).await?;

    wallets[0]
        .transfer(predicate.address(), multisig_amount, asset_id, TxPolicies::default())
        .await?;
    let mut accumulated_fee = get_accumulated_fee(&client).await;

    let mut tb: ScriptTransactionBuilder = {
        let input_coin = predicate.get_asset_inputs_for_amount(asset_id, 1, None).await?;

        let output_coin =
            predicate.get_asset_outputs_for_amount(wallets[0].address().into(), asset_id, multisig_amount - 1); // minus 1 for gas

        ScriptTransactionBuilder::prepare_transfer(
            input_coin,
            output_coin,
            TxPolicies::default(),
        )
    };

    // NOTE Cannot be signed in any order
    tb.add_signer(wallets[2].clone())?;
    tb.add_signer(wallets[0].clone())?;
    tb.add_signer(wallets[1].clone())?;

    assert_eq!(provider.get_asset_balance(predicate.address(), asset_id).await?, multisig_amount);
    assert_eq!(provider.get_asset_balance(wallets[0].address(), asset_id).await?, wallet_0_amount - multisig_amount - accumulated_fee);

    // SPEND PREDICATE
    let tx: ScriptTransaction = tb.build(provider.clone()).await?;
    provider.send_transaction_and_await_commit(tx).await?;
    accumulated_fee += get_accumulated_fee(&client).await;

    assert_eq!(provider.get_asset_balance(predicate.address(), asset_id).await?, 0);
    assert_eq!(provider.get_asset_balance(wallets[0].address(), asset_id).await?, wallet_0_amount - accumulated_fee);

    Ok(())
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Insufficient valid Signatures](https://docs.fuel.network/guides/intro-to-predicates/rust-sdk/\#insufficient-valid-signatures)

The same principle applies to the third test, `multisig_not_enough_signatures_fails`, where the transaction will fail if there aren't enough signatures.

```fuel_Box fuel_Box-idXKMmm-css
#[tokio::test]
async fn multisig_not_enough_signatures_fails() -> Result<()> {
    let (wallets, provider, asset_id) = setup_wallets_and_network().await;
    let client = FuelClient::new(provider.url()).unwrap();

    // CONFIGURABLES
    let required_signatures = 2;
    let signers: [Address; 3] = [\
        wallets[0].address().into(),\
        wallets[1].address().into(),\
        wallets[2].address().into(),\
    ];

    let configurables = MultiSigConfigurables::default()
        .with_REQUIRED_SIGNATURES(required_signatures)?
        .with_SIGNERS(signers)?;

    // PREDICATE
    let predicate_binary_path = "./out/debug/predicate.bin";
    let predicate: Predicate = Predicate::load_from(predicate_binary_path)?
        .with_provider(provider.clone())
        .with_configurables(configurables);

    let multisig_amount = 100;
    let wallet_0_amount = provider.get_asset_balance(wallets[0].address(), asset_id).await?;

    wallets[0]
        .transfer(predicate.address(), multisig_amount, asset_id, TxPolicies::default())
        .await?;
    let accumulated_fee = get_accumulated_fee(&client).await;

    let mut tb: ScriptTransactionBuilder = {
        let input_coin = predicate.get_asset_inputs_for_amount(asset_id, 1, None).await?;

        let output_coin =
            predicate.get_asset_outputs_for_amount(wallets[0].address().into(), asset_id, multisig_amount - 1); // minus 1 for gas

        ScriptTransactionBuilder::prepare_transfer(
            input_coin,
            output_coin,
            TxPolicies::default(),
        )
    };

    tb.add_signer(wallets[0].clone())?;

    assert_eq!(provider.get_asset_balance(predicate.address(), asset_id).await?, multisig_amount);
    assert_eq!(provider.get_asset_balance(wallets[0].address(), asset_id).await?, wallet_0_amount - multisig_amount - accumulated_fee);

    // SPEND PREDICATE
    let tx: ScriptTransaction = tb.build(provider.clone()).await?;
    let _ = provider.send_transaction_and_await_commit(tx).await.is_err();

    Ok(())
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Checkpoint](https://docs.fuel.network/guides/intro-to-predicates/rust-sdk/\#checkpoint)

If you have followed the previous steps correctly, your `harness.rs` test file should look like this:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::{
    crypto::SecretKey,
    accounts::{
        predicate::Predicate,
        wallet::WalletUnlocked,
        Account,
    },
    client::{
        FuelClient,
        PaginationRequest
    },
    prelude::*,
    types::transaction_builders::{ScriptTransactionBuilder, BuildableTransaction},
};

use fuel_core_client::client::types::TransactionStatus;

abigen!(Predicate(
    name = "MultiSig",
    abi = "./out/debug/predicate-abi.json"
));

async fn setup_wallets_and_network() -> (Vec<WalletUnlocked>, Provider, AssetId) {
    // WALLETS
    let private_key_0: SecretKey =
        "0xc2620849458064e8f1eb2bc4c459f473695b443ac3134c82ddd4fd992bd138fd"
            .parse()
            .unwrap();
    let private_key_1: SecretKey =
        "0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd"
            .parse()
            .unwrap();
    let private_key_2: SecretKey =
        "0x976e5c3fa620092c718d852ca703b6da9e3075b9f2ecb8ed42d9f746bf26aafb"
            .parse()
            .unwrap();

    let mut wallet_0: WalletUnlocked = WalletUnlocked::new_from_private_key(private_key_0, None);
    let mut wallet_1: WalletUnlocked = WalletUnlocked::new_from_private_key(private_key_1, None);
    let mut wallet_2: WalletUnlocked = WalletUnlocked::new_from_private_key(private_key_2, None);

    // TOKENS
    let asset_id = AssetId::default();

    let all_coins = [&wallet_0, &wallet_1, &wallet_2]
        .iter()
        .flat_map(|wallet| {
            setup_single_asset_coins(wallet.address(), AssetId::default(), 10, 1_000_000)
        })
        .collect::<Vec<_>>();

    // NETWORKS
    let node_config = NodeConfig::default();

    let provider = setup_test_provider(all_coins, vec![], Some(node_config), None).await.unwrap();

    [&mut wallet_0, &mut wallet_1, &mut wallet_2]
        .iter_mut()
        .for_each(|wallet| {
            wallet.set_provider(provider.clone());
        });

    return (
        vec![wallet_0, wallet_1, wallet_2],
        provider,
        asset_id,
    );
}

async fn get_accumulated_fee(client: &FuelClient) -> u64 {
    let status = client
        .transactions(PaginationRequest {
            cursor: None,
            results: 1,
            direction: fuels::client::PageDirection::Forward,
        })
        .await
        .unwrap()
        .results[0]
        .status
        .clone();

    let mut accumulated_fee = 0;

    if let TransactionStatus::Success { total_fee, .. } = status {
        accumulated_fee = total_fee;
    }

    accumulated_fee
}

#[tokio::test]
async fn multisig_two_of_three() -> Result<()> {
    let (wallets, provider, asset_id) = setup_wallets_and_network().await;
    let client = FuelClient::new(provider.url()).unwrap();

    // CONFIGURABLES
    let required_signatures = 2;
    let signers: [Address; 3] = [\
        wallets[0].address().into(),\
        wallets[1].address().into(),\
        wallets[2].address().into(),\
    ];

    let configurables = MultiSigConfigurables::default()
        .with_REQUIRED_SIGNATURES(required_signatures)?
        .with_SIGNERS(signers)?;

    // PREDICATE
    let predicate_binary_path = "./out/debug/predicate.bin";
    let predicate: Predicate = Predicate::load_from(predicate_binary_path)?
        .with_provider(provider.clone())
        .with_configurables(configurables);

    // FUND PREDICATE
    let multisig_amount = 100;
    let wallet_0_amount = provider.get_asset_balance(wallets[0].address(), asset_id).await?;

    wallets[0]
        .transfer(predicate.address(), multisig_amount, asset_id, TxPolicies::default())
        .await?;
    let mut accumulated_fee = get_accumulated_fee(&client).await;

    // BUILD TRANSACTION
    let mut tb: ScriptTransactionBuilder = {
        let input_coin = predicate.get_asset_inputs_for_amount(asset_id, 1, None).await?;
        let output_coin =
            predicate.get_asset_outputs_for_amount(wallets[0].address().into(), asset_id, multisig_amount - 1); // minus 1 for gas

        ScriptTransactionBuilder::prepare_transfer(
            input_coin,
            output_coin,
            TxPolicies::default(),
        )
    };

    // SIGN TRANSACTION
    tb.add_signer(wallets[0].clone())?;
    tb.add_signer(wallets[1].clone())?;

    assert_eq!(provider.get_asset_balance(predicate.address(), asset_id).await?, multisig_amount);
    assert_eq!(provider.get_asset_balance(wallets[0].address(), asset_id).await?, wallet_0_amount - multisig_amount - accumulated_fee);

    // SPEND PREDICATE
    let tx: ScriptTransaction = tb.build(provider.clone()).await?;
    provider.send_transaction_and_await_commit(tx).await?;
    accumulated_fee += get_accumulated_fee(&client).await;

    assert_eq!(provider.get_asset_balance(predicate.address(), asset_id).await?, 0);
    assert_eq!(provider.get_asset_balance(wallets[0].address(), asset_id).await?, wallet_0_amount - accumulated_fee);

    Ok(())
}

#[tokio::test]
async fn multisig_mixed_three_of_three() -> Result<()> {
    let (wallets, provider, asset_id) = setup_wallets_and_network().await;
    let client = FuelClient::new(provider.url()).unwrap();

    // CONFIGURABLES
    let required_signatures = 3;
    let signers: [Address; 3] = [\
        wallets[0].address().into(),\
        wallets[1].address().into(),\
        wallets[2].address().into(),\
    ];

    let configurables = MultiSigConfigurables::default()
        .with_REQUIRED_SIGNATURES(required_signatures)?
        .with_SIGNERS(signers)?;

    // PREDICATE
    let predicate_binary_path = "./out/debug/predicate.bin";
    let predicate: Predicate = Predicate::load_from(predicate_binary_path)?
        .with_provider(provider.clone())
        .with_configurables(configurables);

    let multisig_amount = 100;
    let wallet_0_amount = provider.get_asset_balance(wallets[0].address(), asset_id).await?;

    wallets[0]
        .transfer(predicate.address(), multisig_amount, asset_id, TxPolicies::default())
        .await?;
    let mut accumulated_fee = get_accumulated_fee(&client).await;

    let mut tb: ScriptTransactionBuilder = {
        let input_coin = predicate.get_asset_inputs_for_amount(asset_id, 1, None).await?;

        let output_coin =
            predicate.get_asset_outputs_for_amount(wallets[0].address().into(), asset_id, multisig_amount - 1); // minus 1 for gas

        ScriptTransactionBuilder::prepare_transfer(
            input_coin,
            output_coin,
            TxPolicies::default(),
        )
    };

    // NOTE Cannot be signed in any order
    tb.add_signer(wallets[2].clone())?;
    tb.add_signer(wallets[0].clone())?;
    tb.add_signer(wallets[1].clone())?;

    assert_eq!(provider.get_asset_balance(predicate.address(), asset_id).await?, multisig_amount);
    assert_eq!(provider.get_asset_balance(wallets[0].address(), asset_id).await?, wallet_0_amount - multisig_amount - accumulated_fee);

    // SPEND PREDICATE
    let tx: ScriptTransaction = tb.build(provider.clone()).await?;
    provider.send_transaction_and_await_commit(tx).await?;
    accumulated_fee += get_accumulated_fee(&client).await;

    assert_eq!(provider.get_asset_balance(predicate.address(), asset_id).await?, 0);
    assert_eq!(provider.get_asset_balance(wallets[0].address(), asset_id).await?, wallet_0_amount - accumulated_fee);

    Ok(())
}

#[tokio::test]
async fn multisig_not_enough_signatures_fails() -> Result<()> {
    let (wallets, provider, asset_id) = setup_wallets_and_network().await;
    let client = FuelClient::new(provider.url()).unwrap();

    // CONFIGURABLES
    let required_signatures = 2;
    let signers: [Address; 3] = [\
        wallets[0].address().into(),\
        wallets[1].address().into(),\
        wallets[2].address().into(),\
    ];

    let configurables = MultiSigConfigurables::default()
        .with_REQUIRED_SIGNATURES(required_signatures)?
        .with_SIGNERS(signers)?;

    // PREDICATE
    let predicate_binary_path = "./out/debug/predicate.bin";
    let predicate: Predicate = Predicate::load_from(predicate_binary_path)?
        .with_provider(provider.clone())
        .with_configurables(configurables);

    let multisig_amount = 100;
    let wallet_0_amount = provider.get_asset_balance(wallets[0].address(), asset_id).await?;

    wallets[0]
        .transfer(predicate.address(), multisig_amount, asset_id, TxPolicies::default())
        .await?;
    let accumulated_fee = get_accumulated_fee(&client).await;

    let mut tb: ScriptTransactionBuilder = {
        let input_coin = predicate.get_asset_inputs_for_amount(asset_id, 1, None).await?;

        let output_coin =
            predicate.get_asset_outputs_for_amount(wallets[0].address().into(), asset_id, multisig_amount - 1); // minus 1 for gas

        ScriptTransactionBuilder::prepare_transfer(
            input_coin,
            output_coin,
            TxPolicies::default(),
        )
    };

    tb.add_signer(wallets[0].clone())?;

    assert_eq!(provider.get_asset_balance(predicate.address(), asset_id).await?, multisig_amount);
    assert_eq!(provider.get_asset_balance(wallets[0].address(), asset_id).await?, wallet_0_amount - multisig_amount - accumulated_fee);

    // SPEND PREDICATE
    let tx: ScriptTransaction = tb.build(provider.clone()).await?;
    let _ = provider.send_transaction_and_await_commit(tx).await.is_err();

    Ok(())
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Running the Tests](https://docs.fuel.network/guides/intro-to-predicates/rust-sdk/\#running-the-tests)

To run the test located in `tests/harness.rs`, use:

```fuel_Box fuel_Box-idXKMmm-css
cargo test
```

_Icon ClipboardText_

If you want to print outputs to the console during tests, use the `nocapture` flag:

```fuel_Box fuel_Box-idXKMmm-css
cargo test -- --nocapture
```

_Icon ClipboardText_

Congratulations on making it this far! We've confirmed that our Multisig works.

Predicates aren't meant to be intimidating. State-minimized DeFi applications should be the standard, rather than resorting to gas golfing or writing assembly code for these optimizations. Now that you have predicates in your toolbox, go out and explore what other state-minimized DeFi applications you can build!