[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Transactions](https://docs.fuel.network/docs/fuels-ts/transactions/) /

Optimizing Frontend Apps

## _Icon Link_ [Optimizing Frontend Apps](https://docs.fuel.network/docs/fuels-ts/transactions/optimizing-frontend-apps/\#optimizing-frontend-apps)

Your application must perform a series of operations to estimate, submit and receive the result of a transaction. However, the flow in which it performs these actions can be organized or performed optimistically, increasing it's perceived speed.

## _Icon Link_ [Use Case](https://docs.fuel.network/docs/fuels-ts/transactions/optimizing-frontend-apps/\#use-case)

In a frontend application, imagine we have a button that executes a contract call:

```fuel_Box fuel_Box-idXKMmm-css
<Button onClick={handleSubmit}>Submit</Button>
```

_Icon ClipboardText_

The handler would be implemented as follows:

```fuel_Box fuel_Box-idXKMmm-css
async function handleSubmit() {
  // 1. Calling the `call` function for a contract method will create
  // a transaction request, estimate it, fund it and then submit it
  const transaction = await contract.functions.increment_count(1).call();
  info(`Transaction ID Submitted: ${transaction.transactionId}`);

  // 2. Calling `waitForResult` will wait for the transaction to
  // settle, then assemble and return it
  const result = await transaction.waitForResult();
  info(`Transaction ID Successful: ${result.transactionId}`);
}
```

_Icon ClipboardText_

Once the user clicks the button, multiple sequential calls are made to the network, which can take a while because the transaction must be:

1. Estimated
2. Funded
3. Submitted

## _Icon Link_ [Optimization Strategy](https://docs.fuel.network/docs/fuels-ts/transactions/optimizing-frontend-apps/\#optimization-strategy)

With a few optimizations, the flow can be organized as follows:

```fuel_Box fuel_Box-idXKMmm-css
/**
 * Here we'll prepare our transaction upfront on page load, so that
 * by the time the user interacts with your app (i.e. clicking a btn),
 * the transaction is ready to be submitted
 */
async function onPageLoad() {
  // 1. Invoke the contract function whilst estimating and funding the
  // call, which gives us the transaction request
  request = await contract.functions.increment_count(1).fundWithRequiredCoins();
}

/**
 * By the time user user clicks the submit button, we only need to
 * submit the transaction to the network
 */
async function handleSubmit() {
  // 1. Submit the transaction to the network
  info(`Transaction ID Submitted: ${request.getTransactionId(chainId)}`);
  const response = await wallet.sendTransaction(request);

  // 2. Wait for the transaction to settle and get the result
  const result = await response.waitForResult();
  info(`Transaction ID Successful: ${result.id}`);
}
```

_Icon ClipboardText_

## _Icon Link_ [Conclusion](https://docs.fuel.network/docs/fuels-ts/transactions/optimizing-frontend-apps/\#conclusion)

Finally, when users click the button, they only need to submit the transaction, which vastly improves the perceived speed of the transaction because many of the necessary requests were done upfront, under the hood.

Just remember:

- _After preparation, any changes made to the transaction request will require it to be re-estimated and re-funded before it can be signed and submitted._

## _Icon Link_ [See Also](https://docs.fuel.network/docs/fuels-ts/transactions/optimizing-frontend-apps/\#see-also)

- Check a full example at [Optimized React Example](https://docs.fuel.network/docs/fuels-ts/cookbook/optimized-react-example/)