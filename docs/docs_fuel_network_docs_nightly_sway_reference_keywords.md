[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Reference](https://docs.fuel.network/docs/nightly/sway/reference/) /

Keywords

## _Icon Link_ [Keywords](https://docs.fuel.network/docs/nightly/sway/reference/keywords/\#keywords)

The following list contains keywords that are reserved for current or
future use by the Sway language. As such, they cannot be used as
identifiers. Identifiers are names of functions, variables,
parameters, modules, constants, attributes, types or
traits, etc.

## _Icon Link_ [Keywords Currently in Use](https://docs.fuel.network/docs/nightly/sway/reference/keywords/\#keywords-currently-in-use)

The following is a list of keywords currently in use, with their
functionality described.

- `as` \- rename items in `use` statements, e.g., `use type::a as alias_name`
- [`abi`](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/#the-abi-declaration) \- defines a smart contract ABI in a syntactically similar way to traits
- [`break`](https://docs.fuel.network/docs/nightly/sway/basics/control_flow/#break-and-continue) \- exit a loop immediately
- [`const`](https://docs.fuel.network/docs/nightly/sway/basics/constants/) \- define constant items
- [`continue`](https://docs.fuel.network/docs/nightly/sway/basics/control_flow/#break-and-continue) \- continue to the next loop iteration
- `else` \- used in conjunction with `if` conditions for control flow constructs
- [`enum`](https://docs.fuel.network/docs/nightly/sway/basics/structs_tuples_and_enums/#enums) \- define an enumeration
- `false` \- Boolean false literal
- [`fn`](https://docs.fuel.network/docs/nightly/sway/basics/functions/)\- define a function or the function pointer type
- [`if`](https://docs.fuel.network/docs/nightly/sway/basics/control_flow/#if-expressions) \- branch based on the result of a conditional expression
- `impl` \- implement inherent or trait functionality
- `let` \- bind a variable
- [`match`](https://docs.fuel.network/docs/nightly/sway/basics/control_flow/#match-expressions) \- exhaustively match a value to patterns
- `mod` \- define a module
- `mut` \- denote mutability in references, or pattern bindings
- `pub` \- denote public visibility of Sway data structures, traits, or modules
- `ref` \- bind by reference
- `return` \- return early from a function
- `Self` \- a type alias for the type we are defining or implementing
- `self` \- method subject
- [`struct`](https://docs.fuel.network/docs/nightly/sway/basics/structs_tuples_and_enums/#structs) \- define a structure
- [`trait`](https://docs.fuel.network/docs/nightly/sway/advanced/traits/#declaring-a-trait) \- define a trait
- `true` \- Boolean true literal
- [`type`](https://docs.fuel.network/docs/nightly/sway/advanced/advanced_types/#creating-type-synonyms-with-type-aliases) \- define a type alias or associated type
- `use` \- bring symbols into scope
- `where` \- specifies traits for generic types
- [`while`](https://docs.fuel.network/docs/nightly/sway/basics/control_flow/#while) \- loop conditionally based on the result of an expression

## _Icon Link_ [Keywords Reserved for Possible Future Use](https://docs.fuel.network/docs/nightly/sway/reference/keywords/\#keywords-reserved-for-possible-future-use)

- `abstract`
- `async`
- `await`
- `become`
- `box`
- `do`
- `dyn`
- `extern`
- `for`
- `in`
- `loop`
- `macro`
- `move`
- `override`
- `priv`
- `static`
- `super`
- `try`
- `typeof`
- `unsafe`
- `unsized`
- `virtual`
- `yield`

## _Icon Link_ [Special Keywords](https://docs.fuel.network/docs/nightly/sway/reference/keywords/\#special-keywords)

## _Icon Link_ [Program Keywords](https://docs.fuel.network/docs/nightly/sway/reference/keywords/\#program-keywords)

Keywords associated with defining the type of Sway program to compile

- [`contract`](https://docs.fuel.network/docs/nightly/sway/sway-program-types/smart_contracts/) \- analogous to a deployed API with some database state
- [`library`](https://docs.fuel.network/docs/nightly/sway/sway-program-types/libraries/) \- Sway code that defines new common behavior
- [`predicate`](https://docs.fuel.network/docs/nightly/sway/sway-program-types/predicates/) \- programs that return a Boolean value and which represent ownership of some resource upon execution to true
- [`script`](https://docs.fuel.network/docs/nightly/sway/sway-program-types/scripts/) \- a runnable bytecode on the chain, which executes once to perform a task

## _Icon Link_ [Attribute Keywords](https://docs.fuel.network/docs/nightly/sway/reference/keywords/\#attribute-keywords)

Keywords associated with defining the functionality of attributes

- [`allow`](https://docs.fuel.network/docs/nightly/sway/reference/attributes/#allow) \- overrides checks that would otherwise result in errors or warnings
- [`doc`](https://docs.fuel.network/docs/nightly/sway/reference/attributes/#doc) \- specifies documentation
- [`inline`](https://docs.fuel.network/docs/nightly/sway/reference/attributes/#inline) \- suggests that a copy of the attributed function should be placed in the caller, rather than generating code to call the function where it is defined
- [`payable`](https://docs.fuel.network/docs/nightly/sway/reference/attributes/#payable) \- implies method is payable for compile time
- [`storage`](https://docs.fuel.network/docs/nightly/sway/reference/attributes/#storage) \- declaration that contains a list of stored variables
- [`test`](https://docs.fuel.network/docs/nightly/sway/reference/attributes/#test) \- marks a function to be executed as a test
- [`deprecated`](https://docs.fuel.network/docs/nightly/sway/reference/attributes/#deprecated) \- marks an item as deprecated