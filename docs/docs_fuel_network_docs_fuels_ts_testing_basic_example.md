[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Testing](https://docs.fuel.network/docs/fuels-ts/testing/) /

Basic Example

## _Icon Link_ [Basic Example](https://docs.fuel.network/docs/fuels-ts/testing/basic-example/\#basic-example)

Let's use `launchTestNode` with the counter contract from the [Fuel dApp tutorial](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/).

_Note: you will have to change the import paths of the contract factory and bytecode to match your folder structure._

```fuel_Box fuel_Box-idXKMmm-css
import { CounterFactory } from '../../../typegend/contracts/CounterFactory';

using launchedContractNode = await launchTestNode({
  contractsConfigs: [CounterFactory],
});

const {
  contracts: [contract],
  provider,
  wallets,
} = launchedContractNode;

const { waitForResult } = await contract.functions.get_count().call();
const response = await waitForResult();

```

_Icon ClipboardText_

## _Icon Link_ [Summary](https://docs.fuel.network/docs/fuels-ts/testing/basic-example/\#summary)

1. The `launched` variable was instantiated with the [`using` _Icon Link_](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#using-declarations) keyword.
2. `launchTestNode` spun up a short-lived `fuel-core` node, deployed a contract to it and returned it for testing.
3. The deployed contract is fully typesafe because of `launchTestNode`'s type-level integration with `typegen` outputs.
4. Besides the contract, you've got the [provider](https://docs.fuel.network/docs/fuels-ts/provider/) and [wallets](https://docs.fuel.network/docs/fuels-ts/wallets/) at your disposal.