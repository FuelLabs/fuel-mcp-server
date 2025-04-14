[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Provider](https://docs.fuel.network/docs/nightly/fuels-ts/provider/) /

Provider Options

## _Icon Link_ [Provider Options](https://docs.fuel.network/docs/nightly/fuels-ts/provider/provider-options/\#provider-options)

You can provide various [options _Icon Link_](https://fuels-ts-docs-api-nightly.vercel.app/types/_fuel_ts_account.ProviderOptions.html) on `Provider` instantiation to modify its behavior.

## _Icon Link_ [`retryOptions`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/provider-options/\#retryoptions)

Calls to a fuel node via the `Provider` will fail if a connection cannot be established.
Specifying retry options allows you to customize the way you want to handle that failure scenario before ultimately throwing an error.

_NOTE: retrying is only done when a connection cannot be established. If the connection is established and the node throws an error, no retry will happen._

You can provide the following settings:

- `maxRetries` \- Amount of attempts to retry after initial attempt before failing the call.
- `backoff` \- Strategy used to define the intervals between attempts.

  - `exponential` _(default)_: Doubles the delay with each attempt.
  - `linear` \- Increases the delay linearly with each attempt.
  - `fixed`: Uses a constant delay between attempts.
- `baseDelay` _(default 150ms)_ \- Base time in milliseconds for the backoff strategy.

```fuel_Box fuel_Box-idXKMmm-css
new Provider(NETWORK_URL, {
  retryOptions: {
    maxRetries: 5,
    baseDelay: 100,
    backoff: 'linear',
  },
});
```

_Icon ClipboardText_

## _Icon Link_ [`requestMiddleware`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/provider-options/\#requestmiddleware)

Allows you to modify the request object to add additional headers, modify the request's body, and much more.

```fuel_Box fuel_Box-idXKMmm-css
// synchronous request middleware
new Provider(NETWORK_URL, {
  requestMiddleware: (request: RequestInit) => {
    request.credentials = 'omit';

    return request;
  },
});

// asynchronous request middleware
new Provider(NETWORK_URL, {
  requestMiddleware: async (request: RequestInit) => {
    const credentials = await fetchSomeExternalCredentials();
    request.headers ??= {};
    (request.headers as Record<string, string>).auth = credentials;

    return request;
  },
});
```

_Icon ClipboardText_

## _Icon Link_ [`timeout`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/provider-options/\#timeout)

Specify the timeout in milliseconds after which every request will be aborted.

```fuel_Box fuel_Box-idXKMmm-css
new Provider(NETWORK_URL, {
  timeout: 3000, // will abort if request takes 30 seconds to complete
});
```

_Icon ClipboardText_

## _Icon Link_ [`fetch`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/provider-options/\#fetch)

Provide a custom `fetch` function that'll replace the default fetch call.

_Note: If defined, `requestMiddleware`, `timeout` and `retryOptions` are applied to this custom `fetch` function as well._

```fuel_Box fuel_Box-idXKMmm-css
new Provider(NETWORK_URL, {
  fetch: async (url: string, requestInit: RequestInit | undefined) => {
    // native fetch
    const response = await fetch(url, requestInit);

    const updatedResponse = decorateResponseWithCustomLogic(response);

    return updatedResponse;
  },
});
```

_Icon ClipboardText_

## _Icon Link_ [`resourceCacheTTL`](https://docs.fuel.network/docs/nightly/fuels-ts/provider/provider-options/\#resourcecachettl)

When using the SDK, it may be necessary to submit multiple transactions from the same account in a short period. In such cases, the SDK creates and funds these transactions, then submits them to the node.

However, if a second transaction is created before the first one is processed, there is a chance of using the same resources (UTXOs or Messages) for both transactions. This happens because the resources used in the first transaction are still unspent until the transaction is fully processed.

If the second transaction attempts to use the same resources that the first transaction has already spent, it will result in one of the following error:

```fuel_Box fuel_Box-idXKMmm-css
Transaction is not inserted. Hash is already known

Transaction is not inserted. UTXO does not exist: {{utxoID}}

Transaction is not inserted. A higher priced tx {{txID}} is already spending this message: {{messageNonce}}
```

_Icon ClipboardText_

This error indicates that the resources used by the second transaction no longer exist, as the first transaction already spent them.

To prevent this issue, the SDK sets a default cache for resources to 20 seconds. This default caching mechanism ensures that resources used in a submitted transaction are not reused in subsequent transactions within the specified time. You can control the duration of this cache using the `resourceCacheTTL` flag. If you would like to disable caching, you can pass a value of `-1` to the `resourceCacheTTL` parameter.

```fuel_Box fuel_Box-idXKMmm-css
new Provider(NETWORK_URL, {
  // Cache resources (Coin's and Message's) for 5 seconds
  resourceCacheTTL: 5000,
});
```

_Icon ClipboardText_

**Note:**

If you would like to submit multiple transactions without waiting for each transaction to be completed, your account must have multiple UTXOs available. If you only have one UTXO, the first transaction will spend it, and any remaining amount will be converted into a new UTXO with a different ID.

By ensuring your account has multiple UTXOs, you can effectively use the `resourceCacheTTL` flag to manage transactions without conflicts. For more information on UTXOs, refer to the [UTXOs guide](https://docs.fuel.network/docs/nightly/fuels-ts/the-utxo-model/).