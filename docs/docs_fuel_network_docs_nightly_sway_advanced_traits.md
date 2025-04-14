[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Advanced](https://docs.fuel.network/docs/nightly/sway/advanced/) /

Traits

## _Icon Link_ [Traits](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#traits)

## _Icon Link_ [Declaring a Trait](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#declaring-a-trait)

A _trait_ opts a type into a certain type of behavior or functionality that can be shared among types. This allows for easy reuse of code and generic programming. If you have ever used a typeclass in Haskell, a trait in Rust, or even an interface in Java, these are similar concepts.

Let's take a look at some code:

```fuel_Box fuel_Box-idXKMmm-css
trait Compare {
    fn equals(self, b: Self) -> bool;
} {
    fn not_equals(self, b: Self) -> bool {
        !self.equals(b)
    }
}
```

_Icon ClipboardText_

We have just declared a trait called `Compare`. After the name of the trait, there are two _blocks_ of code (a _block_ is code enclosed in `{` curly brackets `}`). The first block is the _interface surface_. The second block is the _methods_ provided by the trait. If a type can provide the methods in the interface surface, then it gets access to the methods in the trait for free! What the above trait is saying is: if you can determine if two values are equal, then for free, you can determine that they are not equal. Note that trait methods have access to the methods defined in the interface surface.

## _Icon Link_ [Implementing a Trait](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#implementing-a-trait)

The example below implements a `Compare` trait for `u64` to check if two numbers are equal. Let's take a look at how that is done:

```fuel_Box fuel_Box-idXKMmm-css
impl Compare for u64 {
    fn equals(self, b: Self) -> bool {
        self == b
    }
}
```

_Icon ClipboardText_

The above snippet declares all of the methods in the trait `Compare` for the type `u64`. Now, we have access to both the `equals` and `not_equals` methods for `u64`, as long as the trait `Compare` is in scope.

## _Icon Link_ [Supertraits](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#supertraits)

When using multiple traits, scenarios often come up where one trait may require functionality from another trait. This is where supertraits come in as they allow you to require a trait when implementing another trait, i.e., a trait with a trait.
A good example of this is the `Ord` trait of the `std` library of Sway. The `Ord` trait requires the `Eq` trait, so `Eq` is kept as a separate trait as one may decide to implement `Eq`
without implementing other parts of the `Ord` trait.

```fuel_Box fuel_Box-idXKMmm-css

trait Eq {
    fn equals(self, b: Self) -> bool;
}

trait Ord: Eq {
    fn gte(self, b: Self) -> bool;
}

impl Ord for u64 {
    fn gte(self, b: Self) -> bool {
        // As `Eq` is a supertrait of `Ord`, `Ord` can access the equals method
        self.equals(b) || self.gt(b)
    }
}
```

_Icon ClipboardText_

To require a supertrait, add a `:` after the trait name and then list the traits you would like to require and separate them with a `+`.

## _Icon Link_ [ABI supertraits](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#abi-supertraits)

ABIs can also have supertrait annotations:

```fuel_Box fuel_Box-idXKMmm-css
contract;

struct Foo {}
impl ABIsupertrait for Foo {
    fn foo() {}
}

trait ABIsupertrait {
    fn foo();
}

abi MyAbi : ABIsupertrait {
    fn bar();
} {
    fn baz() {
        Self::foo() // supertrait method usage
    }
}

impl ABIsupertrait for Contract {
    fn foo() {}
}

// The implementation of MyAbi for Contract must also implement ABIsupertrait
impl MyAbi for Contract {
    fn bar() {
        Self::foo() // supertrait method usage
    }
}

```

_Icon ClipboardText_

The implementation of `MyAbi` for `Contract` must also implement the `ABIsupertrait` trait. Methods in `ABIsupertrait` are not available externally, i.e. they're not actually contract methods, but they can be used in the actual contract methods, as shown in the example above.

ABI supertraits are intended to make contract implementations compositional, allowing combining orthogonal contract features using, for instance, libraries.

## _Icon Link_ [SuperABIs](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#superabis)

In addition to supertraits, ABIs can have _superABI_ annotations:

```fuel_Box fuel_Box-idXKMmm-css
contract;

abi MySuperAbi {
    fn foo();
}

abi MyAbi : MySuperAbi {
    fn bar();
}

impl MySuperAbi for Contract {
    fn foo() {}
}

// The implementation of MyAbi for Contract must also implement MySuperAbi
impl MyAbi for Contract {
    fn bar() {}
}

```

_Icon ClipboardText_

The implementation of `MyAbi` for `Contract` must also implement the `MySuperAbi` superABI. Methods in `MySuperAbi` will be part of the `MyAbi` contract interface, i.e. will be available externally (and hence cannot be called from other `MyAbi` contract methods).

SuperABIs are intended to make contract implementations compositional, allowing combining orthogonal contract features using, for instance, libraries.

## _Icon Link_ [Associated Items](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#associated-items)

Traits can declare different kinds of associated items in their interface surface:

- [Functions](https://docs.fuel.network/docs/nightly/sway/advanced/traits/#associated-functions)
- [Constants](https://docs.fuel.network/docs/nightly/sway/advanced/traits/#associated-constants)
- [Types](https://docs.fuel.network/docs/nightly/sway/advanced/traits/#associated-types)

## _Icon Link_ [Associated functions](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#associated-functions)

Associated functions in traits consist of just function signatures. This indicates that each implementation of the trait for a given type must define all the trait functions.

```fuel_Box fuel_Box-idXKMmm-css
trait Trait {
    fn associated_fn(self, b: Self) -> bool;
}
```

_Icon ClipboardText_

## _Icon Link_ [Associated constants](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#associated-constants)

Associated constants are constants associated with a type.

```fuel_Box fuel_Box-idXKMmm-css
trait Trait {
    const ID: u32 = 0;
}
```

_Icon ClipboardText_

The initializer expression of an [associated constants](https://docs.fuel.network/docs/nightly/sway/basics/constants/#associated-constants) in a trait definition may be omitted to indicate that each implementation of the `trait` for a given type must specify an initializer:

```fuel_Box fuel_Box-idXKMmm-css
trait Trait {
    const ID: u32;
}
```

_Icon ClipboardText_

Check the `associated consts` section on [constants](https://docs.fuel.network/docs/nightly/sway/basics/constants/) page.

## _Icon Link_ [Associated types](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#associated-types)

Associated types in Sway allow you to define placeholder types within a trait, which can be customized by concrete
implementations of that trait. These associated types are used to specify the return types of trait methods or to
define type relationships within the trait.

```fuel_Box fuel_Box-idXKMmm-css
trait MyTrait {
    type AssociatedType;
}
```

_Icon ClipboardText_

Check the `associated types` section on [associated types](https://docs.fuel.network/docs/nightly/sway/advanced/associated_types/) page.

## _Icon Link_ [Trait Constraints](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#trait-constraints)

When writing generic code, you can constraint the choice of types for a generic argument by using the `where` keyword. The `where` keyword specifies which traits the concrete generic parameter must implement. In the below example, the function `expects_some_trait` can be called only if the parameter `t` is of a type that has `SomeTrait` implemented. To call the `expects_both_traits`, parameter `t` must be of a type that implements _both_ `SomeTrait` and `SomeOtherTrait`.

```fuel_Box fuel_Box-idXKMmm-css
trait SomeTrait { }
trait SomeOtherTrait { }

fn expects_some_trait<T>(t: T) where T: SomeTrait {
    // ...
}

fn expects_some_other_trait<T>(t: T) where T: SomeOtherTrait {
    // ...
}

fn expects_both_traits<T>(t: T) where T: SomeTrait + SomeOtherTrait {
    // ...
}
```

_Icon ClipboardText_

## _Icon Link_ [Marker Traits](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#marker-traits)

Sway types can be classified in various ways according to their intrinsic properties. These classifications are represented as marker traits. Marker traits are implemented by the compiler and cannot be explicitly implemented in code.

E.g., all types whose instances can be used in the `panic` expression automatically implement the `Error` marker trait. We can use that trait, e.g., to specify that a generic argument must be compatible with the `panic` expression:

```fuel_Box fuel_Box-idXKMmm-css
fn panic_with_error<E>(err: E) where E: Error {
    panic err;
}
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note** `panic` expression and error types [have not yet been implemented _Icon Link_](https://github.com/FuelLabs/sway/issues/6765)

All marker traits are defined in the `std::marker` module.

## _Icon Link_ [Use Cases](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#use-cases)

## _Icon Link_ [Custom Types (structs, enums)](https://docs.fuel.network/docs/nightly/sway/advanced/traits/\#custom-types-structs-enums)

Often, libraries and APIs have interfaces that are abstracted over a type that implements a certain trait. It is up to the consumer of the interface to implement that trait for the type they wish to use with the interface. For example, let's take a look at a trait and an interface built off of it.

```fuel_Box fuel_Box-idXKMmm-css
library;

pub enum Suit {
    Hearts: (),
    Diamonds: (),
    Clubs: (),
    Spades: (),
}

pub trait Card {
    fn suit(self) -> Suit;
    fn value(self) -> u8;
}

fn play_game_with_deck<T>(a: Vec<T>) where T: Card {
    // insert some creative card game here
}
```

_Icon ClipboardText_

Now, if you want to use the function `play_game_with_deck` with your struct, you must implement `Card` for your struct. Note that the following code example assumes a dependency _games_ has been included in the `Forc.toml` file.

```fuel_Box fuel_Box-idXKMmm-css
script;

use games::*;

struct MyCard {
    suit: Suit,
    value: u8
}

impl Card for MyCard {
    fn suit(self) -> Suit {
        self.suit
    }
    fn value(self) -> u8 {
        self.value
    }
}

fn main() {
    let mut i = 52;
    let mut deck: Vec<MyCard> = Vec::with_capacity(50);
    while i > 0 {
        i = i - 1;
        deck.push(MyCard { suit: generate_random_suit(), value: i % 4}
    }
    play_game_with_deck(deck);
}

fn generate_random_suit() -> Suit {
  [ ... ]
}
```

_Icon ClipboardText_