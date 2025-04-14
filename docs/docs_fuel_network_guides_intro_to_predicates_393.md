[Guides](https://docs.fuel.network/guides/) /

Intro to Predicates

## _Icon Link_ [Predicates 101: Building Stateless DeFi Applications](https://docs.fuel.network/guides/intro-to-predicates/\#predicates-101-building-stateless-defi-applications)

Predicates are Fuel's approach to stateless account abstraction. In the blockchain space, we are constantly faced with the exponential growth of state bloat that just isn't sustainable in the long term.
In the Ethereum ecosystem, every contract deployed requires state storage on the blockchain indefinitely.
To help with blockchain scalability, we need to consider different approaches to redefine state-minimized applications that are fundamental to the world of decentralized finance.

This tutorial will specifically concentrate on the `predicate` program type, one of the [four program types](https://docs.fuel.network/docs/sway/sway-program-types/) in the Sway language and how we can solve this ever growing problem.

## _Icon Link_ [What are Predicates?](https://docs.fuel.network/guides/intro-to-predicates/\#what-are-predicates)

To define Predicates into one sentence:

> _Icon InfoCircle_
>
> Predicates are **stateless** programs that return **true** or **false**.

A predicate is represented by an Address type, identical to any EOA (Externally Owned Account) created by a private key. The bytecode of the program can be deterministically hashed and represented as an ordinary address, all calculated off-chain.
Therefore, when this address contains assets, ANYONE can spend the assets locked behind the predicate if they can evaluate the predicate to be true. It might be helpful to think of the code as the private key to the wallet.

If this concept is still a bit unclear don't worry!, let's explore a simple example in the next part of the project setup.

📚 [Sway Standard Library _Icon Link_](https://fuellabs.github.io/sway/master/std/): A native library equipped with useful types and methods.

🧑‍🔧 [Fuelup _Icon Link_](https://install.fuel.network/latest/): The official Fuel toolchain manager aids in installing and managing different versions.

🦀 [Fuel's Rust SDK _Icon Link_](https://docs.fuel.network/docs/fuels-rs/): Test and interact with your Sway contracts using Rust.

⚡ [Fuel's TypeScript SDK _Icon Link_](https://docs.fuel.network/docs/fuels-ts/): Test and interact with your Sway contracts using TypeScript.