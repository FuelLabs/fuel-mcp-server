[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Examples](https://docs.fuel.network/docs/sway/examples/) /

Wallet Smart Contract

## _Icon Link_ [Wallet Smart Contract](https://docs.fuel.network/docs/sway/examples/wallet_smart_contract/\#wallet-smart-contract)

The ABI declaration is a separate project from your ABI implementation. The project structure for the code should be organized as follows with the `wallet_abi` treated as an external library:

```fuel_Box fuel_Box-idXKMmm-css
.
├── wallet_abi
│   ├── Forc.toml
│   └── src
│       └── main.sw
└── wallet_smart_contract
    ├── Forc.toml
    └── src
        └── main.sw
```

_Icon ClipboardText_

It's also important to specify the source of the dependency within the project's `Forc.toml` file when using external libraries. Inside the `wallet_smart_contract` project, it requires a declaration like this:

```fuel_Box fuel_Box-idXKMmm-css
[dependencies]
wallet_abi = { path = "../wallet_abi/" }
```

_Icon ClipboardText_

## _Icon Link_ [ABI Declaration](https://docs.fuel.network/docs/sway/examples/wallet_smart_contract/\#abi-declaration)

```fuel_Box fuel_Box-idXKMmm-css
library;

abi Wallet {
    #[storage(read, write), payable]
    fn receive_funds();

    #[storage(read, write)]
    fn send_funds(amount_to_send: u64, recipient_address: Address);
}
```

_Icon ClipboardText_

## _Icon Link_ [ABI Implementation](https://docs.fuel.network/docs/sway/examples/wallet_smart_contract/\#abi-implementation)

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::{asset::transfer, call_frames::msg_asset_id, context::msg_amount};

use wallet_abi::Wallet;
const OWNER_ADDRESS = Address::from(0x8900c5bec4ca97d4febf9ceb4754a60d782abbf3cd815836c1872116f203f861);

storage {
    balance: u64 = 0,
}

impl Wallet for Contract {
    #[storage(read, write), payable]
    fn receive_funds() {
        if msg_asset_id() == AssetId::base() {
            // If we received the base asset then keep track of the balance.
            // Otherwise, we're receiving other native assets and don't care
            // about our balance of coins.
            storage.balance.write(storage.balance.read() + msg_amount());
        }
    }

    #[storage(read, write)]
    fn send_funds(amount_to_send: u64, recipient_address: Address) {
        let sender = msg_sender().unwrap();
        match sender {
            Identity::Address(addr) => assert(addr == OWNER_ADDRESS),
            _ => revert(0),
        };

        let current_balance = storage.balance.read();
        assert(current_balance >= amount_to_send);

        storage.balance.write(current_balance - amount_to_send);

        // Note: `transfer()` is not a call and thus not an
        // interaction. Regardless, this code conforms to
        // checks-effects-interactions to avoid re-entrancy.
        transfer(
            Identity::Address(recipient_address),
            AssetId::base(),
            amount_to_send,
        );
    }
}
```

Collapse_Icon ClipboardText_