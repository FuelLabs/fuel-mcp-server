[Guides](https://docs.fuel.network/guides/) /

Intro to Sway

## _Icon Link_ [Introduction to Sway Language for JavaScript Developers (React App)](https://docs.fuel.network/guides/intro-to-sway/\#introduction-to-sway-language-for-javascript-developers-react-app)

If you're familiar with JavaScript and have a basic understanding of blockchain fundamentals, you can swiftly grasp how to build full-stack decentralized applications on Fuel using Sway. Once you get a handle on Sway's essentials, you'll be able to begin building your own dapp.

Within this tutorial, we will be crafting a Sway contract for an online marketplace similar to Amazon, where:

1. Sellers can list products.
2. Buyers can purchase those products.

![intro to sway app](https://docs.fuel.network/images/intro-to-sway.gif)

One of the compelling features of smart contracts is their immutability and permissionless nature. This ensures that no single entity can modify or adjust the rules of the marketplace after its deployment. For instance, once a product is listed in the contract, the deployer cannot suddenly alter its status. Similarly, if a commission amount is hardcoded into the contract, it remains fixed, preventing any changes to the commission charged for products.

Furthermore, the contract remains open for interaction by anyone. This universality allows any individual to engage with the marketplace using their custom frontend without requiring permission.

In this tutorial, our attention will be specifically directed towards the `contract` program type. This is just one of the [four program types](https://docs.fuel.network/docs/sway/sway-program-types/) inherent to the Sway language.

## _Icon Link_ [What is Sway?](https://docs.fuel.network/guides/intro-to-sway/\#what-is-sway)

Sway is a strongly-typed programming language based on Rust, designed for authoring smart contracts on the Fuel blockchain. It leverages Rust's performance, control, and safety attributes, making it suitable for a blockchain virtual machine environment that's optimized for gas costs and contract security.

Sway is bolstered by a robust compiler and toolchain. These tools simplify the complexities and ensure that your code is efficient, secure, and performs optimally.

What truly distinguishes Sway is the exceptional suite of tools built around it. These tools are meticulously designed to convert contracts into full-stack dapps, ensuring a seamless and unparalleled developer experience.

📚 [Sway Standard Library _Icon Link_](https://fuellabs.github.io/sway/master/std/): A native library equipped with useful types and methods.

🧑‍🔧 [Fuelup _Icon Link_](https://install.fuel.network/latest/): The official Fuel toolchain manager aids in installing and managing different versions.

🦀 [Fuel's Rust SDK _Icon Link_](https://docs.fuel.network/docs/fuels-rs/): Test and interact with your Sway contracts using Rust.

⚡ [Fuel's TypeScript SDK _Icon Link_](https://docs.fuel.network/docs/fuels-ts/): Test and interact with your Sway contracts using TypeScript.