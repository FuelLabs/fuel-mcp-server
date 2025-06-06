[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Sway Program Types](https://docs.fuel.network/docs/nightly/sway/sway-program-types/) /

Scripts

## _Icon Link_ [Scripts](https://docs.fuel.network/docs/nightly/sway/sway-program-types/scripts/\#scripts)

A script is runnable bytecode on the chain which executes once to perform some task. It does not represent ownership of any resources and it cannot be called by a contract. A script can return a single value of any type.

Scripts are state-aware in that while they have no persistent storage (because they only exist during the transaction) they can call contracts and act based upon the returned values and results.

This example script calls a contract:

```fuel_Box fuel_Box-idXKMmm-css
script;

use wallet_abi::Wallet;

fn main() {
    let contract_address = 0x9299da6c73e6dc03eeabcce242bb347de3f5f56cd1c70926d76526d7ed199b8b;
    let caller = abi(Wallet, contract_address);
    let amount_to_send = 200;
    let recipient_address = Address::from(0x9299da6c73e6dc03eeabcce242bb347de3f5f56cd1c70926d76526d7ed199b8b);
    caller
        .send_funds {
            gas: 10000,
            coins: 0,
            asset_id: b256::zero(),
        }(amount_to_send, recipient_address);
}

```

_Icon ClipboardText_

Scripts, similar to predicates, rely on a `main()` function as an entry point. You can call other functions defined in a script from the `main()` function or call another contract via an [ABI cast](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/#calling-a-smart-contract-from-a-script).

An example use case for a script would be a router that trades funds through multiple decentralized exchanges to get the price for the input asset, or a script to re-adjust a Collateralized Debt Position via a flash loan.

## _Icon Link_ [Scripts and the SDKs](https://docs.fuel.network/docs/nightly/sway/sway-program-types/scripts/\#scripts-and-the-sdks)

Unlike EVM transactions which can call a contract directly (but can only call a single contract), Fuel transactions execute a script, which may call zero or more contracts. The Rust and TypeScript SDKs provide functions to call contract methods as if they were calling contracts directly. Under the hood, the SDKs wrap all contract calls with scripts that contain minimal code to simply make the call and forward script data as call parameters.