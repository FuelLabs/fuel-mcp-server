[Docs](https://docs.fuel.network/) /

[Node Operator](https://docs.fuel.network/docs/node-operator/) /

Fuel Sequencer

## _Icon Link_ [Running a Fuel Sequencer Node or Validator](https://docs.fuel.network/docs/node-operator/fuel-sequencer/\#running-a-fuel-sequencer-node-or-validator)

Below is a summary of key information to help you get started with running a node for the Fuel Sequencer blockchain.

For more details, please refer to the deployment [repository _Icon Link_](https://github.com/FuelLabs/fuel-sequencer-deployments/).

## _Icon Link_ [Hardware Requirements](https://docs.fuel.network/docs/node-operator/fuel-sequencer/\#hardware-requirements)

| Hardware | Minimum | Recommended |
| --- | --- | --- |
| Processor | 4 Cores | 8 Cores |
| Memory | 8 GB | 16 GB |
| Storage | 200 GB | 1 TB |

## _Icon Link_ [Port Configuration](https://docs.fuel.network/docs/node-operator/fuel-sequencer/\#port-configuration)

Unless otherwise configured, the following ports should be available:

- **Sequencer**: 26656, 26657, 9090, 1317
- **Sidecar**: 8080
- **Ethereum**: 8545, 8546

These components interact with each other, so any changes to the port configuration must be reflected in the corresponding components. Specifically:

- Changes to **Sequencer ports** must be updated in the **Sidecar's runtime flags**.
- Changes to the **Sidecar port** must be updated in the **Sequencer's app config**.
- Changes to **Ethereum ports** must be updated in the **Sidecar's runtime flags**.

## _Icon Link_ [Getting Started](https://docs.fuel.network/docs/node-operator/fuel-sequencer/\#getting-started)

Depending on your needs, you can choose one of the following setups:

1. **[Running a Mainnet Fuel Sequencer Node](https://docs.fuel.network/docs/node-operator/fuel-sequencer/mainnet-node/):** Your local node will connect to and sync with the mainnet Fuel Sequencer network.
2. **[Running a Mainnet Fuel Sequencer Validator](https://docs.fuel.network/docs/node-operator/fuel-sequencer/mainnet-validator/):** Your local node will connect to, sync with, and validate transactions on the mainnet Fuel Sequencer network.
3. **[Running a Testnet Fuel Sequencer Node](https://docs.fuel.network/docs/node-operator/fuel-sequencer/testnet-node/):** Your local node will connect to and sync with the testnet Fuel Sequencer network.
4. **[Running a Testnet Fuel Sequencer Validator](https://docs.fuel.network/docs/node-operator/fuel-sequencer/testnet-validator/):** Your local node will connect to, sync with, and validate transactions on the testnet Fuel Sequencer network.