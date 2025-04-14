[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/) /

Managing Deployed Contracts

## _Icon Link_ [Managing Deployed Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/managing-deployed-contracts/\#managing-deployed-contracts)

To interact with a deployed contract using the SDK without redeploying it, you only need the contract ID and its JSON ABI. This allows you to bypass the deployment setup.

## _Icon Link_ [Contract ID](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/managing-deployed-contracts/\#contract-id)

The `contractId` property from the [`Contract` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_program.Contract.html) class is an instance of the [`Address` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_address.Address.html) class.

The [`Address` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_address.Address.html) class also provides a set of utility functions for easy manipulation and conversion between address formats along with one property; `b256Address`, which is a string encoded in [`B256`](https://docs.fuel.network/docs/nightly/fuels-ts/types/b256/) format.

When you log the `contractId` property of an instantiated Contract using `console.log`, the output appears as follows:

```fuel_Box fuel_Box-idXKMmm-css
  Address {
    b256Address: '0xcd16d97c5c4e18ee2e8d6428447dd9c8763cb0336718b53652d049f8ec88b3ba'
  }
```

_Icon ClipboardText_

* * *

If you have already an instantiated and deployed contract in hands you can create another contract instance simply by using the `contractId` property and the contract JSON ABI:

```fuel_Box fuel_Box-idXKMmm-css
const deployedEchoContract = new Contract(contractId, abi, wallet);

const { value: echoed10 } = await deployedEchoContract.functions
  .echo_u8(10)
  .simulate();
// value 10
```

_Icon ClipboardText_

The previous example assumes that you have a [`Contract` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_program.Contract.html) instance at hand. However, some Fuel tools and Sway use the [`B256`](https://docs.fuel.network/docs/nightly/fuels-ts/types/b256/) type format, a hex-encoded string-like type, for contract IDs.

You might have this format instead, for example, if you have deployed your contract with `forc deploy`.

The process of instantiating a [`Contract` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_program.Contract.html) remains the same when using a contract ID of type `B256`:

```fuel_Box fuel_Box-idXKMmm-css
const contract = new Contract(b256, abi, wallet);

const { value: echoed50 } = await contract.functions.echo_u8(50).simulate();
```

_Icon ClipboardText_