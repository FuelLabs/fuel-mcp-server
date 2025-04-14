[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Cookbook](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/) /

Wallet SDK and React Hooks

## _Icon Link_ [Wallet SDK and React Hooks](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/wallet-sdk-and-react-hooks/\#wallet-sdk-and-react-hooks)

This guide will show you how you can use the [Fuel Wallet _Icon Link_](https://wallet.fuel.network/) SDK and its [React Hooks _Icon Link_](https://wallet.fuel.network/docs/dev/hooks-reference/) to build a simple React application that lets users connect their wallet to your application and see their balance.

## _Icon Link_ [Setup](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/wallet-sdk-and-react-hooks/\#setup)

The first thing we will do is setup a Next.js project.

pnpmnpm

```fuel_Box fuel_Box-idXKMmm-css
pnpm create next-app my-fuel-app
```

_Icon ClipboardText_

Next, we will install the Fuel Wallet React SDK and the Fuel TypeScript SDK.

pnpmnpm

```fuel_Box fuel_Box-idXKMmm-css
pnpm add fuels @fuels/connectors @fuels/react @tanstack/react-query
```

_Icon ClipboardText_

## _Icon Link_ [The Provider](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/wallet-sdk-and-react-hooks/\#the-provider)

In order to make use of the React hooks provided by the Fuel Wallet SDK, we need to wrap our application in a `FuelProvider` component. This component will provide the hooks with the necessary context to interact with the Fuel Wallet SDK. Add the following to your `pages/_app.tsx` file:

```fuel_Box fuel_Box-idXKMmm-css

"use client";

import { defaultConnectors } from "@fuels/connectors";
import { FuelProvider } from "@fuels/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import React from "react";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.StrictMode>
      <html>
        <QueryClientProvider client={queryClient}>
          <FuelProvider
            fuelConfig={{ connectors: defaultConnectors({ devMode: true }) }}
          >
            <body className={inter.className}>{children}</body>
          </FuelProvider>
        </QueryClientProvider>
      </html>
    </React.StrictMode>
  );
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Building the UI](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/wallet-sdk-and-react-hooks/\#building-the-ui)

Go to your `pages/index.tsx` file and replace the contents with the following:

```fuel_Box fuel_Box-idXKMmm-css

"use client";

import {
  useAccount,
  useBalance,
  useConnect,
  useConnectors,
  useDisconnect,
  useIsConnected,
} from "@fuels/react";
import { useState } from "react";

export default function Home() {
  const [connector, setConnector] = useState("");
  const { connectors } = useConnectors();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useIsConnected();
  const { account } = useAccount();
  const { balance } = useBalance({
    address: account as string,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 10,
        maxWidth: 300,
      }}
    >
      <select
        onChange={(e) => {
          setConnector(e.target.value);
        }}
      >
        <option value="">Select a connector</option>
        {connectors.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <button disabled={!connector} onClick={() => connect(connector)}>
        Connect to {connector}
      </button>
      <button disabled={!connector} onClick={() => disconnect()}>
        Disconnect from {connector}
      </button>
      <p>{isConnected ? "Connected" : ""}</p>
      {account && <p>Account: {account}</p>}
      {balance && <p>Balance: {balance.toString()}</p>}
    </div>
  );
}
```

Collapse_Icon ClipboardText_

Let's break down what's happening here.

The `useConnectors` hook returns a list of available wallet connectors.

Once a connector has been selected by the user, the `useConnect` hook will return a `connect` function that can be used to connect the user's wallet to your application.

The `useAccount` hook returns information about the user's account, if they are connected.

The `useBalance` hook returns the user's ETH balance on the [`testnet` network _Icon Link_](https://testnet.fuel.network/v1/playground), if they are connected.

## _Icon Link_ [Further Reading](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/wallet-sdk-and-react-hooks/\#further-reading)

- [Wallet SDK React Hooks Reference _Icon Link_](https://wallet.fuel.network/docs/dev/hooks-reference/)