[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Utilities](https://docs.fuel.network/docs/fuels-ts/utilities/) /

Address Conversion

## _Icon Link_ [Address](https://docs.fuel.network/docs/fuels-ts/utilities/address-conversion/\#address)

Addresses and varying address formats are commonplace when interacting with decentralized applications. Furthermore, different networks may enforce different address formats.

The Fuel Network uses the [`B256`](https://docs.fuel.network/docs/fuels-ts/types/b256/) address format for its interactions, an example of which can be seen below:

```fuel_Box fuel_Box-idXKMmm-css
const b256 =
  '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c';
```

_Icon ClipboardText_

However, a hexlified [B256](https://docs.fuel.network/docs/fuels-ts/types/b256/) (hex) is another common address format; an example can be seen below:

```fuel_Box fuel_Box-idXKMmm-css
const b256Address =
  '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';
```

_Icon ClipboardText_

At times, these can even be wrapped in a [Struct](https://docs.fuel.network/docs/fuels-ts/types/structs/). Such as an [Asset ID](https://docs.fuel.network/docs/fuels-ts/types/asset-id/) or a [EVM Address](https://docs.fuel.network/docs/fuels-ts/types/evm-address/):

```fuel_Box fuel_Box-idXKMmm-css
const evmAddress: EvmAddress = {
  bits: '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6',
};
```

_Icon ClipboardText_

The TS-SDK makes converting between these addresses simple using the [Address](https://docs.fuel.network/docs/fuels-ts/types/address/) helper, which provides various utilities for conversion.

The following [conversion guide](https://docs.fuel.network/docs/fuels-ts/utilities/address-conversion/#address-conversion) will show how to utilize this class to convert between address formats, as well as Sway Standard Types.

## _Icon Link_ [Address Conversion](https://docs.fuel.network/docs/fuels-ts/utilities/address-conversion/\#address-conversion)

This guide demonstrates how to convert between address formats and Sway Standard Types using helper functions. Native types are wrappers for bytes, and you can perform conversions between them by leveraging these functions and classes.

## _Icon Link_ [Converting a Contract ID](https://docs.fuel.network/docs/fuels-ts/utilities/address-conversion/\#converting-a-contract-id)

The Contract `id` property is an instance of the [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class. Therefore, it can be converted using the [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class functions such as `toAddress` and `toB256`:

```fuel_Box fuel_Box-idXKMmm-css
import type { B256Address } from 'fuels';
import { Address, Provider, Contract } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { Counter } from '../../../../typegend/contracts';

const provider = new Provider(LOCAL_NETWORK_URL);

const contractAbi = Counter.abi;
const contractAddress = new Address(
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f'
);

const contract = new Contract(contractAddress, contractAbi, provider);

const b256: B256Address = contract.id.toAddress();
// 0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f
```

_Icon ClipboardText_

## _Icon Link_ [Converting a Wallet Address](https://docs.fuel.network/docs/fuels-ts/utilities/address-conversion/\#converting-a-wallet-address)

Similarly, the Wallet `address` property is also of type [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) and can therefore use the same [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) class functions for conversion:

```fuel_Box fuel_Box-idXKMmm-css
import type { B256Address, WalletLocked } from 'fuels';
import { Address, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const address = new Address(
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f'
);

const wallet: WalletLocked = Wallet.fromAddress(address, provider);

const b256: B256Address = wallet.address.toAddress();
// 0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f
```

_Icon ClipboardText_

## _Icon Link_ [Converting an Asset ID](https://docs.fuel.network/docs/fuels-ts/utilities/address-conversion/\#converting-an-asset-id)

[Asset IDs](https://docs.fuel.network/docs/fuels-ts/types/asset-id/) are a wrapped [`B256`](https://docs.fuel.network/docs/fuels-ts/types/b256/) value. The following example shows how to create an [`Address` _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_address.Address.html) from a `B256` type:

```fuel_Box fuel_Box-idXKMmm-css
import type { AssetId, B256Address } from 'fuels';
import { Address } from 'fuels';

const b256: B256Address =
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';
const address: Address = new Address(b256);
const assetId: AssetId = address.toAssetId();
// {
//    bits: '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f
// }
```

_Icon ClipboardText_