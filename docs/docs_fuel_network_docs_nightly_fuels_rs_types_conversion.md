[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Rs](https://docs.fuel.network/docs/nightly/fuels-rs/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/) /

Conversion

## _Icon Link_ [Converting Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#converting-types)

Below you can find examples for common type conversions:

- [Convert Between Native Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-between-native-types)
- [Convert to `Bytes32`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-to-bytes32)
- [Convert to `Address`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-to-address)
- [Convert to `ContractId`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-to-contractid)
- [Convert to `Identity`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-to-identity)
- [Convert to `AssetId`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-to-assetid)
- [Convert to `Bech32`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-to-bech32)
- [Convert to `str`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-to-str)
- [Convert to `Bits256`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-to-bits256)
- [Convert to `Bytes`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-to-bytes)
- [Convert to `B512`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-to-b512)
- [Convert to `EvmAddress`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/#convert-to-evmaddress)

## _Icon Link_ [Convert Between Native Types](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-between-native-types)

You might want to convert between the native types ( `Bytes32`, `Address`, `ContractId`, and `AssetId`). Because these types are wrappers on `[u8; 32]`, converting is a matter of dereferencing one and instantiating the other using the dereferenced value. Here's an example:

```fuel_Box fuel_Box-idXKMmm-css
use fuels::types::{AssetId, ContractId};

let contract_id = ContractId::new([1u8; 32]);

let asset_id: AssetId = AssetId::new(*contract_id);

assert_eq!([1u8; 32], *asset_id);
```

_Icon ClipboardText_

## _Icon Link_ [Convert to `Bytes32`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-to-bytes32)

Convert a `[u8; 32]` array to `Bytes32`:

```fuel_Box fuel_Box-idXKMmm-css
let my_slice = [1u8; 32];
let b256 = Bytes32::new(my_slice);
```

_Icon ClipboardText_

Convert a hex string to `Bytes32`:

```fuel_Box fuel_Box-idXKMmm-css
let hex_str = "0x0000000000000000000000000000000000000000000000000000000000000000";
let b256 = Bytes32::from_str(hex_str)?;
```

_Icon ClipboardText_

## _Icon Link_ [Convert to `Address`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-to-address)

Convert a `[u8; 32]` array to an `Address`:

```fuel_Box fuel_Box-idXKMmm-css
let my_slice = [1u8; 32];
let address = Address::new(my_slice);
```

_Icon ClipboardText_

Convert a `Bech32` address to an `Address`:

```fuel_Box fuel_Box-idXKMmm-css
let _plain_address: Address = bech32_address.into();
```

_Icon ClipboardText_

Convert a wallet to an `Address`:

```fuel_Box fuel_Box-idXKMmm-css
let wallet = Wallet::random(&mut rng, provider);
let address: Address = wallet.address().into();
```

_Icon ClipboardText_

Convert a hex string to an `Address`:

```fuel_Box fuel_Box-idXKMmm-css
let hex_str = "0x0000000000000000000000000000000000000000000000000000000000000000";
let address = Address::from_str(hex_str)?;
```

_Icon ClipboardText_

## _Icon Link_ [Convert to `ContractId`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-to-contractid)

Convert a `[u8; 32]` array to `ContractId`:

```fuel_Box fuel_Box-idXKMmm-css
let my_slice = [1u8; 32];
let contract_id = ContractId::new(my_slice);
```

_Icon ClipboardText_

Convert a hex string to a `ContractId`:

```fuel_Box fuel_Box-idXKMmm-css
let hex_str = "0x0000000000000000000000000000000000000000000000000000000000000000";
let contract_id = ContractId::from_str(hex_str)?;
```

_Icon ClipboardText_

Convert a contract instance to a `ContractId`:

```fuel_Box fuel_Box-idXKMmm-css
let contract_id: ContractId = contract_instance.id().into();
```

_Icon ClipboardText_

## _Icon Link_ [Convert to `Identity`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-to-identity)

Convert an `Address` to an `Identity`:

```fuel_Box fuel_Box-idXKMmm-css
let _identity_from_address = Identity::Address(address);
```

_Icon ClipboardText_

Convert a `ContractId` to an `Identity`:

```fuel_Box fuel_Box-idXKMmm-css
let _identity_from_contract_id = Identity::ContractId(contract_id);
```

_Icon ClipboardText_

## _Icon Link_ [Convert to `AssetId`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-to-assetid)

Convert a `[u8; 32]` array to an `AssetId`:

```fuel_Box fuel_Box-idXKMmm-css
let my_slice = [1u8; 32];
let asset_id = AssetId::new(my_slice);
```

_Icon ClipboardText_

Convert a hex string to an `AssetId`:

```fuel_Box fuel_Box-idXKMmm-css
let hex_str = "0x0000000000000000000000000000000000000000000000000000000000000000";
let asset_id = AssetId::from_str(hex_str)?;
```

_Icon ClipboardText_

## _Icon Link_ [Convert to `Bech32`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-to-bech32)

Convert a `[u8; 32]` array to a `Bech32` address:

```fuel_Box fuel_Box-idXKMmm-css
let hrp = "fuel";
let my_slice = [1u8; 32];
let _bech32_address = Bech32Address::new(hrp, my_slice);
```

_Icon ClipboardText_

Convert `Bytes32` to a `Bech32` address:

```fuel_Box fuel_Box-idXKMmm-css
let my_hash = Bytes32::new([1u8; 32]);
let _bech32_address = Bech32Address::new(hrp, my_hash);
```

_Icon ClipboardText_

Convert a string to a `Bech32` address:

```fuel_Box fuel_Box-idXKMmm-css
let address = "fuel1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsx2mt2";
let bech32_address = Bech32Address::from_str(address)?;
```

_Icon ClipboardText_

Convert an `Address` to a `Bech32` address:

```fuel_Box fuel_Box-idXKMmm-css
let plain_address = Address::new([0u8; 32]);
let bech32_address = Bech32Address::from(plain_address);
```

_Icon ClipboardText_

## _Icon Link_ [Convert to `str`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-to-str)

Convert a `ContractId` to a `str`:

```fuel_Box fuel_Box-idXKMmm-css
let _str_from_contract_id: &str = contract_id.to_string().as_str();
```

_Icon ClipboardText_

Convert an `Address` to a `str`:

```fuel_Box fuel_Box-idXKMmm-css
let _str_from_address: &str = address.to_string().as_str();
```

_Icon ClipboardText_

Convert an `AssetId` to a `str`:

```fuel_Box fuel_Box-idXKMmm-css
let _str_from_asset_id: &str = asset_id.to_string().as_str();
```

_Icon ClipboardText_

Convert `Bytes32` to a `str`:

```fuel_Box fuel_Box-idXKMmm-css
let _str_from_bytes32: &str = b256.to_string().as_str();
```

_Icon ClipboardText_

## _Icon Link_ [Convert to `Bits256`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-to-bits256)

Convert a hex string to `Bits256`:

```fuel_Box fuel_Box-idXKMmm-css
let hex_str = "0x0101010101010101010101010101010101010101010101010101010101010101";

let bits256 = Bits256::from_hex_str(hex_str)?;
```

_Icon ClipboardText_

Convert a `ContractId` to `Bits256`:

```fuel_Box fuel_Box-idXKMmm-css
let _contract_id_to_bits_256 = Bits256(contract_id.into());
```

_Icon ClipboardText_

Convert an `Address` to `Bits256`:

```fuel_Box fuel_Box-idXKMmm-css
let bits_256 = Bits256(address.into());
```

_Icon ClipboardText_

Convert an `AssetId` to `Bits256`:

```fuel_Box fuel_Box-idXKMmm-css
let _asset_id_to_bits_256 = Bits256(asset_id.into());
```

_Icon ClipboardText_

## _Icon Link_ [Convert to `Bytes`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-to-bytes)

Convert a string to `Bytes`:

```fuel_Box fuel_Box-idXKMmm-css
let hex_str = "0x0101010101010101010101010101010101010101010101010101010101010101";

let bytes = Bytes::from_hex_str(hex_str)?;
```

_Icon ClipboardText_

## _Icon Link_ [Convert to `B512`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-to-b512)

Convert two hex strings to `B512`:

```fuel_Box fuel_Box-idXKMmm-css
let hi_bits = Bits256::from_hex_str(
    "0xbd0c9b8792876713afa8bff383eebf31c43437823ed761cc3600d0016de5110c",
)?;
let lo_bits = Bits256::from_hex_str(
    "0x44ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d",
)?;
let b512 = B512::from((hi_bits, lo_bits));
```

_Icon ClipboardText_

## _Icon Link_ [Convert to `EvmAddress`](https://docs.fuel.network/docs/nightly/fuels-rs/types/conversion/\#convert-to-evmaddress)

Convert a `Bits256` address to an `EvmAddress`:

```fuel_Box fuel_Box-idXKMmm-css
let _evm_address = EvmAddress::from(bits_256);
```

_Icon ClipboardText_