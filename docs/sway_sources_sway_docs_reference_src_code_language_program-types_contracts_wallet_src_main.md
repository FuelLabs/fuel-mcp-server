# Example: sway_sources/sway/docs/reference/src/code/language/program-types/contracts/wallet/src/main.sw

```sway
contract;

use interface::Wallet;

impl Wallet for Contract {
    #[storage(read, write)]
    fn receive_funds() {
        // function implementation
    }

    #[storage(read, write)]
    fn send_funds(amount_to_send: u64, recipient: Identity) {
        // function implementation
    }
}

```
