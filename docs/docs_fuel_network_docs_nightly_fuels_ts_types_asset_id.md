[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-ts/types/) /

Asset Id

## _Icon Link_ [Asset ID](https://docs.fuel.network/docs/nightly/fuels-ts/types/asset-id/\#asset-id)

An Asset ID can be represented using the `AssetId` type. It's definition matches the Sway standard library type being a `Struct` wrapper around an inner `B256` value.

```fuel_Box fuel_Box-idXKMmm-css
import type { AssetId } from 'fuels';
import { getRandomB256 } from 'fuels';

const b256 = getRandomB256();

const assetId: AssetId = {
  bits: b256,
};
```

_Icon ClipboardText_

## _Icon Link_ [Using an Asset ID](https://docs.fuel.network/docs/nightly/fuels-ts/types/asset-id/\#using-an-asset-id)

You can easily use the `AssetId` type within your Sway programs. Consider the following contract that can compares and return an `AssetId`:

```fuel_Box fuel_Box-idXKMmm-css
contract;

abi EvmTest {
    fn echo_asset_id() -> AssetId;
    fn echo_asset_id_comparison(asset_id: AssetId) -> bool;
    fn echo_asset_id_input(asset_id: AssetId) -> AssetId;
}

const ASSET_ID: AssetId = AssetId::from(0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c);

impl EvmTest for Contract {
    fn echo_asset_id() -> AssetId {
        ASSET_ID
    }

    fn echo_asset_id_comparison(asset_id: AssetId) -> bool {
        asset_id == ASSET_ID
    }

    fn echo_asset_id_input(asset_id: AssetId) -> AssetId {
        asset_id
    }
}
```

_Icon ClipboardText_

The `AssetId` struct can be passed to the contract function as follows:

```fuel_Box fuel_Box-idXKMmm-css
const assetId: AssetId = {
  bits: '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c',
};

const { value } = await contract.functions
  .echo_asset_id_comparison(assetId)
  .get();
```

_Icon ClipboardText_

And to validate the returned value:

```fuel_Box fuel_Box-idXKMmm-css
const { value } = await contract.functions.echo_asset_id().get();

console.log('value', value);
// const value: AssetId = {
//   bits: '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c',
// };
```

_Icon ClipboardText_