[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Wallets](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/) /

Private Key Signer

## _Icon Link_ [Using private keys to create wallets](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/private_key_signer/\#using-private-keys-to-create-wallets)

## _Icon Link_ [Directly from a private key](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/private_key_signer/\#directly-from-a-private-key)

An example of how to create a wallet that uses a private key signer:

```fuel_Box fuel_Box-idXKMmm-css
use std::str::FromStr;

use fuels::{crypto::SecretKey, prelude::*};

// Use the test helper to setup a test provider.
let provider = setup_test_provider(vec![], vec![], None, None).await?;

// Setup the private key.
let secret = SecretKey::from_str(
    "5f70feeff1f229e4a95e1056e8b4d80d0b24b565674860cc213bdb07127ce1b1",
)?;

// Create the wallet.
let _wallet = Wallet::new(PrivateKeySigner::new(secret), provider);
```

_Icon ClipboardText_

There is also a helper for generating a wallet with a random private key signer:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;

// Use the test helper to setup a test provider.
let provider = setup_test_provider(vec![], vec![], None, None).await?;

// Create the wallet.
let _wallet = Wallet::random(&mut thread_rng(), provider);
```

_Icon ClipboardText_

## _Icon Link_ [From a mnemonic phrase](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/private_key_signer/\#from-a-mnemonic-phrase)

A mnemonic phrase is a cryptographically generated sequence of words used to create a master seed. This master seed, when combined with a [derivation path _Icon Link_](https://thebitcoinmanual.com/articles/btc-derivation-path/), enables the generation of one or more specific private keys. The derivation path acts as a roadmap within the [hierarchical deterministic (HD) wallet structure _Icon Link_](https://www.ledger.com/academy/crypto/what-are-hierarchical-deterministic-hd-wallets), determining which branch of the key tree produces the desired private key.

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;

let phrase =
    "oblige salon price punch saddle immune slogan rare snap desert retire surprise";

// Use the test helper to setup a test provider.
let provider = setup_test_provider(vec![], vec![], None, None).await?;

// Create first account from mnemonic phrase.
let key =
    SecretKey::new_from_mnemonic_phrase_with_path(phrase, "m/44'/1179993420'/0'/0/0")?;
let signer = PrivateKeySigner::new(key);
let _wallet = Wallet::new(signer, provider.clone());

// Or with the default derivation path.
let key = SecretKey::new_from_mnemonic_phrase_with_path(phrase, DEFAULT_DERIVATION_PATH)?;
let signer = PrivateKeySigner::new(key);
let wallet = Wallet::new(signer, provider);

let expected_address = "fuel17x9kg3k7hqf42396vqenukm4yf59e5k0vj4yunr4mae9zjv9pdjszy098t";

assert_eq!(wallet.address().to_string(), expected_address);
```

_Icon ClipboardText_

## _Icon Link_ [Security Best Practices](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/private_key_signer/\#security-best-practices)

- **Never Share Sensitive Information:**
Do not disclose your private key or mnemonic phrase to anyone.

- **Secure Storage:**
When storing keys on disk, **always encrypt** them (the SDK provides a [`Keystore`](https://docs.fuel.network/docs/nightly/fuels-rs/wallets/keystore/). This applies to both plain private/secret keys and mnemonic phrases.