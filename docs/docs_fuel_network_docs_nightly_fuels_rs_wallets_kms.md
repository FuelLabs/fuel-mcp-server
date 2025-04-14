[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Wallets](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/) /

Kms

## _Icon Link_ [Using KMS Wallets](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/kms/\#using-kms-wallets)

Key Management Service (KMS) is a robust and secure solution for managing cryptographic keys for your Fuel wallets. Instead of keeping private keys on your local system, KMS Wallets leverage secure infrastructure to handle both key storage and signing operations.

The SDK provides signers for AWS and Google KMS.

Below is an example of how to initialize a wallet with a AWS KMS signer:

```fuel_Box fuel_Box-idXKMmm-css
let kms_signer = AwsKmsSigner::new(your_kms_key_id, aws_client).await?;
let wallet = Wallet::new(kms_signer, provider);
```

_Icon ClipboardText_