[Docs](https://docs.fuel.network/) /

Nightly  /

[Migrations and Disclosures](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/) /

[Migrations](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/) /

Typescript SDK

## _Icon Link_ [TypeScript SDK Migrations Guide](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#typescript-sdk-migrations-guide)

## _Icon Link_ [March 17, 2025](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#march-17-2025)

[Release v0.100.0 _Icon Link_](https://github.com/FuelLabs/fuels-ts/releases/tag/v0.100.0)

## _Icon Link_ [Made `ResourceCache` consider resource owner -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#made-resourcecache-consider-resource-owner---3697) [\#3697 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3697)

```fuel_Box fuel_Box-idXKMmm-css
//before
provider.cache?.getActiveData();
provider.cache?.isCached(key);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
//after
const owner = wallet.address.toB256();

provider.cache?.getActiveData(owner)
provider.cache?.isCached(owner, key);
```

_Icon ClipboardText_

## _Icon Link_ [Upgrade `fuel-core` to `0.41.7` \-](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#upgrade-fuel-core-to-0417---3590) [\#3590 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3590)

Because of the latest `fuel-core` changes, TS SDK does not throw the following error codes and messages anymore:

## _Icon Link_ [1\. **NOT\_ENOUGH\_FUNDS**](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#1-not_enough_funds)

```fuel_Box fuel_Box-idXKMmm-css
// before
"The account(s) sending the transaction don't have enough funds to cover the transaction."
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
"Insufficient funds or too many small value coins. Consider combining UTXOs."
```

_Icon ClipboardText_

## _Icon Link_ [2\. **MAX\_COINS\_REACHED**](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#2-max_coins_reached)

```fuel_Box fuel_Box-idXKMmm-css
// before
"The account retrieving coins has exceeded the maximum number of coins per asset. Please consider combining your coins into a single UTXO."
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
"Insufficient funds or too many small value coins. Consider combining UTXOs."
```

_Icon ClipboardText_

Both error codes were removed in favor of `INSUFFICIENT_FUNDS_OR_MAX_COINS`

## _Icon Link_ [February 4, 2025](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#february-4-2025)

[Release v0.99.0 _Icon Link_](https://github.com/FuelLabs/fuels-ts/releases/tag/v0.99.0)

## _Icon Link_ [Remove `pageInfo` from `getBalances` GraphQL operations -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-pageinfo-from-getbalances-graphql-operations---3652) [\#3652 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3652)

- The `pageInfo` field has been removed from the response of the `provider.operations.getBalances` query.

```fuel_Box fuel_Box-idXKMmm-css
// before
const { balances, pageInfo } = await provider.operations.getBalances({
  first: 100,
  filter: { owner: wallet.address.toB256() },
});
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const { balances } = await provider.operations.getBalances({
  first: 100,
  filter: { owner: wallet.address.toB256() },
});
```

_Icon ClipboardText_

The `getBalances` method of the Provider class remains unchanged, as it never returned pageInfo:

```fuel_Box fuel_Box-idXKMmm-css
// not affected
const { balances } = await provider.getBalances();
```

_Icon ClipboardText_

## _Icon Link_ [Remove `ContractUtils` namespaced export -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-contractutils-namespaced-export---3570) [\#3570 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3570)

- `ContractUtils` was removed and the underlying functions `getContractRoot()`, `getContractStorageRoot()`, `getContractId()`, `hexlifyWithPrefix()` are now exported directly from `fuels`.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { ContractUtils } from 'fuels';
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { getContractRoot, getContractStorageRoot, getContractId, hexlifyWithPrefix } from 'fuels';
```

_Icon ClipboardText_

## _Icon Link_ [January 10, 2025](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#january-10-2025)

[Release v0.98.0 _Icon Link_](https://github.com/FuelLabs/fuels-ts/releases/tag/v0.98.0)

## _Icon Link_ [Making `provider` initialization `sync` again -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#making-provider-initialization-sync-again---3514) [\#3514 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3514)

## _Icon Link_ [1\. `Provider` Instantiation](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#1-provider-instantiation)

- Going from `async` to `sync`

```fuel_Box fuel_Box-idXKMmm-css
// before
const provider = await Provider.create(NETWORK_URL);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const provider = new Provider(NETWORK_URL);
```

_Icon ClipboardText_

## _Icon Link_ [2\. `Provider` methods](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#2-provider-methods)

- The following methods are now `async`

```fuel_Box fuel_Box-idXKMmm-css
// before
provider.getNode();
provider.getChain();
provider.getChainId();
provider.getBaseAssetId();
provider.getGasConfig();
provider.validateTransaction();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
await provider.getNode();
await provider.getChain();
await provider.getChainId();
await provider.getBaseAssetId();
await provider.getGasConfig();
await provider.validateTransaction();
```

_Icon ClipboardText_

## _Icon Link_ [3\. `TransferParams` and `ContractTransferParams`](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#3-transferparams-and-contracttransferparams)

- Property `assetId` is now required by [`TransferParams` _Icon Link_](https://github.com/FuelLabs/fuels-ts/blob/5d96eb6748e4210029bcbca0490172de81487e05/packages/account/src/account.ts#L56-L60) and [`ContractTransferParams` _Icon Link_](https://github.com/FuelLabs/fuels-ts/blob/5d96eb6748e4210029bcbca0490172de81487e05/packages/account/src/account.ts#L62-L66)

```fuel_Box fuel_Box-idXKMmm-css
export type TransferParams = {
  destination: string | AbstractAddress;
  amount: BigNumberish;
-  assetId?: BytesLike;
+  assetId: BytesLike;
};

export type ContractTransferParams = {
  contractId: string | AbstractAddress;
  amount: BigNumberish;
-  assetId?: BytesLike;
+  assetId: BytesLike;
};
```

_Icon ClipboardText_

## _Icon Link_ [4\. Transaction Response](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#4-transaction-response)

- The constructor now requires a `chainId`

```fuel_Box fuel_Box-idXKMmm-css
// before
new TransactionResponse('0x..', provider);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
new TransactionResponse('0x..', provider, chainId);
```

_Icon ClipboardText_

## _Icon Link_ [`autoCost` for transaction estimation and funding -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#autocost-for-transaction-estimation-and-funding---3539) [\#3539 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3539)

To be brought inline with `autoCost`, funding a contract and script call has been migrated from `fundWithRequiredCoins` to `autoCost`:

```fuel_Box fuel_Box-idXKMmm-css
// before
const request: ScriptTransactionRequest = contract.functions.add(1).fundWithRequiredCoins();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const request: ScriptTransactionRequest = contract.functions.add(1).autoCost();
```

_Icon ClipboardText_

## _Icon Link_ [Remove redundant gas price call for tx summary -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-redundant-gas-price-call-for-tx-summary---3559) [\#3559 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3559)

- `calculateTXFeeForSummary` and subsequently the `CalculateTXFeeForSummaryParams` no longer accept a `totalFee` property. If you have the `totalFee`, then there is no need to call the `calculateTxFeeForSummary()` function.

```fuel_Box fuel_Box-idXKMmm-css
// before
const totalFee = bn(..):
calculateTXFeeForSummary({ ..., totalFee } as CalculateTXFeeForSummaryParams);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
calculateTXFeeForSummary({ ... } as CalculateTXFeeForSummaryParams);
```

_Icon ClipboardText_

## _Icon Link_ [Prevent implicit asset burn -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#prevent-implicit-asset-burn---3540) [\#3540 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3540)

```fuel_Box fuel_Box-idXKMmm-css
// before
const transactionRequest = new ScriptTransactionRequest();
transactionRequest.inputs.push({ ... });

// since outputs weren't added, assets would be burned
await sender.sendTransaction(transactionRequest);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const transactionRequest = new ScriptTransactionRequest();
transactionRequest.inputs.push({ ... });

// now, an error will be thrown unless `enableAssetBurn`is true,
// in which case, assets can still be burned
await sender.sendTransaction(transactionRequest, {
  enableAssetBurn: true,
});
```

_Icon ClipboardText_

## _Icon Link_ [Remove unused operations -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-unused-operations---3553) [\#3553 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3553)

The following operations have been removed from the `OperationName` enum, as they were never used to assemble operations:

- `OperationName.mint`
- `OperationName.predicatecall`
- `OperationName.script`
- `OperationName.sent`

## _Icon Link_ [Remove receipts deprecated properties -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-receipts-deprecated-properties---3552) [\#3552 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3552)

All receipts deprecated properties were removed:

```fuel_Box fuel_Box-idXKMmm-css
// before
ReceiptCall.from

ReceiptLog.val0
ReceiptLog.val1
ReceiptLog.val2
ReceiptLog.val3

ReceiptLogData.val0
ReceiptLogData.val1

ReceiptTransfer.from

ReceiptTransferOut.from
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
ReceiptCall.id

ReceiptLog.ra
ReceiptLog.rb
ReceiptLog.rc
ReceiptLog.rd

ReceiptLogData.ra
ReceiptLogData.rb

ReceiptTransfer.id

ReceiptTransferOut.id
```

_Icon ClipboardText_

## _Icon Link_ [Remove receipt coders -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-receipt-coders---3551) [\#3551 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3551)

All previously deprecated receipt coders have been removed. These classes were barely used aside from a few internal helpers, which were converted to utility functions.

```fuel_Box fuel_Box-idXKMmm-css
// before
const messageId = ReceiptMessageOutCoder.getMessageId({
  sender,
  recipient,
  nonce,
  amount,
  data,
});

const assetId = ReceiptMintCoder.getAssetId(contractId, subId);

const assetId = ReceiptBurnCoder.getAssetId(contractId, subId);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { getMessageId, getAssetId } from 'fuels'

const messageId = getMessageId({
  sender,
  recipient,
  nonce,
  amount,
  data,
});

const assetId = getAssetId(contractId, subId);
```

_Icon ClipboardText_

## _Icon Link_ [Remove deprecated `submitAndAwait` operation -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-deprecated-submitandawait-operation---3548) [\#3548 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3548)

- `submitAndAwait` operation was removed

After being deprecated since #3101, we have removed this operation altogether. Please use the `submitAndAwaitStatus` method instead which gives the same results as `submitAndAwait`. If you are interested in the deprecation/removal reasons, please refer to [https://github.com/FuelLabs/fuel-core/issues/2108 _Icon Link_](https://github.com/FuelLabs/fuel-core/issues/2108).

```fuel_Box fuel_Box-idXKMmm-css
// before
const response = await provider.operations.submitAndAwait(txRequest);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const response = await provider.operations.submitAndAwaitStatus(txRequest);
```

_Icon ClipboardText_

## _Icon Link_ [Remove Bech32 address -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-bech32-address---3493) [\#3493 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3493)

- We no longer support Bech32 addresses

```fuel_Box fuel_Box-idXKMmm-css
// before
import { Address, Bech32Address } from "fuels";

const bech32Address: Bech32Address = "fuel1234";
const address = new Address(bech32Address);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { Address, B256Address } from "fuels";

const b256Address: B256Address = "0x1234";
const address = new Address(b256Address);
```

_Icon ClipboardText_

- Removed `INVALID_BECH32_ADDRESS` error code.

- Removed associated Bech32 helper functions.
  - `normalizeBech32`
  - `isBech32`
  - `toB256`
  - `getBytesFromBech32`
  - `toBech32`
  - `clearFirst12BytesFromB256`

## _Icon Link_ [Redistributed the `@fuel-ts/interfaces` package -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#redistributed-the-fuel-tsinterfaces-package---3492) [\#3492 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3492)

- Removed the `AbstractAddress` class; use the `Address` class instead.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { AbstractAddress } from 'fuels';
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { Address } from 'fuels';
```

_Icon ClipboardText_

- Removed the `@fuel-ts/interfaces` package; use the `fuels` package instead.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { BytesLike } from '@fuel-ts/interfaces'
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { BytesLike } from 'fuels'
```

_Icon ClipboardText_

## _Icon Link_ [Optimizing frontend apps -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#optimizing-frontend-apps---3573) [\#3573 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3573)

- `ScriptTransactionRequest.autoCost()` has been renamed to `ScriptTransactionRequest.estimateAndFund()`, initially introduced by #3535

```fuel_Box fuel_Box-idXKMmm-css
// before
await request.autoCost(wallet);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
await request.estimateAndFund(wallet);
```

_Icon ClipboardText_

- `BaseInvocationScope.autoCost()` has been renamed back to `BaseInvocationScope.fundWithRequiredCoins()`, initially introduced by #3535

```fuel_Box fuel_Box-idXKMmm-css
// before
const request = await contract.functions.increment().autoCost();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const request = await contract.functions.increment().fundWithRequiredCoins();
```

_Icon ClipboardText_

## _Icon Link_ [November 15, 2024](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#november-15-2024)

[Release v0.97.0 _Icon Link_](https://github.com/FuelLabs/fuels-ts/releases/tag/v0.97.0)

## _Icon Link_ [`onDeploy` fuels config supports all Sway program types -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#ondeploy-fuels-config-supports-all-sway-program-types---3383) [\#3383 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3383)

- Changed the outputted data from the `onDeploy` callback method for the `fuels.config.ts`. Instead of just emitting the deployed contracts (as an array), it will now emit an object with `contracts`, `predicates` and `scripts`.

```fuel_Box fuel_Box-idXKMmm-css
// Before (fuels.config.ts)
import { createConfig, FuelsConfig, DeployedContract } from 'fuels';

export default createConfig({
  output: 'dir/out',
  onDeploy: (config: FuelsConfig, deployedContracts: DeployedContract[]) => {
    console.log('contracts', deployedContracts);
  }
});
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// After (fuels.config.ts)
import { createConfig, FuelsConfig, DeployedData } from 'fuels';

export default createConfig({
  output: 'dir/out',
  onDeploy: (config: FuelsConfig, deployed: DeployedData[]) => {
    console.log('contracts', deployed.contracts);
    console.log('predicates', deployed.predicates);
    console.log('scripts', deployed.scripts);
  }
});
```

_Icon ClipboardText_

## _Icon Link_ [Remove unnecessary nonce from message gql queries -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-unnecessary-nonce-from-message-gql-queries---3298) [\#3298 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3298)

- Removed the `nonce` property from `Provider.operations.getMessageByNonce()`. This can still be retrieved by `Provider.getMessageByNonce()`.

## _Icon Link_ [Refactor predicate and script deployment -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#refactor-predicate-and-script-deployment---3389) [\#3389 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3389)

`ContractFactory.deployAsBlobTxForScript` has been removed in favor of `Predicate.deploy` and `Script.deploy`:

```fuel_Box fuel_Box-idXKMmm-css
// before
const factory = new ContractFactory(scriptBytecode, scriptAbi, wallet);
const { waitForResult } = await factory.deployAsBlobTxForScript();
const { loaderBytecode, configurableOffsetDiff } = await waitForResult();

// after
const script = new Script(scriptBytecode, scriptAbi, wallet);
const { blobId, waitForResult } = await script.deploy(deployerWallet);
const loaderScript = await waitForResult();

const predicate = new Predicate({ bytecode, abi, provider });
const { blobId, waitForResult } = await predicate.deploy(deployerWallet);
const loaderPredicate = await waitForResult();
```

_Icon ClipboardText_

## _Icon Link_ [Mandate `abi` in `Predicate` constructor -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#mandate-abi-in-predicate-constructor---3387) [\#3387 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3387)

- Instantiating a `Predicate` now requires providing its `abi`. If you want to use the `Predicate` as an `Account`, please instantiate it via the `Account` class

```fuel_Box fuel_Box-idXKMmm-css
// before
const predicate = new Predicate({ provider, bytecode }); // worked even though abi is missing

// after
const predicate = new Predicate({ abi, provider, bytecode }); // abi is now mandatory

// predicate as account
const account = new Account(predicateAddress, provider);
```

_Icon ClipboardText_

## _Icon Link_ [Optimize `getTransactions` query -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#optimize-gettransactions-query---3336) [\#3336 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3336)

- The response format for `Provider.getTransactions` remains the same. However, the response format for the query `Provider.operations.getTransactions` has been modified.

```fuel_Box fuel_Box-idXKMmm-css
// before
query getTransactions {
  id
  rawPayload
  status {
    ...
  }
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
query getTransactions {
  rawPayload
}
```

_Icon ClipboardText_

## _Icon Link_ [Limit TX pagination number for `getTransactionsSummaries` \-](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#limit-tx-pagination-number-for-gettransactionssummaries---3400) [\#3400 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3400)

- The pagination number for `getTransactionsSummaries` is limited to `60` now

```fuel_Box fuel_Box-idXKMmm-css
// before
const { transactions } = await getTransactionsSummaries({
  provider,
  filters: {
    owner: account.address.toB256(),
    first: 200,
  },
});
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const { transactions } = await getTransactionsSummaries({
  provider,
  filters: {
    owner: account.address.toB256(),
    first: 60, // Limit is 60 now. A higher value will result in an error
  },
});
```

_Icon ClipboardText_

## _Icon Link_ [Remove `blockId` in transaction list responses -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-blockid-in-transaction-list-responses---3379) [\#3379 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3379)

- The `blockId` property has been removed from the following GraphQL queries used to list past transactions:

```fuel_Box fuel_Box-idXKMmm-css
const { transactions } = await getTransactionsSummaries({ ... });

const { transactionsByOwner } = await provider.operations.getTransactionsByOwner({ ... });
```

_Icon ClipboardText_

If the `blockId` is required for a given transaction, it needs to be queried separately with `getTransactionSummary` helper:

```fuel_Box fuel_Box-idXKMmm-css
import { getTransactionSummary } from 'fuels';

const transaction = await getTransactionSummary({
  id,
  provider,
});
```

_Icon ClipboardText_

_Note: The `blockId` is still available in the result for a submitted transaction._

## _Icon Link_ [Optimize coin gql queries -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#optimize-coin-gql-queries---3301) [\#3301 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3301)

- The `Provider.operations.getCoins()` and `Provider.operations.getCoinsToSpend` function no longer return the owner. These methods shouldn't be called directly but are used internally to formulate responses from the SDK.

- Removed the property `owner` from the `Provider.operations.getCoinsToSpend()` function. Suggest to use the owner from the input parameters.


## _Icon Link_ [October 13, 2024](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#october-13-2024)

[Release v0.96.0 _Icon Link_](https://github.com/FuelLabs/fuels-ts/releases/tag/v0.96.0)

## _Icon Link_ [Checksum method to remove `0x` before hashing -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#checksum-method-to-remove-0x-before-hashing---3313) [\#3313 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3313)

We fixed the checksum utilities:

- `Address.toChecksum()`
- `Address.isChecksumValid()`

Now, we correctly remove the leading `0x` before hashing the address.

Because of this, previous values were invalid, and the update is required.

## _Icon Link_ [October 10, 2024](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#october-10-2024)

[Release v0.95.0 _Icon Link_](https://github.com/FuelLabs/fuels-ts/releases/tag/v0.95.0)

## _Icon Link_ [Bump transaction pagination limit to 60 -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#bump-transaction-pagination-limit-to-60---3306) [\#3306 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3306)

- A limit was added of 60 transactions to the `provider.getTransactions()` method.

## _Icon Link_ [Made Address `toString` and `valueOf` returns checksum -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#made-address-tostring-and-valueof-returns-checksum---3310) [\#3310 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3310)

The return of both `Address.toString()` and `Address.valueOf` was modified to return the address checksum instead of the Bech32 string

```fuel_Box fuel_Box-idXKMmm-css
// before
const address = new Address('fuel1elnmzsav56dqnp95sx4e2pckq36cvae9ser44m5zlvgtwxw49fmqd7e42e');

address.toString()
// fuel1elnmzsav56dqnp95sx4e2pckq36cvae9ser44m5zlvgtwxw49fmqd7e42e

address.valueOf()
// fuel1elnmzsav56dqnp95sx4e2pckq36cvae9ser44m5zlvgtwxw49fmqd7e42e
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const address = new Address('fuel1elnmzsav56dqnp95sx4e2pckq36cvae9ser44m5zlvgtwxw49fmqd7e42e');

address.toString()
// 0xEf86aFa9696Cf0dc6385e2C407A6e159A1103cEfB7E2Ae0636FB33d3cb2A9E4A

address.valueOf()
// 0xEf86aFa9696Cf0dc6385e2C407A6e159A1103cEfB7E2Ae0636FB33d3cb2A9E4A
```

_Icon ClipboardText_

## _Icon Link_ [Slim down `chainInfoFragment` and `GasCostsFragment` \-](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#slim-down-chaininfofragment-and-gascostsfragment---3286) [\#3286 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3286)

- `latestBlock` is no longer part of the `ChainInfo` return of `provider.getChain()`. You can fetch it via `provider.getBlock('latest')`.
- `ChainInfo['consensusParameters']['gasCosts']` has been slimmed down to only contain data necessary for the operation of the SDK. Up until now, the SDK was fetching more than it needed. If this change affects you, you will have to create a custom graphql query for `gasCosts` for the additional data you need.

## _Icon Link_ [Optimize balance queries -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#optimize-balance-queries---3296) [\#3296 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/3296)

- Removed the `owner` and `assetId` properties from the response of `Provider.operations.getBalance()`. These properties are also required arguments to execute the function so are redundant in the response. Should you require these values, you should take them from the values that you passed to the function.
- Removed the `owner` property from the response of `Provider.operations.getBalances()`. This property is a required argument to execute the function so is redundant in the response. Should you require this value, you should take it from the value that you passed to the function.

## _Icon Link_ [August 30, 2024](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#august-30-2024)

[Release v0.94.0 _Icon Link_](https://github.com/FuelLabs/fuels-ts/releases/tag/v0.94.0)

## _Icon Link_ [Consider message on resources cache -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#consider-message-on-resources-cache---2872) [\#2872 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2872)

The provider option flag `cacheUtxo` was renamed to `resourceCacheTTL`

```fuel_Box fuel_Box-idXKMmm-css
// before
const provider = await Provider.create(FUEL_NETWORK_URL, {
  cacheUtxo: 5000,
});


using launched = await launchTestNode({
  providerOptions: {
    cacheUtxo: 5000,
  },
});
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const provider = await Provider.create(FUEL_NETWORK_URL, {
  resourceCacheTTL: 5000,
});

using launched = await launchTestNode({
  providerOptions: {
    resourceCacheTTL: 5000,
  },
});
```

_Icon ClipboardText_

## _Icon Link_ [Prettify `typegen` api -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#prettify-typegen-api---2824) [\#2824 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2824)

## _Icon Link_ [`Predicate` class](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#predicate-class)

- `Predicate` class constructor parameters renamed: `inputData` \> `data`

```fuel_Box fuel_Box-idXKMmm-css
// before
import { Predicate } from 'fuels';

const predicate = new Predicate({
  ...unchangedParameters,
  inputData,
});
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { Predicate } from 'fuels';

const predicate = new Predicate({
  ...unchangedParameters,
  data,
});
```

_Icon ClipboardText_

- Typegen extended/generated `Predicate` now accepts a single parameter for initialization

```fuel_Box fuel_Box-idXKMmm-css
// before
import { TestPredicateAbi__factory } from './typegend';

TestPredicateAbi__factory.createInstance(provider, data, configurableConstants);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { TestPredicate } from './typegen';

new TestPredicate({
  provider,
  data,
  configurableConstants
});
```

_Icon ClipboardText_

## _Icon Link_ [`launchTestNode` utility](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#launchtestnode-utility)

- Renamed `contractsConfigs[].deployer` to `contractsConfigs[].factory`
- Removed `contractsConfigs[].bytecode` and `.hex.ts` file

The bytecode is now saved within the factory class, so you don't have to deal with it.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { TokenAbi__factory } from './typegend';
import TokenAbiHex from './typegend/contracts/TokenAbi.hex';

using launched = await launchTestNode({
  contractsConfigs: [{\
    deployer: TokenAbi__factory,\
    bytecode: TokenAbiHex\
  }],
});
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { TokenFactory } from './typegend';

using launched = await launchTestNode({
  contractsConfigs: [{\
    factory: TokenFactory,\
  }],
})
```

_Icon ClipboardText_

## _Icon Link_ [Renamed method `deployContract` to `deploy`](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#renamed-method-deploycontract-to-deploy)

Removed the redundant suffix on the `ContractFactory` class method name.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { ContractFactory } from 'fuels';

const factory = new ContractFactory(wallet);

factory.deployContract();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { ContractFactory } from 'fuels';

const factory = new ContractFactory(wallet);

factory.deploy();
```

_Icon ClipboardText_

## _Icon Link_ [Typegen `Contract` template](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#typegen-contract-template)

- Removed `Abi__factory` suffix from class names
- The file `<name>.hex` was removed (access it via `<Name>.bytecode`)
- The files `<name>__factory.ts` and `<name>.d.dts` were merged into `<name>.ts`
- The class `<Name>` and the interface `<Name>Abi` are now just `<Name>`
- Method `<Name>Factory.deployContract()` renamed to `<Name>Factory.deploy()`
- You may need to remove the previously generated `<typegenDir>/contracts/factories` directory

```fuel_Box fuel_Box-idXKMmm-css
// before
import { TestContractAbi, TestContract__factory } from './typegen'
import testContractBytecode from './typegen/contracts/TestContract.hex'

const instance = await TestContract__factory.connect(id, wallet);

const deploy = await TestContract__factory.deployContract(testContractBytecode, wallet);
const { contract } = await deploy.waitForResult();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { TestContract, TestContractFactory } from './typegen'

const instance = new TestContract(id, wallet);

const deploy = await TestContractFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();
```

_Icon ClipboardText_

## _Icon Link_ [Typegen `Predicate` template](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#typegen-predicate-template)

- Removed `Abi__factory` suffix from class names
- Started accepting a single parameter object in constructor
- You may need to remove the previously generated `<typegenDir>/predicates/factories` directory

```fuel_Box fuel_Box-idXKMmm-css
// before
import { TestPredicateAbi__factory } from './typegen'

const predicate = TestPredicateAbi__factory.createInstance(provider);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { TestPredicate } from './typegen'

const predicate = new TestPredicate({ provider });
```

_Icon ClipboardText_

## _Icon Link_ [Typegen `Script` template](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#typegen-script-template)

- Removed `Abi__factory` suffix from class names
- You may need to remove the previously generated `<typegenDir>/scripts/factories` directory

```fuel_Box fuel_Box-idXKMmm-css
// before
import { TestPredicateAbi__factory } from './typegen'

const script = TestScriptAbi__factory.createInstance(wallet);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { TestPredicate } from './typegen'

const script = new TestScript(wallet);
```

_Icon ClipboardText_

## _Icon Link_ [Non-blocking blob deployment -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#non-blocking-blob-deployment---2929) [\#2929 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2929)

The transaction ID from a contract deployment is now returned as a promise.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { ContractFactory } from 'fuels';

const factory = new ContractFactory(bytecode, abi, wallet);
const { waitForResult, contractId, transactionId } = await factory.deploy();
console.log(transactionId); // 0x123....
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { ContractFactory } from 'fuels';

const factory = new ContractFactory(bytecode, abi, wallet);
const { waitForResult, contractId, waitForTransactionId } = await factory.deploy();
const transactionId = await waitForTransactionId();
console.log(transactionId); // 0x123....
```

_Icon ClipboardText_

## _Icon Link_ [Improve `()` and `Option<T>` type handling -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#improve--and-optiont-type-handling---2777) [\#2777 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2777)

- `()` and `Option<T>` Sway types are now either required or optional, dependent on where the argument appears in the function arguments.

Given these Sway functions:

```fuel_Box fuel_Box-idXKMmm-css
fn type_then_void_then_type(x: u8, y: (), z: u8) -> ()
fn type_then_void_then_void(x: u8, y: (), z: ()) -> ()

fn type_then_option_then_type(x: u8, y: Option<u8>, z: u8) -> ()
fn type_then_option_then_option(x: u8, y: Option<u8>, z: Option<u8>) -> ()
```

_Icon ClipboardText_

This is what changes:

```fuel_Box fuel_Box-idXKMmm-css
// before
contract.functions.type_then_void_then_type(42, 43)
contract.functions.type_then_void_then_void(42) // Unchanged

contract.functions.type_then_option_then_type(42, undefined, 43)
contract.functions.type_then_option_then_option(42, undefined, undefined)
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
contract.functions.type_then_void_then_type(42, undefined, 43)
contract.functions.type_then_void_then_void(42) // Unchanged

contract.functions.type_then_option_then_type(42, undefined, 43)
contract.functions.type_then_option_then_option(42)
```

_Icon ClipboardText_

## _Icon Link_ [`fuel-core@0.32.1` and large contract deployments -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#fuel-core0321-and-large-contract-deployments---2827) [\#2827 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2827)

`MAX_CONTRACT_SIZE` is no longer exported, it should now be fetched from the chain.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { MAX_CONTRACT_SIZE } from 'fuels';
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { Provider, FUEL_NETWORK_URL } from 'fuels';

const provider = await Provider.create(FUEL_NETWORK_URL);
const { consensusParameters } = provider.getChain();
const maxContractSize = consensusParameters.contractParameters.contractMaxSize.toNumber();
```

_Icon ClipboardText_

## _Icon Link_ [Deprecate `FUEL_NETWORK_URL` and `LOCAL_NETWORK_URL`\-](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#deprecate-fuel_network_url-and-local_network_url--2915) [\#2915 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2915)

Removed `FUEL_NETWORK_URL` constant.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { FUEL_NETWORK_URL } from 'fuels';

const provider = await Provider.create(FUEL_NETWORK_URL);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const provider = await Provider.create('https://127.0.0.1:4000/v1/graphql');
```

_Icon ClipboardText_

Removed `LOCAL_NETWORK_URL` constant.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { LOCAL_NETWORK_URL } from 'fuels';

const provider = await Provider.create(LOCAL_NETWORK_URL);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const provider = await Provider.create('https://127.0.0.1:4000/v1/graphql');
```

_Icon ClipboardText_

## _Icon Link_ [Integrate `launchTestNode` in remaining packages -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#integrate-launchtestnode-in-remaining-packages---2811) [\#2811 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2811)

Removed `generateTestWallet` and `seedTestWallet` utilities.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { bn } from "@fuel-ts/math";
import {
  seedTestWallet,
  generateTestWallet,
} from "@fuel-ts/account/test-utils";

const provider = await Provider.create("http://127.0.0.1:4000/v1/graphql");

// seeding
const walletA = Wallet.fromPrivateKey("0x...", provider);
const baseAssetId = provider.getBaseAssetId();
seedTestWallet(wallet, [{ assetId: baseAssetId, amount: bn(100_000) }]);

// generating
const walletB = await generateTestWallet(provider, [[1_000, baseAssetId]]);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { launchTestNode } from 'fuels/test-utils';

// create two wallets seeded with 100_000 units of the base asset
using launched = await launchTestNode({
  walletsConfig: {
    count: 2,
    amountPerCoin: 100_000,
  },
});

const {
  wallets: [walletA, walletB]
} = launched;

const balance = await walletA.getBalance() // 100_000
```

_Icon ClipboardText_

Removed `launchNodeAndGetWallets` utility.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { launchNodeAndGetWallets } from 'fuels/test-utils';

const { provider, wallets } = await launchNodeAndGetWallets();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { launchTestNode } from 'fuels/test-utils';

using launched = await launchTestNode();

const { provider, wallets } = launched;
```

_Icon ClipboardText_

## _Icon Link_ [Renamed `AssetId` to `TestAssetId`\-](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#renamed-assetid-to-testassetid--2905) [\#2905 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2905)

Renamed testing class `AssetId` to `TestAssetId`.

```fuel_Box fuel_Box-idXKMmm-css
// before
import { AssetId } from 'fuels/test-utils';

const [assetA] = AssetId.random();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { TestAssetId } from 'fuels/test-utils';

const [assetA] = TestAssetId.random();
```

_Icon ClipboardText_

## _Icon Link_ [Adding abi transpiler -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#adding-abi-transpiler---2856) [\#2856 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2856)

New ABI spec

The SDK now adheres to the new specs introduced via:

- [https://github.com/FuelLabs/fuel-specs/pull/596 _Icon Link_](https://github.com/FuelLabs/fuel-specs/pull/596)
- [https://github.com/FuelLabs/fuel-specs/pull/599 _Icon Link_](https://github.com/FuelLabs/fuel-specs/pull/599)

Check these out to understand all its changes.

The class `AbiCoder` is no longer exported, and the way to do encoding and decoding of specific types is now via the `Interface.encodeType` and `Interface.decodeType` methods:

```fuel_Box fuel_Box-idXKMmm-css
// before
const abi = yourAbi;
const functionArg = abi.functions.inputs[0];

const encoded = AbiCoder.encode(abi, functionArg, valueToEncode);
const decoded = AbiCoder.decode(abi, functionArg, valueToDecode, 0);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { Interface } from 'fuels';

const abi = yourAbi;
const functionArg = abi.functions.inputs[0];

const abiInterface = new Interface(abi);

const encoded = abiInterface.encodeType(functionArg.concreteTypeId, valueToEncode);
const decoded = abiInterface.decodeType(functionArg.concreteTypeId, valueToDecode);
```

_Icon ClipboardText_

Previously, you could get a type from the ABI via the `Interface.findTypeById`. This method has been removed after introducing the new abi specification because the concept of a _type_ has been split into concrete types and metadata types. If you want a specific type, you can get it directly from the ABI.

```fuel_Box fuel_Box-idXKMmm-css
// before
const abiInterface = new Interface(abi);

// internally this method searched the abi types:
// abi.types.find(t => t.typeId === id);
const type = abiInterface.findTypeById(id);
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { Interface } from 'fuels';

// search the types on the abi directly
const concreteType = abi.concreteTypes.find(ct => ct.concreteTypeId === id);
const metadataType = abiInterface.jsonAbi.metadataTypes.find(mt => mt.metadataTypeId === id);
```

_Icon ClipboardText_

The `JsonAbiArgument` type isn't part of the new ABI spec _( [#596 _Icon Link_](https://github.com/FuelLabs/fuel-specs/pull/596), [#599 _Icon Link_](https://github.com/FuelLabs/fuel-specs/pull/599))_ as such so we stopped exporting it. Its closest equivalent now would be a concrete type because it fully defines a type.

```fuel_Box fuel_Box-idXKMmm-css
// before
const arg: JsonAbiArgument = {...};
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
import { Interface } from 'fuels';

type ConcreteType = JsonAbi["concreteTypes"][number]
const arg: ConcreteType = {...};
```

_Icon ClipboardText_

## _Icon Link_ [Read malleable fields from transaction status on subscription -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#read-malleable-fields-from-transaction-status-on-subscription---2962) [\#2962 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2962)

Removed `TransactionResult.gqlTransaction`. You can use the `TransactionResult.transaction` field instead, which has all the data that `TransactionResult.gqlTransaction` has but already decoded.

```fuel_Box fuel_Box-idXKMmm-css
// before
const { gqlTransaction } = await new TransactionResponse('your-tx-id').waitForResult();
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const { transaction } = await new TransactionResponse('your-tx-id').waitForResult();
```

_Icon ClipboardText_

## _Icon Link_ [Fix assembly process for account transfer operation -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#fix-assembly-process-for-account-transfer-operation---2963) [\#2963 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2963)

The `getTransferOperations` helper function now requires an additional `baseAssetId` parameter.

```fuel_Box fuel_Box-idXKMmm-css
// before
const transferOperations = getTransferOperations({ inputs, outputs, receipts })
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const transferOperations = getTransferOperations({ inputs, outputs, receipts, baseAssetId })
```

_Icon ClipboardText_

## _Icon Link_ [Wrap subscriptions in promise -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#wrap-subscriptions-in-promise---2964) [\#2964 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2964)

```fuel_Box fuel_Box-idXKMmm-css
// before
const subscription = provider.operations.statusChange({ transactionId });
for await (const response of subscription) { ... }
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const subscription = await provider.operations.statusChange({ transactionId });
for await (const response of subscription) { ... }
```

_Icon ClipboardText_

## _Icon Link_ [July 30, 2024](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#july-30-2024)

[Release v0.93.0 _Icon Link_](https://github.com/FuelLabs/fuels-ts/releases/tag/v0.93.0)

## _Icon Link_ [Deploy contract validation -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#deploy-contract-validation---2796) [\#2796 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2796)

`ErrorCode.INVALID_TRANSACTION_TYPE` was migrated to `ErrorCode.UNSUPPORTED_TRANSACTION_TYPE`.

```fuel_Box fuel_Box-idXKMmm-css
// before
const code = ErrorCode.INVALID_TRANSACTION_TYPE;
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const code = ErrorCode.UNSUPPORTED_TRANSACTION_TYPE;
```

_Icon ClipboardText_

## _Icon Link_ [Remove `awaitExecution` functionality -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-awaitexecution-functionality---2820) [\#2820 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2820)

It is no longer possible to submit transactions using the `awaitExecution` flag and wait for the transaction to be processed at submission:

```fuel_Box fuel_Box-idXKMmm-css
// before
const response = await account.sendTransaction(transactionRequest, { awaitExecution: true });
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const submit = await account.sendTransaction(transactionRequest);

const response = await submit.waitForResult();
```

_Icon ClipboardText_

## _Icon Link_ [Refactored the `getTransactionCost` method -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#refactored-the-gettransactioncost-method---2643) [\#2643 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2643)

Refactored functionality for `Provider.getTransactionCost` to `Account.getTransactionCost` **and** changed estimation parameter from `quantitiesToContract` to `quantities`.

```fuel_Box fuel_Box-idXKMmm-css
// before
const provider = Provider.create(...);
const account = Wallet.generate({ ... }) || new Predicate(...);
const quantities: Array<CoinQuantityLike> = [\
  { amount: 1000, assetId: provider.getBaseAssetId() }\
];

const cost = provider.getTransactionCost(txRequest, {
  resourceOwner: account,
  quantitiesToContract: quantities,
})
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const provider = Provider.create(...);
const account = Wallet.generate({ ... }) || new Predicate(...);
const quantities: Array<CoinQuantityLike> = [\
  { amount: 1000, assetId: provider.getBaseAssetId() }\
];

const cost = account.getTransactionCost(txRequest, { quantities });
```

_Icon ClipboardText_

## _Icon Link_ [July 11, 2024](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#july-11-2024)

Release [v0.92.0 _Icon Link_](https://github.com/FuelLabs/fuels-ts/releases/tag/v0.92.0)

## _Icon Link_ [Implement non-blocking contract call -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#implement-non-blocking-contract-call---2692) [\#2692 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2692)

The `call` method in the `BaseInvocationScope` class no longer waits for transaction execution, making it non-blocking. This change affects how transaction responses are handled.

```fuel_Box fuel_Box-idXKMmm-css
// before
const { logs, value, transactionResult } = await contract.functions.xyz().call()
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
// after
const { transactionId, waitForResult } = await contract.functions.xyz().call();

const { logs, value, transactionResult } = await waitForResult();
```

_Icon ClipboardText_

## _Icon Link_ [Made `deployContract` a non-blocking call -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#made-deploycontract-a-non-blocking-call---2597) [\#2597 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2597)

The `deployContract` method no longer returns the contract instance directly. Instead, it returns an object containing the `transactionId` , the `contractId`, and a `waitForResult` function.

```fuel_Box fuel_Box-idXKMmm-css
// before
const factory = new ContractFactory(contractByteCode, contractAbi, wallet);

const contract = await factory.deployContract();

const { value } = await contract.functions.xyz().call();

// after
const factory = new ContractFactory(contractByteCode, contractAbi, wallet);

const { waitForResult, transactionId, contractId } = await factory.deployContract();

const { contract, transactionResult } = await waitForResult();

const { value } = await contract.functions.xyz().call();
```

_Icon ClipboardText_

## _Icon Link_ [Implement pagination for `Account` methods -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#implement-pagination-for-account-methods---2408) [\#2408 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2408)

```fuel_Box fuel_Box-idXKMmm-css
// before
const coins = await myWallet.getCoins(baseAssetId);
const messages = await myWallet.getMessages();
const balances = await myWallet.getBalances();
const blocks = await provider.getBlocks();

// after
const { coins, pageInfo } = await myWallet.getCoins(baseAssetId);
const { messages, pageInfo } = await myWallet.getMessages();
const { balances } = await myWallet.getBalances();
const { blocks, pageInfo } = await provider.getBlocks();

/*
  The `pageInfo` object contains cursor pagination information one
  can use to fetch subsequent pages selectively and on demand.
*/
```

_Icon ClipboardText_

## _Icon Link_ [`launchNode.cleanup` not killing node in last test of test group -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#launchnodecleanup-not-killing-node-in-last-test-of-test-group---2718) [\#2718 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2718)

The `killNode` and `KillNodeParams` functionality has been internalized and the method and interface have been deleted so they're no longer exported. It's marked as a breaking change for pedantic reasons and there shouldn't really be any affected users given that they kill nodes via `cleanup` which is unchanged, so no migration notes are necessary.

## _Icon Link_ [Remove `InvocationResult` from `program` package -](https://docs.fuel.network/docs/nightly/migrations-and-disclosures/migrations/typescript-sdk/\#remove-invocationresult-from-program-package---2652) [\#2652 _Icon Link_](https://github.com/FuelLabs/fuels-ts/pull/2652)

The classes `FunctionInvocationResult`, `InvocationCallResult`, and `InvocationResult` have been removed. This change will not affect most users as the response for a contract call or script call remains the same; only the type name has changed.

```fuel_Box fuel_Box-idXKMmm-css
// before
const callResult: FunctionInvocationResult = await contract.functions.xyz().call()

const dryRunResult: InvocationCallResult = await contract.functions.xyz().get()
const dryRunResult: InvocationCallResult = await contract.functions.xyz().dryRun()
const dryRunResult: InvocationCallResult = await contract.functions.xyz().simulate()


// after
const callResult: FunctionResult = await contract.functions.xyz().call()

const dryRunResult: DryRunResult = await contract.functions.xyz().get()
const dryRunResult: DryRunResult = await contract.functions.xyz().dryRun()
const dryRunResult: DryRunResult = await contract.functions.xyz().simulate()
```

_Icon ClipboardText_