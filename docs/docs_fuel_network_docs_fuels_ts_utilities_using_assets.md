[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Utilities](https://docs.fuel.network/docs/fuels-ts/utilities/) /

Using Assets

## _Icon Link_ [Assets](https://docs.fuel.network/docs/fuels-ts/utilities/using-assets/\#assets)

We export an array of [`Asset` _Icon Link_](https://fuels-ts-docs-api.vercel.app/types/_fuel_ts_account.Asset.html) objects, that can be useful when creating your dApp. The `Asset` object has useful metadata about the different assets that are available on blockchain networks (Fuel and Ethereum).

Included assets such as:

- Ethereum (ETH)
- Tether (USDT)
- USD Coin (USDC)
- Wrapped ETH (WETH)

The helper functions `getAssetFuel` and `getAssetEth` can be used to get an asset's details relative to each network. These return a combination of the asset, and network information (the return types are [`AssetFuel` _Icon Link_](https://fuels-ts-docs-api.vercel.app/types/_fuel_ts_account.AssetFuel.html) and [`AssetEth` _Icon Link_](https://fuels-ts-docs-api.vercel.app/types/_fuel_ts_account.AssetEth.html) respectively).

```fuel_Box fuel_Box-idXKMmm-css
import type { Asset, AssetFuel } from 'fuels';
import { assets, CHAIN_IDS, getAssetFuel, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const recipient = Wallet.generate({ provider });

// Find the asset with symbol 'ETH'
const assetEth: Asset = assets.find((asset) => asset.symbol === 'ETH')!;

// Get all the metadata for ETH on Fuel Test Network
const chainId: number = CHAIN_IDS.fuel.testnet;
const assetEthOnFuel: AssetFuel = getAssetFuel(assetEth, chainId)!;

// Send a transaction (using the asset on Fuel Test Network)
const transaction = await sender.transfer(
  recipient.address,
  100,
  assetEthOnFuel.assetId
);
await transaction.waitForResult();
```

_Icon ClipboardText_