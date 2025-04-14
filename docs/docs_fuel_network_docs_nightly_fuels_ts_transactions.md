[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

Transactions

## _Icon Link_ [Transactions](https://docs.fuel.network/docs/nightly/fuels-ts/transactions/\#transactions)

A transaction is a way of interacting with a Fuel blockchain and can include actions like transferring assets, deploying contracts and minting tokens. All of which are possible through the SDK by using simple utility methods or building out more custom transactions.

Transferring assets is the most common transaction type and can be be executed by calling the `transfer` function from an account to a recipient address:

```fuel_Box fuel_Box-idXKMmm-css
const tx = await sender.transfer(receiver.address, 100, assetId);
await tx.waitForResult();

const newBalance = await receiver.getBalance(assetId);
// 100
```

_Icon ClipboardText_

Deploying and interacting with contracts are other common transactions. More information on this can be found in the [contracts guide](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/), either through the [contract deployment guide](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/deploying-contracts/) or the [contract interaction guide](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/methods/).

This guide will discuss how to create and modify transactions to fit bespoke use cases, as well as submit them to the network using transactional policies and parameters. As well as retrieving information about submitted transactions.