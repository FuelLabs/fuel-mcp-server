[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Cookbook](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/) /

Deposit and Withdraw

## _Icon Link_ [Deposit And Withdraw](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/deposit-and-withdraw/\#deposit-and-withdraw)

Consider the following contract:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::{asset::{mint_to, transfer}, call_frames::msg_asset_id, context::msg_amount};
abi LiquidityPool {
    #[payable]
    fn deposit(recipient: Address);
    #[payable]
    fn withdraw(recipient: Address);
}
configurable {
    TOKEN: AssetId = AssetId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
}
impl LiquidityPool for Contract {
    #[payable]
    fn deposit(recipient: Address) {
        assert(TOKEN == msg_asset_id());
        assert(0 < msg_amount());
        // Mint two times the amount.
        let amount_to_mint = msg_amount() * 2;
        // Mint some LP token based upon the amount of the base token.
        mint_to(Identity::Address(recipient), b256::zero(), amount_to_mint);
    }
    #[payable]
    fn withdraw(recipient: Address) {
        assert(0 < msg_amount());
        // Amount to withdraw.
        let amount_to_transfer = msg_amount() / 2;
        // Transfer base token to recipient.
        transfer(Identity::Address(recipient), TOKEN, amount_to_transfer);
    }
}
```

_Icon ClipboardText_

As the name implies, this contract represents a simplified version of a liquidity pool. The `deposit()` method allows you to supply an arbitrary amount of `BASE_TOKEN`. In response, it mints twice the amount of the liquidity asset to the caller's address. Similarly, the `withdraw()` method transfers half the amount of the `BASE_TOKEN` back to the caller's address.

Now, let's deposit some tokens into the liquidity pool contract. Since this requires forwarding assets to the contract, we need to pass the appropriate values to `callParams` when creating a contract call.

```fuel_Box fuel_Box-idXKMmm-css
import { getMintedAssetId, Provider, Wallet, ZeroBytes32 } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { LiquidityPoolFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await LiquidityPoolFactory.deploy(wallet, {
  configurableConstants: {
    TOKEN: { bits: await provider.getBaseAssetId() },
  },
});

const { contract } = await deploy.waitForResult();

const depositAmount = 100_000;
const liquidityOwner = Wallet.generate({ provider });

// the subId used to mint the new asset is a zero b256 on the contract
const subId = ZeroBytes32;
const contractId = contract.id.toB256();

const assetId = getMintedAssetId(contractId, subId);

const { waitForResult } = await contract.functions
  .deposit({ bits: liquidityOwner.address.toB256() })
  .callParams({ forward: [depositAmount, await provider.getBaseAssetId()] })
  .txParams({ variableOutputs: 1 })
  .call();

await waitForResult();

const liquidityAmount = await liquidityOwner.getBalance(assetId);
```

Collapse_Icon ClipboardText_

As a final demonstration, let's use all our liquidity asset balance to withdraw from the pool and confirm we retrieved the initial amount. For this, we get our liquidity asset balance and supply it to the `withdraw()` function via `callParams`.

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { LiquidityPoolFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await LiquidityPoolFactory.deploy(wallet, {
  configurableConstants: {
    TOKEN: { bits: await provider.getBaseAssetId() },
  },
});

const { contract } = await deploy.waitForResult();

const depositAmount = 100_000;
const liquidityOwner = Wallet.generate({ provider });

const { waitForResult } = await contract.functions
  .withdraw({ bits: liquidityOwner.address.toB256() })
  .callParams({ forward: [depositAmount, await provider.getBaseAssetId()] })
  .txParams({ variableOutputs: 1 })
  .call();

await waitForResult();

const baseAssetAfterWithdraw = await liquidityOwner.getBalance(
  await provider.getBaseAssetId()
);
```

_Icon ClipboardText_