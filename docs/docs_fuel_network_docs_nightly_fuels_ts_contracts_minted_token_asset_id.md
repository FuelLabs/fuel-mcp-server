[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/) /

Minted Token Asset Id

## _Icon Link_ [Minted Token Asset ID](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/minted-token-asset-id/\#minted-token-asset-id)

The asset ID of a token on the Fuel network is determined by two factors:

- The ID of the contract that minted the token,
- A sub-identifier (Sub ID)

> _Icon InfoCircle_
>
> Both of which are [B256](https://docs.fuel.network/docs/nightly/fuels-ts/types/b256/) strings.

The process involves applying a SHA-256 hash algorithm to the combination of the Contract ID and the Sub ID, to derive an Asset ID - as explained [here _Icon Link_](https://docs.fuel.network/docs/specs/identifiers/asset/#asset-id).

Consider the following simplified token contract:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::asset::{burn, mint, transfer};

abi Token {
    fn transfer_to_address(target: Address, asset_id: AssetId, coins: u64);
    fn transfer_to_contract(recipient: ContractId, asset_id: AssetId, coins: u64);
    fn mint_coins(sub_id: b256, mint_amount: u64);
    fn burn_coins(sub_id: b256, burn_amount: u64);
}

impl Token for Contract {
    fn transfer_to_address(recipient: Address, asset_id: AssetId, amount: u64) {
        transfer(Identity::Address(recipient), asset_id, amount);
    }

    fn transfer_to_contract(target: ContractId, asset_id: AssetId, amount: u64) {
        transfer(Identity::ContractId(target), asset_id, amount);
    }
    fn mint_coins(sub_id: b256, mint_amount: u64) {
        mint(sub_id, mint_amount);
    }

    fn burn_coins(sub_id: b256, burn_amount: u64) {
        burn(sub_id, burn_amount);
    }
}
```

_Icon ClipboardText_

Imagine that this contract is already deployed and we are about to mint some coins:

```fuel_Box fuel_Box-idXKMmm-css
import { bn, getMintedAssetId, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { TokenFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await TokenFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Any valid B256 string can be used as a sub ID
const subID =
  '0xc7fd1d987ada439fc085cfa3c49416cf2b504ac50151e3c2335d60595cb90745';
const mintAmount = bn(1000);

const { waitForResult } = await contract.functions
  .mint_coins(subID, mintAmount)
  .call();
await waitForResult();

// Get the minted
const mintedAssetId = getMintedAssetId(contract.id.toB256(), subID);
```

_Icon ClipboardText_

## _Icon Link_ [Obtaining the Asset ID](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/minted-token-asset-id/\#obtaining-the-asset-id)

Since the asset ID depends on the contract ID, which is always dynamic (unlike the sub ID, which can be set to a fixed value), the helper `getMintedAssetId` can be used to easily obtain the asset ID for a given contract ID and sub ID.

## _Icon Link_ [Create Asset Id](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/minted-token-asset-id/\#create-asset-id)

The SDK provides a helper named `createAssetId` which takes the contract ID and sub ID as parameters. This helper internally calls `getMintedAssetId` and returns the Sway native parameter [AssetId _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_address.AssetId.html), ready to be used in a Sway program invocation:

```fuel_Box fuel_Box-idXKMmm-css
import type { AssetId, B256Address } from 'fuels';
import { createAssetId } from 'fuels';

const contractId: B256Address =
  '0x67eb6a384151a30e162c26d2f3e81ca2023dfa1041000210caed42ead32d63c0';
const subID: B256Address =
  '0xc7fd1d987ada439fc085cfa3c49416cf2b504ac50151e3c2335d60595cb90745';

const assetId: AssetId = createAssetId(contractId, subID);
// {
//   bits: '0x16c1cb95e999d0c74806f97643af158e821a0063a0c8ea61183bad2497b57478'
// }
```

_Icon ClipboardText_