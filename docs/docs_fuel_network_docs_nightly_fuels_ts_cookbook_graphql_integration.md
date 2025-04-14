[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Cookbook](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/) /

GraphQL Integration

## _Icon Link_ [GraphQL Integration](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/graphql-integration/\#graphql-integration)

The Fuel Network provides a [GraphQL API _Icon Link_](https://docs.fuel.network/docs/graphql/overview/) to query the blockchain. To get a better understanding of the underlying schema and other operations, you can visit the [playground _Icon Link_](https://testnet.fuel.network/v1/playground) for an interactive deep dive.

## _Icon Link_ [Operations](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/graphql-integration/\#operations)

For its own purposes, the SDK creates custom operations based off of the API's schema and auto-generates TypeScript client code via codegen tools.
The end result of this code generation are the operations available on the [`Provider`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/), of which some are shown below:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

// Create the provider
const provider = new Provider(LOCAL_NETWORK_URL);

const chain = await provider.operations.getChain();
const nodeInfo = await provider.operations.getNodeInfo();
```

_Icon ClipboardText_

Note that these operations primarily serve the needs of the SDK and the `Provider`'s methods which can encapsulate calls to multiple operations, parse the responses, etc.

If your querying needs exceed what the `Provider` provides, we suggest you follow this same process and write your own custom query operations, e.g.:

```fuel_Box fuel_Box-idXKMmm-css
query getChain {
  latestBlock {
    transactions {
      id
    }
  }
}
```

_Icon ClipboardText_

## _Icon Link_ [Mutations and subscriptions](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/graphql-integration/\#mutations-and-subscriptions)

For mutations and subscriptions, we strongly suggest that you communicate with the node via the `Provider` and do not write your own custom GraphQL operations because, in its methods, the `Provider` does additional processing before and after sending them to the node which might require detailed knowledge of various Fuel domain-specific topics.