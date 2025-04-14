[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Scripts](https://docs.fuel.network/docs/fuels-ts/scripts/) /

Instantiating a Script

## _Icon Link_ [Instantiating a script](https://docs.fuel.network/docs/fuels-ts/scripts/instantiating-a-script/\#instantiating-a-script)

Similar to contracts and predicates, once you've written a script in Sway and compiled it with `forc build` (read [here _Icon Link_](https://docs.fuel.network/docs/sway/introduction/) for more on how to work with Sway), you'll get the script binary. Using the binary, you can instantiate a `script` as shown in the code snippet below:

```fuel_Box fuel_Box-idXKMmm-css
import type { BigNumberish } from 'fuels';
import { arrayify, Provider, ReceiptType, ScriptRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { CallTestScript } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const script = new CallTestScript(wallet);

type MyStruct = {
  arg_one: boolean;
  arg_two: BigNumberish;
};

const scriptRequest = new ScriptRequest(
  CallTestScript.bytecode,
  (myStruct: MyStruct) => {
    const encoded = script.interface.functions.main.encodeArguments([myStruct]);

    return arrayify(encoded);
  },
  (scriptResult) => {
    if (scriptResult.returnReceipt.type === ReceiptType.Revert) {
      throw new Error('Reverted');
    }
    if (scriptResult.returnReceipt.type !== ReceiptType.ReturnData) {
      throw new Error('fail');
    }

    const [decodedResult] = script.interface.functions.main.decodeOutput(
      scriptResult.returnReceipt.data
    );
    return decodedResult;
  }
);
```

Collapse_Icon ClipboardText_

In the [next section](https://docs.fuel.network/docs/fuels-ts/scripts/running-scripts/), we show how to run a script.