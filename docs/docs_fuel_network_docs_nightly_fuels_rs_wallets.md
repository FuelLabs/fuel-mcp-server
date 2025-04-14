[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

Wallets

## _Icon Link_ [Wallets](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/\#wallets)

Wallets serve as a centralized interface for all account-related behaviors. They allow you to:

- **Inspect UTXOs:** Check available coins for spending.
- **Prepare and send transactions:** Build, sign, and submit transfers.
- **Manage network fees:** Pay for transaction execution and contract deployment.

Every wallet requires a **provider** to communicate with the network.

* * *

## _Icon Link_ [Types of Wallets](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/\#types-of-wallets)

There are two primary types of wallets available in the SDK:

## _Icon Link_ [Locked Wallets](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/\#locked-wallets)

- **Purpose:** Used for read-only operations.
- **Interface:** Implements the [`ViewOnlyAccount`](https://docs.fuel.network/docs/nightly/fuels-rs/accounts/) trait.
- **Use Cases:** Checking balances, viewing UTXOs, and monitoring transactions without the ability to sign or submit transactions.

## _Icon Link_ [Unlocked Wallets](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/\#unlocked-wallets)

- **Purpose:** Supports full account functionality.
- **Interface:** Implements the [`ViewOnlyAccount`](https://docs.fuel.network/docs/nightly/fuels-rs/accounts/) and [`Account`](https://docs.fuel.network/docs/nightly/fuels-rs/accounts/) traits.
- **Additional Requirement:** In addition to a provider, an unlocked wallet must include a **signer**.
- **Use Cases:** Transferring funds, signing messages, submitting transactions, and performing state-changing operations.

* * *

## _Icon Link_ [Signer Options](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/\#signer-options)

The SDK offers multiple signing methods to suit different scenarios:

- [**Private Key Signer:**](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/private_key_signer/)


Use when you have direct access to your account’s private key.

- [**AWS KMS Signer:**](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/kms/)
Delegate signing operations to AWS Key Management Service, enhancing key security by offloading cryptographic operations.

- [**Google KMS Signer:**](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/kms/)


Similar to AWS KMS, this option delegates signing to Google’s Key Management Service.

- [**Fake Signer:**](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/fake_signer/)


Generates dummy signatures, which is useful for impersonation while testing. Only possible when using a network that does not enforce signature validation.


* * *