[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Types](https://docs.fuel.network/docs/fuels-ts/types/) /

Bytes32

## _Icon Link_ [Bytes32](https://docs.fuel.network/docs/fuels-ts/types/bytes32/\#bytes32)

In Sway and the FuelVM, `bytes32` is used to represent hashes. It holds a 256-bit (32-bytes) value.

## _Icon Link_ [Generating Random bytes32 Values](https://docs.fuel.network/docs/fuels-ts/types/bytes32/\#generating-random-bytes32-values)

To generate a random `bytes32` value, you can use the `randomBytes` function from the fuels module:

```fuel_Box fuel_Box-idXKMmm-css
import { randomBytes, type Bytes } from 'fuels';

const bytes32: Bytes = randomBytes(32);

```

_Icon ClipboardText_

## _Icon Link_ [Converting Between Byte Arrays and Strings](https://docs.fuel.network/docs/fuels-ts/types/bytes32/\#converting-between-byte-arrays-and-strings)

You can use the `hexlify` function to convert a byte array to a hex string, and the `arrayify` function to convert a hex string back to a byte array:

```fuel_Box fuel_Box-idXKMmm-css
import type { Bytes } from 'fuels';
import { arrayify, hexlify, randomBytes } from 'fuels';

const randomBytes32: Bytes = randomBytes(32);

const bytes32String: string = hexlify(randomBytes32);

const bytes32: Bytes = arrayify(bytes32String);
```

_Icon ClipboardText_

## _Icon Link_ [Working with b256 in Fuel](https://docs.fuel.network/docs/fuels-ts/types/bytes32/\#working-with-b256-in-fuel)

In Fuel, there is a special type called b256, which is similar to `bytes32`. Like `bytes32`, `B256` is also used to represent hashes and holds a 256-bit value. You can learn more about working with `B256` values in the [B256 documentation](https://docs.fuel.network/docs/fuels-ts/types/b256/).