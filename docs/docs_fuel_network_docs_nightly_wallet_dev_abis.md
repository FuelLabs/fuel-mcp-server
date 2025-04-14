[Docs](https://docs.fuel.network/) /

Nightly  /

[Wallet](https://docs.fuel.network/docs/nightly/wallet/) /

[Dev](https://docs.fuel.network/docs/nightly/wallet/dev/) /

Abis

## _Icon Link_ [ABIs](https://docs.fuel.network/docs/nightly/wallet/dev/abis/\#abis)

## _Icon Link_ [Adding ABI](https://docs.fuel.network/docs/nightly/wallet/dev/abis/\#adding-abi)

To add an ABI, use the `addABI()` method.

```fuel_Box fuel_Box-idXKMmm-css
const isAdded = await fuel.addABI(contractId, abi);
console.log("ABI is added", isAdded);
```

_Icon ClipboardText_

###### _Icon Link_ Check it working

\\* Input's initial contractId and ABI are from

[SwaySwap _Icon Link_](https://fuellabs.github.io/swayswap)

Add ABI

## _Icon Link_ [Get ABI of contract ID](https://docs.fuel.network/docs/nightly/wallet/dev/abis/\#get-abi-of-contract-id)

To retrieve the ABI of a contract, use the `getAbi()` method.

```fuel_Box fuel_Box-idXKMmm-css
const abiInfo = await fuel.getABI(contractId);
console.log("Abi ", abiInfo);
```

_Icon ClipboardText_

###### Check if it's working_Icon AlertTriangle_ Not working

Get ABI

###### Wallet not detected

[Please install Fuel Wallet to use this demo.](https://docs.fuel.network/docs/install)