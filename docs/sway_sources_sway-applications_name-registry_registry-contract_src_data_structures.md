# Example: sway_sources/sway-applications/name-registry/registry-contract/src/data_structures.sw

```sway
library;

/// Object containing data about an entry in the registry
pub struct Record {
    /// The timestamp at which the name expires, and someone else can re-register the same name
    pub expiry: u64,
    /// The identity to which the name resolves to
    pub identity: Identity,
    /// The identity which controls the name, and can change the identity and owner
    pub owner: Identity,
}

impl Record {
    /// Create a new instance of a record
    ///
    /// # Arguments
    ///
    /// * `expiry`: [u64] - The timestamp at which the name expires, and someone else can re-register the same name
    /// * `identity`: [Identity] - The identity to which the name resolves to
    /// * `owner`: [Identity] - The identity which controls the name, and can change the identity and owner
    ///
    /// # Returns
    ///
    /// * [Self] - Struct containing information about a record
    pub fn new(expiry: u64, identity: Identity, owner: Identity) -> Self {
        Self {
            expiry,
            identity,
            owner,
        }
    }
}

```
