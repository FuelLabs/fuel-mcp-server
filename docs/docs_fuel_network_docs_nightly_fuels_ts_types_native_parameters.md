[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Types](https://docs.fuel.network/docs/nightly/fuels-ts/types/) /

Native Parameters

## _Icon Link_ [Native Parameter Types](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#native-parameter-types)

Below you can find examples of how to convert between common native Sway program input and output types:

- [`Address`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/#address)
- [`ContractId`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/#contractid)
- [`Identity`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/#identity)
- [`AssetId`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/#assetid)

## _Icon Link_ [`Address`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#address)

## _Icon Link_ [`AddressInput`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#addressinput)

To pass an `Address` as an input parameter to a Sway program, you can define the input as shown below:

```fuel_Box fuel_Box-idXKMmm-css
const address = Address.fromRandom();
const addressInput = { bits: address.toB256() };
```

_Icon ClipboardText_

## _Icon Link_ [`AddressOutput`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#addressoutput)

For a Sway program that returns an `Address` type, you can convert the returned value to an `Address` type in `fuels` as shown below:

```fuel_Box fuel_Box-idXKMmm-css
const addressOutput = response1.value;
const addressFromOutput: Address = new Address(addressOutput.bits);
```

_Icon ClipboardText_

## _Icon Link_ [`ContractId`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#contractid)

## _Icon Link_ [`ContractIdInput`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#contractidinput)

To pass a `ContractId` as an input parameter to a Sway program, you can define the input as shown below:

```fuel_Box fuel_Box-idXKMmm-css
const contractId =
  '0x7296ff960b5eb86b5f79aa587d7ebe1bae147c7cac046a16d062fbd7f3a753ec';
const contractIdInput = { bits: contractId };
```

_Icon ClipboardText_

## _Icon Link_ [`ContractIdOutput`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#contractidoutput)

For a Sway program that returns a `ContractId` type, you can convert the returned value to a `string` as shown below:

```fuel_Box fuel_Box-idXKMmm-css
const contractIdOutput = response.value;
const contractIdFromOutput: string = contractIdOutput.bits;
```

_Icon ClipboardText_

## _Icon Link_ [`Identity`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#identity)

## _Icon Link_ [`IdentityInput`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#identityinput)

To pass an `Identity` as an input parameter to a Sway program, you can define the input as shown below:

For an address:

```fuel_Box fuel_Box-idXKMmm-css
const address = Address.fromRandom();
const addressInput = { bits: address.toB256() };
const addressIdentityInput = { Address: addressInput };
```

_Icon ClipboardText_

For a contract:

```fuel_Box fuel_Box-idXKMmm-css
const contractId =
  '0x7296ff960b5eb86b5f79aa587d7ebe1bae147c7cac046a16d062fbd7f3a753ec';
const contractIdInput = { bits: contractId.toString() };
const contractIdentityInput = { ContractId: contractIdInput };
```

_Icon ClipboardText_

## _Icon Link_ [`IdentityOutput`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#identityoutput)

For a Sway program that returns an `Identity` type, you can convert the returned value to an `Address` or `string` as shown below:

For an address:

```fuel_Box fuel_Box-idXKMmm-css
const response = await contract.functions.identity(addressIdentityInput).get();

const identityFromOutput: IdentityOutput = response.value;
const addressStringFromOutput: AddressOutput =
  identityFromOutput.Address as AddressOutput;
const addressFromOutput = new Address(addressStringFromOutput.bits);
```

_Icon ClipboardText_

For a contract:

```fuel_Box fuel_Box-idXKMmm-css
const response = await contract.functions.identity(contractIdentityInput).get();

const identityFromOutput2: IdentityOutput = response.value;
const contractIdOutput = identityFromOutput2.ContractId as ContractIdOutput;
const contractIdFromOutput = contractIdOutput.bits;
```

_Icon ClipboardText_

## _Icon Link_ [`AssetId`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#assetid)

## _Icon Link_ [`AssetIdInput`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#assetidinput)

To pass an `AssetId` as an input parameter to a Sway program, you can define the input as shown below:

```fuel_Box fuel_Box-idXKMmm-css
const assetId =
  '0x0cfabde7bbe58d253cf3103d8f55d26987b3dc4691205b9299ac6826c613a2e2';
const assetIdInput = { bits: assetId };
```

_Icon ClipboardText_

## _Icon Link_ [`AssetIdOutput`](https://docs.fuel.network/docs/nightly/fuels-ts/types/native-parameters/\#assetidoutput)

For a Sway program that returns an `AssetId` type, you can convert the returned value to a `string` as shown below:

```fuel_Box fuel_Box-idXKMmm-css
const assetIdOutput = response5.value;
const assetIdFromOutput: string = assetIdOutput.bits;
```

_Icon ClipboardText_