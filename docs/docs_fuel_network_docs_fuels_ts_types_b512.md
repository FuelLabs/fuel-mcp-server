[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Types](https://docs.fuel.network/docs/fuels-ts/types/) /

B512

## _Icon Link_ [B512](https://docs.fuel.network/docs/fuels-ts/types/b512/\#b512)

In Sway, the `B512` type is commonly used to handle public keys and signatures. This guide will explain how the `B512` type is defined in Sway, how to visualize a `B512` value using the SDK, and how to interact with a contract function that accepts a `B512` parameter.

The `B512` type in Sway is a wrapper around two `B256` types, allowing for the representation of 64-byte values. It is defined as a struct:

```fuel_Box fuel_Box-idXKMmm-css
pub struct B512 {
    /// The two `B256`s that make up the `B512`.
    bits: [b256; 2],
}
```

_Icon ClipboardText_

## _Icon Link_ [`B512` in the SDK](https://docs.fuel.network/docs/fuels-ts/types/b512/\#b512-in-the-sdk)

In the SDK, you can visualize a `B512` value by examining a wallet's public key:

```fuel_Box fuel_Box-idXKMmm-css
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.generate({ provider });

console.log('public key', wallet.publicKey);

// 0x97e3a666e4cd34b6b3cf778ef5ec617de4439b68f7a629245442a1fece7713094a1cb0aa7ad0ac253ca1ea47d4618f9090b2a881e829e091fb2c426763e94cca
```

_Icon ClipboardText_

## _Icon Link_ [Example: Echoing a `B512` Value in a Contract Function](https://docs.fuel.network/docs/fuels-ts/types/b512/\#example-echoing-a-b512-value-in-a-contract-function)

Let's consider a contract function that accepts a `B512` parameter and returns the same value:

```fuel_Box fuel_Box-idXKMmm-css
fn echo_b512(input: B512) -> B512 {
    input
}
```

_Icon ClipboardText_

To call this function and validate the returned value, follow these steps:

```fuel_Box fuel_Box-idXKMmm-css
const b512 = wallet.publicKey;

const { value } = await contract.functions.echo_b512(b512).get();
```

_Icon ClipboardText_

In this example, we generate a wallet, use its public key as the `B512` input, call the `echo_b512` contract function, and expect the returned value to match the original input.