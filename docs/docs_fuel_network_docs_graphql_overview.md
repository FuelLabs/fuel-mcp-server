[Docs](https://docs.fuel.network/) /

[GraphQL](https://docs.fuel.network/docs/graphql/) /

Overview

## _Icon Link_ [Overview](https://docs.fuel.network/docs/graphql/overview/\#overview)

## _Icon Link_ [Introduction to the Fuel GraphQL API](https://docs.fuel.network/docs/graphql/overview/\#introduction-to-the-fuel-graphql-api)

The Fuel GraphQL API allows you to query the Fuel blockchain for a wide range of on-chain data. It can be used to query transactions, balances, block information, and more. You can also use it to simulate and submit transactions on the Fuel network.

## _Icon Link_ [GraphQL Playground](https://docs.fuel.network/docs/graphql/overview/\#graphql-playground)

The playground is an interactive and graphical IDE that includes a reference for queries, mutations, and types. It also provides query validation and context for the underlying GraphQL schema.

You can test out the Fuel GraphQL API playground here:

**Testnet**: [https://testnet.fuel.network/v1/playground _Icon Link_](https://testnet.fuel.network/v1/playground)

**Mainnet**: [https://mainnet.fuel.network/v1/playground _Icon Link_](https://mainnet.fuel.network/v1/playground)

## _Icon Link_ [RPC Endpoints](https://docs.fuel.network/docs/graphql/overview/\#rpc-endpoints)

Here is a list of public RPC endpoints you can use to interact with Fuel, whether it's retrieving on-chain data or sending transactions.

| **Provider** | **Testnet** | **Mainnet** |
| --- | --- | --- |
| [Ankr _Icon Link_](https://www.ankr.com/web3-api/chains-list/fuel/) | `https://rpc.ankr.com/http/fuel_sepolia` | `https://rpc.ankr.com/http/fuel` |
| Fuel | `https://testnet.fuel.network/v1/graphql` | `https://mainnet.fuel.network/v1/graphql` |
| [QuickNode _Icon Link_](https://www.quicknode.com/chains/fuel) | `https://fuel-public.fuel-sepolia.quiknode.pro/v1/graphql` | `https://fuel-public.fuel-mainnet.quiknode.pro/v1/graphql` |

> _Icon InfoCircle_
>
> Note: The above endpoints are provided on a best effort basis. If you are running a commercial project, we highly recommend creating an account with one of the providers above to get enhanced support and rate limits.

## _Icon Link_ [Chain Id](https://docs.fuel.network/docs/graphql/overview/\#chain-id)

A chain ID is a unique identifier assigned to a blockchain network, whether a testnet or a mainnet (Fuel Ignition), to ensure correct transaction signing and prevent replay attacks across chains.

**Testnet**: [`0` _Icon Link_](https://github.com/FuelLabs/chain-configuration/blob/master/ignition-test/chain_config.json#L41)

**Mainnet**: [`9889` _Icon Link_](https://github.com/FuelLabs/chain-configuration/blob/master/ignition/chain_config.json#L41)