[Docs](https://docs.fuel.network/) /

[Wallet](https://docs.fuel.network/docs/wallet/) /

[Dev](https://docs.fuel.network/docs/wallet/dev/) /

Getting Started

## _Icon Link_ [Getting Started](https://docs.fuel.network/docs/wallet/dev/getting-started/\#getting-started)

The Fuel Wallet SDK serves as a connection manager between your DApp and other wallets compatible with the Fuel Network. This package ensures that you can connect to the Fuel Wallet as well as any other wallet using a unified API.

If you are using **React** jump to the [React section](https://docs.fuel.network/docs/wallet/dev/#using-react).

## _Icon Link_ [Installation](https://docs.fuel.network/docs/wallet/dev/getting-started/\#installation)

To begin integrating the Fuel Wallet SDK into your DApp, you first need to install the packages `@fuels/connectors` and `fuels`.

```fuel_Box fuel_Box-idXKMmm-css
npm install fuels @fuels/connectors
```

_Icon ClipboardText_

The installation also requires the `fuels` SDK, as it is used to communicate with the Fuel Network and provides a set of utilities required for interacting with contracts on the Fuel Network.

## _Icon Link_ [Example](https://docs.fuel.network/docs/wallet/dev/getting-started/\#example)

You can import `defaultConnectors` from `@fuels/connectors` to get a list of all the default connectors. Besides that, you can also create your own connectors or import them individually.

## _Icon Link_ [Using default connectors](https://docs.fuel.network/docs/wallet/dev/getting-started/\#using-default-connectors)

```fuel_Box fuel_Box-idXKMmm-css
import { Fuel } from 'fuels';
import { defaultConnectors } from '@fuels/connectors';

const fuel = new Fuel({
  connectors: defaultConnectors({ devMode: true }),
});

await fuel.selectConnector('Fuel Wallet');
await fuel.connect();
```

_Icon ClipboardText_

## _Icon Link_ [Using a custom list](https://docs.fuel.network/docs/wallet/dev/getting-started/\#using-a-custom-list)

```fuel_Box fuel_Box-idXKMmm-css
import { Fuel } from 'fuels';
import { FuelWalletConnector } from '@fuels/connectors';

const fuel = new Fuel({
  connectors: [new FuelWalletConnector()],
});

await fuel.selectConnector('Fuel Wallet');
await fuel.connect();
```

_Icon ClipboardText_

## _Icon Link_ [Using React](https://docs.fuel.network/docs/wallet/dev/getting-started/\#using-react)

We also provide a set of React hooks and a user interface (UI) for seamless interaction with connectors, eliminating the need for manual UI creation.

## _Icon Link_ [Installation](https://docs.fuel.network/docs/wallet/dev/getting-started/\#installation-1)

```fuel_Box fuel_Box-idXKMmm-css
npm install fuels @fuels/connectors @fuels/react @tanstack/react-query
```

_Icon ClipboardText_

- [fuels _Icon Link_](https://github.com/FuelLabs/fuels-ts) is the SDK that provides a set of utilities for interacting with the Fuel Network.
- [@fuels/connectors _Icon Link_](https://github.com/FuelLabs/fuel-connectors) is the collection of connectors that allow you to connect to the Fuel Wallet.
- [@fuels/react _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react) is a set of React hooks and a UI for seamless interaction with connectors.
- [@tanstack/react-query _Icon Link_](https://github.com/tanstack/query) is a library for managing and caching data in React applications.

## _Icon Link_ [Example](https://docs.fuel.network/docs/wallet/dev/getting-started/\#example-1)

## _Icon Link_ [Setup](https://docs.fuel.network/docs/wallet/dev/getting-started/\#setup)

Wrap your application with the providers `QueryClientProvider` and `FuelProvider`.

```fuel_Box fuel_Box-idXKMmm-css
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { FuelProvider } from '@fuels/react';
import { defaultConnectors } from '@fuels/connectors';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FuelProvider fuelConfig={{ connectors: defaultConnectors({ devMode: true }) }}>
        <App />
      </FuelProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
```

_Icon ClipboardText_

Alternatively, you can pass `ui={false}` to the `FuelProvider` to disable the UI in order to implement your own UI.

## _Icon Link_ [Usage](https://docs.fuel.network/docs/wallet/dev/getting-started/\#usage)

```fuel_Box fuel_Box-idXKMmm-css
import { useConnectUI } from '@fuels/react';
const { connect, isConnecting } = useConnectUI();

<button onClick={connect}>
  {isConnecting ? 'Connecting...' : 'Connect'}
</button>
```

_Icon ClipboardText_

Check our example application for a [quick start _Icon Link_](https://github.com/FuelLabs/fuels-wallet/tree/v0.50.2/examples/cra-dapp).