[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Advanced](https://docs.fuel.network/docs/sway/advanced/) /

Generic Types

## _Icon Link_ [Generic Types](https://docs.fuel.network/docs/sway/advanced/generic_types/\#generic-types)

## _Icon Link_ [Basics](https://docs.fuel.network/docs/sway/advanced/generic_types/\#basics)

In Sway, generic types follow a very similar pattern to those in Rust. Let's look at some example syntax,
starting with a generic function:

```fuel_Box fuel_Box-idXKMmm-css
fn noop<T>(argument: T) -> T {
    argument
}
```

_Icon ClipboardText_

Here, the `noop()` function trivially returns exactly what was given to it. `T` is a _type parameter_, and it says
that this function exists for all types T. More formally, this function could be typed as:

```fuel_Box fuel_Box-idXKMmm-css
noop :: ∀T. T -> T
```

_Icon ClipboardText_

Generic types are a way to refer to types _in general_, meaning without specifying a single type. Our `noop` function
would work with any type in the language, so we don't need to specify `noop(argument: u8) -> u8`, `noop(argument: u16) -> u16`, etc.

## _Icon Link_ [Code Generation](https://docs.fuel.network/docs/sway/advanced/generic_types/\#code-generation)

One question that arises when dealing with generic types is: how does the assembly handle this? There are a few approaches to handling
generic types at the lowest level. Sway uses a technique called [monomorphization _Icon Link_](https://en.wikipedia.org/wiki/Monomorphization). This
means that the generic function is compiled to a non-generic version for every type it is called on. In this way, generic functions are
purely shorthand for the sake of ergonomics.

## _Icon Link_ [Trait Constraints](https://docs.fuel.network/docs/sway/advanced/generic_types/\#trait-constraints)

An important background to know before diving into trait constraints is that the `where` clause can be used to specify the required traits for the generic argument. So, when writing something like a `HashMap` you may
want to specify that the generic argument implements a `Hash` trait.

```fuel_Box fuel_Box-idXKMmm-css
fn get_hashmap_key<T>(key: T) -> b256
    where T: Hash
{
    // Code within here can then call methods associated with the Hash trait on Key
}
```

_Icon ClipboardText_

Of course, our `noop()` function is not useful. Often, a programmer will want to declare functions over types which satisfy certain traits.
For example, let's try to implement the successor function, `successor()`, for all numeric types.

```fuel_Box fuel_Box-idXKMmm-css
fn successor<T>(argument: T)
    where T: Add
{
    argument + 1
}
```

_Icon ClipboardText_

Run `forc build`, and you will get:

```fuel_Box fuel_Box-idXKMmm-css
.. |
 9 |   where T: Add
10 |   {
11 |       argument + 1
   |                  ^ Mismatched types: expected type "T" but saw type "u64"
12 |   }
13 |
```

_Icon ClipboardText_

This is because we don't know for a fact that `1`, which in this case defaulted to `1u64`, actually can be added to `T`. What if `T` is `f64`? Or `b256`? What does it mean to add `1u64` in these cases?

We can solve this problem with another trait constraint. We can only find the successor of some value of type `T` if that type `T` defines some incrementor. Let's make a trait:

```fuel_Box fuel_Box-idXKMmm-css
trait Incrementable {
    /// Returns the value to add when calculating the successor of a value.
    fn incrementor() -> Self;
}
```

_Icon ClipboardText_

Now, we can modify our `successor()` function:

```fuel_Box fuel_Box-idXKMmm-css
fn successor<T>(argument: T)
    where T: Add,
          T: Incrementable
{
    argument + T::incrementor()
}
```

_Icon ClipboardText_

## _Icon Link_ [Generic Structs and Enums](https://docs.fuel.network/docs/sway/advanced/generic_types/\#generic-structs-and-enums)

Just like functions, structs and enums can be generic. Let's take a look at the standard library version of `Option<T>`:

```fuel_Box fuel_Box-idXKMmm-css
enum Option<T> {
    Some: T,
    None: (),
}
```

_Icon ClipboardText_

Just like an unconstrained generic function, this type exists for all (∀) types `T`. `Result<T, E>` is another example:

```fuel_Box fuel_Box-idXKMmm-css
enum Result<T, E> {
    Ok: T,
    Err: E,
}
```

_Icon ClipboardText_

Both generic enums and generic structs can be trait constrained, as well. Consider this struct:

```fuel_Box fuel_Box-idXKMmm-css
struct Foo<T>
    where T: Add
{
    field_one: T,
}
```

_Icon ClipboardText_

## _Icon Link_ [Type Arguments](https://docs.fuel.network/docs/sway/advanced/generic_types/\#type-arguments)

Similar to Rust, Sway has what is colloquially known as the [turbofish _Icon Link_](https://github.com/rust-lang/rust/blob/e98309298d927307c5184f4869604bd068d26183/src/test/ui/parser/bastion-of-the-turbofish.rs). The turbofish looks like this: `::<>` (see the little fish with bubbles behind it?). The turbofish is used to annotate types in a generic context. Say you have the following function:

```fuel_Box fuel_Box-idXKMmm-css
fn foo<T, E>(t: T) -> Result<T, E> {
    Ok(t)
}
```

_Icon ClipboardText_

In this code example, which is admittedly asinine, you can't possibly know what type `E` is. You'd need to provide the type manually, with a turbofish:

```fuel_Box fuel_Box-idXKMmm-css
fn foo<T, E>(t: T) -> Result<T, E> {
    Ok::<T, MyErrorType>(t)
}
```

_Icon ClipboardText_

It is also common to see the turbofish used on the function itself:

```fuel_Box fuel_Box-idXKMmm-css
fn main() {
    foo::<Bar, Baz>()
}
```

_Icon ClipboardText_