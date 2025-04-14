[Docs](https://docs.fuel.network/) /

Nightly /

[Node Operator](https://docs.fuel.network/docs/nightly/node-operator/) /

Fuel Ignition

## _Icon Link_ [Running a Fuel Ignition Node](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/\#running-a-fuel-ignition-node)

Below is a summary of important information to help you get started with running a node for the Layer 2 Fuel Ignition blockchain.

For the latest version of the Fuel client, please visit [this link _Icon Link_](https://github.com/FuelLabs/fuel-core).

## _Icon Link_ [Understanding Fuel Ignition's Consensus Mechanism](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/\#understanding-fuel-ignitions-consensus-mechanism)

Fuel Ignition operates on a Proof of Authority (PoA) consensus mechanism. Here’s a brief overview:

**Validators**: In PoA, there are specific entities, known as validators or "authorities", who are given the responsibility to create new blocks and validate transactions. Unlike other consensus mechanisms like Proof of Work (PoW) or Proof of Stake (PoS), where validators are chosen based on computational power or stake, PoA validators are selected based on their reputation and trustworthiness within the network.

**Benefits of PoA**: PoA provides faster transaction times and requires less computational power, making it more energy-efficient. The security and integrity of the network are maintained by the trustworthiness of the selected validators.

## _Icon Link_ [Hardware Requirements](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/\#hardware-requirements)

| Hardware | Minimum | Recommended |
| --- | --- | --- |
| Processor | 2 Cores | 8 Cores |
| Memory | 8 GB | 16 GB |
| Storage | 500 GB | 1 TB |

For low API traffic, an AWS m5.large instance should be sufficient. However, we recommend an AWS m5.4xlarge instance to match the configuration we use for running the network.

> _Icon InfoCircle_
>
> For routine tasks such as deploying simple contracts and testing contract interactions locally, you do not need to meet all the hardware requirements listed above.

## _Icon Link_ [Getting Started](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/\#getting-started)

Depending on your requirements, you can choose one of the following setups:

1. **[Run a Local Fuel Ignition Node](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/local-node/):** This setup allows you to run a node that operates solely in your local environment.
2. **[Connect to the Fuel Ignition Testnet](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/testnet-node/):** With this setup, your local node will connect and sync with Fuel Ignition.
3. **[Connect to the Fuel Ignition Mainnet](https://docs.fuel.network/docs/nightly/node-operator/fuel-ignition/mainnet-node/):** With this setup, your local node will connect and sync with the Mainnet version of Fuel Ignition.