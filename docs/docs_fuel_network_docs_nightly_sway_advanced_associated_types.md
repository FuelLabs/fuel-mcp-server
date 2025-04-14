[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Advanced](https://docs.fuel.network/docs/nightly/sway/advanced/) /

Associated Types

## _Icon Link_ [Associated Types](https://docs.fuel.network/docs/nightly/sway/advanced/associated_types/\#associated-types)

Associated types in Sway allow you to define placeholder types within a trait, which can be customized by concrete
implementations of that trait. These associated types are used to specify the return types of trait methods or to
define type relationships within the trait.

Associated types are a powerful feature of Sway's trait system, enabling generic programming and abstraction over
types. They help improve code clarity and maintainability by allowing you to define generic traits without committing
to specific types.

## _Icon Link_ [Declaring Associated Types](https://docs.fuel.network/docs/nightly/sway/advanced/associated_types/\#declaring-associated-types)

Associated types are declared within a trait using the type keyword. Here's the syntax for declaring an associated type:

```fuel_Box fuel_Box-idXKMmm-css
trait MyTrait {
    type AssociatedType;
}
```

_Icon ClipboardText_

## _Icon Link_ [Implementing Associated Types](https://docs.fuel.network/docs/nightly/sway/advanced/associated_types/\#implementing-associated-types)

Concrete implementations of a trait with associated types must provide a specific type for each associated type
defined in the trait. Here's an example of implementing a trait with an associated type:

```fuel_Box fuel_Box-idXKMmm-css
struct MyStruct;

impl MyTrait for MyStruct {
    type AssociatedType = u32; // Implementing the associated type with u32
}
```

_Icon ClipboardText_

In this example, `MyStruct` implements `MyTrait` and specifies that the associated type `AssociatedType` is `u32`.

## _Icon Link_ [Using Associated Types](https://docs.fuel.network/docs/nightly/sway/advanced/associated_types/\#using-associated-types)

Associated types are used within trait methods or where the trait is used as a bound for generic functions or
structs. You can use the associated type like any other type. Here's an example:

```fuel_Box fuel_Box-idXKMmm-css
trait MyTrait {
    type AssociatedType;

    fn get_value(self) -> Self::AssociatedType;
}

struct MyStruct;

impl MyTrait for MyStruct {
    type AssociatedType = u32;

    fn get_value(self) -> Self::AssociatedType {
        42
    }
}
```

_Icon ClipboardText_

In this example, `get_value` is a trait method that returns an associated type `AssociatedType`.

## _Icon Link_ [Use Cases](https://docs.fuel.network/docs/nightly/sway/advanced/associated_types/\#use-cases)

Associated types are particularly useful in scenarios where you want to define traits that work with different
types of data structures or abstractions, allowing the implementer to specify the concrete types. Some common use cases include:

- Collections: Traits for generic collections that allow users to specify the type of elements.
- Iterator Patterns: Traits for implementing iterators with varying element types.
- Serialization and Deserialization: Traits for serializing and deserializing data with different data formats.