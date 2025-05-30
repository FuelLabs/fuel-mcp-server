[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

Sway Program Types

## _Icon Link_ [Sway Program Types](https://docs.fuel.network/docs/sway/sway-program-types/\#sway-program-types)

A Sway program itself has a type: it is either a _contract_, a _predicate_, a _script_, or a _library_. The first three of these things are all deployable to the blockchain. A _library_ is simply a project designed for code reuse and is never directly deployed to the chain.

Every Sway file _must_ begin with a declaration of what type of program it is. A project can have many libraries within it, but only one contract, script, or predicate. Scripts and predicates require `main` functions to serve as entry points, while contracts instead publish an ABI. This chapter will go into detail about all of these various types of programs and what purposes they serve.

Contracts are used primarily for protocols or systems that operate within a fixed set of rules. A good example would be a staking contract or a decentralized exchange (also called a DEX).

Scripts are used for complex on-chain interactions that won't persist. An example of this may be using a DEX and Lender to create a leveraged position (borrow, swap, re-collateralize) which is a complex transaction that would usually take multiple steps.

Libraries are for code that is reusable and useful for handling common situations. A good example of this would be a library to handle fixed-point math or big number math.

- [Contracts](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/)
- [Libraries](https://docs.fuel.network/docs/sway/sway-program-types/libraries/)
- [Scripts](https://docs.fuel.network/docs/sway/sway-program-types/scripts/)
- [Predicates](https://docs.fuel.network/docs/sway/sway-program-types/predicates/)