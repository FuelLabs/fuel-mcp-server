[Docs](https://docs.fuel.network/) /

Nightly /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Contracts](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/) /

Cost Estimation

## _Icon Link_ [Estimating Contract Call Cost](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/cost-estimation/\#estimating-contract-call-cost)

The [`FunctionInvocationScope.getTransactionCost` _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/classes/_fuel_ts_program.FunctionInvocationScope.html#getTransactionCost) method allows you to estimate the cost of a specific contract call. The return type, `TransactionCost`, is an object containing relevant information for the estimation:

```fuel_Box fuel_Box-idXKMmm-css
export type TransactionCost = {
  gasPrice: BN;
  gasUsed: BN;
  minGas: BN;
  minFee: BN;
  maxFee: BN;
  maxGas: BN;
  rawReceipts: TransactionReceiptJson[];
  receipts: TransactionResultReceipt[];
  outputVariables: number;
  missingContractIds: string[];
  estimatedPredicates: TransactionRequestInput[];
  requiredQuantities: CoinQuantity[];
  addedSignatures: number;
  dryRunStatus?: DryRunStatus;
  updateMaxFee?: boolean;
  transactionSummary?: TransactionSummaryJsonPartial;
};
```

_Icon ClipboardText_

The following example demonstrates how to get the estimated transaction cost for:

## _Icon Link_ [1\. Single contract call transaction:](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/cost-estimation/\#1-single-contract-call-transaction)

```fuel_Box fuel_Box-idXKMmm-css
const cost = await contract.functions
  .return_context_amount()
  .callParams({
    forward: [100, baseAssetId],
  })
  .getTransactionCost();

console.log('costs', cost);
```

_Icon ClipboardText_

## _Icon Link_ [2\. Multiple contract calls transaction:](https://docs.fuel.network/docs/nightly/fuels-ts/contracts/cost-estimation/\#2-multiple-contract-calls-transaction)

```fuel_Box fuel_Box-idXKMmm-css
const scope = contract.multiCall([\
  contract.functions.return_context_amount().callParams({\
    forward: [100, baseAssetId],\
  }),\
  contract.functions.return_context_amount().callParams({\
    forward: [300, baseAssetId],\
  }),\
]);

const txCost = await scope.getTransactionCost();

console.log('costs', txCost);
```

_Icon ClipboardText_

You can use the transaction cost estimation to set the gas limit for an actual call or display the estimated cost to the user.