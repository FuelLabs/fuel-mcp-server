[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Wallets](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/) /

Connectors

## _Icon Link_ [Connectors](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#connectors)

Fuel Wallet Connectors offer a standardized interface to integrate multiple wallets with your DApps, simplifying wallet integration and ensuring smooth user interactions.

## _Icon Link_ [Fuel Connectors](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#fuel-connectors)

`Fuel Connectors` are a set of standardized interfaces that provide a way to interact with various wallets and services. They offer a consistent way to interact with different wallets and services, allowing developers to focus on building their applications rather than worrying about wallet integration.

To build your own wallet integration, you can create a custom connector that extends the abstract [`FuelConnector` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.FuelConnector.html) class. This interface provides a set of methods and events that allow you to interact with the wallet and handle various operations such as connecting, disconnecting, signing messages, and sending transactions.

```fuel_Box fuel_Box-idXKMmm-css
class MyWalletConnector extends FuelConnector
```

_Icon ClipboardText_

## _Icon Link_ [Properties](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#properties)

The `FuelConnector` abstract class provides several properties that should be implemented to provide information about the connector.

## _Icon Link_ [`name`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#name)

The `name` property is simply a `string` on the connector that serves as an identifier and will be displayed to the end-user when selecting a connector.

```fuel_Box fuel_Box-idXKMmm-css
public override name: string = 'My Wallet Connector';
```

_Icon ClipboardText_

## _Icon Link_ [`external`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#external)

The `external` property is simply a `boolean` that indicates when a connector is external or not.
Connectors are considered external, or non-native, when they do not support the Fuel Network (e.g. `Solana`, `WalletConnect`).

## _Icon Link_ [`metadata`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#metadata)

The `metadata` property on the connector provides additional information about the connector. This information will be displayed to the end-user when selecting a connector. The following is the structure of the `metadata` object:

```fuel_Box fuel_Box-idXKMmm-css
export type ConnectorMetadata = {
  image?:
    | string
    | {
        light: string;
        dark: string;
      };
  install: {
    action: string;
    link: string;
    description: string;
  };
};
```

_Icon ClipboardText_

## _Icon Link_ [`install`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#install)

The `metadata.install` property ( _required_) is used to provide information about how to install the connector.

The `install` object requires three properties:

- `action` ( _required_) \- a `string` that will contain an action string that will be displayed to the user (e.g. "Install").

- `link` ( _required_) \- a `string` that will contain a URL that will be opened when the user clicks the action.

- `description` ( _required_) \- a `string` that will contain a description of the installation process.


```fuel_Box fuel_Box-idXKMmm-css
install: {
  action: 'Install',
  description: 'Install the My Wallet Connector',
  link: 'https://example.com/install',
},
```

_Icon ClipboardText_

## _Icon Link_ [`image`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#image)

The `metadata.image` property ( _optional_) provides an image that will be displayed to the end-user when selecting a connector. The image will be a URL to the image to be displayed (this can be an inline data URI, encoded in base64).

```fuel_Box fuel_Box-idXKMmm-css
image: 'https://example.com/image.png',
```

_Icon ClipboardText_

You can even define a `light` and `dark` theme for the image by providing an object with the `light` and `dark` keys (these will take a similar URI as above).

```fuel_Box fuel_Box-idXKMmm-css
image: {
  light: 'https://example.com/light.png',
  dark: 'https://example.com/dark.png',
},
```

_Icon ClipboardText_

## _Icon Link_ [Events](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#events)

The `FuelConnector` class provides a number of events that enable developers to listen for changes in the connector state. As part of implementing a custom connector, you can emit these events to notify the consumer dApp of changes.

## _Icon Link_ [`accounts`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#accounts)

The `accounts` event is emitted every time a connector's accounts change. The event data is an array of `string` addresses available on the network.

```fuel_Box fuel_Box-idXKMmm-css
const accounts: Array<string> = ['0x1234567890abcdef'];

this.emit(this.events.accounts, accounts);
```

_Icon ClipboardText_

## _Icon Link_ [`connectors`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#connectors-1)

The `connectors` event is emitted when the connectors are initialized. The event data is an array of [`FuelConnector` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.FuelConnector.html) objects available on the network.

```fuel_Box fuel_Box-idXKMmm-css
const connectors: Array<FuelConnector> = [new MyWalletConnector()];

this.emit(this.events.connectors, connectors);
```

_Icon ClipboardText_

## _Icon Link_ [`currentConnector`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#currentconnector)

The `currentConnector` event is emitted every time the current connector changes. The event data is a [`FuelConnector` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.FuelConnector.html) object that is currently connected.

```fuel_Box fuel_Box-idXKMmm-css
const currentConnector: FuelConnector = new MyWalletConnector();

this.emit(this.events.currentConnector, currentConnector);
```

_Icon ClipboardText_

## _Icon Link_ [`currentAccount`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#currentaccount)

The `currentAccount` event is emitted every time the current account changes. The event data is a string containing the current account address.

```fuel_Box fuel_Box-idXKMmm-css
const currentAccount: string = '0x1234567890abcdef';

this.emit(this.events.currentAccount, currentAccount);
```

_Icon ClipboardText_

## _Icon Link_ [`connection`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#connection)

The `connection` event is emitted every time the connection status changes. The event data is a `boolean` value that is `true` if the connection is established and `false` otherwise.

```fuel_Box fuel_Box-idXKMmm-css
const connection: boolean = true;

this.emit(this.events.connection, connection);
```

_Icon ClipboardText_

## _Icon Link_ [`networks`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#networks)

The `networks` event is emitted every time the network changes. The event data will be a [`Network` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.Network.html) object containing the current network information.

```fuel_Box fuel_Box-idXKMmm-css
const network: Network = {
  chainId: 1,
  url: 'https://example.com/rpc',
};

this.emit(this.events.networks, network);
```

_Icon ClipboardText_

## _Icon Link_ [`currentNetwork`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#currentnetwork)

The `currentNetwork` event is emitted every time the current network changes. The event data will be a [`Network` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.Network.html) object containing the current network information.

```fuel_Box fuel_Box-idXKMmm-css
const currentNetwork: Network = {
  chainId: 1,
  url: 'https://example.com/rpc',
};

this.emit(this.events.currentNetwork, currentNetwork);
```

_Icon ClipboardText_

## _Icon Link_ [`assets`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#assets)

The `assets` event is emitted every time the assets change. The event data will be an array of [`Asset` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.Asset.html) objects available on the network.

```fuel_Box fuel_Box-idXKMmm-css
const assets: Array<Asset> = [\
  {\
    name: 'Ethereum',\
    symbol: 'ETH',\
    icon: 'https://assets.fuel.network/providers/eth.svg',\
    networks: [\
      {\
        type: 'ethereum',\
        chainId: 11155111,\
        decimals: 18,\
      },\
    ],\
  },\
];

this.emit(this.events.assets, assets);
```

_Icon ClipboardText_

## _Icon Link_ [`abis`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#abis)

The `abis` event is emitted every time an ABI is added to a connector. The event data will be an array of [`FuelABI` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.FuelABI.html) object.

```fuel_Box fuel_Box-idXKMmm-css
const assets: Array<Asset> = [\
  {\
    name: 'Ethereum',\
    symbol: 'ETH',\
    icon: 'https://assets.fuel.network/providers/eth.svg',\
    networks: [\
      {\
        type: 'ethereum',\
        chainId: 11155111,\
        decimals: 18,\
      },\
    ],\
  },\
];

this.emit(this.events.assets, assets);
```

_Icon ClipboardText_

## _Icon Link_ [Methods](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#methods)

The `FuelConnector` abstract class provides a number of methods that _can_ be implemented to perform various functions. Not all the methods are required to be implemented; if you choose not to implement a given method, then just don't include it in your connector.

## _Icon Link_ [`ping`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#ping)

The `ping` method is used to check if the connector is available and connected.

It will return a promise that resolves to `true` if the connector is available and connected; otherwise, it will resolve to `false`.

```fuel_Box fuel_Box-idXKMmm-css
ping(): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [`version`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#version)

The `version` method is used to get the current supported version of the connector. It returns a promise that resolves to an object containing the `app` and `network` versions.

The returned version strings can be in a range of formats:

- Caret Ranges (e.g. `^1.2.3`)
- Tilde Ranges (e.g. `~1.2.3`)
- Exact Versions (e.g. `1.2.3`)

```fuel_Box fuel_Box-idXKMmm-css
version(): Promise<Version>;
```

_Icon ClipboardText_

## _Icon Link_ [`isConnected`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#isconnected)

The `isConnected` method informs if the connector is currently connected.

It will return a promise that resolves to `true` if the connector is established and currently connected; otherwise, it will return `false`.

```fuel_Box fuel_Box-idXKMmm-css
isConnected(): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [`connect`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#connect)

The `connect` method initiates the current connectors authorization flow if a connection has not already been made.

It will return a promise that resolves to `true` if the connection has been established successfully, or `false` if the user has rejected it.

```fuel_Box fuel_Box-idXKMmm-css
connect(): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [`disconnect`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#disconnect)

The `disconnect` method revokes the authorization of the current connector (provided by the `connect` methods).

It will return a promise that resolves to `true` if the disconnection is successful; otherwise, it will resolve to `false`.

```fuel_Box fuel_Box-idXKMmm-css
connect(): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [`accounts`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#accounts-1)

The `accounts` method should return a list of all the accounts for the current connection.

It returns a promise that resolves to an array of addresses, pointing to the accounts currently available on the network.

```fuel_Box fuel_Box-idXKMmm-css
accounts(): Promise<Array<string>>;
```

_Icon ClipboardText_

## _Icon Link_ [`currentAccount`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#currentaccount-1)

The `currentAccount` method will return the default account address if it's authorized with the connection.

It will return a promise to resolve the issue to an address, or if the account is not authorized for the connection, it will return `null`.

```fuel_Box fuel_Box-idXKMmm-css
currentAccount(): Promise<string | null>;
```

_Icon ClipboardText_

## _Icon Link_ [`signMessage`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#signmessage)

The `signMessage` method initiates the sign message flow for the current connection.

It requires two arguments:

- `address` ( `string`)
- `message` ( `string`)

Providing the message signing flow is successful, it will return the message signature (as a `string`).

```fuel_Box fuel_Box-idXKMmm-css
signMessage(address: string, message: HashableMessage): Promise<string>;
```

_Icon ClipboardText_

## _Icon Link_ [`sendTransaction`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#sendtransaction)

The `signTransaction` method initiates the send transaction flow for the current connection.

It requires two arguments:

- `address` ( `string`)
- `transaction` ( [`TransactionRequestLike` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.TransactionRequestLike.html))

It will return the transaction signature (as a `string`) if it is successfully signed.

```fuel_Box fuel_Box-idXKMmm-css
sendTransaction(
  address: string,
  transaction: TransactionRequestLike,
  params?: FuelConnectorSendTxParams
): Promise<string | TransactionResponse>;
```

_Icon ClipboardText_

## _Icon Link_ [`assets`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#assets-1)

The `assets` method returns a list of all the assets available for the current connection.

It will return a promise that will resolve to an array of assets (see [`Asset` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.Asset.html)) that are available on the network.

```fuel_Box fuel_Box-idXKMmm-css
assets(): Promise<Array<Asset>>;
```

_Icon ClipboardText_

## _Icon Link_ [`addAsset`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#addasset)

The `addAsset` method adds asset metadata to the connector.

It requires a single argument:

- `asset` ( [`Asset` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.Asset.html))

It returns a promise that resolves to `true` if the asset is successfully added; otherwise, it resolves to `false`.

```fuel_Box fuel_Box-idXKMmm-css
addAsset(asset: Asset): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [`addAssets`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#addassets)

The `addAssets` method adds multiple asset metadata to the connector.

It requires a single argument:

- `assets` (an Array of [`Asset` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.Asset.html)).

Returns a promise that resolves to `true` if the assets are successfully added; otherwise, resolves to `false`.

```fuel_Box fuel_Box-idXKMmm-css
addAssets(assets: Array<Asset>): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [`addNetwork`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#addnetwork)

The `addNetwork` method starts the add network flow for the current connection.

It requires a single argument:

- `networkUrl` ( `string`)

Returns a promise that resolves to `true` if the network is successfully added; otherwise, `false`.

It should throw an error if the network is not available or the network already exists.

```fuel_Box fuel_Box-idXKMmm-css
addNetwork(networkUrl: string): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [`networks`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#networks-1)

The `networks` method returns a list of all the networks available for the current connection.

Returns a promise that resolves to an array of available networks (see [`Network` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.Network.html)).

```fuel_Box fuel_Box-idXKMmm-css
networks(): Promise<Array<Network>>;
```

_Icon ClipboardText_

## _Icon Link_ [`currentNetwork`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#currentnetwork-1)

The `currentNetwork` method will return the current network that is connected.

It will return a promise that will resolve to the current network (see [`Network` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.Network.html)).

```fuel_Box fuel_Box-idXKMmm-css
currentNetwork(): Promise<Network>;
```

_Icon ClipboardText_

## _Icon Link_ [`selectNetwork`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#selectnetwork)

The `selectNetwork` method requests the user to select a network for the current connection.

It requires a single argument:

- `network` ( [`Network` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.Network.html))

You call this method with either the `providerUrl` or `chainId` to select the network.

It will return a promise that resolves to `true` if the network is successfully selected; otherwise, it will return `false`.

It should throw an error if the network is not available or the network does _not_ exist.

```fuel_Box fuel_Box-idXKMmm-css
selectNetwork(network: SelectNetworkArguments): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [`addABI`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#addabi)

The `addABI` method adds ABI information about a contract to the connector. This operation does not require an authorized connection.

It requires two arguments:

- `contractId` ( `string`)
- `abi` ( [`FuelABI` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.FuelABI.html)).

It will return a promise that will resolve to `true` if the ABI is successfully added; otherwise `false`.

```fuel_Box fuel_Box-idXKMmm-css
addABI(contractId: string, abi: FuelABI): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [`getABI`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#getabi)

The `getABI` method is used to get the ABI information that is sorted about a contract.

It requires a single argument:

- `contractId` ( `string`)

Returns a promise that resolves to the ABI information (as a [`FuelABI` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.FuelABI.html)) or `null` if the data is unavailable.

```fuel_Box fuel_Box-idXKMmm-css
getABI(contractId: string): Promise<FuelABI | null>;
```

_Icon ClipboardText_

## _Icon Link_ [`hasABI`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#hasabi)

The `hasABI` method checks if the ABI information is available for a contract.

It requires a single argument:

- `contractId` ( `string`)

Returns a promise that resolves to `true` if the ABI information is available; otherwise `false`.

```fuel_Box fuel_Box-idXKMmm-css
hasABI(contractId: string): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [Connectors Manager](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#connectors-manager)

The TS SDK exports the `Fuel` class, which serves as the connectors manager. This class provides the interface for interacting with the TS SDK and the broader Fuel ecosystem.

It can be instantiated as follows:

```fuel_Box fuel_Box-idXKMmm-css

const sdk = new Fuel();

/*
	Awaits for initialization to mitigate potential race conditions
	derived from the async nature of instantiating a connector.
*/
await sdk.init();
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> \[!NOTE\] Note
> We recommend initializing the Fuel class with the `init` method to avoid any potential race conditions that may arise from the async nature of instantiating a connector.

## _Icon Link_ [Options](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#options)

Several options can be passed to the `Fuel` connector manager:

- [`connectors`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/#connectors)
- [`storage`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/#storage)
- [`targetObject`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/#targetobject)

## _Icon Link_ [`connectors`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#connectors-2)

The `connectors` option provides a list of connectors with which the `Fuel` connector manager can interact. The manager interacts with the connectors, which in turn handle communication with the respective wallet. You can find a list of all the connectors in our [`FuelLabs/fuel-connectors` _Icon Link_](https://github.com/FuelLabs/fuel-connectors).

Below, we initialize the manager using the `defaultConnectors` method which provides an array of all the default connectors available in the `fuel-connectors` package. It's being mocked here for the purposes of this example, but you can provide your own custom connectors. Supplying the `devMode` flag as `true` will enable the development wallet for the connectors (to install visit our [wallet documentation _Icon Link_](https://docs.fuel.network/docs/wallet/install/)).

```fuel_Box fuel_Box-idXKMmm-css
import { Fuel, FuelConnector } from 'fuels';

class WalletConnector extends FuelConnector {
  public override name: string = 'My Wallet Connector';
}

const defaultConnectors = (_opts: {
  devMode: boolean;
}): Array<FuelConnector> => [new WalletConnector()];

const sdkDevMode = await new Fuel({
  connectors: defaultConnectors({
    devMode: true,
  }),
}).init();

```

_Icon ClipboardText_

## _Icon Link_ [`storage`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#storage)

The `storage` is used internally to store the current connector state. It can be overridden by passing an instance that extends the `StorageAbstract` class.

```fuel_Box fuel_Box-idXKMmm-css
import { Fuel, MemoryStorage } from 'fuels';

const sdkWithMemoryStorage = await new Fuel({
  storage: new MemoryStorage(),
}).init();
```

_Icon ClipboardText_

The default behavior will use `LocalStorage` if the `window` is available:

```fuel_Box fuel_Box-idXKMmm-css
import { Fuel, LocalStorage } from 'fuels';

const window = {
  localStorage: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  } as unknown as Storage,
};

const sdkWithLocalStorage = await new Fuel({
  storage: new LocalStorage(window.localStorage),
}).init();
```

_Icon ClipboardText_

## _Icon Link_ [`targetObject`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#targetobject)

The `targetObject` provides a target with which the `Fuel` manager can interact. Used for registering events and can be overridden as follows:

```fuel_Box fuel_Box-idXKMmm-css
import { Fuel } from 'fuels';
import type { TargetObject } from 'fuels';

const emptyWindow = {} as unknown as TargetObject;

const targetObject: TargetObject = emptyWindow || document;

const sdkWithTargetObject = await new Fuel({
  targetObject,
}).init();
```

_Icon ClipboardText_

## _Icon Link_ [Methods](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#methods-1)

The `Fuel` manager provides several methods to interact with the Manager:

## _Icon Link_ [All methods from connectors](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#all-methods-from-connectors)

The `Fuel` manager provides all the [methods](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/#methods) available from the connected connectors. Thus, you can interact with the current connector as if you were interacting with the `Fuel` manager directly.

If no current connector is available or connected, it will throw an error.

## _Icon Link_ [`connectors`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#connectors-3)

The `connectors` method gets the current list of _installed_ and _connected_ connectors.

```fuel_Box fuel_Box-idXKMmm-css
connectors: () => Promise<Array<FuelConnector>>;
```

_Icon ClipboardText_

## _Icon Link_ [`getConnector`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#getconnector)

The `getConnector` method resolves a connector by its name. This is useful for finding a specific connector with which to interact. If the connector is not found, it will return `null`.

```fuel_Box fuel_Box-idXKMmm-css
getConnector: (connector: FuelConnector | string) => FuelConnector | null;
```

_Icon ClipboardText_

## _Icon Link_ [`hasConnector`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#hasconnector)

The `hasConnector` method will return `true` under the following conditions:

- There is a current connector that is connected.
- A connector is connected within two seconds of calling the method.

```fuel_Box fuel_Box-idXKMmm-css
hasConnector(): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [`selectConnector`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#selectconnector)

The `selectConnector` method accepts a connector name and will return `true` when it is _available_ and _connected_. Otherwise, if not found or unavailable, it will return `false`.

```fuel_Box fuel_Box-idXKMmm-css
selectConnector(connectorName: string, options: FuelConnectorSelectOptions): Promise<boolean>;
```

_Icon ClipboardText_

## _Icon Link_ [`currentConnector`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#currentconnector-1)

The `currentConnector` method will return the current connector that is connected or if one is available and connected, otherwise it'll return `null` or `undefined`.

```fuel_Box fuel_Box-idXKMmm-css
currentConnector(): FuelConnector | null | undefined;
```

_Icon ClipboardText_

## _Icon Link_ [`getWallet`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#getwallet)

The `getWallet` method accepts an address (string or instance) as the first parameter and a provider or network as the second parameter. It will return an `Account` instance for the given address (providing it is valid).

The provider or network will default to the current network if not provided. When a provider cannot be resolved, it will throw an [`INVALID_PROVIDER`](https://docs.fuel.network/docs/nightly/fuels-ts/errors/) error.

```fuel_Box fuel_Box-idXKMmm-css
getWallet(address: string | Address, providerOrNetwork?: Provider | Network): Promise<Account>;
```

_Icon ClipboardText_

## _Icon Link_ [`clean`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#clean)

The `clean` method removes all the data currently stored in the [`storage`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/#storage) instance.

```fuel_Box fuel_Box-idXKMmm-css
clean(): Promise<void>;
```

_Icon ClipboardText_

## _Icon Link_ [`unsubscribe`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#unsubscribe)

The `unsubscribe` method removes all currently registered event listeners.

```fuel_Box fuel_Box-idXKMmm-css
unsubscribe(): void;
```

_Icon ClipboardText_

## _Icon Link_ [`destroy`](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#destroy)

The `destroy` method unsubscribes from all the event listeners and clears the storage.

```fuel_Box fuel_Box-idXKMmm-css
destroy(): Promise<void>;
```

_Icon ClipboardText_

## _Icon Link_ [Learning Resources](https://docs.fuel.network/docs/nightly/fuels-ts/wallets/connectors/\#learning-resources)

For a deeper understanding of `Fuel Connectors` and how to start using them in your projects, consider the following resources:

- [**Fuel Connectors Wiki** _Icon Link_](https://github.com/FuelLabs/fuel-connectors/wiki) \- read about what a `Fuel Connector` is and how it works.
- [**Fuel Connectors Guide** _Icon Link_](https://docs.fuel.network/docs/wallet/dev/connectors/) \- find out how to set up and use connectors.
- [**GitHub Repository** _Icon Link_](https://github.com/FuelLabs/fuel-connectors) \- explore different connector implementations.