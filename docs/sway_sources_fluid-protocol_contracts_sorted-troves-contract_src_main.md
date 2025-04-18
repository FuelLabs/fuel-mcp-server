# Example: sway_sources/fluid-protocol/contracts/sorted-troves-contract/src/main.sw

```sway
contract;

use libraries::sorted_troves_interface::{Node, SortedTroves};
use libraries::trove_manager_interface::TroveManager;
use libraries::fluid_math::{null_contract, null_identity_address};
use std::{
    asset::transfer,
    block::{
        height,
    },
    call_frames::{
        msg_asset_id,
    },
    context::{
        msg_amount,
    },
    hash::Hash,
};
configurable {
    /// Initializer identity
    INITIALIZER: Identity = Identity::Address(Address::zero()),
}

storage {
    max_size: u64 = 0,
    protocol_manager: ContractId = ContractId::zero(),
    borrower_operations_contract: ContractId = ContractId::zero(),
    head: StorageMap<AssetId, Identity> = StorageMap::<AssetId, Identity> {},
    tail: StorageMap<AssetId, Identity> = StorageMap::<AssetId, Identity> {},
    nodes: StorageMap<(Identity, AssetId), Node> = StorageMap::<(Identity, AssetId), Node> {},
    size: StorageMap<AssetId, u64> = StorageMap::<AssetId, u64> {},
    asset_trove_manager: StorageMap<AssetId, ContractId> = StorageMap::<AssetId, ContractId> {},
    valid_trove_manager: StorageMap<Identity, bool> = StorageMap::<Identity, bool> {},
    is_initialized: bool = false,
}

impl SortedTroves for Contract {
    #[storage(read, write)]
    fn set_params(
        size: u64,
        protocol_manager: ContractId,
        borrower_operations_contract: ContractId,
    ) {
        require(
            msg_sender()
                .unwrap() == INITIALIZER,
            "SortedTroves: Caller is not initializer",
        );
        require(size > 0, "SortedTroves: size must be greater than 0");
        require(
            storage
                .is_initialized
                .read() == false,
            "SortedTroves: Contract is already initialized",
        );
        storage.max_size.write(size);
        storage.protocol_manager.write(protocol_manager);
        storage
            .borrower_operations_contract
            .write(borrower_operations_contract);
        storage.is_initialized.write(true);
    }
    /*
     * @dev Add a node to the list
     * @param id Node's id
     * @param nicr Node's NICR
     * @param prevId Id of previous node for the insert position
     * @param nextId Id of next node for the insert position
     */
    #[storage(read, write)]
    fn insert(
        id: Identity,
        nicr: u64,
        hint_prev_id: Identity,
        hint_next_id: Identity,
        asset: AssetId,
    ) {
        require_is_bo_or_tm();
        internal_insert(id, nicr, hint_prev_id, hint_next_id, asset);
    }
    #[storage(read, write)]
    fn add_asset(asset: AssetId, trove_manager: ContractId) {
        require_is_protocol_manager();
        storage.asset_trove_manager.insert(asset, trove_manager);
        storage
            .valid_trove_manager
            .insert(Identity::ContractId(trove_manager), true);
    }
    #[storage(read, write)]
    fn remove(id: Identity, asset: AssetId) {
        require_is_trove_manager();
        internal_remove(id, asset);
    }
    #[storage(read, write)]
    fn re_insert(
        id: Identity,
        nicr: u64,
        prev_id: Identity,
        next_id: Identity,
        asset: AssetId,
    ) {
        require_is_bo_or_tm();
        require(internal_contains(id, asset), "SortedTroves: Id must exist");
        require(nicr > 0, "SortedTroves: nicr must be greater than 0");
        internal_remove(id, asset);
        internal_insert(id, nicr, prev_id, next_id, asset);
    }
    #[storage(read)]
    fn contains(id: Identity, asset: AssetId) -> bool {
        return internal_contains(id, asset);
    }
    #[storage(read)]
    fn is_full(asset: AssetId) -> bool {
        return internal_is_full(asset);
    }
    #[storage(read)]
    fn is_empty(asset: AssetId) -> bool {
        return internal_is_empty(asset);
    }
    #[storage(read)]
    fn get_size(asset: AssetId) -> u64 {
        return internal_get_size(asset);
    }
    #[storage(read)]
    fn get_max_size() -> u64 {
        return internal_get_max_size();
    }
    #[storage(read)]
    fn get_first(asset: AssetId) -> Identity {
        return internal_get_first(asset);
    }
    #[storage(read)]
    fn get_last(asset: AssetId) -> Identity {
        return internal_get_last(asset);
    }
    #[storage(read)]
    fn get_next(id: Identity, asset: AssetId) -> Identity {
        return internal_get_next(id, asset);
    }
    #[storage(read)]
    fn get_prev(id: Identity, asset: AssetId) -> Identity {
        return internal_get_prev(id, asset);
    }
    #[storage(read)]
    fn valid_insert_position(
        icr: u64,
        next_id: Identity,
        prev_id: Identity,
        asset: AssetId,
    ) -> bool {
        return internal_valid_insert_position(icr, next_id, prev_id, asset);
    }
    #[storage(read)]
    fn find_insert_position(
        icr: u64,
        next_id: Identity,
        prev_id: Identity,
        asset: AssetId,
    ) -> (Identity, Identity) {
        let trove_manager = storage.asset_trove_manager.get(asset).read();
        return internal_find_insert_position(icr, next_id, prev_id, asset, trove_manager);
    }
}
#[storage(read)]
fn internal_get_first(asset: AssetId) -> Identity {
    return storage.head.get(asset).try_read().unwrap_or(null_identity_address());
}
#[storage(read)]
fn internal_get_last(asset: AssetId) -> Identity {
    return storage.tail.get(asset).try_read().unwrap_or(null_identity_address());
}
#[storage(read)]
fn internal_get_next(id: Identity, asset: AssetId) -> Identity {
    match storage.nodes.get((id, asset)).try_read() {
        Some(node) => return node.next_id,
        None => return Identity::Address(Address::zero()),
    }
}
#[storage(read)]
fn internal_get_prev(id: Identity, asset: AssetId) -> Identity {
    match storage.nodes.get((id, asset)).try_read() {
        Some(node) => return node.prev_id,
        None => return Identity::Address(Address::zero()),
    }
}
#[storage(read)]
fn internal_get_max_size() -> u64 {
    return storage.max_size.read();
}
#[storage(read)]
fn internal_get_size(asset: AssetId) -> u64 {
    return storage.size.get(asset).try_read().unwrap_or(0);
}
#[storage(read)]
fn internal_is_full(asset: AssetId) -> bool {
    match storage.size.get(asset).try_read() {
        Some(size) => return size == storage.max_size.read(),
        None => return false,
    }
}
#[storage(read)]
fn internal_is_empty(asset: AssetId) -> bool {
    match storage.size.get(asset).try_read() {
        Some(size) => return size == 0,
        None => return true,
    }
}
#[storage(read)]
fn internal_contains(id: Identity, asset: AssetId) -> bool {
    match storage.nodes.get((id, asset)).try_read() {
        Some(node) => return node.exists,
        None => return false,
    }
}
#[storage(read)]
fn internal_valid_insert_position(
    nicr: u64,
    prev_id: Identity,
    next_id: Identity,
    asset: AssetId,
) -> bool {
    let trove_manager_contract = storage.asset_trove_manager.get(asset).read();
    let trove_manager = abi(TroveManager, trove_manager_contract.bits());
    if (next_id == null_identity_address() && prev_id == null_identity_address()) {
        // `(null, null)` is a valid insert position if the list is empty
        return internal_is_empty(asset);
    } else if (prev_id == null_identity_address()) {
        // `(null, next_id)` is a valid insert position if `prev_id` is the head
        return internal_get_first(asset) == next_id && nicr >= trove_manager.get_nominal_icr(next_id);
    } else if (next_id == null_identity_address()) {
        // `(prev_id, null)` is a valid insert position if `next_id` is the tail
        return internal_get_last(asset) == prev_id && nicr <= trove_manager.get_nominal_icr(prev_id);
    } else {
        // `(_prevId, _nextId)` is a valid insert position if they are adjacent nodes and `_NICR` falls between the two nodes' NICRs
        return storage.nodes.get((prev_id, asset)).read().next_id == next_id && trove_manager.get_nominal_icr(prev_id) >= nicr && nicr >= trove_manager.get_nominal_icr(next_id);
    }
    return false;
}
#[storage(read)]
fn require_is_protocol_manager() {
    let sender = msg_sender().unwrap();
    require(
        Identity::ContractId(storage.protocol_manager.read()) == sender,
        "SortedTroves: Not PM",
    );
}
#[storage(read)]
fn require_is_trove_manager() {
    let sender = msg_sender().unwrap();
    require(
        storage
            .valid_trove_manager
            .get(sender)
            .read(),
        "SortedTroves: Not TM",
    );
}
#[storage(read)]
fn require_is_bo_or_tm() {
    let sender = msg_sender().unwrap();
    let borrow_operations = Identity::ContractId(storage.borrower_operations_contract.read());
    let is_trove_manager = storage.valid_trove_manager.get(sender).try_read().unwrap_or(false);
    require(
        borrow_operations == sender || is_trove_manager,
        "SortedTroves: Not BO or TM",
    );
}
#[storage(read)]
fn internal_find_insert_position(
    nicr: u64,
    prev_id: Identity,
    next_id: Identity,
    asset: AssetId,
    trove_manager_contract: ContractId,
) -> (Identity, Identity) {
    let trove_manager = abi(TroveManager, trove_manager_contract.bits());
    let mut next_id: Identity = next_id;
    let mut prev_id: Identity = prev_id;

    // Check if prev_id is valid and has a lower NICR
    if (prev_id != null_identity_address()) {
        if (!internal_contains(prev_id, asset)
            || nicr > trove_manager.get_nominal_icr(prev_id))
        {
            prev_id = null_identity_address()
        }
    }

    // Check if next_id is valid and has a higher NICR
    if (next_id != null_identity_address()) {
        if (!internal_contains(next_id, asset)
            || nicr < trove_manager.get_nominal_icr(next_id))
        {
            next_id = null_identity_address()
        }
    }

    // Determine the appropriate search method based on prev_id and next_id
    if (prev_id == null_identity_address() && next_id == null_identity_address()) {
        // If both hints are null, start from the head of the list
        return internal_descend_list(
            nicr,
            internal_get_first(asset),
            asset,
            trove_manager_contract,
        );
    } else if (prev_id == null_identity_address()) {
        // If only prev_id is null, ascend from next_id
        return internal_ascend_list(nicr, next_id, asset, trove_manager_contract);
    } else if (next_id == null_identity_address()) {
        // If only next_id is null, descend from prev_id
        return internal_descend_list(nicr, prev_id, asset, trove_manager_contract);
    } else {
        // If both hints are provided, descend from prev_id
        return internal_descend_list(nicr, prev_id, asset, trove_manager_contract);
    }
}
#[storage(read)]
fn internal_descend_list(
    nicr: u64,
    start_id: Identity,
    asset: AssetId,
    trove_manager_contract: ContractId,
) -> (Identity, Identity) {
    let trove_manager = abi(TroveManager, trove_manager_contract.bits());

    // Check if the start_id is the head of the list and has a lower or equal NICR
    if (internal_get_first(asset) == start_id && nicr >= trove_manager.get_nominal_icr(start_id)) {
        // If so, insert at the beginning of the list
        return (Identity::Address(Address::zero()), start_id);
    }

    let mut prev_id = start_id;
    let mut next_id = internal_get_next(prev_id, asset);

    // Traverse the list until we find a valid insert position
    while (prev_id != null_identity_address() && !internal_valid_insert_position(nicr, prev_id, next_id, asset)) {
        // Move to the next pair of nodes
        prev_id = internal_get_next(prev_id, asset);
        next_id = internal_get_next(prev_id, asset);
    }

    // Return the found insert position
    return (prev_id, next_id);
}
#[storage(read)]
fn internal_ascend_list(
    nicr: u64,
    start_id: Identity,
    asset: AssetId,
    trove_manager_contract: ContractId,
) -> (Identity, Identity) {
    let trove_manager = abi(TroveManager, trove_manager_contract.bits());

    // Check if we're at the tail of the list and the new NICR is less than or equal to the tail's NICR
    if (internal_get_last(asset) == start_id && nicr <= trove_manager.get_nominal_icr(start_id)) {
        // If so, insert at the end of the list
        return (start_id, null_identity_address());
    }

    let mut next_id = start_id;
    let mut prev_id = internal_get_prev(next_id, asset);

    // Traverse the list backwards until we find a valid insert position
    while (next_id != null_identity_address() && !internal_valid_insert_position(nicr, prev_id, next_id, asset)) {
        // Move to the previous pair of nodes
        next_id = internal_get_prev(next_id, asset);
        prev_id = internal_get_prev(next_id, asset);
    }

    // Return the found insert position
    return (prev_id, next_id);
}
#[storage(read, write)]
fn internal_insert(
    id: Identity,
    nicr: u64,
    hint_prev_id: Identity,
    hint_next_id: Identity,
    asset: AssetId,
) {
    let trove_manager_contract = storage.asset_trove_manager.get(asset).read();
    require(!internal_is_full(asset), "SortedTroves: list is full");
    require(
        !internal_contains(id, asset),
        "SortedTroves: id already exists",
    );
    require(
        null_identity_address() != id,
        "SortedTroves: id must not be zero",
    );
    require(nicr > 0, "SortedTroves: icr must be greater than 0");
    let mut next_id: Identity = hint_next_id;
    let mut prev_id: Identity = hint_prev_id;
    if (!internal_valid_insert_position(nicr, prev_id, next_id, asset)) {
        // Sender's hint was not a valid insert position
        // Use sender's hint to find a valid insert position
        let res = internal_find_insert_position(nicr, prev_id, next_id, asset, trove_manager_contract);
        prev_id = res.0;
        next_id = res.1;
    }
    let mut new_node = Node {
        exists: true,
        prev_id: null_identity_address(),
        next_id: null_identity_address(),
    };
    if (prev_id == null_identity_address() && next_id == null_identity_address()) {
        // Insert as head and tail
        storage.head.insert(asset, id);
        storage.tail.insert(asset, id);
    } else if (prev_id == null_identity_address()) {
        // Insert before `prev_id` as the head
        new_node.next_id = internal_get_first(asset);
        edit_node_neighbors(
            internal_get_first(asset),
            Option::Some(id),
            Option::None,
            asset,
        );
        storage.head.insert(asset, id);
    } else if (next_id == null_identity_address()) {
        // Insert after `next_id` as the tail
        new_node.prev_id = internal_get_last(asset);
        edit_node_neighbors(
            internal_get_last(asset),
            Option::None,
            Option::Some(id),
            asset,
        );
        storage.tail.insert(asset, id);
    } else {
        // Insert at insert position between `prev_id` and `next_id`
        new_node.prev_id = prev_id;
        new_node.next_id = next_id;
        edit_node_neighbors(prev_id, Option::None, Option::Some(id), asset);
        edit_node_neighbors(next_id, Option::Some(id), Option::None, asset);
    }
    storage.nodes.insert((id, asset), new_node);
    let new_size = internal_get_size(asset) + 1;
    storage.size.insert(asset, new_size);
}
#[storage(read, write)]
fn edit_node_neighbors(
    id: Identity,
    prev_id: Option<Identity>,
    next_id: Option<Identity>,
    asset: AssetId,
) {
    let mut node = storage.nodes.get((id, asset)).read();
    if (prev_id.is_some()) {
        node.prev_id = prev_id.unwrap();
    }
    if (next_id.is_some()) {
        node.next_id = next_id.unwrap();
    }
    storage.nodes.insert((id, asset), node);
}
#[storage(read, write)]
fn internal_remove(id: Identity, asset: AssetId) {
    require(
        internal_contains(id, asset),
        "SortedTroves: Id does not exist",
    );
    let mut node = storage.nodes.get((id, asset)).read();
    if (storage.size.get(asset).read() > 1) {
        if (id == internal_get_first(asset)) {
            // The removed node is the head
            // Set head to next node
            storage.head.insert(asset, node.next_id);
            // Set prev pointer of new head to null
            edit_node_neighbors(
                node.next_id,
                Option::Some(null_identity_address()),
                Option::None,
                asset,
            );
        } else if (id == internal_get_last(asset)) {
            // The removed node is the tail
            // Set tail to previous node
            storage.tail.insert(asset, node.prev_id);
            // Set next pointer of new tail to null
            edit_node_neighbors(
                node.prev_id,
                Option::None,
                Option::Some(null_identity_address()),
                asset,
            );
        } else {
            // The removed node is neither the head nor the tail
            // Set next pointer of previous node to the next node
            edit_node_neighbors(
                node.prev_id,
                Option::None,
                Option::Some(node.next_id),
                asset,
            );
            // Set prev pointer of next node to the previous node
            edit_node_neighbors(
                node.next_id,
                Option::Some(node.prev_id),
                Option::None,
                asset,
            );
        }
    } else {
        // List contains a single node
        // Set the head and tail to null
        storage.head.insert(asset, null_identity_address());
        storage.tail.insert(asset, null_identity_address());
    }
    let _ = storage.nodes.remove((id, asset));
    let new_size = storage.size.get(asset).read() - 1;
    storage.size.insert(asset, new_size);
}

```
