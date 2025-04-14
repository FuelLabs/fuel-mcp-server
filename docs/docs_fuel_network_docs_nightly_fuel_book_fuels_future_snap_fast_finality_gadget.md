[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuel Book](https://docs.fuel.network/docs/nightly/fuel-book/) /

[Fuels Future](https://docs.fuel.network/docs/nightly/fuel-book/fuels-future/) /

Snap Fast Finality Gadget

## _Icon Link_ [SNAP Fast Finality Gadget](https://docs.fuel.network/docs/nightly/fuel-book/fuels-future/snap-fast-finality-gadget/\#snap-fast-finality-gadget)

One of the most well-known limitations of rollups is the long periods of time needed to send messages from the layer-2 back up to the layer-1 chain. Users of optimistic rollups such as Arbitrum and Optimism face a notable drawback: a week-long wait period for asset withdrawals from the network.While ZK-rollups do offer reduced settlement times, the economics of proving mean that proofs (and therefore withdrawals) can still take up to 24 hours to process.

Fuel has proposed a theoretical new mechanism for substantially reducing the finality time of optimistic rollups. While the full details are [outlined in a post on ETHResearch _Icon Link_](https://ethresear.ch/t/why-wait-a-week-fast-finality-optimistic-rollups/18868), the mechanism can be understood at a high level as using a bonded committee of operators to attest to both the validity of the chain, as well as the state of Ethereum not being censored.