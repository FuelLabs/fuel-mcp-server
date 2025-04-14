[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Types](https://docs.fuel.network/docs/fuels-ts/types/) /

B256

## _Icon Link_ [`B256`](https://docs.fuel.network/docs/fuels-ts/types/b256/\#b256)

The type `B256` in Fuel represents hashes and holds a 256-bit (32-bytes) value. The TypeScript SDK represents `B256` as a hexlified string value for portability and provides utilities to convert to `Uint8Array` when the [raw bytes](https://docs.fuel.network/docs/fuels-ts/types/bytes32/) are required.

## _Icon Link_ [Generating random `B256` values](https://docs.fuel.network/docs/fuels-ts/types/b256/\#generating-random-b256-values)

To generate a random `B256` value, you can use the `getRandomB256()` function:

```fuel_Box fuel_Box-idXKMmm-css
import { getRandomB256 } from 'fuels';

// b256 is a hexlified string representing a 256-bit value
const b256: string = getRandomB256();

console.log('b256', b256);
// 0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6
```

_Icon ClipboardText_

## _Icon Link_ [Converting between `B256` and `Uint8Array`](https://docs.fuel.network/docs/fuels-ts/types/b256/\#converting-between-b256-and-uint8array)

To convert between a `B256` hexlified string and a `Uint8Array`, you can use the `arrayify` and `hexlify` functions:

```fuel_Box fuel_Box-idXKMmm-css
import { arrayify, getRandomB256, hexlify } from 'fuels';

const randomB256: string = getRandomB256();

// Convert to Uint8Array
const uint8Arr: Uint8Array = arrayify(randomB256);

// Convert back to hexlified string
const hexedB256: string = hexlify(uint8Arr);
```

_Icon ClipboardText_

## _Icon Link_ [Support from `Address` Class](https://docs.fuel.network/docs/fuels-ts/types/b256/\#support-from-address-class)

A `B256` value is also supported as part of the [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class, providing seamless integration with other components of your application. To create an [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) instance from a b256 value, use the `new Address()` method:

```fuel_Box fuel_Box-idXKMmm-css
import { getRandomB256, Address } from 'fuels';

const randomB256: string = getRandomB256();

const address = new Address(randomB256);
```

_Icon ClipboardText_