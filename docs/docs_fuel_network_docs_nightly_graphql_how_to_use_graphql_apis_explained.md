[Docs](https://docs.fuel.network/) /

Nightly  /

[GraphQL](https://docs.fuel.network/docs/nightly/graphql/) /

[How to Use GraphQL](https://docs.fuel.network/docs/nightly/graphql/how-to-use-graphql/) /

Schema & Type System

## _Icon Link_ [Schema & Type System](https://docs.fuel.network/docs/nightly/graphql/how-to-use-graphql/apis-explained/\#schema--type-system)

Unlike traditional REST APIs, GraphQL comes with a strong type system to describe your API. A GraphQL schema describes the data you can query using the API endpoint by defining a set of types and fields that are mapped to those types.

Read along to learn about various GraphQL types.

## _Icon Link_ [Object Types](https://docs.fuel.network/docs/nightly/graphql/how-to-use-graphql/apis-explained/\#object-types)

Object types in GraphQL describe an object with underlying fields that can be queried from your API endpoint.

As an example, an object type can be defined as shown below:

```fuel_Box fuel_Box-idXKMmm-css
type actors {
  name: String!
  appearsIn: [movie!]!
}
```

_Icon ClipboardText_

Here, `actors` is an object type and `name` and `appearsIn` are fields mapped to type `actors`.

## _Icon Link_ [Scalar Types](https://docs.fuel.network/docs/nightly/graphql/how-to-use-graphql/apis-explained/\#scalar-types)

> _Icon InfoCircle_
>
> From The GraphQL Documentation:

In the example for object types above, field `name` is of type `String`. String in GraphQL is by default a scalar type. This means that it resolves to a definite value and cannot have further sub-fields while querying. Scalar types represent the leaves of a query.

GraphQL comes with a set of default scalar types out-of-the-box such as below:

- `Int`: A signed 32‐bit integer.
- `Float`: A signed double-precision floating-point value.
- `String`: A UTF‐8 character sequence.
- `Boolean`: true or false.
- `ID`: The ID scalar type represents a unique identifier, often used to re-fetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.

Fields can also be of types that are not scalar by default, but resolve to scalar values upon querying. For instance, in the following query, the `name` and `appearsIn` fields resolve to scalar types.

```fuel_Box fuel_Box-idXKMmm-css
{
  hero {
    name
    appearsIn
  }
}
```

_Icon ClipboardText_

This is because in the schema, `name` and `appearIn` do not have further queryable sub-fields as described below:

```fuel_Box fuel_Box-idXKMmm-css
{
 "data": {
   "hero": {
     "name": "R2-D2",
     "appearsIn": [\
       "NEWHOPE",\
       "EMPIRE",\
       "JEDI"\
     ]
   }
 }
}
```

_Icon ClipboardText_

## _Icon Link_ [Lists and Non-nulls](https://docs.fuel.network/docs/nightly/graphql/how-to-use-graphql/apis-explained/\#lists-and-non-nulls)

> _Icon InfoCircle_
>
> From the GraphQL documentation:

Object types, scalars, and enums are the only kinds of types you can define in GraphQL. But when you use the types in other parts of the schema, or in your query variable declarations, you can apply additional type modifiers that affect validation of those values.

Let's look at an example:

```fuel_Box fuel_Box-idXKMmm-css
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

_Icon ClipboardText_

Here, we're using a String type and marking it as Non-Null by adding an exclamation mark `!` after the type name. This means that our server always expects to return a non-null value for this field, and if it ends up getting a null value that will actually trigger a GraphQL execution error, letting the client know that something has gone wrong.

The Non-Null type modifier can also be used when defining arguments for a field, causing the GraphQL server to return a validation error if a null value is passed either in the GraphQL string or the variables.

```fuel_Box fuel_Box-idXKMmm-css
query DroidById($id: ID!) {
 droid(id: $id) {
   name
 }
}
{
 "id": null
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
{
 "errors": [\
   {\
     "message": "Variable \"$id\" of non-null type \"ID!\" must not be null.",\
     "locations": [\
       {\
         "line": 1,\
         "column": 17\
       }\
     ]\
   }\
 ]
}
```

_Icon ClipboardText_

```fuel_Box fuel_Box-idXKMmm-css
myField: [String!]
```

_Icon ClipboardText_

This means that the list itself can be null, but it can't have any null members. For example, in JSON:

```fuel_Box fuel_Box-idXKMmm-css
myField: null // valid
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // error

```

_Icon ClipboardText_

## _Icon Link_ [Union types](https://docs.fuel.network/docs/nightly/graphql/how-to-use-graphql/apis-explained/\#union-types)

When a query returns a union type, you can use `... on` to specify the query fields for a certain return type. These are also called inline fragments. For example, the `hero` query below returns a union type of either `Droid` or `Human`.

```fuel_Box fuel_Box-idXKMmm-css
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
```

_Icon ClipboardText_

## _Icon Link_ [Connections](https://docs.fuel.network/docs/nightly/graphql/how-to-use-graphql/apis-explained/\#connections)

Connections are a type of response used whenever you are expecting multiple results that may require pagination. Each query return type that ends in "Connection" will include the following return fields:

```fuel_Box fuel_Box-idXKMmm-css
pageInfo: PageInfo!
edges: [SomethingEdge!]!
nodes: [Something!]!
```

_Icon ClipboardText_

## _Icon Link_ [`PageInfo`](https://docs.fuel.network/docs/nightly/graphql/how-to-use-graphql/apis-explained/\#pageinfo)

`pageInfo` returns an object that includes information about the returned page of results:

`hasPreviousPage: Boolean!`
Whether or not the result has a previous page.

`hasNextPage: Boolean!`
Whether or not the result has another page after it.

`startCursor: String`
The starting cursor that identifies the first page.

`endCursor: String`
The end cursor that identifies the last page.

## _Icon Link_ [Edges](https://docs.fuel.network/docs/nightly/graphql/how-to-use-graphql/apis-explained/\#edges)

`edges` returns an array of edge objects, which includes the cursor and first node for that page. You can use this data to help with pagination.

## _Icon Link_ [Nodes](https://docs.fuel.network/docs/nightly/graphql/how-to-use-graphql/apis-explained/\#nodes)

`nodes` returns an array of whichever type you are expecting paginated results for.

## _Icon Link_ [Arguments](https://docs.fuel.network/docs/nightly/graphql/how-to-use-graphql/apis-explained/\#arguments)

Each of these queries also accepts the following arguments:
`first: Int` `after: String` `last: Int` `before: String`

`first` and `last` both accept an integer, which sets the number of results returned for each page. `first` will paginate the results starting at the beginning, while `last` will start from the end. It is required to pass an argument for either `first` or `last`. If no argument is given, the query will not return any results.

`after` and `before` both accept a cursor, which you can use to request different pages. These are both optional arguments.

You can learn more about the connection model and pagination in the official GraphQL docs here: [https://graphql.org/learn/pagination/ _Icon Link_](https://graphql.org/learn/pagination/)