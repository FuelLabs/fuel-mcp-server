[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Utilities](https://docs.fuel.network/docs/nightly/fuels-ts/utilities/) /

Unit Conversion

## _Icon Link_ [Unit conversion](https://docs.fuel.network/docs/nightly/fuels-ts/utilities/unit-conversion/\#unit-conversion)

Internally, we use [Arbitrary-precision _Icon Link_](https://mathworld.wolfram.com/ArbitraryPrecision.html) arithmetic (also known as Big Number arithmetic) to allow for the handling of large numbers and different assets.

On the Fuel network, we work with 9 decimals to represent amounts under a unit. This differs from chain to chain, so it is important to know the number of decimals used on the chain you are working with.

> _Icon InfoCircle_
>
> Note: The package [`@fuels/assets` _Icon Link_](https://www.npmjs.com/package/@fuels/assets) provides a list of assets and their decimals.

Below we will go over some common use cases for unit conversion.

Using our `BN` class we can instantiate these numbers.

```fuel_Box fuel_Box-idXKMmm-css
const myBigNumberOne = '100000000';

const resultOne = new BN('100000000').toString();

```

_Icon ClipboardText_

Or using our `bn` utility function.

```fuel_Box fuel_Box-idXKMmm-css

const resultTwo = bn('100000000').toString();
```

_Icon ClipboardText_

## _Icon Link_ [Contract calls](https://docs.fuel.network/docs/nightly/fuels-ts/utilities/unit-conversion/\#contract-calls)

Generally, we will need to convert `u64` and `u256` numbers to a `BN` object when passing them to a Sway program from JavaScript. More information on this can be found [here](https://docs.fuel.network/docs/nightly/fuels-ts/types/numbers/).

```fuel_Box fuel_Box-idXKMmm-css

// Let's deploy a contract that has a function that takes a u64 as input
const provider = new Provider(LOCAL_NETWORK_URL);

const wallet = await Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployedContract = await new EchoValuesFactory(wallet).deploy();
const { contract } = await deployedContract.waitForResult();

const MAX_U64 = bn('18446744073709551615');

const { waitForResult } = await contract.functions.echo_u64(MAX_U64).call();
const { value } = await waitForResult();

```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> Note: If a contract call returns a number that is too large to be represented as a JavaScript number, you can convert it to a string using the `toString` method instead of `toNumber`.

## _Icon Link_ [Parsing](https://docs.fuel.network/docs/nightly/fuels-ts/utilities/unit-conversion/\#parsing)

Parsing string-represented numbers (from user input) has never been easier, than using the `parseUnits` function.

```fuel_Box fuel_Box-idXKMmm-css
const resultThree = bn.parseUnits('0.000000001').toString();

```

_Icon ClipboardText_

We can parse large numbers.

```fuel_Box fuel_Box-idXKMmm-css
const myBigNumberFour = '100100000000000';
const resultFour = bn.parseUnits('100100').toString();
```

_Icon ClipboardText_

Or numbers formatted for human readability.

```fuel_Box fuel_Box-idXKMmm-css
const myBigNumberFive = '100100000200001';

const resultFive = bn.parseUnits('100,100.000200001').toString();
```

_Icon ClipboardText_

We can also parse numbers in other units of measure.

```fuel_Box fuel_Box-idXKMmm-css
const myBigNumberSix = '1000000000';

const resultSix = bn.parseUnits('1', DECIMAL_GWEI).toString();
```

_Icon ClipboardText_

## _Icon Link_ [Formatting](https://docs.fuel.network/docs/nightly/fuels-ts/utilities/unit-conversion/\#formatting)

We can format common units of measure using the `format` function.

In the following example, we format a BigNumber representation of one Gwei, into units for the Fuel network (with 3 decimal place precision).

```fuel_Box fuel_Box-idXKMmm-css
const myBigNumberSeven = '1.000';
const oneGwei = bn('1000000000');

const resultSeven = oneGwei.format();
```

_Icon ClipboardText_

We can also format numbers in other units of measure by specifying the `units` variable.

```fuel_Box fuel_Box-idXKMmm-css
const myBigNumberEight = '2.000';

const twoGwei = bn('2000000000');

const resultEight = twoGwei.format({ units: DECIMAL_GWEI });
```

_Icon ClipboardText_

A `precision` variable will allow for the formatting of numbers with a specific number of decimal places.

```fuel_Box fuel_Box-idXKMmm-css
const oneDecimalGwei = '1.0';

const formattedGwei = oneGwei.format({ precision: 1 });
```

_Icon ClipboardText_

## _Icon Link_ [Format units](https://docs.fuel.network/docs/nightly/fuels-ts/utilities/unit-conversion/\#format-units)

The `formatUnits` function is a lesser alternative to the `format` function, as it will maintain the same precision as the input value.

```fuel_Box fuel_Box-idXKMmm-css
const myFormattedGwei = '1.000000000';

const formattedUnitsGwei = oneGwei.formatUnits();
```

_Icon ClipboardText_

We can also format numbers in other units of measure by specifying the `units` variable.

```fuel_Box fuel_Box-idXKMmm-css
const myFormattedKwei = '1.000000000000000';

const oneKwei = bn('1000000000000000');

const formattedUnitsKwei = oneKwei.formatUnits(DECIMAL_KWEI);
```

_Icon ClipboardText_

## _Icon Link_ [See also](https://docs.fuel.network/docs/nightly/fuels-ts/utilities/unit-conversion/\#see-also)

- [Sway Numbers](https://docs.fuel.network/docs/nightly/fuels-ts/types/numbers/)

## _Icon Link_ [Full Example](https://docs.fuel.network/docs/nightly/fuels-ts/utilities/unit-conversion/\#full-example)

For the full example of unit conversion see the snippet below:

```fuel_Box fuel_Box-idXKMmm-css
import { BN, DECIMAL_GWEI, DECIMAL_KWEI, bn, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { EchoValuesFactory } from '../../../typegend/contracts/EchoValuesFactory';

const myBigNumberOne = '100000000';

const resultOne = new BN('100000000').toString();


const myBigNumberTwo = '100000000';


const resultTwo = bn('100000000').toString();


// Let's deploy a contract that has a function that takes a u64 as input
const provider = new Provider(LOCAL_NETWORK_URL);

const wallet = await Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployedContract = await new EchoValuesFactory(wallet).deploy();
const { contract } = await deployedContract.waitForResult();

const MAX_U64 = bn('18446744073709551615');

const { waitForResult } = await contract.functions.echo_u64(MAX_U64).call();
const { value } = await waitForResult();


const myBigNumberThree = '1';

const resultThree = bn.parseUnits('0.000000001').toString();


const myBigNumberFour = '100100000000000';
const resultFour = bn.parseUnits('100100').toString();


const myBigNumberFive = '100100000200001';

const resultFive = bn.parseUnits('100,100.000200001').toString();


const myBigNumberSix = '1000000000';

const resultSix = bn.parseUnits('1', DECIMAL_GWEI).toString();

const myBigNumberSeven = '1.000';
const oneGwei = bn('1000000000');

const resultSeven = oneGwei.format();

const myBigNumberEight = '2.000';

const twoGwei = bn('2000000000');

const resultEight = twoGwei.format({ units: DECIMAL_GWEI });

const oneDecimalGwei = '1.0';

const formattedGwei = oneGwei.format({ precision: 1 });

const myFormattedGwei = '1.000000000';

const formattedUnitsGwei = oneGwei.formatUnits();

const myFormattedKwei = '1.000000000000000';

const oneKwei = bn('1000000000000000');

const formattedUnitsKwei = oneKwei.formatUnits(DECIMAL_KWEI);

```

Collapse_Icon ClipboardText_