# Example: sway_sources/sway-applications/english-auction/auction-contract/src/data_structures/state.sw

```sway
library;

/// The state of an auction.
pub enum State {
    /// The state at which the auction is no longer accepting bids.
    Closed: (),
    /// The state where bids may be placed on an auction.
    Open: (),
}

impl core::ops::Eq for State {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (State::Open, State::Open) => true,
            (State::Closed, State::Closed) => true,
            _ => false,
        }
    }
}

```
