[Docs](https://docs.fuel.network/) /

Nightly  /

[Wallet](https://docs.fuel.network/docs/nightly/wallet/) /

[Dev](https://docs.fuel.network/docs/nightly/wallet/dev/) /

Wallet Connectors

## _Icon Link_ [Fuel Wallet Connectors](https://docs.fuel.network/docs/nightly/wallet/dev/connectors/\#fuel-wallet-connectors)

Fuel Wallet Connectors are an interface provided by wallet developers to allow your DApp to integrate with specific wallets.

You can learn more about how Fuel Wallet Connectors work, by reading the [Fuel Connectors _Icon Link_](https://github.com/FuelLabs/fuel-connectors/wiki) spec.

## _Icon Link_ [Setup Fuel Wallet Connectors](https://docs.fuel.network/docs/nightly/wallet/dev/connectors/\#setup-fuel-wallet-connectors)

The Fuel Wallet SDK enables you to include a set of connectors when creating a new instance.

## _Icon Link_ [Using default connectors](https://docs.fuel.network/docs/nightly/wallet/dev/connectors/\#using-default-connectors)

```fuel_Box fuel_Box-idXKMmm-css
import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
} from "@fuels/connectors";
import { Fuel } from "fuels";

const fuel = new Fuel({
  connectors: [\
    new FuelWalletDevelopmentConnector(),\
    new FueletWalletConnector(),\
    new FuelWalletConnector(),\
  ],
});
```

_Icon ClipboardText_

## _Icon Link_ [Using a custom list](https://docs.fuel.network/docs/nightly/wallet/dev/connectors/\#using-a-custom-list)

```fuel_Box fuel_Box-idXKMmm-css
import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
} from "@fuels/connectors";
import { Fuel } from "fuels";

const fuel = new Fuel({
  connectors: [\
    new FuelWalletDevelopmentConnector(),\
    new FueletWalletConnector(),\
    new FuelWalletConnector(),\
  ],
});
```

_Icon ClipboardText_

## _Icon Link_ [Listing Connectors](https://docs.fuel.network/docs/nightly/wallet/dev/connectors/\#listing-connectors)

When working with multiple connectors, you should enable users to select the connectors they wish to use for interacting with your DApp. Once the `connectors()` method is called, the Fuel Wallet SDK will query information from the connectors, allowing you to determine which connectors are installed.

We also recommend to use the `connectors` listener on places that will use the `connectors()` method as the availability can change.

```fuel_Box fuel_Box-idXKMmm-css
const connectors = await fuel.connectors();
console.log("available connectors", connectors);

fuel.on(fuel.events.connectors, (connectors) => {
  console.log("available connectors", connectors);
});
```

_Icon ClipboardText_

## _Icon Link_ [Selecting Connector](https://docs.fuel.network/docs/nightly/wallet/dev/connectors/\#selecting-connector)

Once you have a list of connectors, you can enable the user to select the connector they wish to use by using the `selectConnect()` method. If the connector is not installed, the SDK will return false.

```fuel_Box fuel_Box-idXKMmm-css
const isSelected = await fuel.selectConnector(connectorName);
console.log("isSelected", isSelected);
```

_Icon ClipboardText_

## _Icon Link_ [Interacting with the selected connector](https://docs.fuel.network/docs/nightly/wallet/dev/connectors/\#interacting-with-the-selected-connector)

Once you have selected a connector, you can interact with it using all the available methods.

```fuel_Box fuel_Box-idXKMmm-css
const connectionState = await fuel.connect();
console.log("connectionState", connectionState);
```

_Icon ClipboardText_

## _Icon Link_ [With React](https://docs.fuel.network/docs/nightly/wallet/dev/connectors/\#with-react)

## _Icon Link_ [Connectors UI](https://docs.fuel.network/docs/nightly/wallet/dev/connectors/\#connectors-ui)

When using a React application, you can utilize the Connectors UI provided by the React package.

You can see the full a DApp example on the [examples _Icon Link_](https://github.com/FuelLabs/fuels-wallet/tree/v0.50.2/examples) folder.

## _Icon Link_ [Only hooks](https://docs.fuel.network/docs/nightly/wallet/dev/connectors/\#only-hooks)

If you prefer to build your own UI for the connectors you achieve the experience using
the hooks `useConnect()` and `useConnectors()`.

```fuel_Box fuel_Box-idXKMmm-css
const { connectors } = useConnectors();
const { connect, isPending: connecting, error: errorConnecting } = useConnect();

function handleConnect(connectorName: string) {
  connect(connectorName);
}
```

_Icon ClipboardText_