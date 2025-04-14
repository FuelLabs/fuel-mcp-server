[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/fuels-ts/contracts/) /

Dependency Estimation

## _Icon Link_ [Transaction Dependency Estimation](https://docs.fuel.network/docs/fuels-ts/contracts/dependency-estimation/\#transaction-dependency-estimation)

In [variable outputs](https://docs.fuel.network/docs/fuels-ts/contracts/variable-outputs/), we mention that a contract call might require you to manually specify external contracts or variable outputs.

However, by default the SDK always automatically estimates these dependencies and double-checks if everything is in order whenever you invoke a contract function or attempt to send a transaction.

The SDK uses the [Provider.estimateTxDependencies _Icon Link_](https://fuels-ts-docs-api.vercel.app/classes/_fuel_ts_account.Provider.html#estimateTxDependencies) method to set any missing dependencies identified during the estimation process. This requires simulating the transaction a few times in the background.

While relying on the SDK's automatic estimation is a decent default behavior, we recommend manually specifying the dependencies if they are known in advance to avoid the performance impact of the estimation process.