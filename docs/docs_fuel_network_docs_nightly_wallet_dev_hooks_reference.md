[Docs](https://docs.fuel.network/) /

Nightly  /

[Wallet](https://docs.fuel.network/docs/nightly/wallet/) /

[Dev](https://docs.fuel.network/docs/nightly/wallet/dev/) /

Hooks Reference

## _Icon Link_ [React Hooks Reference](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#react-hooks-reference)

## _Icon Link_ [`useAccount`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#useaccount)

Retrieves the current fuel account and returns the account address `<string | null>`.

```fuel_Box fuel_Box-idXKMmm-css
const { account } = useAccount();
console.log(account);
// fuel1r20zhd...
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useAccount.ts)

## _Icon Link_ [`useAccounts`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#useaccounts)

Retrieves the fuel accounts and returns the addresses of the accounts `<string[]>`

```fuel_Box fuel_Box-idXKMmm-css
const { accounts } = useAccounts();
console.log(accounts);
// [fuel1r20zhd..., fuel1qqluc9..., ...]
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useAccounts.ts)

## _Icon Link_ [`useBalance`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#usebalance)

Fetches the balance `<BN | null>` of a specified address and asset ID. Additionally, it includes a listener that triggers a balance refresh when the window gains focus.

```fuel_Box fuel_Box-idXKMmm-css
const { balance } = useBalance({
  address: 'fuel1r20zhd...',
  assetId: '0x000000000...',
});

console.log(balance);
// 1000 (example balance)
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useBalance.ts)

## _Icon Link_ [`useChain`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#usechain)

Fetches information about the current Fuel network `<ChainInfo | null>`.

```fuel_Box fuel_Box-idXKMmm-css
const { chain } = useChain();
console.log(chain.name);
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useChain.ts)

## _Icon Link_ [`useConnect`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#useconnect)

Facilitates the connection to the Fuel wallet. Allows selecting a connector by name. It also provides a function `UseMutateAsyncFunction<boolean | undefined>` to initiate the connection and relevant mutation properties for managing the connection state.

```fuel_Box fuel_Box-idXKMmm-css
const { connect, connectAsync } = useConnect();

const handleConnect = async () => {
  connect('Fuel Wallet');

  // Async way
  await connectAsync('exampleConnectorName');
};

handleConnect();
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useConnect.ts)

## _Icon Link_ [`useConnectors`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#useconnectors)

Retrieves a list of available connectors `Array<FuelConnector>` for connecting to Fuel.

```fuel_Box fuel_Box-idXKMmm-css
const { connectors } = useConnectors();

console.log(connectors);
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useConnectors.ts)

## _Icon Link_ [`useContractRead`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#usecontractread)

Reads and calls a method from a Fuel contract, returns `<InvokeFunctions>`.

## _Icon Link_ [Reading with a Contract instance](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#reading-with-a-contract-instance)

```fuel_Box fuel_Box-idXKMmm-css
const { contractRead } = useContractRead({
  contract: _contract,
  functionName: 'get_count',
  args: undefined,
});
```

_Icon ClipboardText_

## _Icon Link_ [Reading with ABI + ContractId + Provider](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#reading-with-abi--contractid--provider)

```fuel_Box fuel_Box-idXKMmm-css
const { contractRead } = useContractRead({
  contract: { address, abi: countAbi, provider },
  functionName: 'get_count',
  args: undefined,
});
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> For more information on our Provider, refer to our TS SDK [docs _Icon Link_](https://docs.fuel.network/docs/fuels-ts/)

> _Icon InfoCircle_
>
> Click [here _Icon Link_](https://github.com/FuelLabs/fuels-wallet/blob/b5766321dbc2a5e5f17f05e0cb9a9f697f137a23/packages/e2e-contract-tests/src/contracts/contracts/factories/CustomAssetAbi__factory.ts#L16) to see an example of an ABI for a Fuel contract

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useAccount.ts)

## _Icon Link_ [`useDisconnect`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#usedisconnect)

Facilitates disconnection from the Fuel Wallet. It provides a function `UseMutateAsyncFunction<boolean | undefined>` to initiate disconnection.

```fuel_Box fuel_Box-idXKMmm-css
const { disconnect } = useDisconnect();

const handleDisconnect = async () => {
  disconnect();

  // Async way
  await disconnectAsync();
};

handleDisconnect();
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useDisconnect.ts)

## _Icon Link_ [`useIsConnected`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#useisconnected)

Checks whether the user is connected to the Fuel protocol. It provides a `boolean` indicating the connection.

```fuel_Box fuel_Box-idXKMmm-css
const { isConnected } = useIsConnected();
console.log(isConnected);
// true
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useIsConnected.ts)

## _Icon Link_ [`useNodeInfo`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#usenodeinfo)

Asynchronously retrieves information about the connected node, checks compatibility with a specified version. The function returns `isCompatible` (a `<boolean>`), and node information.

```fuel_Box fuel_Box-idXKMmm-css
const { isCompatible } = useNodeInfo();
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useNodeInfo.ts)

## _Icon Link_ [`useProvider`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#useprovider)

Returns the provider from the Fuel object instance.

```fuel_Box fuel_Box-idXKMmm-css
const { provider } = useProvider();
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useProvider.ts)

## _Icon Link_ [`useSendTransaction`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#usesendtransaction)

Hook for signing and sending transactions to the Fuel network.

```fuel_Box fuel_Box-idXKMmm-css
const { sendTransaction, sendTransactionAsync } = useSendTransaction();

const handleSendTransaction = async () => {
  // The amount of coins to transfer.
  const amount = bn(1);

  // Create a transaction request using wallet helper (check useWallet hook if needed)
  const transactionRequest = await wallet.createTransfer(
    destination,
    amount
  );

  sendTransaction({
    address: '0xd7ad97...', // The address to sign the transaction
    transactionRequest,
  })

  // Async way
  await sendTransactionAsync({
    address: '0xd7ad97...', // The address to sign the transaction
    transactionRequest,
  });
};

handleSendTransaction();
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useSendTransaction.ts)

## _Icon Link_ [`useTransaction`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#usetransaction)

Retrieves transaction information associated with a specific transaction ID.

```fuel_Box fuel_Box-idXKMmm-css
const { transaction } = useTransaction({ txId: '0xd7ad97...' });
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useTransaction.ts)

## _Icon Link_ [`useTransactionReceipts` \ \ Deprecated _Menu Icon_](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#-usetransactionreceipts--)

Retrieves transaction receipts `Array<TransactionResultReceipt>` associated with a specific transaction ID using the `useFuel` hook.

```fuel_Box fuel_Box-idXKMmm-css
const { transactionReceipts } = useTransactionReceipts({
  txId: '0xd7ad97...',
});
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useTransactionReceipts.ts)

## _Icon Link_ [`useTransactionResult`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#usetransactionresult)

Retrieves a transaction result associated with a specific transaction ID.

## _Icon Link_ [Basic Usage](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#basic-usage)

```fuel_Box fuel_Box-idXKMmm-css
const { transactionResult } = useTransactionResult({ txId: '0xd7ad97...' });
```

_Icon ClipboardText_

## _Icon Link_ [Custom Name](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#custom-name)

Customize the `data` attribute of the most recently resolved data.

```fuel_Box fuel_Box-idXKMmm-css
const { anything } = useTransactionResult({
  txId: '0xd7ad97...',
  query: {
    name: 'anything',
  },
});
```

_Icon ClipboardText_

## _Icon Link_ [Custom Selector](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#custom-selector)

Transform or select a specific part of the data returned by the query function.

This modification affects the returned data value but does not impact the data stored in the query cache.

```fuel_Box fuel_Box-idXKMmm-css
const { receipts } = useTransactionResult({
  txId: '0xd7ad97...',
  query: {
    // you can omit custom "name" if you don't need it
    name: 'receipts',
    // ((data: TransactionResult<TransactionType> | null) => T) | undefined
    select: (data) => data?.receipts,
  },
});
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useTransactionResult.ts)

## _Icon Link_ [`useWallet`](https://docs.fuel.network/docs/nightly/wallet/dev/hooks-reference/\#usewallet)

Retrieves wallet instance `<Account | null>` and ensures the presence of a valid address and fuel instance.

```fuel_Box fuel_Box-idXKMmm-css
const { wallet } = useWallet({ address: 'fuel1r20zhd...' });
```

_Icon ClipboardText_

[See the source file _Icon Link_](https://github.com/FuelLabs/fuel-connectors/tree/main/packages/react/src/hooks/useWallet.ts)