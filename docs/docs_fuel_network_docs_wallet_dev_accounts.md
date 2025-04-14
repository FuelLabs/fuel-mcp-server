[Docs](https://docs.fuel.network/) /

[Wallet](https://docs.fuel.network/docs/wallet/) /

[Dev](https://docs.fuel.network/docs/wallet/dev/) /

Accounts

## _Icon Link_ [Accounts](https://docs.fuel.network/docs/wallet/dev/accounts/\#accounts)

## _Icon Link_ [List user accounts](https://docs.fuel.network/docs/wallet/dev/accounts/\#list-user-accounts)

Once the connection is authorized, you can list all the user accounts using `accounts()`.

```fuel_Box fuel_Box-idXKMmm-css
const accounts = await fuel.accounts();
console.log("Accounts", accounts);
```

_Icon ClipboardText_

###### Check if it's working_Icon AlertTriangle_ Not working

Get accounts

###### Wallet not detected

[Please install Fuel Wallet to use this demo.](https://docs.fuel.network/docs/install)

## _Icon Link_ [Watch Account Changes](https://docs.fuel.network/docs/wallet/dev/accounts/\#watch-account-changes)

To watch account events, you can use the `accounts` event.

```fuel_Box fuel_Box-idXKMmm-css
function logAccounts(accounts: string) {
  console.log("Accounts ", accounts);
}
fuel.on(fuel.events.accounts, logAccounts);
```

_Icon ClipboardText_

###### Check if it's working_Icon AlertTriangle_ Not working

No accounts connected

Connect

###### Wallet not detected

[Please install Fuel Wallet to use this demo.](https://docs.fuel.network/docs/install)

## _Icon Link_ [Get Current Account](https://docs.fuel.network/docs/wallet/dev/accounts/\#get-current-account)

You can also get the current account being used in the wallet using `currentAccount()`.
If the return is `null` this means that the current account selected by the user is not connected.

```fuel_Box fuel_Box-idXKMmm-css
const currentAccount = await fuel.currentAccount();
console.log("Current Account", currentAccount);
```

_Icon ClipboardText_

###### Check if it's working_Icon AlertTriangle_ Not working

Get current account

###### Wallet not detected

[Please install Fuel Wallet to use this demo.](https://docs.fuel.network/docs/install)

## _Icon Link_ [Watch Current Account Changes](https://docs.fuel.network/docs/wallet/dev/accounts/\#watch-current-account-changes)

To monitor events related to the current account, utilize the `currentAccount` event. Receiving a `null` value from this event indicates that the user's currently selected account is not connected.
If the event receive a `null` value this means that the current account selected by the user is not connected.

```fuel_Box fuel_Box-idXKMmm-css
function logCurrentAccount(account: string) {
  console.log("Current Account ", account);
}
fuel.on(fuel.events.currentAccount, logCurrentAccount);
```

_Icon ClipboardText_

###### Check if it's working_Icon AlertTriangle_ Not working

Connect

###### Wallet not detected

[Please install Fuel Wallet to use this demo.](https://docs.fuel.network/docs/install)

## _Icon Link_ [With React](https://docs.fuel.network/docs/wallet/dev/accounts/\#with-react)

You can keep track of the current account when using React using the `useAccount` hook as shown below:

## _Icon Link_ [All Connected Accounts](https://docs.fuel.network/docs/wallet/dev/accounts/\#all-connected-accounts)

```fuel_Box fuel_Box-idXKMmm-css
const { accounts } = useAccounts();
```

_Icon ClipboardText_

###### Check if it's working_Icon AlertTriangle_ Not working

No accounts connected

Connect

###### Wallet not detected

[Please install Fuel Wallet to use this demo.](https://docs.fuel.network/docs/install)

## _Icon Link_ [Current Account](https://docs.fuel.network/docs/wallet/dev/accounts/\#current-account)

```fuel_Box fuel_Box-idXKMmm-css
const { account } = useAccount();
```

_Icon ClipboardText_

###### Check if it's working_Icon AlertTriangle_ Not working

Connect

###### Wallet not detected

[Please install Fuel Wallet to use this demo.](https://docs.fuel.network/docs/install)