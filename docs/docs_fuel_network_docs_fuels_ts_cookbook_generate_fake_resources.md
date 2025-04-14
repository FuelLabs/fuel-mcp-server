[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Cookbook](https://docs.fuel.network/docs/fuels-ts/cookbook/) /

Generate Fake Resources

## _Icon Link_ [Generate Fake Resources](https://docs.fuel.network/docs/fuels-ts/cookbook/generate-fake-resources/\#generate-fake-resources)

When working with an unfunded account, you can generate fake resources to perform a dry-run on your transactions. This is useful for testing purposes without the need for real funds.

Below is an example script that returns the value `1337`. You can use fake resources to execute a dry-run of this script and obtain the returned value.

```fuel_Box fuel_Box-idXKMmm-css
script;

fn main() -> u64 {
    return 1337;
}
```

_Icon ClipboardText_

To execute a dry-run, use the `Provider.dryRun` method. Ensure you set the `utxo_validation` flag to true, as this script uses fake UTXOs:

```fuel_Box fuel_Box-idXKMmm-css
import type { TransactionResultReturnDataReceipt } from 'fuels';
import {
  bn,
  Provider,
  ReceiptType,
  ScriptTransactionRequest,
  Wallet,
} from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { ReturnScript } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const baseAssetId = await provider.getBaseAssetId();

const transactionRequest = new ScriptTransactionRequest({
  gasLimit: bn(62_000),
  maxFee: bn(60_000),
  script: ReturnScript.bytecode,
});

const resources = wallet.generateFakeResources([\
  {\
    amount: bn(100_000),\
    assetId: baseAssetId,\
  },\
]);

transactionRequest.addResources(resources);

const dryrunResult = await provider.dryRun(transactionRequest);

const returnReceipt = dryrunResult.receipts.find(
  (receipt) => receipt.type === ReceiptType.ReturnData
) as TransactionResultReturnDataReceipt;

const { data: returnedValue } = returnReceipt;
```

Collapse_Icon ClipboardText_

By setting `utxo_validation` to `true`, you can successfully execute the dry-run and retrieve the returned value from the script without requiring actual funds.