[Guides](https://docs.fuel.network/guides/) /

[Intro to Sway](https://docs.fuel.network/guides/intro-to-sway/) /

Rust Testing

## _Icon Link_ [Testing the contract](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/\#testing-the-contract)

## _Icon Link_ [Generating a Test Template in Rust](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/\#generating-a-test-template-in-rust)

To create your own test template using Rust, follow these steps with `cargo-generate` in the contract project directory:

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
name = "sway-store"
description = "A cargo-generate template for Rust + Sway integration testing."
version = "0.1.0"
edition = "2021"
authors = ["Call Delegation <106365423+calldelegation@users.noreply.github.com>"]
license = "Apache-2.0"

[dev-dependencies]
fuels = "0.66.9"
fuel-core-client = { version = "0.40", default-features = false }
tokio = { version = "1.12", features = ["rt", "macros"] }

[[test]]
harness = true
name = "integration_tests"
path = "tests/harness.rs"
```

_Icon ClipboardText_

## _Icon Link_ [Imports](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/\#imports)

We will be changing the existing `harness.rs` test file that has been generated. Firstly we need to change the imports. By importing the Fuel Rust SDK you will get majority of the functionalities housed within the prelude.

```fuel_Box fuel_Box-idXKMmm-css
use fuels::{
    prelude::*,
    client::FuelClient,
    types::{
        Bytes32,
        Identity,
        SizedAsciiString
    }
};
use fuel_core_client::client::types::TransactionStatus;
```

_Icon ClipboardText_

Always compile your contracts after making any changes. This ensures you're working with the most recent `contract-abi` that gets generated.

Update your contract name and ABI path in the `abigen` macro to match the name of your contract:

```fuel_Box fuel_Box-idXKMmm-css
// Load abi from json
abigen!(Contract(name="SwayStore", abi="out/debug/test-contract-abi.json"));
```

_Icon ClipboardText_

## _Icon Link_ [Initializing Functions](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/\#initializing-functions)

When writing tests for Sway, two crucial objects are required: the contract instance and the wallets that interact with it. This helper function ensures a fresh start for every new test case so copy this into your test file. It will export the deployed contracts, the contract ID, and all the generated wallets for this purpose.

Replace the `get_contract_instance` function in your test harness with the function below:

```fuel_Box fuel_Box-idXKMmm-css
async fn get_contract_instance() -> (SwayStore<WalletUnlocked>, ContractId, Vec<WalletUnlocked>) {
    // Launch a local network and deploy the contract
    let wallets = launch_custom_provider_and_get_wallets(
        WalletsConfig::new(
            Some(3),             /* Three wallets */
            Some(1),             /* Single coin (UTXO) */
            Some(1_000_000_000), /* Amount per coin */
        ),
        None,
        None,
    )
    .await
    .unwrap();

    let wallet = wallets.get(0).unwrap().clone();

    let id = Contract::load_from(
        "./out/debug/test-contract.bin",
        LoadConfiguration::default(),
    )
    .unwrap()
    .deploy(&wallet, TxPolicies::default())
    .await
    .unwrap();

    let instance = SwayStore::new(id.clone(), wallet);

    (instance, id.into(), wallets)
}

async fn get_tx_fee(client: &FuelClient, tx_id: &Bytes32) -> u64 {
    match client.transaction_status(tx_id).await.unwrap() {
        TransactionStatus::Success { total_fee, .. }
        | TransactionStatus::Failure { total_fee, .. } => total_fee,
        _ => 0,
    }
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Test Cases](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/\#test-cases)

Given the immutable nature of smart contracts, it's important to cover all potential edge cases in your tests.
Let's delete the example `can_get_contract_id` test case and start writing some test cases at the bottom of our `harness.rs` file.

## _Icon Link_ [Setting Owner](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/\#setting-owner)

For this test case, we use the contract instance and use the SDK's `.with_account()` method. This lets us impersonate the first wallet. To check if the owner has been set correctly, we can see if the address given by the contract matches wallet 1's address. If you want to dig deeper, looking into the contract storage will show if wallet 1's address is stored properly.

```fuel_Box fuel_Box-idXKMmm-css
#[tokio::test]
async fn can_set_owner() {
    let (instance, _id, wallets) = get_contract_instance().await;

    // get access to a test wallet
    let wallet_1 = wallets.get(0).unwrap();

    // initialize wallet_1 as the owner
    let owner_result = instance
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();

    // make sure the returned identity matches wallet_1
    assert!(Identity::Address(wallet_1.address().into()) == owner_result.value);
}
```

_Icon ClipboardText_

## _Icon Link_ [Setting Owner Once](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/\#setting-owner-once)

An edge case we need to be vigilant about is an attempt to set the owner twice. We certainly don't want unauthorized ownership transfer of our contract! To address this, we've included the following line in our Sway contract: `require(owner.is_none(), "owner already initialized");`
This ensures the owner can only be set when it hasn't been previously established. To test this, we create a new contract instance: initially, we set the owner using wallet 1. Any subsequent attempt to set the owner with wallet 2 should be unsuccessful.

```fuel_Box fuel_Box-idXKMmm-css
#[tokio::test]
#[should_panic]
async fn can_set_owner_only_once() {
    let (instance, _id, wallets) = get_contract_instance().await;

    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let wallet_2 = wallets.get(1).unwrap();

    // initialize wallet_1 as the owner
    let _owner_result = instance.clone()
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();

    // this should fail
    // try to set the owner from wallet_2
    let _fail_owner_result = instance.clone()
        .with_account(wallet_2.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
}
```

_Icon ClipboardText_

## _Icon Link_ [Buying and Selling in the Marketplace](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/\#buying-and-selling-in-the-marketplace)

It's essential to test the basic functionalities of a smart contract to ensure its proper operation.
For this test, we have two wallets set up:

1. The first wallet initiates a transaction to list an item for sale. This is done by calling the `.list_item()` method, specifying both the price and details of the item they're selling.
2. The second wallet proceeds to purchase the listed item using the `.buy_item()` method, providing the index of the item they intend to buy.

Following these transactions, we'll assess the balances of both wallets to confirm the successful execution of the transactions.

```fuel_Box fuel_Box-idXKMmm-css
#[tokio::test]
async fn can_list_and_buy_item() {
    let (instance, _id, wallets) = get_contract_instance().await;
    // Now you have an instance of your contract you can use to test each function

    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let mut total_wallet_1_fees = 0;
    let wallet_1_starting_balance: u64 = wallet_1
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    let wallet_2 = wallets.get(1).unwrap();
    let mut total_wallet_2_fees = 0;
    let wallet_2_starting_balance: u64 = wallet_2
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    let provider = wallet_1.provider().unwrap().clone();
    let client = FuelClient::new(provider.url()).unwrap();

    // item 1 params
    let item_1_metadata: SizedAsciiString<20> = "metadata__url__here_"
        .try_into()
        .expect("Should have succeeded");
    let item_1_price: u64 = 15;

    // list item 1 from wallet_1
    let response = instance
        .clone()
        .with_account(wallet_1.clone())
        .methods()
        .list_item(item_1_price, item_1_metadata)
        .call()
        .await
        .unwrap();
    let tx = response.tx_id.unwrap();
    total_wallet_1_fees += get_tx_fee(&client, &tx).await;

    // call params to send the project price in the buy_item fn
    let call_params = CallParameters::default().with_amount(item_1_price);

    // buy item 1 from wallet_2
    let response = instance
        .clone()
        .with_account(wallet_2.clone())
        .methods()
        .buy_item(1)
        .with_variable_output_policy(VariableOutputPolicy::Exactly(1))
        .call_params(call_params)
        .unwrap()
        .call()
        .await
        .unwrap();
    total_wallet_2_fees += get_tx_fee(&client, &response.tx_id.unwrap()).await;

    // check the balances of wallet_1 and wallet_2
    let wallet_1_balance: u64 = wallet_1
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();
    let wallet_2_balance: u64 = wallet_2
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    // make sure the price was transferred from wallet_2 to
    assert_eq!(
        wallet_1_balance,
        wallet_1_starting_balance - total_wallet_1_fees + item_1_price
    );
    assert_eq!(
        wallet_2_balance,
        wallet_2_starting_balance - total_wallet_2_fees - item_1_price
    );

    let item_1 = instance.methods().get_item(1).call().await.unwrap();

    assert!(item_1.value.price == item_1_price);
    assert!(item_1.value.id == 1);
    assert!(item_1.value.total_bought == 1);
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Withdraw Owner Fees](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/\#withdraw-owner-fees)

Most importantly, as the creator of the marketplace, you need to ensure you're compensated. Similar to the previous tests, we'll invoke the relevant functions to make an exchange. This time, we'll verify if you can extract the difference in funds.

```fuel_Box fuel_Box-idXKMmm-css
#[tokio::test]
async fn can_withdraw_funds() {
    let (instance, _id, wallets) = get_contract_instance().await;
    // Now you have an instance of your contract you can use to test each function

    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let mut total_wallet_1_fees = 0;
    let wallet_1_starting_balance: u64 = wallet_1
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    let wallet_2 = wallets.get(1).unwrap();
    let mut total_wallet_2_fees = 0;
    let wallet_2_starting_balance: u64 = wallet_2
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    let wallet_3 = wallets.get(2).unwrap();
    let mut total_wallet_3_fees = 0;
    let wallet_3_starting_balance: u64 = wallet_3
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    let provider = wallet_1.provider().unwrap().clone();
    let client = FuelClient::new(provider.url()).unwrap();

    // initialize wallet_1 as the owner
    let response = instance
        .clone()
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
    let tx = response.tx_id.unwrap();
    total_wallet_1_fees += get_tx_fee(&client, &tx).await;

    // make sure the returned identity matches wallet_1
    assert!(Identity::Address(wallet_1.address().into()) == response.value);

    // item 1 params
    let item_1_metadata: SizedAsciiString<20> = "metadata__url__here_"
        .try_into()
        .expect("Should have succeeded");
    let item_1_price: u64 = 150_000_000;

    // list item 1 from wallet_2
    let response = instance
        .clone()
        .with_account(wallet_2.clone())
        .methods()
        .list_item(item_1_price, item_1_metadata)
        .call()
        .await;
    assert!(response.is_ok());
    total_wallet_2_fees += get_tx_fee(&client, &response.unwrap().tx_id.unwrap()).await;

    // make sure the item count increased
    let count = instance.clone()
        .methods()
        .get_count()
        .simulate(Execution::default())
        .await
        .unwrap();
    assert_eq!(count.value, 1);

    // call params to send the project price in the buy_item fn
    let call_params = CallParameters::default().with_amount(item_1_price);

    // buy item 1 from wallet_3
    let response = instance.clone()
        .with_account(wallet_3.clone())
        .methods()
        .buy_item(1)
        .with_variable_output_policy(VariableOutputPolicy::Exactly(1))
        .call_params(call_params)
        .unwrap()
        .call()
        .await;
    assert!(response.is_ok());
    total_wallet_3_fees += get_tx_fee(&client, &response.unwrap().tx_id.unwrap()).await;

     // make sure the item's total_bought count increased
     let listed_item = instance
        .methods()
        .get_item(1)
        .simulate(Execution::default())
        .await
        .unwrap();
    assert_eq!(listed_item.value.total_bought, 1);

    // withdraw the balance from the owner's wallet
    let response = instance
        .with_account(wallet_1.clone())
        .methods()
        .withdraw_funds()
        .with_variable_output_policy(VariableOutputPolicy::Exactly(1))
        .call()
        .await;
    assert!(response.is_ok());
    total_wallet_1_fees += get_tx_fee(&client, &response.unwrap().tx_id.unwrap()).await;

    // check the balances of wallet_1 and wallet_2
    let balance_1: u64 = wallet_1.get_asset_balance(&AssetId::zeroed()).await.unwrap();
    let balance_2: u64 = wallet_2.get_asset_balance(&AssetId::zeroed()).await.unwrap();
    let balance_3: u64 = wallet_3.get_asset_balance(&AssetId::zeroed()).await.unwrap();

    assert!(balance_1 == wallet_1_starting_balance - total_wallet_1_fees + (item_1_price / 20)); // 5% commission
    assert!(balance_2 == wallet_2_starting_balance - total_wallet_2_fees + item_1_price - ((item_1_price / 20))); // sell price - 5% commission
    assert!(balance_3 == wallet_3_starting_balance - total_wallet_3_fees - item_1_price);
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Checkpoint](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/\#checkpoint)

If you have followed the previous steps correctly your `harness.rs` test file should look like this:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::{
    prelude::*,
    client::FuelClient,
    types::{
        Bytes32,
        Identity,
        SizedAsciiString
    }
};
use fuel_core_client::client::types::TransactionStatus;

// Load abi from json
abigen!(Contract(name="SwayStore", abi="out/debug/test-contract-abi.json"));

async fn get_contract_instance() -> (SwayStore<WalletUnlocked>, ContractId, Vec<WalletUnlocked>) {
    // Launch a local network and deploy the contract
    let wallets = launch_custom_provider_and_get_wallets(
        WalletsConfig::new(
            Some(3),             /* Three wallets */
            Some(1),             /* Single coin (UTXO) */
            Some(1_000_000_000), /* Amount per coin */
        ),
        None,
        None,
    )
    .await
    .unwrap();

    let wallet = wallets.get(0).unwrap().clone();

    let id = Contract::load_from(
        "./out/debug/test-contract.bin",
        LoadConfiguration::default(),
    )
    .unwrap()
    .deploy(&wallet, TxPolicies::default())
    .await
    .unwrap();

    let instance = SwayStore::new(id.clone(), wallet);

    (instance, id.into(), wallets)
}

async fn get_tx_fee(client: &FuelClient, tx_id: &Bytes32) -> u64 {
    match client.transaction_status(tx_id).await.unwrap() {
        TransactionStatus::Success { total_fee, .. }
        | TransactionStatus::Failure { total_fee, .. } => total_fee,
        _ => 0,
    }
}

#[tokio::test]
async fn can_set_owner() {
    let (instance, _id, wallets) = get_contract_instance().await;

    // get access to a test wallet
    let wallet_1 = wallets.get(0).unwrap();

    // initialize wallet_1 as the owner
    let owner_result = instance
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();

    // make sure the returned identity matches wallet_1
    assert!(Identity::Address(wallet_1.address().into()) == owner_result.value);
}

#[tokio::test]
#[should_panic]
async fn can_set_owner_only_once() {
    let (instance, _id, wallets) = get_contract_instance().await;

    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let wallet_2 = wallets.get(1).unwrap();

    // initialize wallet_1 as the owner
    let _owner_result = instance.clone()
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();

    // this should fail
    // try to set the owner from wallet_2
    let _fail_owner_result = instance.clone()
        .with_account(wallet_2.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
}

#[tokio::test]
async fn can_list_and_buy_item() {
    let (instance, _id, wallets) = get_contract_instance().await;
    // Now you have an instance of your contract you can use to test each function

    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let mut total_wallet_1_fees = 0;
    let wallet_1_starting_balance: u64 = wallet_1
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    let wallet_2 = wallets.get(1).unwrap();
    let mut total_wallet_2_fees = 0;
    let wallet_2_starting_balance: u64 = wallet_2
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    let provider = wallet_1.provider().unwrap().clone();
    let client = FuelClient::new(provider.url()).unwrap();

    // item 1 params
    let item_1_metadata: SizedAsciiString<20> = "metadata__url__here_"
        .try_into()
        .expect("Should have succeeded");
    let item_1_price: u64 = 15;

    // list item 1 from wallet_1
    let response = instance
        .clone()
        .with_account(wallet_1.clone())
        .methods()
        .list_item(item_1_price, item_1_metadata)
        .call()
        .await
        .unwrap();
    let tx = response.tx_id.unwrap();
    total_wallet_1_fees += get_tx_fee(&client, &tx).await;

    // call params to send the project price in the buy_item fn
    let call_params = CallParameters::default().with_amount(item_1_price);

    // buy item 1 from wallet_2
    let response = instance
        .clone()
        .with_account(wallet_2.clone())
        .methods()
        .buy_item(1)
        .with_variable_output_policy(VariableOutputPolicy::Exactly(1))
        .call_params(call_params)
        .unwrap()
        .call()
        .await
        .unwrap();
    total_wallet_2_fees += get_tx_fee(&client, &response.tx_id.unwrap()).await;

    // check the balances of wallet_1 and wallet_2
    let wallet_1_balance: u64 = wallet_1
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();
    let wallet_2_balance: u64 = wallet_2
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    // make sure the price was transferred from wallet_2 to
    assert_eq!(
        wallet_1_balance,
        wallet_1_starting_balance - total_wallet_1_fees + item_1_price
    );
    assert_eq!(
        wallet_2_balance,
        wallet_2_starting_balance - total_wallet_2_fees - item_1_price
    );

    let item_1 = instance.methods().get_item(1).call().await.unwrap();

    assert!(item_1.value.price == item_1_price);
    assert!(item_1.value.id == 1);
    assert!(item_1.value.total_bought == 1);
}

#[tokio::test]
async fn can_withdraw_funds() {
    let (instance, _id, wallets) = get_contract_instance().await;
    // Now you have an instance of your contract you can use to test each function

    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let mut total_wallet_1_fees = 0;
    let wallet_1_starting_balance: u64 = wallet_1
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    let wallet_2 = wallets.get(1).unwrap();
    let mut total_wallet_2_fees = 0;
    let wallet_2_starting_balance: u64 = wallet_2
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    let wallet_3 = wallets.get(2).unwrap();
    let mut total_wallet_3_fees = 0;
    let wallet_3_starting_balance: u64 = wallet_3
        .get_asset_balance(&AssetId::zeroed())
        .await
        .unwrap();

    let provider = wallet_1.provider().unwrap().clone();
    let client = FuelClient::new(provider.url()).unwrap();

    // initialize wallet_1 as the owner
    let response = instance
        .clone()
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
    let tx = response.tx_id.unwrap();
    total_wallet_1_fees += get_tx_fee(&client, &tx).await;

    // make sure the returned identity matches wallet_1
    assert!(Identity::Address(wallet_1.address().into()) == response.value);

    // item 1 params
    let item_1_metadata: SizedAsciiString<20> = "metadata__url__here_"
        .try_into()
        .expect("Should have succeeded");
    let item_1_price: u64 = 150_000_000;

    // list item 1 from wallet_2
    let response = instance
        .clone()
        .with_account(wallet_2.clone())
        .methods()
        .list_item(item_1_price, item_1_metadata)
        .call()
        .await;
    assert!(response.is_ok());
    total_wallet_2_fees += get_tx_fee(&client, &response.unwrap().tx_id.unwrap()).await;

    // make sure the item count increased
    let count = instance.clone()
        .methods()
        .get_count()
        .simulate(Execution::default())
        .await
        .unwrap();
    assert_eq!(count.value, 1);

    // call params to send the project price in the buy_item fn
    let call_params = CallParameters::default().with_amount(item_1_price);

    // buy item 1 from wallet_3
    let response = instance.clone()
        .with_account(wallet_3.clone())
        .methods()
        .buy_item(1)
        .with_variable_output_policy(VariableOutputPolicy::Exactly(1))
        .call_params(call_params)
        .unwrap()
        .call()
        .await;
    assert!(response.is_ok());
    total_wallet_3_fees += get_tx_fee(&client, &response.unwrap().tx_id.unwrap()).await;

     // make sure the item's total_bought count increased
     let listed_item = instance
        .methods()
        .get_item(1)
        .simulate(Execution::default())
        .await
        .unwrap();
    assert_eq!(listed_item.value.total_bought, 1);

    // withdraw the balance from the owner's wallet
    let response = instance
        .with_account(wallet_1.clone())
        .methods()
        .withdraw_funds()
        .with_variable_output_policy(VariableOutputPolicy::Exactly(1))
        .call()
        .await;
    assert!(response.is_ok());
    total_wallet_1_fees += get_tx_fee(&client, &response.unwrap().tx_id.unwrap()).await;

    // check the balances of wallet_1 and wallet_2
    let balance_1: u64 = wallet_1.get_asset_balance(&AssetId::zeroed()).await.unwrap();
    let balance_2: u64 = wallet_2.get_asset_balance(&AssetId::zeroed()).await.unwrap();
    let balance_3: u64 = wallet_3.get_asset_balance(&AssetId::zeroed()).await.unwrap();

    assert!(balance_1 == wallet_1_starting_balance - total_wallet_1_fees + (item_1_price / 20)); // 5% commission
    assert!(balance_2 == wallet_2_starting_balance - total_wallet_2_fees + item_1_price - ((item_1_price / 20))); // sell price - 5% commission
    assert!(balance_3 == wallet_3_starting_balance - total_wallet_3_fees - item_1_price);
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Running the Tests](https://docs.fuel.network/guides/intro-to-sway/rust-sdk/\#running-the-tests)

Update the shared fuel-toolchain.toml file

```fuel_Box fuel_Box-idXKMmm-css
[toolchain]
channel = "testnet"

[components]
forc = "0.66.1"
fuel-core = "0.40.0"
```

_Icon ClipboardText_

To run the test located in `tests/harness.rs`, run the command below inside your `contract` folder:

```fuel_Box fuel_Box-idXKMmm-css
cargo test
```

_Icon ClipboardText_

If you want to print outputs to the console during tests, use the `nocapture` flag:

```fuel_Box fuel_Box-idXKMmm-css
cargo test -- --nocapture
```

_Icon ClipboardText_

Now that we're confident in the functionality of our smart contract, it's time to build a frontend. This will allow users to seamlessly interact with our new marketplace!