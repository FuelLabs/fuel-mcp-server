[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Getting Started](https://docs.fuel.network/docs/fuels-ts/getting-started/) /

Connecting to the Network

## _Icon Link_ [Connecting to the Network](https://docs.fuel.network/docs/fuels-ts/getting-started/connecting-to-the-network/\#connecting-to-the-network)

After [installing](https://docs.fuel.network/docs/fuels-ts/getting-started/installation/) the `fuels` package, it's easy to connect to the Network:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider } from 'fuels';

const NETWORK_URL = 'https://mainnet.fuel.network/v1/graphql';

const provider = new Provider(NETWORK_URL);

const baseAssetId = await provider.getBaseAssetId();
const chainId = await provider.getChainId();
const gasConfig = await provider.getGasConfig();

console.log('chainId', chainId);
console.log('baseAssetId', baseAssetId);
console.log('gasConfig', gasConfig);
```

_Icon ClipboardText_

## _Icon Link_ [RPC URLs](https://docs.fuel.network/docs/fuels-ts/getting-started/connecting-to-the-network/\#rpc-urls)

These are our official RPC URLs:

| Network | URL |
| --- | --- |
| Mainnet | `https://testnet.fuel.network/v1/graphql` |
| Testnet | `https://mainnet.fuel.network/v1/graphql` |
| Localhost | [Running a local Fuel node](https://docs.fuel.network/docs/fuels-ts/getting-started/running-a-local-fuel-node/) |

## _Icon Link_ [Resources](https://docs.fuel.network/docs/fuels-ts/getting-started/connecting-to-the-network/\#resources)

Access all our apps directly:

|  | Mainnet | Testnet |
| --- | --- | --- |
| Faucet | — | [https://faucet-testnet.fuel.network/ _Icon Link_](https://faucet-testnet.fuel.network/) |
| Explorer | [https://app.fuel.network _Icon Link_](https://app.fuel.network/) | [https://app-testnet.fuel.network _Icon Link_](https://app-testnet.fuel.network/) |
| Bridge | [https://app.fuel.network/bridge _Icon Link_](https://app.fuel.network/bridge) | [https://app-testnet.fuel.network/bridge _Icon Link_](https://app-testnet.fuel.network/bridge) |
| GraphQL | [https://mainnet.fuel.network/v1/playground _Icon Link_](https://mainnet.fuel.network/v1/playground) | [https://testnet.fuel.network/v1/playground _Icon Link_](https://testnet.fuel.network/v1/playground) |