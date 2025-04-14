[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Testing](https://docs.fuel.network/docs/fuels-ts/testing/) /

Custom Blocks

## _Icon Link_ [Custom Blocks](https://docs.fuel.network/docs/fuels-ts/testing/custom-blocks/\#custom-blocks)

You can force-produce blocks using the `produceBlocks` helper to achieve an arbitrary block height. This is especially useful when you want to do some testing regarding transaction maturity.

```fuel_Box fuel_Box-idXKMmm-css
import { DateTime } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

using launched = await launchTestNode();
const { provider } = launched;
const block = await provider.getBlock('latest');
if (!block) {
  throw new Error('No latest block');
}
const { time: timeLastBlockProduced } = block;

const producedBlockHeight = await provider.produceBlocks(3);

const producedBlock = await provider.getBlock(producedBlockHeight.toNumber());

const oldest = DateTime.fromTai64(timeLastBlockProduced);
const newest = DateTime.fromTai64(producedBlock!.time);
// newest >= oldest
```

_Icon ClipboardText_

## _Icon Link_ [Blocks With Custom Timestamps](https://docs.fuel.network/docs/fuels-ts/testing/custom-blocks/\#blocks-with-custom-timestamps)

You can also produce blocks with a custom block time using the `produceBlocks` helper by specifying the second optional parameter.

```fuel_Box fuel_Box-idXKMmm-css
using launchedWithCustomTimestamp = await launchTestNode();
const { provider: providerWithCustomTimestamp } = launchedWithCustomTimestamp;

const latestBlock = await providerWithCustomTimestamp.getBlock('latest');
if (!latestBlock) {
  throw new Error('No latest block');
}
const latestBlockTimestamp = DateTime.fromTai64(
  latestBlock.time
).toUnixMilliseconds();
const newBlockHeight = await providerWithCustomTimestamp.produceBlocks(
  3,
  latestBlockTimestamp + 1000
);

```

_Icon ClipboardText_

## _Icon Link_ [Full Example](https://docs.fuel.network/docs/fuels-ts/testing/custom-blocks/\#full-example)

For a full example, see the following file:
<<< @./snippets/tweaking-the-blockchain.ts#full{ts:line-numbers}