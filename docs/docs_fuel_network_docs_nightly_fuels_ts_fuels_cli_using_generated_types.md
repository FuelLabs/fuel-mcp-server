[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Fuels CLI](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/) /

Using Generated Types

## _Icon Link_ [Using Generated Types](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/using-generated-types/\#using-generated-types)

After generating types via:

```fuel_Box fuel_Box-idXKMmm-css
pnpm fuels typegen -i ./abis/*-abi.json -o ./types
```

_Icon ClipboardText_

We can use these files like so:

```fuel_Box fuel_Box-idXKMmm-css
import { DemoContract } from './sway-programs-api';

const contractInstance = new DemoContract(contractId, wallet);
const call2 = await contractInstance.functions.return_input(1337).call();
const { value: v2 } = await call2.waitForResult();
```

_Icon ClipboardText_

## _Icon Link_ [Contract](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/using-generated-types/\#contract)

Let's use the Contract class to deploy a contract:

```fuel_Box fuel_Box-idXKMmm-css
import { DemoContract } from './sway-programs-api';

// Deploy
const deploy = await DemoContractFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

```

_Icon ClipboardText_

## _Icon Link_ [Autoloading of Storage Slots](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/using-generated-types/\#autoloading-of-storage-slots)

Typegen tries to resolve, auto-load, and embed the [Storage Slots](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/storage-slots/) for your Contract within the `MyContract` class. Still, you can override it alongside other options from [`DeployContractOptions` _Icon Link_](https://github.com/FuelLabs/fuels-ts/blob/a64b67b9fb2d7f764ab9151a21d2266bf2df3643/packages/contract/src/contract-factory.ts#L19-L24), when calling the `deploy` method:

```fuel_Box fuel_Box-idXKMmm-css
import { DemoContractFactory } from './sway-programs-api';

const { waitForResult } = await DemoContractFactory.deploy(wallet, {
  storageSlots,
});

const { contract } = await waitForResult();
```

_Icon ClipboardText_

## _Icon Link_ [Script](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/using-generated-types/\#script)

After generating types via:

```fuel_Box fuel_Box-idXKMmm-css
pnpm fuels typegen -i ./abis/*-abi.json -o ./types --script
```

_Icon ClipboardText_

We can use these files like so:

```fuel_Box fuel_Box-idXKMmm-css
import { Script } from './sway-programs-api';

const script = new DemoScript(wallet);
const { waitForResult } = await script.functions.main().call();
const { value } = await waitForResult();
```

_Icon ClipboardText_

## _Icon Link_ [Predicate](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/using-generated-types/\#predicate)

After generating types via:

```fuel_Box fuel_Box-idXKMmm-css
pnpm fuels typegen -i ./abis/*-abi.json -o ./types --predicate
```

_Icon ClipboardText_

We can use these files like so:

```fuel_Box fuel_Box-idXKMmm-css
import type { PredicateInputs } from './sway-programs-api';
import { Predicate } from './sway-programs-api';

// In this exchange, we are first transferring some coins to the predicate
using launched = await launchTestNode();

const {
  provider,
  wallets: [wallet],
} = launched;

const receiver = Wallet.fromAddress(Address.fromRandom(), provider);

const predicateData: DemoPredicateInputs = [];
const predicate = new DemoPredicate({
  provider,
  data: predicateData,
});

const tx = await wallet.transfer(predicate.address, 200_000, await provider.getBaseAssetId());
const { isStatusSuccess } = await tx.wait();

// Then we are transferring some coins from the predicate to a random address (receiver)
const tx2 = await predicate.transfer(receiver.address, 50_000, await provider.getBaseAssetId());
await tx2.wait();

expect((await receiver.getBalance()).toNumber()).toEqual(50_000);
expect(isStatusSuccess).toBeTruthy();
```

_Icon ClipboardText_

See also:

- [Generating Types for Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/generating-types/#generating-types-for-contracts)
- [Generating Types for Scripts](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/generating-types/#generating-types-for-scripts)
- [Generating Types for Predicates](https://docs.fuel.network/docs/nightly/fuels-ts/fuels-cli/generating-types/#generating-types-for-predicates)