[Docs](https://docs.fuel.network/) /

[GraphQL](https://docs.fuel.network/docs/graphql/) /

[How to Use GraphQL](https://docs.fuel.network/docs/graphql/how-to-use-graphql/) /

What Is GraphQL?

## _Icon Link_ [What is GraphQL?](https://docs.fuel.network/docs/graphql/how-to-use-graphql/what-is-graphql/\#what-is-graphql)

## _Icon Link_ [HTTP and APIs Explained](https://docs.fuel.network/docs/graphql/how-to-use-graphql/what-is-graphql/\#http-and-apis-explained)

HTTP is a protocol, or a definite set of rules, for accessing resources on the web. Resources could mean anything from HTML files to data from a database, photos, text, and so on.

These resources are made available to us via an Application Programming Interface (API) and we make requests to these APIs via the HTTP protocol. It is the mechanism that allows developers to request resources.

Read more about HTTP methods, client-server architecture, and why you need APIs [here _Icon Link_](https://www.freecodecamp.org/news/http-request-methods-explained/).

## _Icon Link_ [How does GraphQL work?](https://docs.fuel.network/docs/graphql/how-to-use-graphql/what-is-graphql/\#how-does-graphql-work)

> _Icon InfoCircle_
>
> Note: This section goes over how GraphQL works under the hood, but it is not necessary to know this as a developer building on Fuel. Schema definition, resolver logic, etc. are all written and maintained by the contributors at Fuel Labs.

GraphQL is a query language and specification that describes how you can communicate with your API. GraphQL is not constrained by programming languages, backend frameworks, and databases. GraphQL uses the HTTP protocol under the hood, so you can map GraphQL operations back to simple `GET`, `POST`, `PUT`, or `DELETE` operations. You can view the GraphQL documentation here: [https://graphql.org/ _Icon Link_](https://graphql.org/).

A GraphQL API works by defining types and the properties available on those types, also known as the schema, and defining functions that specify the logic for how to resolve those types. A resolver is a function that's responsible for populating the data for a single field in your schema. Whenever a client queries for a particular field, the resolver for that field fetches the requested data from the appropriate data source.

For example, as an API developer you could define a type, `Car` and define the properties that will be query-able on that type such as below:

```fuel_Box fuel_Box-idXKMmm-css
type Car {
  id: ID
  color: String
  year: Int
  isNew: Boolean
}
```

_Icon ClipboardText_

Fuel Labs created a GraphQL API endpoint for the Fuel Network, allowing developers to make complex queries for data on the blockchain. You can leverage these queries to populate a frontend application with details that your users might be interested in like the history of their transactions, their balance of a specific token, etc.

## _Icon Link_ [GraphQL Queries](https://docs.fuel.network/docs/graphql/how-to-use-graphql/what-is-graphql/\#graphql-queries)

Queries in GraphQL allow you to read data. GraphQL lets you ask for specific data and returns exactly what you asked for. It also lets you request multiple resources in a single query instead of writing a separate 'GET' request for each resource as with REST APIs.

GraphQL also facilitates more complex queries and operations such as pagination, sort, filter, full-text search, and more.

Sample query:

```fuel_Box fuel_Box-idXKMmm-css
query Actor {
  actor {
    name {
      appearIn
    }
  }
}
```

_Icon ClipboardText_

The above query gives you a response with the name of the actor along with the name of the movie(s) they appear in.

## _Icon Link_ [GraphQL Mutations](https://docs.fuel.network/docs/graphql/how-to-use-graphql/what-is-graphql/\#graphql-mutations)

Mutations in GraphQL are write operations that update the chain's state. In addition to being able to traverse objects and their fields, GraphQL gives developers the ability to pass arguments to fields in order to filter out responses. Every field and nested object can have its own set of arguments.

Sample mutation:

```fuel_Box fuel_Box-idXKMmm-css
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

_Icon ClipboardText_