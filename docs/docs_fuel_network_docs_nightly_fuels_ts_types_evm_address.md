[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-ts/types/) /

EVM Address

## _Icon Link_ [`EvmAddress`](https://docs.fuel.network/docs/nightly/fuels-ts/types/evm-address/\#evmaddress)

An Ethereum Virtual Machine (EVM) Address can be represented using the `EvmAddress` type. It's definition matches the Sway standard library type being a `Struct` wrapper around an inner `B256` value.

```fuel_Box fuel_Box-idXKMmm-css
import type { B256AddressEvm, EvmAddress } from 'fuels';

const b256: B256AddressEvm =
  '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6';

const evmAddress: EvmAddress = {
  bits: b256,
};
```

_Icon ClipboardText_

## _Icon Link_ [Creating an EVM Address](https://docs.fuel.network/docs/nightly/fuels-ts/types/evm-address/\#creating-an-evm-address)

An EVM Address only has 20 bytes therefore the first 12 bytes of the `B256` value are set to 0. Within the SDK, an `Address` can be instantiated and converted to a wrapped and Sway compatible EVM Address using the `toEvmAddress()` function:

```fuel_Box fuel_Box-idXKMmm-css
import { Address } from 'fuels';

const b256Address =
  '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

const address = new Address(b256Address);

const evmAddress = address.toEvmAddress();

console.log('evmAddress', evmAddress);
// '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6'
```

_Icon ClipboardText_

## _Icon Link_ [Using an EVM Address](https://docs.fuel.network/docs/nightly/fuels-ts/types/evm-address/\#using-an-evm-address)

The `EvmAddress` type can be integrated with your contract calls. Consider the following contract that can compare and return an EVM Address:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::vm::evm::evm_address::EvmAddress;

configurable {
    B256_ADDR: b256 = 0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6,
}

abi EvmTest {
    fn echo_address() -> EvmAddress;
    fn echo_address_comparison(evm_addr: EvmAddress) -> bool;
}

impl EvmTest for Contract {
    fn echo_address() -> EvmAddress {
        return EvmAddress::from(B256_ADDR);
    }

    fn echo_address_comparison(evm_addr: EvmAddress) -> bool {
        let evm_addr2 = EvmAddress::from(B256_ADDR);

        evm_addr == evm_addr2
    }
}
```

_Icon ClipboardText_

The `EvmAddress` type can be used with the SDK and passed to the contract function as follows:

```fuel_Box fuel_Box-idXKMmm-css
const evmAddress: EvmAddress = {
  bits: '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6',
};

const { value } = await contract.functions
  .echo_address_comparison(evmAddress)
  .get();
```

_Icon ClipboardText_

And to validate the returned value:

```fuel_Box fuel_Box-idXKMmm-css
const { value } = await contract.functions.echo_address().get();

console.log('value', value);
// { bits: '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6' }
```

_Icon ClipboardText_