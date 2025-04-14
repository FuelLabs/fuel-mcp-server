[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Reference](https://docs.fuel.network/docs/sway/reference/) /

Attributes

## _Icon Link_ [Attributes](https://docs.fuel.network/docs/sway/reference/attributes/\#attributes)

The Sway compiler supports a list of attributes that perform various operations that are useful for building, testing and documenting Sway programs. Below is a list of all available attributes:

## _Icon Link_ [Allow](https://docs.fuel.network/docs/sway/reference/attributes/\#allow)

The `#[allow(...)]` attribute overrides checks so that violations will go unreported. The following checks can be disabled:

- `#[allow(dead_code)]` disable checks for dead code;
- `#[allow(deprecated)]` disables checks for usage of deprecated structs, functions and other items.

## _Icon Link_ [Doc](https://docs.fuel.network/docs/sway/reference/attributes/\#doc)

The `#[doc(..)]` attribute specifies documentation.

Line doc comments beginning with exactly three slashes `///`, are interpreted as a special syntax for doc attributes. That is, they are equivalent to writing `#[doc("...")]` around the body of the comment, i.e., `/// Foo` turns into `#[doc("Foo")]`

Line comments beginning with `//!` are doc comments that apply to the module of the source file they are in. That is, they are equivalent to writing `#![doc("...")]` around the body of the comment. `//!` module level doc comments should be at the top of Sway files.

Documentation can be generated from doc attributes using `forc doc`.

## _Icon Link_ [Inline](https://docs.fuel.network/docs/sway/reference/attributes/\#inline)

The inline attribute suggests that a copy of the attributed function should be placed in the caller, rather than generating code to call the function where it is defined.

> _Icon InfoCircle_
>
> **Note**: The Sway compiler automatically inlines functions based on internal heuristics. Incorrectly inlining functions can make the program slower, so this attribute should be used with care.

The `#[inline(never)]` attribute _suggests_ that an inline expansion should never be performed.

The `#[inline(always)]` attribute _suggests_ that an inline expansion should always be performed.

> _Icon InfoCircle_
>
> **Note**: `#[inline(..)]` in every form is a hint, with no _requirements_
> on the language to place a copy of the attributed function in the caller.

## _Icon Link_ [Payable](https://docs.fuel.network/docs/sway/reference/attributes/\#payable)

The lack of `#[payable]` implies the method is non-payable. When calling an ABI method that is non-payable, the compiler emits an error if the amount of coins forwarded with the call is not guaranteed to be zero. Note that this is strictly a compile-time check and does not incur any runtime cost.

## _Icon Link_ [Storage](https://docs.fuel.network/docs/sway/reference/attributes/\#storage)

In Sway, functions are pure by default but can be opted into impurity via the `storage` function attribute. The `storage` attribute may take `read` and/or `write` arguments indicating which type of access the function requires.

The `#[storage(read)]` attribute indicates that a function requires read access to the storage.

The `#[storage(write)]` attribute indicates that a function requires write access to the storage.

More details in [Purity](https://docs.fuel.network/docs/sway/blockchain-development/purity/).

## _Icon Link_ [Test](https://docs.fuel.network/docs/sway/reference/attributes/\#test)

The `#[test]` attribute marks a function to be executed as a test.

The `#[test(should_revert)]` attribute marks a function to be executed as a test that should revert.

More details in [Unit Testing](https://docs.fuel.network/docs/sway/testing/unit-testing/).

## _Icon Link_ [Deprecated](https://docs.fuel.network/docs/sway/reference/attributes/\#deprecated)

The `#[deprecated]` attribute marks an item as deprecated and makes the compiler emit a warning for every usage of the deprecated item. This warning can be disabled using `#[allow(deprecated)]`.

It is possible to improve the warning message with `#[deprecated(note = "your message")]`

## _Icon Link_ [Fallback](https://docs.fuel.network/docs/sway/reference/attributes/\#fallback)

The `#[fallback]` attribute makes the compiler use the marked function as the contract call fallback function, which means that, when a contract is called, and the contract selection fails, the fallback function will be called instead.