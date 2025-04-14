[Docs](https://docs.fuel.network/) /

[Wallet](https://docs.fuel.network/docs/wallet/) /

[Dev](https://docs.fuel.network/docs/wallet/dev/) /

API Reference

## _Icon Link_ [API Reference](https://docs.fuel.network/docs/wallet/dev/reference/\#api-reference)

## _Icon Link_ [Add ABI](https://docs.fuel.network/docs/wallet/dev/reference/\#add-abi)

`addAbi(abiMap: AbiMap): Promise<boolean>`

Add the ABI to the user's wallet.

## _Icon Link_ [Add Asset](https://docs.fuel.network/docs/wallet/dev/reference/\#add-asset)

`addAsset(asset: Asset): Promise<boolean>`

Request the user to add metadata for an asset to the wallet.

## _Icon Link_ [Add Assets](https://docs.fuel.network/docs/wallet/dev/reference/\#add-assets)

`addAssets(asset: Asset[]): Promise<boolean>`

Request the user to add metadata for multiple assets to the wallet at once.

## _Icon Link_ [Add Network](https://docs.fuel.network/docs/wallet/dev/reference/\#add-network)

`addNetwork(url: string): Promise<boolean>`

Request the user to add a new network. Return true if success or false it fails.

## _Icon Link_ [Clean](https://docs.fuel.network/docs/wallet/dev/reference/\#clean)

`clean(): void`

Clean the storage used by the Fuel SDK, which is utilized to keep track of the selected connector.

## _Icon Link_ [Connect](https://docs.fuel.network/docs/wallet/dev/reference/\#connect)

`connect(): Promise<boolean>`

Request permission to start a connection between the project and the wallet. Return the connection state.

## _Icon Link_ [Current Account](https://docs.fuel.network/docs/wallet/dev/reference/\#current-account)

`currentAccount(): Promise<string | null>`

Return the current account being used in the wallet application.
If the account selected is not authorized for the connection, returns null.

## _Icon Link_ [Current Connector](https://docs.fuel.network/docs/wallet/dev/reference/\#current-connector)

`currentConnector(): FuelConnector`

Return the current selected connector.

## _Icon Link_ [Current Network](https://docs.fuel.network/docs/wallet/dev/reference/\#current-network)

`currentNetwork(): Promise<Network>`

Return the current network being used in the wallet application.

## _Icon Link_ [Destroy](https://docs.fuel.network/docs/wallet/dev/reference/\#destroy)

`destroy(): void`

Removes all listeners and cleans the storage.

## _Icon Link_ [Disconnect](https://docs.fuel.network/docs/wallet/dev/reference/\#disconnect)

`disconnect(): Promise<boolean>`

Disconnect your project from the wallet. Return the connection state.

## _Icon Link_ [Events](https://docs.fuel.network/docs/wallet/dev/reference/\#events)

Fuel emits events when certain actions occur. These events can be listened to by using the `on` method.

The events API follows the native Node.js `EventEmitter` enabling, `on`, `once`, and `off`.
The events enum `FuelConnectorEventTypes` can be imported from the `@fuels` package.

## _Icon Link_ [Usage](https://docs.fuel.network/docs/wallet/dev/reference/\#usage)

The `fuel` object has an `events` property which is an enum of all the events that can be listened to.

The `on` method takes two arguments, the event name and a callback function. The callback function receives data associated with the event.

```fuel_Box fuel_Box-idXKMmm-css
fuel.on(fuel.events.connection, (connectionState) => {
  console.log(connectionState);
});
```

_Icon ClipboardText_

## _Icon Link_ [Event Types](https://docs.fuel.network/docs/wallet/dev/reference/\#event-types)

| Event | Trigger | Params |
| --- | --- | --- |
| `connectors` | connectors change | `Array<FuelConnector>` |
| `currentConnector` | current connector change | `FuelConnector` |
| `accounts` | accounts available change | `Array<string>` |
| `currentAccount` | current account change | `string | null` |
| `connection` | connection state change | `boolean` |
| `currentNetwork` | current network change | `Network` |
| `assets` | assets metadata change | `Array<Asset>` |

## _Icon Link_ [Get ABI](https://docs.fuel.network/docs/wallet/dev/reference/\#get-abi)

`getABI(contractId: string): Promise<JsonAbi>`

Return the ABI of the given contractId, or null if not found.

## _Icon Link_ [Get Connection Status](https://docs.fuel.network/docs/wallet/dev/reference/\#get-connection-status)

`isConnected(): Promise<boolean>`

Return the state of the application connection.

## _Icon Link_ [Get Connector](https://docs.fuel.network/docs/wallet/dev/reference/\#get-connector)

`getConnector(connectorName: string): FuelConnector`

Return the connector with the given name.

## _Icon Link_ [Get Wallet](https://docs.fuel.network/docs/wallet/dev/reference/\#get-wallet)

`getWallet(address: string | Address, provider?: Provider): Promise<Account>`

Return a `Account` instance, which can be used for contracts, transfers, and other interactions.

## _Icon Link_ [Has ABI](https://docs.fuel.network/docs/wallet/dev/reference/\#has-abi)

`hasABI(contractId: string): Promise<boolean>`

Return a boolean indicating if the ABI for the given contractId is found.

## _Icon Link_ [Has Connector](https://docs.fuel.network/docs/wallet/dev/reference/\#has-connector)

`hasConnector(connectorName?: string | FuelConnector): Promise<boolean>`

Check if any connector is present or, if a connector is provided, check whether it is available.

## _Icon Link_ [List Accounts](https://docs.fuel.network/docs/wallet/dev/reference/\#list-accounts)

`accounts(): Promise<Array<string>>`

Return the accounts authorized for the current connection.

## _Icon Link_ [List Assets](https://docs.fuel.network/docs/wallet/dev/reference/\#list-assets)

`assets(): Promise<Array<Asset>>`

Return the list of assets in the current wallet.

## _Icon Link_ [List Connectors](https://docs.fuel.network/docs/wallet/dev/reference/\#list-connectors)

`connectors(): Promise<Array<FuelConnector>>`

Return connectors with availability metadata.

## _Icon Link_ [List Networks](https://docs.fuel.network/docs/wallet/dev/reference/\#list-networks)

`networks(): Promise<Array<Network>>`

Return the list of networks in the current wallet.

## _Icon Link_ [Request Signature Message](https://docs.fuel.network/docs/wallet/dev/reference/\#request-signature-message)

`async signMessage(address: string, message: string): Promise<string>`

Request a message signature for one specific account.

## _Icon Link_ [Select Connector](https://docs.fuel.network/docs/wallet/dev/reference/\#select-connector)

`selectConnector(connectorName: string): Promise<boolean>`

This method will check if the desired connector is installed. If it is not detected in 1 second, the method throws an error.

## _Icon Link_ [Select Network](https://docs.fuel.network/docs/wallet/dev/reference/\#select-network)

`selectNetwork(url: string): Promise<boolean>`

Request the user to switch to a different network. Return true if success or false it fails.

## _Icon Link_ [Send Transaction](https://docs.fuel.network/docs/wallet/dev/reference/\#send-transaction)

`async sendTransaction(address: string, transaction: TransactionRequestLike): Promise<string>`

Request a specific user account to send a transaction.

## _Icon Link_ [Unsubscribe All](https://docs.fuel.network/docs/wallet/dev/reference/\#unsubscribe-all)

`unsubscribe(): void`

Remove all open listeners. This is useful when you want to dispose of the Fuel instance and avoid memory leaks.

## _Icon Link_ [Version](https://docs.fuel.network/docs/wallet/dev/reference/\#version)

`version(): Promise<string>`

Return the current version of the Wallet and Network supported.