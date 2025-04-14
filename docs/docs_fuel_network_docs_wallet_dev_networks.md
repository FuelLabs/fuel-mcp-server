[Docs](https://docs.fuel.network/) /

[Wallet](https://docs.fuel.network/docs/wallet/) /

[Dev](https://docs.fuel.network/docs/wallet/dev/) /

Networks

## _Icon Link_ [Networks](https://docs.fuel.network/docs/wallet/dev/networks/\#networks)

## _Icon Link_ [Add custom networks](https://docs.fuel.network/docs/wallet/dev/networks/\#add-custom-networks)

You can add new networks to the user's wallet by calling the `addNetwork()` method.

```fuel_Box fuel_Box-idXKMmm-css
console.log("Add Network", network);
const isAdded = await fuel.addNetwork(network);
console.log("Add Network result", isAdded);
```

_Icon ClipboardText_

## _Icon Link_ [Get current network](https://docs.fuel.network/docs/wallet/dev/networks/\#get-current-network)

To retrieve the current network of the user, you can use the `currentNetwork()` method.

```fuel_Box fuel_Box-idXKMmm-css
const networkInfo = await fuel.currentNetwork();
console.log("Network ", networkInfo);
```

_Icon ClipboardText_

## _Icon Link_ [With React](https://docs.fuel.network/docs/wallet/dev/networks/\#with-react)

## _Icon Link_ [Add custom networks](https://docs.fuel.network/docs/wallet/dev/networks/\#add-custom-networks-1)

You can add new networks to the user's wallet by calling the `addNetwork()` method.

```fuel_Box fuel_Box-idXKMmm-css
const { addNetwork, isPending, error } = useAddNetwork();

async function handleAddNetwork(networkUrl: string) {
  console.log("Add network", networkUrl);
  const networkAdded = await addNetwork(networkUrl);
  console.log("Network added", networkAdded);
}
```

_Icon ClipboardText_

## _Icon Link_ [Current network](https://docs.fuel.network/docs/wallet/dev/networks/\#current-network)

You can track the current network of the user by using the `currentNetwork()` method.

```fuel_Box fuel_Box-idXKMmm-css
const { network } = useNetwork();
```

_Icon ClipboardText_