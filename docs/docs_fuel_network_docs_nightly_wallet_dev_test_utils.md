[Docs](https://docs.fuel.network/) /

Nightly  /

[Wallet](https://docs.fuel.network/docs/nightly/wallet/) /

[Dev](https://docs.fuel.network/docs/nightly/wallet/dev/) /

Playwright Utils

## _Icon Link_ [Playwright Utils](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#playwright-utils)

The `@fuels/playwright-utils` package allows developers building frontend applications on fuel to test their application as it interacts with the fuel wallet. This package is compatible with the [playwright _Icon Link_](https://playwright.dev/) test framework.

## _Icon Link_ [Fixtures](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#fixtures)

If you are not using any custom test fixtures in your playwright tests, import the fixtures directly from this package, and pass in the path to the fuel extension. You can download the extension manually or use our `downloadFuel` function.

```fuel_Box fuel_Box-idXKMmm-css
// e2e.test.ts
import { test } from '@fuel-wallet/playwright-utils';

test.use({ pathToExtension: './path/to/extension' });
// OR
const fuelPathToExtension = await downloadFuel(FUEL_WALLET_VERSION);
test.use({ pathToExtension: fuelPathToExtension });
```

_Icon ClipboardText_

If you are using custom test fixtures in your playwright tests then setup the `context` and `extensionId` fixtures as shown in the [playwright docs _Icon Link_](https://playwright.dev/docs/chrome-extensions#testing).

## _Icon Link_ [`FuelWalletTestHelper`](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#fuelwallettesthelper)

The `FuelWalletTestHelper` is a class which allows you to interact with the fuel wallet extension.

## _Icon Link_ [`walletSetup`](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#walletsetup)

```fuel_Box fuel_Box-idXKMmm-css
static async walletSetup(
    context: BrowserContext,
    fuelExtensionId: string,
    fuelProviderUrl: string,
    chainName: string,
    mnemonic: string = FUEL_MNEMONIC,
    password: string = FUEL_WALLET_PASSWORD
): Promise<FuelWalletTestHelper>
```

_Icon ClipboardText_

This function sets up your fuel wallet extension and returns an instance of `FuelWalletTestHelper`.

## _Icon Link_ [`walletConnect`](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#walletconnect)

```fuel_Box fuel_Box-idXKMmm-css
async walletConnect(
    accountNames?: string[],
    connectCurrentAccount: boolean = true
): Promise<void>
```

_Icon ClipboardText_

This function connects fuel wallet accounts to your web application through the connect popup window. It will throw an error if the connect popup window does not appear.

## _Icon Link_ [`walletApprove`](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#walletapprove)

```fuel_Box fuel_Box-idXKMmm-css
async walletApprove(): Promise<void>
```

_Icon ClipboardText_

This function approves a transaction through the transaction popup window. It will throw an error if the transaction popup window does not appear.

## _Icon Link_ [`getWalletNotificationPage`](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#getwalletnotificationpage)

```fuel_Box fuel_Box-idXKMmm-css
async getWalletPopupPage(): Promise<Page>
```

_Icon ClipboardText_

This function returns the wallet popup page. It will throw an error is the popup does not exist.

## _Icon Link_ [`addAssetThroughSettings`](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#addassetthroughsettings)

```fuel_Box fuel_Box-idXKMmm-css
async addAssetThroughSettings(
    assetId: string,
    name: string,
    symbol: string,
    decimals: number,
    imageUrl?: string
): Promise<void>
```

_Icon ClipboardText_

This function adds an asset to the wallet through the settings.

## _Icon Link_ [`addAssetFromHomeBalance`](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#addassetfromhomebalance)

```fuel_Box fuel_Box-idXKMmm-css
async addAssetFromHomeBalance(
    assetId: string,
    name: string,
    symbol: string,
    decimals: number,
    imageUrl?: string
): Promise<void>
```

_Icon ClipboardText_

This functions adds an asset to the wallet from the home page. It will throw an error if the wallet does not have any of the asset.

## _Icon Link_ [`addAccount`](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#addaccount)

```fuel_Box fuel_Box-idXKMmm-css
async addAccount(): Promise<void>
```

_Icon ClipboardText_

This function adds an account to the wallet.

## _Icon Link_ [`switchAccount`](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#switchaccount)

```fuel_Box fuel_Box-idXKMmm-css
async switchAccount(accountName: string): Promise<void>
```

_Icon ClipboardText_

This function switches to the account named `accountName`. It will throw an error if there are not accounts with `accountName`.

## _Icon Link_ [`addNetwork`](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#addnetwork)

```fuel_Box fuel_Box-idXKMmm-css
async addNetwork(chainName: string, providerUrl: string): Promise<void>
```

_Icon ClipboardText_

This function adds a network to the wallet. It will not add the network if a network already exists with the same name.

## _Icon Link_ [`switchNetwork`](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#switchnetwork)

```fuel_Box fuel_Box-idXKMmm-css
async switchNetwork(chainName: string): Promise<void>
```

_Icon ClipboardText_

This function switches to the network named `chainName`. It will throw an error if there are no networks named `chainName`.

## _Icon Link_ [Mocks](https://docs.fuel.network/docs/nightly/wallet/dev/test-utils/\#mocks)

Mnemonic and password mock variables for the fuel wallet. These are the default mnemonic and password variables for the `walletSetup` function.