[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Provider](https://docs.fuel.network/docs/fuels-ts/provider/) /

Pagination

## _Icon Link_ [Pagination](https://docs.fuel.network/docs/fuels-ts/provider/pagination/\#pagination)

Pagination is highly efficient when dealing with large sets of data. Because of this some methods from the `Provider` class support [GraphQL cursor pagination _Icon Link_](https://graphql.org/learn/pagination/), allowing you to efficiently navigate through data chunks.

## _Icon Link_ [Pagination Arguments](https://docs.fuel.network/docs/fuels-ts/provider/pagination/\#pagination-arguments)

The pagination arguments object is used to specify the range of data you want to retrieve. It includes the following properties:

- `after`: A cursor pointing to a position after which you want to retrieve items.
- `first`: The number of items to retrieve after the specified cursor. This is used in conjunction with the `after` argument.
- `before`: A cursor pointing to a position before which you want to retrieve items.
- `last`: The number of items to retrieve before the specified cursor. This is used in conjunction with the `before` argument.

```fuel_Box fuel_Box-idXKMmm-css
const paginationArgsExample: CursorPaginationArgs = {
  after: 'cursor',
  first: 10,
  before: 'cursor',
  last: 10,
};
```

_Icon ClipboardText_

## _Icon Link_ [Page Info](https://docs.fuel.network/docs/fuels-ts/provider/pagination/\#page-info)

The `pageInfo` object is included in the GraphQL response for requests that support cursor pagination. It provides crucial metadata about the current page of results, allowing you to understand the pagination state and determine if there are more items to fetch before or after the current set.

- `endCursor`: A cursor representing the last item in the current set of results. It should be used as the `after` argument in subsequent queries to fetch the next set of items.
- `hasNextPage`: A boolean indicating whether there are more items available after the current set.
- `startCursor`: A cursor representing the first item in the current set of results. It should be used as the `before` argument in subsequent queries to fetch the previous set of items.
- `hasPreviousPage`: A boolean indicating whether there are more items available before the current set.

```fuel_Box fuel_Box-idXKMmm-css
const pageInfoExample: PageInfo = {
  endCursor: 'cursor',
  hasNextPage: true,
  startCursor: 'cursor',
  hasPreviousPage: true,
};
```

_Icon ClipboardText_

## _Icon Link_ [Using Pagination](https://docs.fuel.network/docs/fuels-ts/provider/pagination/\#using-pagination)

One of the methods that supports pagination is the `getCoins` method. This method receives three parameters:

- `address`: The owner's account address
- `assetId`: The asset ID of the coins (optional)
- `paginationArgs`: The pagination arguments (optional)

## _Icon Link_ [Basic Pagination](https://docs.fuel.network/docs/fuels-ts/provider/pagination/\#basic-pagination)

Here is how you can use the `getCoins` method with pagination:

```fuel_Box fuel_Box-idXKMmm-css
const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

let paginationArgs: CursorPaginationArgs = {
  first: 10, // It will return only the first 10 coins
};

const { coins, pageInfo } = await provider.getCoins(
  WALLET_ADDRESS,
  baseAssetId,
  paginationArgs
);

if (pageInfo.hasNextPage) {
  paginationArgs = {
    after: pageInfo.endCursor,
    first: 10,
  };
  // The coins array will include the next 10 coins after the last one in the previous array
  await provider.getCoins(WALLET_ADDRESS, baseAssetId, paginationArgs);
}
```

_Icon ClipboardText_

## _Icon Link_ [Navigating to the Previous Page](https://docs.fuel.network/docs/fuels-ts/provider/pagination/\#navigating-to-the-previous-page)

You can also use the `paginationArgs` to navigate to the previous page of results:

```fuel_Box fuel_Box-idXKMmm-css
if (pageInfo.hasPreviousPage) {
  paginationArgs = {
    before: pageInfo.startCursor,
    last: 10,
  };

  // It will includes the previous 10 coins before the first one in the previous array
  await provider.getCoins(WALLET_ADDRESS, baseAssetId, paginationArgs);
}
```

_Icon ClipboardText_

## _Icon Link_ [Valid Combinations](https://docs.fuel.network/docs/fuels-ts/provider/pagination/\#valid-combinations)

- Forward Pagination:

Use `after` with `first` to retrieve items following a cursor.


```fuel_Box fuel_Box-idXKMmm-css
const paginationArgsForward: CursorPaginationArgs = {
  after: 'cursor',
  first: 10,
};
```

_Icon ClipboardText_

- Backward Pagination:

Use `before` with `last` to retrieve items preceding a cursor.


```fuel_Box fuel_Box-idXKMmm-css
const paginationArgsBackwards: CursorPaginationArgs = {
  before: 'cursor',
  last: 10,
};
```

_Icon ClipboardText_

## _Icon Link_ [Default Behavior](https://docs.fuel.network/docs/fuels-ts/provider/pagination/\#default-behavior)

If neither `assetId` nor `paginationArgs` are provided, the `getCoins` method will default to the base asset ID and return the first 100 items:

```fuel_Box fuel_Box-idXKMmm-css
// It will return the first 100 coins for a given wallet
await provider.getCoins(WALLET_ADDRESS);
```

_Icon ClipboardText_