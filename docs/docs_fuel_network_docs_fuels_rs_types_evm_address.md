[Docs](https://docs.fuel.network/) /

[Fuels Rs](https://docs.fuel.network/docs/fuels-rs/) /

[Types](https://docs.fuel.network/docs/fuels-rs/types/) /

EVM Address

## _Icon Link_ [`EvmAddress`](https://docs.fuel.network/docs/fuels-rs/types/evm_address/\#evmaddress)

In the Rust SDK, Ethereum Virtual Machine (EVM) addresses can be represented with the `EvmAddress` type. Its definition matches with the Sway standard library type with the same name and will be converted accordingly when interacting with contracts:

```fuel_Box fuel_Box-idXKMmm-css
pub struct EvmAddress {
    // An evm address is only 20 bytes, the first 12 bytes should be set to 0
    value: Bits256,
}
```

_Icon ClipboardText_

Here's an example:

```fuel_Box fuel_Box-idXKMmm-css
let b256 = Bits256::from_hex_str(
    "0x1616060606060606060606060606060606060606060606060606060606060606",
)?;
let evm_address = EvmAddress::from(b256);

let call_handler = contract_instance
    .methods()
    .evm_address_as_input(evm_address);
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note:** when creating an `EvmAddress` from `Bits256`, the first 12 bytes will be cleared because an EVM address is only 20 bytes long.