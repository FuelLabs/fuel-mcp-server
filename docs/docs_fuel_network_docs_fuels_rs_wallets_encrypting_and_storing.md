[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Wallets](https://docs.fuel.network/docs/fuels-rs/wallets/) /

Encrypting and Storing

## _Icon Link_ [Encrypting and storing wallets](https://docs.fuel.network/docs/fuels-rs/wallets/encrypting-and-storing/\#encrypting-and-storing-wallets)

## _Icon Link_ [Creating a wallet and storing an encrypted JSON wallet on disk](https://docs.fuel.network/docs/fuels-rs/wallets/encrypting-and-storing/\#creating-a-wallet-and-storing-an-encrypted-json-wallet-on-disk)

You can also manage a wallet using [JSON wallets _Icon Link_](https://cryptobook.nakov.com/symmetric-key-ciphers/ethereum-wallet-encryption) that are securely encrypted and stored on the disk. This makes it easier to manage multiple wallets, especially for testing purposes.

You can create a random wallet and, at the same time, encrypt and store it. Then, later, you can recover the wallet if you know the master password:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;

let dir = std::env::temp_dir();
let mut rng = rand::thread_rng();

// Use the test helper to setup a test provider.
let provider = setup_test_provider(vec![], vec![], None, None).await?;

let password = "my_master_password";

// Create a wallet to be stored in the keystore.
let (_wallet, uuid) =
    WalletUnlocked::new_from_keystore(&dir, &mut rng, password, Some(provider.clone()))?;

let path = dir.join(uuid);

let _recovered_wallet = WalletUnlocked::load_keystore(path, password, Some(provider))?;
```

_Icon ClipboardText_

## _Icon Link_ [Encrypting and storing a wallet created from a mnemonic or private key](https://docs.fuel.network/docs/fuels-rs/wallets/encrypting-and-storing/\#encrypting-and-storing-a-wallet-created-from-a-mnemonic-or-private-key)

If you have already created a wallet using a mnemonic phrase or a private key, you can also encrypt it and save it to disk:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;

let dir = std::env::temp_dir();

let phrase =
    "oblige salon price punch saddle immune slogan rare snap desert retire surprise";

// Use the test helper to setup a test provider.
let provider = setup_test_provider(vec![], vec![], None, None).await?;

// Create first account from mnemonic phrase.
let wallet = WalletUnlocked::new_from_mnemonic_phrase(phrase, Some(provider))?;

let password = "my_master_password";

// Encrypts and stores it on disk. Can be recovered using `Wallet::load_keystore`.
let _uuid = wallet.encrypt(&dir, password)?;
```

_Icon ClipboardText_