[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Testing](https://docs.fuel.network/docs/nightly/fuels-ts/testing/) /

Advanced Example

## _Icon Link_ [Advanced Example](https://docs.fuel.network/docs/nightly/fuels-ts/testing/advanced-example/\#advanced-example)

A more complex example showcasing genesis block state configuration with [`walletsConfig`](https://docs.fuel.network/docs/nightly/fuels-ts/testing/test-node-options/#walletsconfig) and deployment of multiple contracts is shown below.

```fuel_Box fuel_Box-idXKMmm-css
const assets = TestAssetId.random(2);
const message = new TestMessage({ amount: 1000 });

using counterContractNode = await launchTestNode({
  walletsConfig: {
    count: 4,
    assets,
    coinsPerAsset: 2,
    amountPerCoin: 1_000_000,
    messages: [message],
  },
  contractsConfigs: [\
    {\
      factory: CounterFactory,\
      walletIndex: 3,\
      options: { storageSlots: [] },\
    },\
  ],
});

const {
  contracts: [counterContract],
  wallets: [wallet1, wallet2, wallet3, wallet4],
} = counterContractNode;

```

_Icon ClipboardText_

## _Icon Link_ [Summary](https://docs.fuel.network/docs/nightly/fuels-ts/testing/advanced-example/\#summary)

1. All points listed in the [basic example](https://docs.fuel.network/docs/nightly/fuels-ts/testing/basic-example/#summary) apply here as well.
2. Multiple wallets were generated with highly-specific coins and messages.
3. It's possible to specify the wallet to be used for contract deployment via `walletIndex`.
4. The test contract can be deployed with all the options available for real contract deployment.