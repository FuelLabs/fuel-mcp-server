[Docs](https://docs.fuel.network/) /

Nightly  /

[GraphQL](https://docs.fuel.network/docs/nightly/graphql/) /

Querying From A Dapp

## _Icon Link_ [Querying From A Dapp](https://docs.fuel.network/docs/nightly/graphql/querying-from-a-dapp/\#querying-from-a-dapp)

There are several ways to interact with the Fuel GraphQL API from a frontend application.
This section covers just a few options available to get you started.

## _Icon Link_ [JavaScript](https://docs.fuel.network/docs/nightly/graphql/querying-from-a-dapp/\#javascript)

```fuel_Box fuel_Box-idXKMmm-css
export async function getHealth() {
  let response = await fetch(TESTNET_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: '{ health }' }),
  });
  let data = await response.json();
  console.log('DATA:', data);
}
```

_Icon ClipboardText_

## _Icon Link_ [Apollo Client](https://docs.fuel.network/docs/nightly/graphql/querying-from-a-dapp/\#apollo-client)

Read the official Apollo Client docs [here _Icon Link_](https://www.apollographql.com/apollo-client/).

```fuel_Box fuel_Box-idXKMmm-css
npm install @apollo/client graphql
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: TESTNET_ENDPOINT,
  cache: new InMemoryCache(),
});

const HEALTH_QUERY = `
  query {
    health
  }
`;

export const checkHealth = async () => {
  const response = await apolloClient.query({
    query: gql(HEALTH_QUERY),
  });
  console.log('RESPONSE:', response);
};
```

_Icon ClipboardText_

## _Icon Link_ [urql](https://docs.fuel.network/docs/nightly/graphql/querying-from-a-dapp/\#urql)

Read the official urql docs [here _Icon Link_](https://formidable.com/open-source/urql/).

```fuel_Box fuel_Box-idXKMmm-css
npm install urql graphql
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
import { Client, cacheExchange, fetchExchange } from 'urql';

const urqlClient = new Client({
  url: TESTNET_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
});

const HEALTH_QUERY = `
  query {
    health
  }
`;

export const checkHealth = async () => {
  const response = await urqlClient.query(HEALTH_QUERY).toPromise();
  console.log('RESPONSE:', response);
};
```

_Icon ClipboardText_

You can see more examples in the next section.