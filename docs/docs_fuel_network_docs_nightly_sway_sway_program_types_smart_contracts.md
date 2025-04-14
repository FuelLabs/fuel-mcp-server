[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Sway Program Types](https://docs.fuel.network/docs/nightly/sway/sway-program-types/) /

Smart Contracts

## _Icon Link_ [What is a Smart Contract?](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/\#what-is-a-smart-contract)

A smart contract is no different than a script or predicate in that it is a piece of bytecode that is deployed to the blockchain via a [transaction](https://docs.fuel.network/docs/nightly/specs/tx-format/). The main features of a smart contract that differentiate it from scripts or predicates are that it is _callable_ and _stateful_. Put another way, a smart contract is analogous to a deployed API with some database state.

The interface of a smart contract, also just called a contract, must be defined strictly with an [ABI declaration](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/#the-abi-declaration). See [this contract](https://docs.fuel.network/docs/nightly/sway/examples/wallet_smart_contract/) for an example.

## _Icon Link_ [Syntax of a Smart Contract](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/\#syntax-of-a-smart-contract)

As with any Sway program, the program starts with a declaration of what [program type](https://docs.fuel.network/docs/nightly/) it is. A contract must also either define or import an [ABI declaration](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/#the-abi-declaration) and implement it.

It is considered good practice to define your ABI in a separate library and import it into your contract. This allows callers of your contract to simply import the ABI directly and use it in their scripts to call your contract.

Let's take a look at an ABI declaration in a library:

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

Let's focus on the ABI declaration and inspect it line-by-line.

## _Icon Link_ [The ABI Declaration](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/\#the-abi-declaration)

```fuel_Box fuel_Box-idXKMmm-css
abi Wallet {
    #[storage(read, write), payable]
    fn receive_funds();

    #[storage(read, write)]
    fn send_funds(amount_to_send: u64, recipient_address: Address);
}
```

_Icon ClipboardText_

* * *

In the first line, `abi Wallet {`, we declare the name of this _Application Binary Interface_, or ABI. We are naming this ABI `Wallet`. To import this ABI into either a script for calling or a contract for implementing, you would use

```fuel_Box fuel_Box-idXKMmm-css
use wallet_abi::Wallet;
```

_Icon ClipboardText_

* * *

In the second line,

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write), payable]
fn receive_funds();
```

_Icon ClipboardText_

we are declaring an ABI method called `receive_funds` which, when called, should receive funds into this wallet. Note that we are simply defining an interface here, so there is no _function body_ or implementation of the function. We only need to define the interface itself. In this way, ABI declarations are similar to [trait declarations](https://docs.fuel.network/docs/nightly/sway/advanced/traits/). This particular ABI method does not take any parameters.

* * *

In the third line,

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn send_funds(amount_to_send: u64, recipient_address: Address);
```

_Icon ClipboardText_

we are declaring another ABI method, this time called `send_funds`. It takes two parameters: the amount to send, and the address to send the funds to.

> _Icon InfoCircle_
>
> **Note**: The ABI methods `receive_funds` and `send_funds` also require the annotation `#[storage(read, write)]` because their implementations require reading and writing a storage variable that keeps track of the wallet balance, as we will see shortly. Refer to [Purity](https://docs.fuel.network/docs/nightly/sway/blockchain-development/purity/#purity) for more information on storage annotations.

## _Icon Link_ [Implementing an ABI for a Smart Contract](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/\#implementing-an-abi-for-a-smart-contract)

Now that we've discussed how to define the interface, let's discuss how to use it. We will start by implementing the above ABI for a specific contract.

Implementing an ABI for a contract is accomplished with `impl <ABI name> for Contract` syntax. The `for Contract` syntax can only be used to implement an ABI for a contract; implementing methods for a struct should use `impl Foo` syntax.

```fuel_Box fuel_Box-idXKMmm-css
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

You may notice once again the similarities between [traits](https://docs.fuel.network/docs/nightly/sway/advanced/traits/) and ABIs. And, indeed, as a bonus, you can define methods in addition to the interface surface of an ABI, just like a trait. These pre-implemented ABI methods automatically become available as part of the contract interface that implements the corresponding ABI.

Note that the above implementation of the ABI follows the [Checks, Effects, Interactions _Icon Link_](https://docs.soliditylang.org/en/latest/security-considerations.html#re-entrancy) pattern.

## _Icon Link_ [The `ContractId` type](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/\#the-contractid-type)

Contracts have an associated `ContractId` type in Sway. The `ContractId` type allows for Sway programs to refer to contracts in the Sway language. Please refer to the [ContractId](https://docs.fuel.network/docs/nightly/sway/basics/blockchain_types/#contractid-type) section of the book for more information on `ContractId` s.

## _Icon Link_ [Calling a Smart Contract from a Script](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/\#calling-a-smart-contract-from-a-script)

> _Icon InfoCircle_
>
> **Note**: In most cases, calling a contract should be done from the [Rust SDK](https://docs.fuel.network/docs/nightly/sway/testing/testing-with-rust/) or the [TypeScript SDK _Icon Link_](https://docs.fuel.network/docs/fuels-ts) which provide a more ergonomic UI for interacting with a contract. However, there are situations where manually writing a script to call a contract is required.

Now that we have defined our interface and implemented it for our contract, we need to know how to actually _call_ our contract. Let's take a look at a contract call:

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

The main new concept is the `abi cast`: `abi(AbiName, contract_address)`. This returns a `ContractCaller` type which can be used to call contracts. The methods of the ABI become the methods available on this contract caller: `send_funds` and `receive_funds`. We then directly call the contract ABI method as if it was just a regular method. You also have the option of specifying the following special parameters inside curly braces right before the main list of parameters:

1. `gas`: a `u64` that represents the gas being forwarded to the contract when it is called.
2. `coins`: a `u64` that represents how many coins are being forwarded with this call.
3. `asset_id`: a `b256` that represents the ID of the _asset type_ of the coins being forwarded.

Each special parameter is optional and assumes a default value when skipped:

1. The default value for `gas` is the context gas (i.e. the content of the special register `$cgas`). Refer to the [FuelVM specifications](https://docs.fuel.network/docs/nightly/specs/fuel-vm/) for more information about context gas.
2. The default value for `coins` is 0.
3. The default value for `asset_id` is `b256::zero()`.