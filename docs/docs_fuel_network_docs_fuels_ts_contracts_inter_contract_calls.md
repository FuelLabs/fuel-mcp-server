[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/fuels-ts/contracts/) /

Inter Contract Calls

## _Icon Link_ [Inter-Contract Calls with the SDK](https://docs.fuel.network/docs/fuels-ts/contracts/inter-contract-calls/\#inter-contract-calls-with-the-sdk)

This guide explains how to use the SDK to execute a contract call where one contract interacts with another contract. We will use a simple scenario involving a `SimpleToken` contract and a `TokenDepositor` contract.

## _Icon Link_ [`SimpleToken` and `TokenDepositor` Contracts](https://docs.fuel.network/docs/fuels-ts/contracts/inter-contract-calls/\#simpletoken-and-tokendepositor-contracts)

In this example, we have a `SimpleToken` contract representing a basic token contract capable of holding balances for different addresses. We also have a `TokenDepositor` contract that deposits tokens into the `SimpleToken` contract.

## _Icon Link_ [Contract: `SimpleToken`](https://docs.fuel.network/docs/fuels-ts/contracts/inter-contract-calls/\#contract-simpletoken)

Here's a simple token contract that allows holding balances:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::hash::*;
use simple_token_abi::SimpleToken;

storage {
    balances: StorageMap<b256, u64> = StorageMap {},
}

impl SimpleToken for Contract {
    #[storage(read, write)]
    fn deposit(address: b256, amount: u64) {
        let current_balance = storage.balances.get(address).try_read().unwrap_or(0);
        storage.balances.insert(address, current_balance + amount);
    }
    #[storage(read)]
    fn get_balance(address: b256) -> u64 {
        let balance = storage.balances.get(address).try_read().unwrap_or(0);
        balance
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [Contract: `TokenDepositor`](https://docs.fuel.network/docs/fuels-ts/contracts/inter-contract-calls/\#contract-tokendepositor)

The `TokenDepositor` contract imports the `SimpleToken` contract and calls its `deposit` function to deposit tokens:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::auth::msg_sender;

use simple_token_abi::SimpleToken;

abi TokenDepositor {
    fn deposit_to_simple_token(contract_id: b256, amount: u64);
}

impl TokenDepositor for Contract {
    fn deposit_to_simple_token(contract_id: b256, amount: u64) {
        let simple_token_contract = abi(SimpleToken, contract_id);

        let sender = msg_sender().unwrap();

        let address: b256 = match sender {
            Identity::Address(sender_param) => sender_param.bits(),
            _ => revert(0),
        };

        simple_token_contract.deposit(address, amount);
    }
}
```

_Icon ClipboardText_

## _Icon Link_ [Inter-contract calls using the SDK](https://docs.fuel.network/docs/fuels-ts/contracts/inter-contract-calls/\#inter-contract-calls-using-the-sdk)

Once both contracts are deployed, we can use the SDK to make the `TokenDepositor` contract to call the `SimpleToken` contract.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { SimpleTokenFactory, TokenDepositorFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const { waitForResult: waitForSimpleToken } =
  await SimpleTokenFactory.deploy(wallet);

const { contract: simpleToken } = await waitForSimpleToken();

const { waitForResult: waitForTokenDepositor } =
  await TokenDepositorFactory.deploy(wallet);

const { contract: tokenDepositor } = await waitForTokenDepositor();

const amountToDeposit = 70;
const call1 = await simpleToken.functions
  .get_balance(wallet.address.toB256())
  .call();

const { value: initialBalance } = await call1.waitForResult();

const call2 = await tokenDepositor.functions
  .deposit_to_simple_token(simpleToken.id.toB256(), amountToDeposit)
  .addContracts([simpleToken])
  .call();

await call2.waitForResult();

const call3 = await simpleToken.functions
  .get_balance(wallet.address.toB256())
  .call();

const { value: finalBalance } = await call3.waitForResult();
```

Collapse_Icon ClipboardText_

Pay attention to the method `addContracts` called by the `TokenDepositor` contract. This method accepts an array of instances of deployed contracts. Without calling this method, the inter-contract call will not work.