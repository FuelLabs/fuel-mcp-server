[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/fuels-ts/contracts/) /

Logs

## _Icon Link_ [Working with Contract Logs](https://docs.fuel.network/docs/fuels-ts/contracts/logs/\#working-with-contract-logs)

When you log a value within a contract method, it generates a log entry that is added to the log receipt, and the variable type is recorded in the contract's ABI. The SDK enables you to parse these values into TypeScript types.

Consider the following example contract:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::logging::log;

abi LogValues {
    fn log_values(val1: u64, val2: b256, val3: str[4], val4: [u8; 3]);
}

impl LogValues for Contract {
    fn log_values(val1: u64, val2: b256, val3: str[4], val4: [u8; 3]) {
        log(val1);
        log(val2);
        log(val3);
        log(val4);
    }
}
```

_Icon ClipboardText_

To access the logged values in TypeScript, use the `logs` property in the response of a contract call. The logs data will be stored in an `Array<any>`:

```fuel_Box fuel_Box-idXKMmm-css
import type { BigNumberish } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { LogValuesFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await LogValuesFactory.deploy(wallet);

const { contract } = await deploy.waitForResult();

const value1 = 500;
const value2 =
  '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
const value3 = 'Fuel';
const value4: [BigNumberish, BigNumberish, BigNumberish] = [1, 2, 3];

const { waitForResult } = await contract.functions
  .log_values(value1, value2, value3, value4)
  .call();

const { logs } = await waitForResult();
```

_Icon ClipboardText_

This approach allows you to work seamlessly with logged values in your contract, making it easier to understand and debug the contract's behavior.