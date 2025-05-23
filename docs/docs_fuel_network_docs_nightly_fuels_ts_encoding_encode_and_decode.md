[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Encoding](https://docs.fuel.network/docs/nightly/fuels-ts/encoding/) /

Encode and Decode

## _Icon Link_ [Encode and Decode](https://docs.fuel.network/docs/nightly/fuels-ts/encoding/encode-and-decode/\#encode-and-decode)

To interact with the FuelVM, types must be encoded and decoded per the [argument encoding specification _Icon Link_](https://docs.fuel.network/docs/specs/abi/argument-encoding/). The SDK provides the `Interface` class to encode and decode data.

The relevant methods of `Interface` are:

- `encodeType`
- `decodeType`

The `Interface` class requires you to pass the [ABI _Icon Link_](https://docs.fuel.network/docs/specs/abi/json-abi-format/) on initialization. Both methods accept a `concreteTypeId`, which must exist in the ABI's `concreteTypes` array. After that, a suitable coder will be assigned to encode/decode that type.

Imagine we are working with the following script that returns the sum of two `u32` integers:

```fuel_Box fuel_Box-idXKMmm-css
script;

configurable {
    AMOUNT: u32 = 10,
}

fn main(inputted_amount: u32) -> u32 {
    inputted_amount + AMOUNT
}
```

_Icon ClipboardText_

When you build this script, using:

```fuel_Box fuel_Box-idXKMmm-css
forc build
```

_Icon ClipboardText_

It will produce the following ABI:

```fuel_Box fuel_Box-idXKMmm-css
{
  "programType": "script",
  "specVersion": "1",
  "encodingVersion": "1",
  "concreteTypes": [\
    {\
      "type": "u32",\
      "concreteTypeId": "d7649d428b9ff33d188ecbf38a7e4d8fd167fa01b2e10fe9a8f9308e52f1d7cc",\
    },\
  ],
  "metadataTypes": [],
  "functions": [\
    {\
      "inputs": [\
        {\
          "name": "inputted_amount",\
          "concreteTypeId": "d7649d428b9ff33d188ecbf38a7e4d8fd167fa01b2e10fe9a8f9308e52f1d7cc",\
        },\
      ],\
      "name": "main",\
      "output": "d7649d428b9ff33d188ecbf38a7e4d8fd167fa01b2e10fe9a8f9308e52f1d7cc",\
      "attributes": null,\
    },\
  ],
  "loggedTypes": [],
  "messagesTypes": [],
  "configurables": [\
    {\
      "name": "AMOUNT",\
      "concreteTypeId": "d7649d428b9ff33d188ecbf38a7e4d8fd167fa01b2e10fe9a8f9308e52f1d7cc",\
      "offset": 968,\
    },\
  ],
}
```

Collapse_Icon ClipboardText_

Now, let's prepare some data to pass to the `main` function to retrieve the combined integer. The function expects and returns a `u32` integer. So here, we will encode the `u32` to pass it to the function and receive the same `u32` back, as bytes, that we'll use for decoding. We can do both of these with the `Interface`.

First, let's prepare the transaction:

```fuel_Box fuel_Box-idXKMmm-css
import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { ScriptSum } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// First we need to build out the transaction via the script that we want to encode.
// For that we'll need the ABI and the bytecode of the script
const abi: JsonAbi = ScriptSum.abi;
const bytecode = ScriptSum.bytecode;

// Create the invocation scope for the script call, passing the initial
// value for the configurable constant
const script = new Script(bytecode, abi, wallet);
const initialValue = 10;
script.setConfigurableConstants({ AMOUNT: initialValue });
const invocationScope = script.functions.main(0);

// Create the transaction request, this can be picked off the invocation
// scope so the script bytecode is preset on the transaction
const request = await invocationScope.getTransactionRequest();
```

_Icon ClipboardText_

Now, we can encode the script data to use in the transaction:

```fuel_Box fuel_Box-idXKMmm-css

// Now we can encode the argument we want to pass to the function. The argument is required
// as a function parameter for all abi functions and we can extract it from the ABI itself
const argument = abi.functions
  .find((f) => f.name === 'main')
  ?.inputs.find((i) => i.name === 'inputted_amount')?.concreteTypeId as string;

// The `Interface` class (imported from `fuels`) is the entry point for encoding and decoding all things abi-related.
// We will use its `encodeType` method and create the encoding required for
// a u32 which takes 4 bytes up of property space.

const abiInterface = new Interface(abi);
const argumentToAdd = 10;
const encodedArguments = abiInterface.encodeType(argument, [argumentToAdd]);
// Therefore the value of 10 will be encoded to:
// Uint8Array([0, 0, 0, 10]

// The encoded value can now be set on the transaction via the script data property
request.scriptData = encodedArguments;

// Now we can estimate and fund the transaction
await request.estimateAndFund(wallet);

// Finally, submit the built transaction
const response = await wallet.sendTransaction(request);
await response.waitForResult();
```

_Icon ClipboardText_

Finally, we can decode the result:

```fuel_Box fuel_Box-idXKMmm-css

// Get result of the transaction, including the contract call result. For this we'll need
// the previously created invocation scope, the transaction response and the script
const invocationResult = await buildFunctionResult({
  funcScope: invocationScope,
  isMultiCall: false,
  program: script,
  transactionResponse: response,
});

// The decoded value can be destructured from the `FunctionInvocationResult`
const { value } = invocationResult;

// Or we can decode the returned bytes ourselves, by retrieving the return data
// receipt that contains the returned bytes. We can get this by filtering on
// the returned receipt types
const returnDataReceipt = invocationResult.transactionResult.receipts.find(
  (r) => r.type === ReceiptType.ReturnData
) as TransactionResultReturnDataReceipt;

// The data is in hex format so it makes sense to use arrayify so that the data
// is more human readable
const returnData = arrayify(returnDataReceipt.data);
// returnData = new Uint8Array([0, 0, 0, 20]

// And now we can decode the returned bytes in a similar fashion to how they were
// encoded, via the `Interface`
const [decodedReturnData] = abiInterface.decodeType(argument, returnData);
// 20

const totalValue = argumentToAdd + initialValue;
```

_Icon ClipboardText_

A similar approach can be taken with [Predicates](https://docs.fuel.network/docs/nightly/fuels-ts/predicates/); however, you must set the encoded values to the `predicateData` property.

[Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/) require more care. Although you can utilize the `scriptData` property, the arguments must be encoded as part of the [contract call script _Icon Link_](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/#calling-a-smart-contract-from-a-script). Therefore, it is recommended to use a `FunctionInvocationScope` when working with contracts which will be instantiated for you when [submitting a contract function](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/methods/), and therefore handles all the encoding.

## _Icon Link_ [Full Example](https://docs.fuel.network/docs/nightly/fuels-ts/encoding/encode-and-decode/\#full-example)

Here is the full example of the encoding and decoding methods:

```fuel_Box fuel_Box-idXKMmm-css
import type { JsonAbi, TransactionResultReturnDataReceipt } from 'fuels';
import {
  buildFunctionResult,
  ReceiptType,
  arrayify,
  Script,
  Interface,
  Provider,
  Wallet,
} from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { ScriptSum } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// First we need to build out the transaction via the script that we want to encode.
// For that we'll need the ABI and the bytecode of the script
const abi: JsonAbi = ScriptSum.abi;
const bytecode = ScriptSum.bytecode;

// Create the invocation scope for the script call, passing the initial
// value for the configurable constant
const script = new Script(bytecode, abi, wallet);
const initialValue = 10;
script.setConfigurableConstants({ AMOUNT: initialValue });
const invocationScope = script.functions.main(0);

// Create the transaction request, this can be picked off the invocation
// scope so the script bytecode is preset on the transaction
const request = await invocationScope.getTransactionRequest();


// Now we can encode the argument we want to pass to the function. The argument is required
// as a function parameter for all abi functions and we can extract it from the ABI itself
const argument = abi.functions
  .find((f) => f.name === 'main')
  ?.inputs.find((i) => i.name === 'inputted_amount')?.concreteTypeId as string;

// The `Interface` class (imported from `fuels`) is the entry point for encoding and decoding all things abi-related.
// We will use its `encodeType` method and create the encoding required for
// a u32 which takes 4 bytes up of property space.

const abiInterface = new Interface(abi);
const argumentToAdd = 10;
const encodedArguments = abiInterface.encodeType(argument, [argumentToAdd]);
// Therefore the value of 10 will be encoded to:
// Uint8Array([0, 0, 0, 10]

// The encoded value can now be set on the transaction via the script data property
request.scriptData = encodedArguments;

// Now we can estimate and fund the transaction
await request.estimateAndFund(wallet);

// Finally, submit the built transaction
const response = await wallet.sendTransaction(request);
await response.waitForResult();


// Get result of the transaction, including the contract call result. For this we'll need
// the previously created invocation scope, the transaction response and the script
const invocationResult = await buildFunctionResult({
  funcScope: invocationScope,
  isMultiCall: false,
  program: script,
  transactionResponse: response,
});

// The decoded value can be destructured from the `FunctionInvocationResult`
const { value } = invocationResult;

// Or we can decode the returned bytes ourselves, by retrieving the return data
// receipt that contains the returned bytes. We can get this by filtering on
// the returned receipt types
const returnDataReceipt = invocationResult.transactionResult.receipts.find(
  (r) => r.type === ReceiptType.ReturnData
) as TransactionResultReturnDataReceipt;

// The data is in hex format so it makes sense to use arrayify so that the data
// is more human readable
const returnData = arrayify(returnDataReceipt.data);
// returnData = new Uint8Array([0, 0, 0, 20]

// And now we can decode the returned bytes in a similar fashion to how they were
// encoded, via the `Interface`
const [decodedReturnData] = abiInterface.decodeType(argument, returnData);
// 20

const totalValue = argumentToAdd + initialValue;
```

Collapse_Icon ClipboardText_