# Example: sway_sources/fluid-protocol/contracts/mock-pyth-contract/src/main.sw

```sway
contract;
// This contract, MockPyth, is a mock implementation of the Pyth oracle interface.
// It is used for testing and simulation purposes within the Fluid Protocol.
//
// Key functionalities include:
// - Simulating price feeds for testing purposes
// - Providing a mock interface for interacting with the Pyth oracle
// - Ensuring compatibility with the Pyth oracle interface for testing
//
// To the auditor: This contract is not used in the system. It is only used for testing.
use std::{block::timestamp, hash::Hash};
use pyth_interface::data_structures::price::{Price, PriceFeed, PriceFeedId};
storage {
    latest_price_feed: StorageMap<PriceFeedId, Price> = StorageMap {},
}
abi PythCore {
    #[storage(read)]
    fn price(price_feed_id: PriceFeedId) -> Price;
    #[storage(read)]
    fn price_unsafe(price_feed_id: PriceFeedId) -> Price;
    // Directly exposed but logic is simplified
    #[storage(write)]
    fn update_price_feeds(feeds: Vec<(PriceFeedId, Price)>);
}
impl PythCore for Contract {
    #[storage(read)]
    fn price(price_feed_id: PriceFeedId) -> Price {
        let price_feed = storage.latest_price_feed.get(price_feed_id).try_read();
        require(price_feed.is_some(), "Price feed not found");

        return price_feed.unwrap();
    }
    #[storage(read)]
    fn price_unsafe(price_feed_id: PriceFeedId) -> Price {
        let price_feed = storage.latest_price_feed.get(price_feed_id).try_read();
        require(price_feed.is_some(), "Price feed not found");

        return price_feed.unwrap();
    }
    #[storage(write)]
    fn update_price_feeds(feeds: Vec<(PriceFeedId, Price)>) {
        let mut feed_index = 0;
        while feed_index < feeds.len() {
            storage
                .latest_price_feed
                .insert(
                    feeds
                        .get(feed_index)
                        .unwrap().0,
                    feeds
                        .get(feed_index)
                        .unwrap().1,
                );
            feed_index += 1;
        }
    }
}

```
