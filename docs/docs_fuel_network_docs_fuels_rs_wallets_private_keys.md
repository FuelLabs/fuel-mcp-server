[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Wallets](https://docs.fuel.network/docs/fuels-rs/wallets/) /

Private Keys

## _Icon Link_ [Creating a wallet from a private key](https://docs.fuel.network/docs/fuels-rs/wallets/private-keys/\#creating-a-wallet-from-a-private-key)

A new wallet with a randomly generated private key can be created by supplying `Option<Provider>`.

```fuel_Box fuel_Box-idXKMmm-css
use fuels::prelude::*;

// Use the test helper to setup a test provider.
let provider = setup_test_provider(vec![], vec![], None, None).await?;

// Create the wallet.
let _wallet = WalletUnlocked::new_random(Some(provider));
```

_Icon ClipboardText_

Alternatively, you can create a wallet from a predefined `SecretKey`.

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
let _wallet = WalletUnlocked::new_from_private_key(secret, Some(provider));
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> Note: if `None` is supplied instead of a provider, any transaction related to the wallet will result
> in an error until a provider is linked with `set_provider()`. The optional parameter
> enables defining owners (wallet addresses) of genesis coins before a provider is launched.