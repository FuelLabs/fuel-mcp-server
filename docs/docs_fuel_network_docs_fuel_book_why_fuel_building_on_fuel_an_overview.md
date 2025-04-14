[Docs](https://docs.fuel.network/) /

[Fuel Book](https://docs.fuel.network/docs/fuel-book/) /

[Why Fuel](https://docs.fuel.network/docs/fuel-book/why-fuel/) /

Building on Fuel an Overview

## _Icon Link_ [Building on Fuel: An Overview](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/\#building-on-fuel-an-overview)

Building on Fuel empowers developers to create high-performance, scalable decentralized applications with cutting-edge tools and infrastructure. Fuel’s architecture prioritizes speed, security, and developer productivity. This section outlines the core components of the Fuel ecosystem. We will explore each component in further detail in [Part 2](https://docs.fuel.network/docs/fuel-book/the-architecture/).

## _Icon Link_ [The FuelVM (Fuel Virtual Machine)](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/\#the-fuelvm-fuel-virtual-machine)

The FuelVM incorporates years of blockchain design to bring the Ethereum community a reliable machine architecture built for longevity. It drives the Fuel Network and delivers exceptional performance by processing transactions in parallel. Unlike most blockchain virtual machines like the Ethereum Virtual Machine (EVM), which execute transactions serially, FuelVM handles concurrent processing, dramatically increasing throughput.

The FuelVM draws on a variety of architectures, including RISC-V, ARM ISAs, Bitcoin scripts, and the Ethereum Virtual Machine, to create a low-level execution environment optimized for blockchain use cases. By offering state-minimized facilities like native assets, ephemeral scripting, and spending conditions, it reduces the load on full nodes, improving network sustainability. Developers can avoid the inefficiencies of traditional state-heavy designs and build applications that deliver high performance while keeping the network decentralized and accessible.

As of May 2024, the FuelVM can achieve asset transfer benchmarks of 21,000 transactions per second (TPS) per core on high-end CPUs, offering unparalleled speed for modern blockchain applications.

## _Icon Link_ [The Fuel Transaction Architecture](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/\#the-fuel-transaction-architecture)

Fuel’s transaction architecture brings together lessons from Bitcoin, Ethereum, Cosmos, and Solana to create a highly parallel and efficient transaction model. By using a UTXO (Unspent Transaction Output) model, Fuel enables parallel execution both within and across blocks, allowing developers to process transactions quickly without overloading the network.

Fuel transactions are flexible enough to handle everything from simple asset transfers to complex multi-party, multi-asset interactions and batch smart-contract calls. Developers can build sophisticated applications using advanced conditional logic with predicates, reducing the need for state-heavy smart contracts. By minimizing reliance on state, developers can ensure that applications perform efficiently without overburdening network resources.

Fuel’s transaction model also solves concurrency issues seen in other UTXO-based blockchains. This maintains a familiar developer experience for those coming from Ethereum while benefiting from the performance advantages of UTXO-based execution.

## _Icon Link_ [Fuel Ignition (Rollup)](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/\#fuel-ignition-rollup)

Fuel Ignition will be the first Fuel V2 rollup to go live on Ethereum Mainnet. It aims to surpass traditional EVM rollups by delivering a vastly improved execution design. Initially starting as a more trustful Layer-2, Ignition’s ultimate goal is to evolve into a fully Ethereum-secured rollup with fraud proving, decentralized sequencing, and secure upgrades via a delayed multi-signature process.

Ignition’s focus on leveraging Ethereum’s security ensures that developers can build high-performance applications while benefiting from the strong security guarantees Ethereum offers. As Ignition develops, it will incorporate decentralized sequencing and Ethereum-based data availability (DA), further enhancing its trustless, scalable design.

## _Icon Link_ [The Fuel Network](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/\#the-fuel-network)

Fuel operates as a network of interconnected rollups, designed to offer seamless interaction between different blockchains and rollups. Fuel rollups diverge from the copy-paste approach common in many rollup networks. Fuel's customizable VM configurations enable tailoring each network blockchain to developers' specific needs, enhancing adaptability across diverse use cases. Combined with its decentralized block production model, enabled by a shared sequencing and builder network, Fuel provides a fair and efficient system for managing transaction inclusion and interoperation between rollups.

## _Icon Link_ [Developer Tooling](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/\#developer-tooling)

The Fuel project realized early on the importance of thoughtful and considerate developer tooling. We consider developer time one of our community's most important assets and aim to optimize it for building high-value code. To maximize developer productivity and enable the creation of future-proof applications, we created our own suite of tools. These tools streamline building, testing, and deploying decentralized applications, freeing developers to focus on innovation.

**Sway:** Sway is a domain specific language (DSL) for modern blockchain programming which has familiar syntax, grammar and design ideology to Rust while incorporating blockchain specific functionality such as smart contract interface concepts. Sway is inherently designed to save developers time by providing a single programming language for constructing all critical blockchain application components such as: predicates, scripts, smart contracts, libraries, testing, deployment scripting, indexing and more.

Why not Rust or Solidity? Rust, primarily designed as a systems language, heavily bonds to the Low Level Virtual Machine (LLVM) toolchain and lacks focus on the special considerations of blockchain development. Solidity, a powerful language for developing on the Ethereum Virtual Machine, has many known shortcomings. Sway aims to combine the best aspects of both languages, offering developers a familiar yet powerful tool for blockchain development.

Other tools include:

- **Forc (Fuel Orchestrator):** This command-line toolchain serves as the backbone of Fuel development. It supports everything from compiling Sway smart contracts to managing dependencies and deploying applications. Forc simplifies the entire development process, ensuring that developers can build robust dApps with ease.

- **Fuel Rust SDK:** The Rust SDK allows developers to interact with Fuel’s blockchain using the Rust programming language. It offers a seamless experience for creating system-level applications and managing interactions with the Fuel Network.

- **Fuel Wallet SDK:** The Fuel Wallet SDK provides developers with the tools to create secure, user-friendly wallets that natively interact with the Fuel ecosystem. It ensures developers can easily build wallets that integrate into decentralized applications.

- **Fuel Typescript SDK:** The Typescript SDK allows developers to integrate Fuel into web applications, simplifying interaction with the Fuel blockchain and enabling frontend developers to build decentralized applications that connect with Fuel’s infrastructure.