[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Scripts](https://docs.fuel.network/docs/fuels-ts/scripts/) /

Running Scripts

## _Icon Link_ [Running a script](https://docs.fuel.network/docs/fuels-ts/scripts/running-scripts/\#running-a-script)

Suppose your Sway script `main` function is written using the arguments passed to the `main` function like so:

```fuel_Box fuel_Box-idXKMmm-css
script;

use std::logging::log;

fn main(foo: u8) -> u8 {
    log(__to_str_array("u8 foo"));
    log(foo);
    foo
}
```

_Icon ClipboardText_

You can still hand code out a solution wrapper using `callScript` utility to call your script with data. However, if you prefer to use the ABI generated from your script, you can use the `ScriptFactory` helper:

```fuel_Box fuel_Box-idXKMmm-css
import { bn, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { ScriptMainArgs } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const foo = 3;

const scriptInstance = new ScriptMainArgs(wallet);

const { waitForResult } = await scriptInstance.functions.main(foo).call();

const { value, logs } = await waitForResult();
```

_Icon ClipboardText_