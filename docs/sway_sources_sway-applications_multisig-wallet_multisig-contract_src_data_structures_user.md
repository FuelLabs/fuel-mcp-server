# Example: sway_sources/sway-applications/multisig-wallet/multisig-contract/src/data_structures/user.sw

```sway
library;

/// The information about a specific user.
pub struct User {
    /// The wallet address of a user.
    address: b256,
    /// The number of approvals the user provides when approving.
    weight: u64,
}

```
