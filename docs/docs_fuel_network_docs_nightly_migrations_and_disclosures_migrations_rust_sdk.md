[Docs](https://docs.fuel.network/) /

Nightly  /

[Migrations and Disclosures](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/) /

[Migrations](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/) /

Rust SDK

## _Icon Link_ [Rust SDK Migrations Guide](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#rust-sdk-migrations-guide)

## _Icon Link_ [March 17, 2025](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#march-17-2025)

[Release v0.71.0 _Icon Link_](https://github.com/FuelLabs/fuels-rs/releases/tag/v0.71.0)

## _Icon Link_ [Bump minimum `fuel-core-*` versions -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#bump-minimum-fuel-core--versions---1600) [\#1600 _Icon Link_](https://github.com/FuelLabs/fuels-rs/pull/1600)

Minimum `fuel-core-*` versions bumped to `0.41.7`

```fuel_Box fuel_Box-idXKMmm-css
// before
fuel-core = { version = "0.41.3", default-features = false, features = [\
  "wasm-executor",\
] }
fuel-core-chain-config = { version = "0.41.3", default-features = false }
...
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
fuel-core = { version = "0.41.7", default-features = false, features = [\
  "wasm-executor",\
] }
fuel-core-chain-config = { version = "0.41.7", default-features = false }
...
```

_Icon ClipboardText_

## _Icon Link_ [Wallet refactoring -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#wallet-refactoring---1620) [\#1620 _Icon Link_](https://github.com/FuelLabs/fuels-rs/pull/1620)

## _Icon Link_ [`ImpersonatedAccount` is removed](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#impersonatedaccount-is-removed)

To achieve the same functionality instantiate a \`FakeSigner:

```fuel_Box fuel_Box-idXKMmm-css
// before
let address =
    Address::from_str("0x17f46f562778f4bb5fe368eeae4985197db51d80c83494ea7f84c530172dedd1")
        .unwrap();
let address = Bech32Address::from(address);
let impersonator = ImpersonatedAccount::new(address, Some(provider.clone()));
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
let some_address = wallet.address().clone();
let fake_signer = FakeSigner::new(some_address);
let impersonator = Wallet::new(fake_signer, provider.clone());
```

_Icon ClipboardText_

## _Icon Link_ [`AwsKmsSigner` and `GoogleKmsSigner` moved](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#awskmssigner-and-googlekmssigner-moved)

under `fuels::accounts::signers::kms::aws` and `fuels::accounts::signers::kms::google`, respectfully.

```fuel_Box fuel_Box-idXKMmm-css
// before
use fuels::accounts::kms::AwsKmsSigner;
use fuels::accounts::kms::GoogleKmsSigner;
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
use fuels::accounts::signers::kms::aws::AwsKmsSigner;
use fuels::accounts::signers::kms::google::GoogleKmsSigner;
```

_Icon ClipboardText_

## _Icon Link_ [`KmsWallet` removed](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#kmswallet-removed)

use an ordinary `Wallet` now with a kms signer (aws or google)

## _Icon Link_ [`WalletUnlocked` and `Wallet` substituted by `Wallet<Unlocked<S = PrivateKeySigner>>` or `Wallet<Locked>`](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#walletunlocked-and-wallet-substituted-by-walletunlockeds--privatekeysigner-or-walletlocked)

```fuel_Box fuel_Box-idXKMmm-css
// before
wallet.set_provider(provider.clone());

...

let mut wallet = WalletUnlocked::new_random(None);

let coins: Vec<Coin> = setup_single_asset_coins(
    wallet.address(),
    Default::default(),
    DEFAULT_NUM_COINS,
    DEFAULT_COIN_AMOUNT,
);

let chain_config = ChainConfig {
    consensus_parameters: consensus_parameters.clone(),
    ..ChainConfig::default()
};

let provider = setup_test_provider(coins, vec![], None, Some(chain_config)).await?;
wallet.set_provider(provider.clone());
assert_eq!(consensus_parameters, provider.consensus_parameters().await?);

...

let wallet = WalletUnlocked::new_random(None);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
let wallet = Wallet::new(signer, provider.clone());

...

let mut rng = thread_rng();
let signer = PrivateKeySigner::random(&mut rng);

let coins: Vec<Coin> = setup_single_asset_coins(
    signer.address(),
    Default::default(),
    DEFAULT_NUM_COINS,
    DEFAULT_COIN_AMOUNT,
);
let chain_config = ChainConfig {
    consensus_parameters: consensus_parameters.clone(),
    ..ChainConfig::default()
};

let provider = setup_test_provider(coins, vec![], None, Some(chain_config)).await?;
let wallet = Wallet::new(signer, provider.clone());
assert_eq!(consensus_parameters, provider.consensus_parameters().await?);

...

let wallet = launch_provider_and_get_wallet().await?;
```

_Icon ClipboardText_

The provider is now mandatory for `Wallet::new`.

Common operations in the new API:

## _Icon Link_ [Creating a random wallet](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#creating-a-random-wallet)

a) Two step (useful when you haven't started the node but need the address)

```fuel_Box fuel_Box-idXKMmm-css
// Create a random private key signer
let signer = PrivateKeySigner::random(&mut rng);
let coins = setup_single_asset_coins(signer.address(), asset_id, 1, DEFAULT_COIN_AMOUNT);
let provider = setup_test_provider(coins.clone(), vec![], None, None).await?;
let wallet = Wallet::new(signer, provider);
```

_Icon ClipboardText_

b) One step (when you already have a provider)

```fuel_Box fuel_Box-idXKMmm-css
let wallet = Wallet::random(&mut rng, provider.clone());
```

_Icon ClipboardText_

## _Icon Link_ [Locking a wallet](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#locking-a-wallet)

```fuel_Box fuel_Box-idXKMmm-css
let locked_wallet = wallet.lock();
```

_Icon ClipboardText_

## _Icon Link_ [Creating a locked wallet](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#creating-a-locked-wallet)

```fuel_Box fuel_Box-idXKMmm-css
let wallet = Wallet::new_locked(addr, provider.clone());
```

_Icon ClipboardText_

## _Icon Link_ [Wallets no longer sign](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#wallets-no-longer-sign)

You use one of the signers for that. Or, if your wallet is unlocked, get its signer by calling `wallet.signer()`.

## _Icon Link_ [`ViewOnlyAccount` no longer requires `core::fmt::Debug` and `core::clone::Clone` as supertraits](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#viewonlyaccount-no-longer-requires-corefmtdebug-and-corecloneclone-as-supertraits)

## _Icon Link_ [`Wallet` no longer handles encrypting keys for disk storage](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#wallet-no-longer-handles-encrypting-keys-for-disk-storage)

Use the `fuels::accounts::Keystore` for that (feature-gated under `accounts-keystore`)

## _Icon Link_ [AWS/Google kms feature flags changed](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#awsgoogle-kms-feature-flags-changed)

They're now `accounts-signer-aws-kms` and `accounts-signer-google-kms`.

## _Icon Link_ [Use `total_gas` and `total_fee` from tx status -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#use-total_gas-and-total_fee-from-tx-status---1574) [\#1574 _Icon Link_](https://github.com/FuelLabs/fuels-rs/pull/1574)

- Removed `get_response_from` method from `CallHandlers`
- `CallResponse` refactored and added `tx_status: Success` field
- Method `get_response` accepts `TxStatus` instead of `Vec<Receipts>`
- Method `new` is removed form `CallResponse`
- `GasValidation` trait is removed from transaction builders
- `Account` s `transfer` method returns `Result<TxResponse>`
- `Account` s `force_transfer_to_contract` method returns `Result<TxResponse>`
- `Account` s `withdraw_to_base_layer` method returns `Result<WithdrawToBaseResponse>`
- `Executable<Loader>`'s `upload_blob` returns `Result<Option<TxResponse>>`
- Contract's `deploy` and `deploy_if_not_exists` return `Result<DeployResponse>` and `Response<Option<DeployResponse>>` respectively
- `TransactionCost`'s field `gas_used` renamed to `script_gas`

## _Icon Link_ [August 16, 2024](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#august-16-2024)

[Release v0.66.0 _Icon Link_](https://github.com/FuelLabs/fuels-rs/releases/tag/v0.66.0)

## _Icon Link_ [Unfunded read only calls -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#unfunded-read-only-calls---1412) [\#1412 _Icon Link_](https://github.com/FuelLabs/fuels-rs/pull/1412)

`SizedAsciiString` no longer implements `AsRef<[u8]>`. To get the underlying bytes you can turn it into a `&str` via the new `AsRef<str>` and call `as_bytes()` on the `&str`: \`sized\_string.as\_ref().as\_bytes()\`\`

```fuel_Box fuel_Box-idXKMmm-css
// before
let bytes: &[u8] = sized_str.as_ref();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
let bytes: &[u8] = sized_str.as_ref().as_bytes();
```

_Icon ClipboardText_

`build_without_signatures` is now achieved by setting the build strategy to `BuildStrategy::NoSignatures` on the transaction builder before calling `build`

```fuel_Box fuel_Box-idXKMmm-css
// before
let mut tx = tb.build_without_signatures(provider).await?;
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
let mut tx = tb.with_build_strategy(ScriptBuildStrategy::NoSignatures).build(provider).await?;
```

_Icon ClipboardText_

`.simulate()` now accepts an `Execution` argument allowing for `Realistic` or `StateReadOnly` simulations.

```fuel_Box fuel_Box-idXKMmm-css
// before
let stored = contract_methods.read().simulate().await?;
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
let stored = contract_methods.read().simulate(Execution::StateReadOnly).await?;
```

_Icon ClipboardText_

## _Icon Link_ [Accounts now cover max fee increase due to tolerance -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#accounts-now-cover-max-fee-increase-due-to-tolerance---1464) [\#1464 _Icon Link_](https://github.com/FuelLabs/fuels-rs/pull/1464)

`fee_checked_from_tx` is removed from all transaction builders. max fee can now be estimated using the new method `estimate_max_fee` which takes into account the max fee estimation tolerance set on the builders.

```fuel_Box fuel_Box-idXKMmm-css
// before
let transaction_fee = tb.fee_checked_from_tx(provider)
    .await?
    .ok_or(error_transaction!(
        Other,
        "error calculating `TransactionFee`"
    ))?;

let total_used = transaction_fee.max_fee() + reserved_base_amount;
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
let max_fee = tb.estimate_max_fee(provider).await?;

let total_used = max_fee + reserved_base_amount;
```

_Icon ClipboardText_

## _Icon Link_ [Account impersonation -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#account-impersonation---1473) [\#1473 _Icon Link_](https://github.com/FuelLabs/fuels-rs/pull/1473)

The SDK previously performed transaction validity checks, including signature verification, before sending a transaction to the network. This was problematic since the checks also included signature verification even when utxo validation was turned off. To enable this feature and prevent future issues like failed validation checks due to version mismatches between the network and the SDK's upstream dependencies, we decided to remove the check. Since the SDK already abstracts building transactions for common cases (contract calls, transfers, etc.), validity issues are unlikely. If needed, we can still expose the validity checks as part of the transaction builder or our transaction structs.

```fuel_Box fuel_Box-idXKMmm-css
/*

A `ImpersonatedAccount` simulates ownership of assets held by an account with a given address.
`ImpersonatedAccount` will only succeed in unlocking assets if the the network is setup with
utxo_validation set to false.

*/

let node_config = NodeConfig {
    utxo_validation: false,
    ..Default::default()
};
```

_Icon ClipboardText_

## _Icon Link_ [Deploying large contracts (loader + blob support) -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/rust-sdk/\#deploying-large-contracts-loader--blob-support---1472) [\#1472 _Icon Link_](https://github.com/FuelLabs/fuels-rs/pull/1472)

`Contract::new` is removed, replaced with `Contract::regular` with three states

First: A regular contract

What you're used to seeing. It is either initialized from raw code or loaded from a file:

```fuel_Box fuel_Box-idXKMmm-css
let contract = Contract::regular(contract_binary, Salt::zeroed(), vec![]);
```

_Icon ClipboardText_

or

```fuel_Box fuel_Box-idXKMmm-css
let contract = Contract::load_from(
    "sway/contracts/storage/out/release/storage.bin",
    LoadConfiguration::default(),
)?;
```

_Icon ClipboardText_

With the notable addition of being able to set `configurables` (previously possible only when using `load_from`):

```fuel_Box fuel_Box-idXKMmm-css
let contract = Contract::regular(binary, Salt::zeroed(), vec![]).with_configurables(configurables);
```

_Icon ClipboardText_

a regular contract can be deployed via `deploy`, which hasn't changed, or via `smart_deploy` that will use blobs/loader if the contract is above what can be deployed in a create tx:

```fuel_Box fuel_Box-idXKMmm-css
let contract_id = Contract::load_from(
    contract_binary,
    LoadConfiguration::default().with_salt(random_salt()),
)?
.smart_deploy(&wallet, TxPolicies::default(), max_words_per_blob)
.await?;
```

_Icon ClipboardText_

Second: Loader contract, blobs pending upload

You can turn a regular contract into a loader contract:

```fuel_Box fuel_Box-idXKMmm-css
let contract = Contract::load_from(
    contract_binary,
    LoadConfiguration::default(),
)?
.convert_to_loader(max_words_per_blob)?
```

_Icon ClipboardText_

or, if you have the blobs, create it directly:

```fuel_Box fuel_Box-idXKMmm-css
let contract = Contract::loader_for_blobs(blobs, random_salt(), vec![])?;
```

_Icon ClipboardText_

You can also revert back to the regular contract via `revert_to_regular`.

If you now call `deploy` the contract will first deploy the blobs and then the loader itself.

You can also split this into two parts by first calling `upload_blobs` and then `deploy`:

```fuel_Box fuel_Box-idXKMmm-css
let contract_id = Contract::load_from(contract_binary, LoadConfiguration::default())?
    .convert_to_loader(1024)?
    .upload_blobs(&wallet, TxPolicies::default())
    .await?
    .deploy(&wallet, TxPolicies::default())
    .await?;
```

_Icon ClipboardText_

doing so will have `deploy` only submit the create tx while the uploading will be done in `upload_blobs`.

Third: Loader, with blobs deployed

You arrive at this contract type by either having the blob ids and creating it manually:

```fuel_Box fuel_Box-idXKMmm-css
let contract = Contract::loader_for_blob_ids(all_blob_ids, random_salt(), vec![])?;
```

_Icon ClipboardText_

or by calling `upload_blobs` as in the previous case:

```fuel_Box fuel_Box-idXKMmm-css
let contract = Contract::load_from(
    contract_binary,
    LoadConfiguration::default().with_salt(random_salt()),
)?
.convert_to_loader(max_words_per_blob)?
.upload_blobs(&wallet, TxPolicies::default())
.await?;
```

_Icon ClipboardText_

Calling deploy on this contract only deploys the loader.