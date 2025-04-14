[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Cookbook](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/) /

Custom Transactions

## _Icon Link_ [Custom Transactions](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/custom-transactions/\#custom-transactions)

There may be scenarios where you need to build out transactions that involve multiple program types and assets; this can be done by instantiating a [`ScriptTransactionRequest` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.ScriptTransactionRequest.html). This class allows you to a append multiple program types and assets to a single transaction.

Consider the following script that transfers multiple assets to a contract:

```fuel_Box fuel_Box-idXKMmm-css
script;

use std::asset::transfer;

fn main(
    contract_address: b256,
    asset_a: AssetId,
    amount_asset_a: u64,
    asset_b: AssetId,
    amount_asset_b: u64,
) -> bool {
    let wrapped_contract = ContractId::from(contract_address);
    let contract_id = Identity::ContractId(wrapped_contract);
    transfer(contract_id, asset_a, amount_asset_a);
    transfer(contract_id, asset_b, amount_asset_b);
    true
}
```

_Icon ClipboardText_

This script can be executed by creating a [`ScriptTransactionRequest` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_account.ScriptTransactionRequest.html), appending the resource and contract inputs/outputs and then sending the transaction, as follows:

```fuel_Box fuel_Box-idXKMmm-css

// 1. Create a script transaction using the script binary
const request = new ScriptTransactionRequest({
  ...defaultTxParams,
  gasLimit: 3_000_000,
  script: ScriptTransferToContract.bytecode,
});

// 2. Instantiate the script main arguments
const scriptArguments = [\
  contract.id.toB256(),\
  { bits: ASSET_A },\
  new BN(1000),\
  { bits: ASSET_B },\
  new BN(500),\
];

// 3. Populate the script data and add the contract input and output
request
  .setData(ScriptTransferToContract.abi, scriptArguments)
  .addContractInputAndOutput(contract.id);

// 4. Get the transaction resources
const quantities = [\
  coinQuantityfy([1000, ASSET_A]),\
  coinQuantityfy([500, ASSET_B]),\
];

// 5. Estimate and fund the transaction
await request.estimateAndFund(wallet, { quantities });

// 6. Send the transaction
const tx = await wallet.sendTransaction(request);
await tx.waitForResult();

const contractFinalBalanceAssetA = await contract.getBalance(ASSET_A);
const contractFinalBalanceAssetB = await contract.getBalance(ASSET_B);
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Full Example](https://docs.fuel.network/docs/nightly/fuels-ts/cookbook/custom-transactions/\#full-example)

For a full example, see below:

```fuel_Box fuel_Box-idXKMmm-css
import { BN, ScriptTransactionRequest, coinQuantityfy } from 'fuels';
import { ASSET_A, ASSET_B, launchTestNode } from 'fuels/test-utils';

import { EchoValuesFactory } from '../../../typegend/contracts/EchoValuesFactory';
import { ScriptTransferToContract } from '../../../typegend/scripts/ScriptTransferToContract';

using launched = await launchTestNode({
  contractsConfigs: [{ factory: EchoValuesFactory }],
});
const {
  contracts: [contract],
  wallets: [wallet],
} = launched;

const defaultTxParams = {
  gasLimit: 10000,
};


// 1. Create a script transaction using the script binary
const request = new ScriptTransactionRequest({
  ...defaultTxParams,
  gasLimit: 3_000_000,
  script: ScriptTransferToContract.bytecode,
});

// 2. Instantiate the script main arguments
const scriptArguments = [\
  contract.id.toB256(),\
  { bits: ASSET_A },\
  new BN(1000),\
  { bits: ASSET_B },\
  new BN(500),\
];

// 3. Populate the script data and add the contract input and output
request
  .setData(ScriptTransferToContract.abi, scriptArguments)
  .addContractInputAndOutput(contract.id);

// 4. Get the transaction resources
const quantities = [\
  coinQuantityfy([1000, ASSET_A]),\
  coinQuantityfy([500, ASSET_B]),\
];

// 5. Estimate and fund the transaction
await request.estimateAndFund(wallet, { quantities });

// 6. Send the transaction
const tx = await wallet.sendTransaction(request);
await tx.waitForResult();

const contractFinalBalanceAssetA = await contract.getBalance(ASSET_A);
const contractFinalBalanceAssetB = await contract.getBalance(ASSET_B);

```

Collapse_Icon ClipboardText_