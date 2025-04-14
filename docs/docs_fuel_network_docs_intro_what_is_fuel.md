[Docs](https://docs.fuel.network/) /

Intro  /

What Is Fuel

## _Icon Link_ [What is Fuel?](https://docs.fuel.network/docs/intro/what-is-fuel/\#what-is-fuel)

Fuel is an operating system purpose built for Ethereum Rollups.
Fuel allows rollups to solve for PSI (parallelization, state minimized execution, interoperability) without making any sacrifices.

Here is how we do it:

## _Icon Link_ [FuelVM](https://docs.fuel.network/docs/intro/what-is-fuel/\#fuelvm)

The FuelVM learns from the Ethereum ecosystem.
It implements improvements suggested to the Ethereum VM (EVM) for many years that couldn’t be implemented due to the need to maintain backward compatibility, including parallel transaction execution and multiple native assets.

Fuel delivers unmatched processing capacity through its ability to execute transactions in parallel by using strict state access lists in the form of a UTXO model.
With the FuelVM, Fuel full nodes identify the accounts a transaction touches, mapping out dependencies before execution.
This enables Fuel to use far more threads and cores of your CPU that are typically idle in single-threaded blockchains.
As a result, Fuel can deliver far more compute, state accesses, and transactional throughput than its single-threaded counterparts.

## _Icon Link_ [Sway Language](https://docs.fuel.network/docs/intro/what-is-fuel/\#sway-language)

Fuel provides a powerful and sleek developer experience with our own domain-specific language (DSL) called Sway.
Sway is based on Rust and includes syntax to leverage a blockchain VM without needlessly verbose boilerplate.
Sway was created alongside the FuelVM and designed for the high-compute Fuel environment.

## _Icon Link_ [Rust + Solidity = Sway](https://docs.fuel.network/docs/intro/what-is-fuel/\#rust--solidity--sway)

Sway prioritizes compile-time analysis and safety, similar to Rust’s borrow checker and safety-first semantics.
Additionally, it has the syntax of Rust. From Solidity, Sway took the notion of a smart-contract-paradigm language with built-in top-level contract storage and blockchain mechanisms for ergonomic and safe contract programming.

Sway brings the notion of static auditing to smart contracts.
In addition, Sway is highly performant and has extensible optimization passes and a modular backend for targeting different blockchain architectures.

[**_Icon Code_ Sway**\\
\\
Read the official Sway documentation.](https://docs.fuel.network/docs/sway)

[**_Icon Browser_ Sway Playground**\\
\\
Get started experimenting with Sway in the browser. \\
\\
_Icon Link_](https://sway-playground.org/)

[**_Icon Beach_ Sway By Example**\\
\\
An introduction to Sway with bite-sized simple examples \\
\\
_Icon Link_](https://swaybyexample.com/)

[**_Icon Robot_ Sway Examples**\\
\\
Examples of full-stack DeFi applications \\
\\
_Icon Link_](https://github.com/FuelLabs/sway-examples)

[**_Icon Book_ Sway Libraries**\\
\\
Find useful libraries written in Sway.](https://docs.fuel.network/docs/sway-libs)

[**_Icon Book_ Sway Standards**\\
\\
Learn about standards for the Sway language](https://docs.fuel.network/docs/sway-standards)

[**_Icon Book_ std-lib Reference**\\
\\
Find definitions for helpful types and methods in Sway. \\
\\
_Icon Link_](https://fuellabs.github.io/sway/master/std/)

[**_Icon Apps_ Example Applications**\\
\\
Explore end-to-end applications written in Sway. \\
\\
_Icon Link_](https://github.com/FuelLabs/sway-applications)

## _Icon Link_ [Developer Tooling](https://docs.fuel.network/docs/intro/what-is-fuel/\#developer-tooling)

Part of what makes Sway so powerful is the fantastic suite of developer tools surrounding it.
The Fuel development environment retains the benefits of smart contract languages like Solidity, while adopting the paradigms introduced in the Rust tooling ecosystem.

Now, developers can have a completely vertically integrated experience where every component, from the virtual machine to the CLI, works in harmony.

## _Icon Link_ [Sway Tooling](https://docs.fuel.network/docs/intro/what-is-fuel/\#sway-tooling)

[**_Icon Tool_ Forc**\\
\\
Explore the Fuel Orchestrator that helps you build, test, and deploy your Sway projects.](https://docs.fuel.network/docs/forc)

[**_Icon Settings_ Fuelup**\\
\\
Learn more about the official Fuel toolchain manager that helps install and manage versions.](https://docs.fuel.network/guides/installation/)

## _Icon Link_ [SDKs & API](https://docs.fuel.network/docs/intro/what-is-fuel/\#sdks--api)

[**_Icon BrandRust_ Rust SDK**\\
\\
Test and interact with your Sway program in Rust.](https://docs.fuel.network/docs/fuels-rs)

[**_Icon BrandTypescript_ Typescript SDK**\\
\\
Test and interact with your Sway program in TypeScript.](https://docs.fuel.network/docs/fuels-ts)

[**_Icon Wallet_ Wallet SDK**\\
\\
Seamlessly integrate a wallet into your application.](https://docs.fuel.network/docs/wallet)

[**_Icon ChartDots3_ GraphQL API**\\
\\
Learn about the GraphQL API and interact with the Fuel Network.](https://docs.fuel.network/docs/graphql)

## _Icon Link_ [Network](https://docs.fuel.network/docs/intro/what-is-fuel/\#network)

[**_Icon ListDetails_ Specs**\\
\\
Explore the specifications for the Fuel Network.](https://docs.fuel.network/docs/specs)

[**_Icon Search_ Explorer**\\
\\
Explore transactions on the Fuel network. \\
\\
_Icon Link_](https://app.fuel.network/)

[**_Icon BuildingBridge_ Bridge**\\
\\
Bridge assets to the Fuel network. \\
\\
_Icon Link_](https://app.fuel.network/bridge)

[**_Icon Coin_ Faucet**\\
\\
Get testnet testnet tokens. \\
\\
_Icon Link_](https://faucet-testnet.fuel.network/)