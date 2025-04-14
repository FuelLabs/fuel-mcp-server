[Docs](https://docs.fuel.network/) /

[Wallet](https://docs.fuel.network/docs/wallet/) /

[Dev](https://docs.fuel.network/docs/wallet/dev/) /

Signing a Message

## _Icon Link_ [Signing a Message](https://docs.fuel.network/docs/wallet/dev/signmessage/\#signing-a-message)

With access to the user address and the connection authorized, you can request the user's signature using `signMessage()`.

```fuel_Box fuel_Box-idXKMmm-css
const account = await fuel.currentAccount();
if (!account) {
  throw new Error("Current account not authorized for this connection!");
}
const wallet = await fuel.getWallet(account);
const signedMessage = await wallet.signMessage(message);
console.log("Message signature", signedMessage);
```

_Icon ClipboardText_

###### Check if it's working_Icon AlertTriangle_ Not working

Sign Message

###### Wallet not detected

[Please install Fuel Wallet to use this demo.](https://docs.fuel.network/docs/install)

## _Icon Link_ [With React](https://docs.fuel.network/docs/wallet/dev/signmessage/\#with-react)

In a React app, once the connection is established, you can use the `useWallet()` hook to get a wallet instance and sign the transaction.

```fuel_Box fuel_Box-idXKMmm-css
const { wallet } = useWallet();

async function handleSignMessage(message: string) {
  console.log("Request signature of message!");
  if (!wallet) {
    throw new Error("Current wallet is not authorized for this connection!");
  }
  const signedMessage = await wallet.signMessage(message);
  console.log("Message signature", signedMessage);
}
```

_Icon ClipboardText_

###### Check if it's working_Icon AlertTriangle_ Not working

Sign Message

###### Wallet not detected

[Please install Fuel Wallet to use this demo.](https://docs.fuel.network/docs/install)