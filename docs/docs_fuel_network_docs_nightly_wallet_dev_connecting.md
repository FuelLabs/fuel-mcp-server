[Docs](https://docs.fuel.network/) /

Nightly  /

[Wallet](https://docs.fuel.network/docs/nightly/wallet/) /

[Dev](https://docs.fuel.network/docs/nightly/wallet/dev/) /

Connecting

## _Icon Link_ [Connecting](https://docs.fuel.network/docs/nightly/wallet/dev/connecting/\#connecting)

## _Icon Link_ [Checking if a Connector is available](https://docs.fuel.network/docs/nightly/wallet/dev/connecting/\#checking-if-a-connector-is-available)

Before performing other actions, the Application should check whether the user has a Wallet installed. While this is not required, it is good practice to ensure a better user experience.

```fuel_Box fuel_Box-idXKMmm-css
const hasConnector = await fuel.hasConnector();
console.log("hasConnector", hasConnector);
```

_Icon ClipboardText_

As a user installs a wallet, you can listen for changes on the status of the `currentConnector`.

```fuel_Box fuel_Box-idXKMmm-css
function logConnector(currentConnector: FuelConnector) {
  console.log("currentConnector", currentConnector);
}
fuel.on(fuel.events.currentConnector, logConnector);
```

_Icon ClipboardText_

You can learn more about connectors and how they work to allow multiple wallet's [here _Icon Link_](https://github.com/FuelLabs/fuel-connectors/wiki)

## _Icon Link_ [Requesting a Connection](https://docs.fuel.network/docs/nightly/wallet/dev/connecting/\#requesting-a-connection)

Before any user actions begin, the user must authorize the connection by calling the `connect()` method. This will initiate the connection flow in the user's Wallet, particularly if the user has more accounts than what is currently available to the connection.

```fuel_Box fuel_Box-idXKMmm-css
const connectionState = await fuel.connect();
console.log("Connection state", connectionState);
```

_Icon ClipboardText_

## _Icon Link_ [Checking connection state](https://docs.fuel.network/docs/nightly/wallet/dev/connecting/\#checking-connection-state)

To check if the user's wallet is already connected, you can use the `isConnected()` method.

```fuel_Box fuel_Box-idXKMmm-css
const connectionState = await fuel.isConnected();
console.log("Connection state", connectionState);
```

_Icon ClipboardText_

## _Icon Link_ [Watching connection state](https://docs.fuel.network/docs/nightly/wallet/dev/connecting/\#watching-connection-state)

Since a user can add or remove a connection directly inside the wallet, we also recommend that your application listens for connection state changes using the event listener.

```fuel_Box fuel_Box-idXKMmm-css
const logConnectionState = (connectionState: boolean) => {
  console.log("connectionState", connectionState);
};
fuel.on(fuel.events.connection, logConnectionState);
```

_Icon ClipboardText_

## _Icon Link_ [Removing connection](https://docs.fuel.network/docs/nightly/wallet/dev/connecting/\#removing-connection)

In some cases, an application may want to provide an experience for the user to remove the connection. In these cases, you can use the `disconnect()` method.

```fuel_Box fuel_Box-idXKMmm-css
const connectionState = await fuel.disconnect();
console.log("Connection state", connectionState);
```

_Icon ClipboardText_

## _Icon Link_ [Using React Hooks](https://docs.fuel.network/docs/nightly/wallet/dev/connecting/\#using-react-hooks)

## _Icon Link_ [Requesting a Connection](https://docs.fuel.network/docs/nightly/wallet/dev/connecting/\#requesting-a-connection-1)

In React applications, you can leverage our ready to use hooks, which include event tracking.

```fuel_Box fuel_Box-idXKMmm-css
const { connect, isPending, error } = useConnect();
```

_Icon ClipboardText_

## _Icon Link_ [Removing connection](https://docs.fuel.network/docs/nightly/wallet/dev/connecting/\#removing-connection-1)

```fuel_Box fuel_Box-idXKMmm-css
const { disconnect, isPending, error } = useDisconnect();
```

_Icon ClipboardText_

## _Icon Link_ [Checking connection state](https://docs.fuel.network/docs/nightly/wallet/dev/connecting/\#checking-connection-state-1)

All hooks implement validations to ensure that the state is synchronized, using the methods and events available from the SDK.

```fuel_Box fuel_Box-idXKMmm-css
const { isConnected } = useIsConnected();
```

_Icon ClipboardText_