[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Types](https://docs.fuel.network/docs/fuels-ts/types/) /

Address

## _Icon Link_ [Address](https://docs.fuel.network/docs/fuels-ts/types/address/\#address)

In Sway, the [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) type serves as a type-safe wrapper around the primitive `B256` type. The SDK takes a different approach and has its own abstraction for the [Address _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) type.

## _Icon Link_ [Address Class](https://docs.fuel.network/docs/fuels-ts/types/address/\#address-class)

The [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class also provides a set of utility functions for easy manipulation and conversion between address formats along with one property; `b256Address`, which is of the [`B256`](https://docs.fuel.network/docs/fuels-ts/types/b256/) type.

```fuel_Box fuel_Box-idXKMmm-css
readonly b256Address: B256Address;
```

_Icon ClipboardText_

## _Icon Link_ [Creating an Address](https://docs.fuel.network/docs/fuels-ts/types/address/\#creating-an-address)

There are several ways to create an [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) instance:

## _Icon Link_ [From a b256 address](https://docs.fuel.network/docs/fuels-ts/types/address/\#from-a-b256-address)

To create an [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from a 256-bit address, use the following code snippet:

```fuel_Box fuel_Box-idXKMmm-css
import { Address } from 'fuels';
const b256 =
  '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

const address = new Address(b256);

console.log('b256', address.toB256());
// 0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6
```

_Icon ClipboardText_

## _Icon Link_ [From a Public Key](https://docs.fuel.network/docs/fuels-ts/types/address/\#from-a-public-key)

To create an [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from a public key, use the following code snippet:

```fuel_Box fuel_Box-idXKMmm-css
import { Address, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const wallet = Wallet.generate({ provider });

const address = new Address(wallet.publicKey);
```

_Icon ClipboardText_

## _Icon Link_ [From an EVM Address](https://docs.fuel.network/docs/fuels-ts/types/address/\#from-an-evm-address)

To create an [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from an EVM address, use the following code snippet:

```fuel_Box fuel_Box-idXKMmm-css
import { Address } from 'fuels';

const evmAddress = '0x675b68aa4d9c2d3bb3f0397048e62e6b7192079c';

const address = new Address(evmAddress);
```

_Icon ClipboardText_

## _Icon Link_ [From an existing Address](https://docs.fuel.network/docs/fuels-ts/types/address/\#from-an-existing-address)

To create an [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from an existing [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) instance, use the following code snippet:

```fuel_Box fuel_Box-idXKMmm-css
import { Address } from 'fuels';

const address = Address.fromRandom();

const addressClone = new Address(address);
```

_Icon ClipboardText_

## _Icon Link_ [Utility functions](https://docs.fuel.network/docs/fuels-ts/types/address/\#utility-functions)

## _Icon Link_ [`equals`](https://docs.fuel.network/docs/fuels-ts/types/address/\#equals)

As you may already notice, the `equals` function can compare addresses instances:

```fuel_Box fuel_Box-idXKMmm-css
import { Address } from 'fuels';

const address = Address.fromRandom();

const address1 = new Address(address.toString());
const address2 = new Address(address.toB256());

console.log('equals', address1.equals(address2));
// true
```

_Icon ClipboardText_

## _Icon Link_ [`toChecksum`](https://docs.fuel.network/docs/fuels-ts/types/address/\#tochecksum)

To convert an address to a checksum address, use the `toChecksum` function:

```fuel_Box fuel_Box-idXKMmm-css
import { Address } from 'fuels';

const b256 =
  '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

const address = new Address(b256);

console.log('checksum', address.toChecksum());
// true
```

_Icon ClipboardText_