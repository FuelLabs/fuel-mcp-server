[Guides](https://docs.fuel.network/guides/) /

[Intro to Sway](https://docs.fuel.network/guides/intro-to-sway/) /

Functions

## _Icon Link_ [Defining the Contract Functions](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#defining-the-contract-functions)

Finally, it's time to compose our contract functions. Begin by copying and pasting the ABI we outlined earlier. It's crucial to ensure that the functions within the contract _exactly_ align with the ABI; otherwise, the compiler will generate an error. Now, substitute the semicolons at the conclusion of each function with curly brackets. Also, modify `abi SwayStore` to `impl SwayStore for Contract`, as demonstrated below:

```fuel_Box fuel_Box-idXKMmm-css
impl SwayStore for Contract {
	#[storage(read, write)]
	fn list_item(price: u64, metadata: str[20]){

	}

	#[storage(read, write), payable]
	fn buy_item(item_id: u64) {

	}

	#[storage(read)]
	fn get_item(item_id: u64) -> Item {

	}

	#[storage(read, write)]
	fn initialize_owner() -> Identity {

	}

	#[storage(read)]
	fn withdraw_funds(){

	}

	#[storage(read)]
	fn get_count() -> u64{

	}
}
```

_Icon ClipboardText_

This guide will first show each of the completed functions above. Then, we'll break it down to explain each part, clarify specific syntax, and discuss fundamental concepts in Sway.

## _Icon Link_ [1\. Listing an item](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#1-listing-an-item)

Our first function enables sellers to list an item for sale. They can specify the item's price and provide a string that references externally-stored data about the item.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn list_item(price: u64, metadata: str[20]) {

    // increment the item counter
    storage.item_counter.write(storage.item_counter.try_read().unwrap() + 1);

    // get the message sender
    let sender = msg_sender().unwrap();

    // configure the item
    let new_item: Item = Item {
        id: storage.item_counter.try_read().unwrap(),
        price: price,
        owner: sender,
        metadata: metadata,
        total_bought: 0,
    };

    // save the new item to storage using the counter value
    storage.item_map.insert(storage.item_counter.try_read().unwrap(), new_item);
}
```

_Icon ClipboardText_

## _Icon Link_ [Updating list storage](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#updating-list-storage)

The initial step involves incrementing the `item_counter` in storage, which will serve as the item's ID. In Sway, all storage variables are contained within the `storage` keyword, ensuring clarity and preventing conflicts with other variable names. This also allows developers to easily track when and where storage is accessed or altered. The standard library in Sway provides `read()`, `write()`, and `try_read()` methods to access or manipulate contract storage. It's advisable to use `try_read()` when possible to prevent potential issues arising from accessing uninitialized storage. In this case, we read the current count of listed items, modify it, and then store the updated count back into storage, making use of the well-organized and conflict-free storage system.

When a function returns an `Option` or `Result` type, we can use `unwrap()` to access its inner value. For instance, `try_read()` returns an `Option` type. If it yields `Some`, we get the contained value; but if it returns `None`, the contract call is immediately halted.

```fuel_Box fuel_Box-idXKMmm-css
// increment the item counter
storage.item_counter.write(storage.item_counter.try_read().unwrap() + 1);
```

_Icon ClipboardText_

## _Icon Link_ [Getting the message sender](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#getting-the-message-sender)

Next, we'll retrieve the `Identity` of the account listing the item.

To obtain the `Identity`, utilize the `msg_sender` function from the standard library. The `msg_sender` represents the address of the entity (be it a user address or another contract address) initiating the current function call.

This function yields a `Result`, which is an enum type that can either be OK or an error. Use the `Result` type when anticipating a value that might result in an error. For example in the case of `msg_sender` when an external caller is involved and the coin input owners differ, identifying the caller becomes impossible. In such edge cases, an `Err(AuthError)` is returned.

```fuel_Box fuel_Box-idXKMmm-css
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

_Icon ClipboardText_

In Sway, you can define a variable using either `let` or `const`.

```fuel_Box fuel_Box-idXKMmm-css
// get the message sender
let sender = msg_sender().unwrap();
```

_Icon ClipboardText_

To retrieve the inner value, you can use the `unwrap` method. It returns the contained value if the `Result` is OK and triggers a panic if the result indicates an error.

## _Icon Link_ [Creating a new item](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#creating-a-new-item)

You can instantiate a new item using the `Item` struct. Use the `item_counter` value from storage as the ID, set the price and metadata based on the input parameters, and initialize `total_bought` to 0.

Since the `owner` field requires an `Identity` type, you should utilize the sender value obtained from `msg_sender()`.

```fuel_Box fuel_Box-idXKMmm-css
// configure the item
let new_item: Item = Item {
    id: storage.item_counter.try_read().unwrap(),
    price: price,
    owner: sender,
    metadata: metadata,
    total_bought: 0,
};
```

_Icon ClipboardText_

## _Icon Link_ [Updating a StorageMap](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#updating-a-storagemap)

Lastly, add the item to the `item_map` within storage using the `insert` method. Utilize the same ID for the key and designate the item as its corresponding value.

```fuel_Box fuel_Box-idXKMmm-css
// save the new item to storage using the counter value
storage.item_map.insert(storage.item_counter.try_read().unwrap(), new_item);
```

_Icon ClipboardText_

## _Icon Link_ [2\. Buying an item](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#2-buying-an-item)

Next, we aim to allow buyers to purchase listed items. To achieve this, we'll need to:

1. Accept the desired item ID from the buyer as a function parameter.
2. Ensure the buyer is paying the correct price with valid coins.
3. Increase the `total_bought` count for that item.
4. Deduct a contract fee from the item's cost and transfer the remaining amount to the seller.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write), payable]
fn buy_item(item_id: u64) {
    // get the asset id for the asset sent
    let asset_id = msg_asset_id();

    // require that the correct asset was sent
    require(asset_id == AssetId::base(), InvalidError::IncorrectAssetId(asset_id));

    // get the amount of coins sent
    let amount = msg_amount();

    // get the item to buy
    let mut item = storage.item_map.get(item_id).try_read().unwrap();

    // require that the amount is at least the price of the item
    require(amount >= item.price, InvalidError::NotEnoughTokens(amount));

    // update the total amount bought
    item.total_bought += 1;

    // update the item in the storage map
    storage.item_map.insert(item_id, item);

    // only charge commission if price is more than 0.1 ETH
    if amount > 100_000_000 {
        // keep a 5% commission
        let commission = amount / 20;
        let new_amount = amount - commission;
        // send the payout minus commission to the seller
        transfer(item.owner, asset_id, new_amount);
    } else {
        // send the full payout to the seller
        transfer(item.owner, asset_id, amount);
    }
}
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Verifying payment](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#verifying-payment)

We can use the `msg_asset_id` function from the standard library to obtain the asset ID of the coins being transferred in the transaction.

```fuel_Box fuel_Box-idXKMmm-css
let asset_id = msg_asset_id();
```

_Icon ClipboardText_

Next, we'll utilize the `require` statement to ensure the sent asset is the correct one.

The `require` statement accepts two arguments: a condition, and a value that's logged when the condition is false. Should the condition evaluate as false, the entire transaction is rolled back, leaving no changes.

In this case, the condition checks if the `asset_id` matches the base asset ID — the default asset associated with the base blockchain - using `AssetId::base()`. For example, if the base blockchain is Ethereum, the base asset would be ETH.

If there's a mismatch in the asset, for instance, if someone attempts to purchase an item using a different coin, we'll trigger the custom error previously defined, passing along the `asset_id`.

```fuel_Box fuel_Box-idXKMmm-css
require(asset_id == AssetId::base(), InvalidError::IncorrectAssetId(asset_id));
```

_Icon ClipboardText_

Next, we can use the `msg_amount` function from the standard library to retrieve the quantity of coins transmitted by the buyer within the transaction.

```fuel_Box fuel_Box-idXKMmm-css
let amount = msg_amount();
```

_Icon ClipboardText_

To ensure the sent amount is not less than the item's price, we should retrieve the item details using the `item_id` parameter.

To obtain a value for a specific key in a storage map, the `get` method is handy, wherein the key value is passed. For mapping storage access, the `try_read()` method is utilized. As this method produces a `Result` type, the `unwrap` method can be applied to extract the item value.

```fuel_Box fuel_Box-idXKMmm-css
let mut item = storage.item_map.get(item_id).try_read().unwrap();
```

_Icon ClipboardText_

In Sway, all variables are immutable by default, whether declared with `let` or `const`. To modify the value of any variable, it must be declared mutable using the `mut` keyword. Since we plan to update the item's `total_bought` value, it should be defined as mutable.

Additionally, it's essential to ensure that the quantity of coins sent for the item isn't less than the item's price.

```fuel_Box fuel_Box-idXKMmm-css
require(amount >= item.price, InvalidError::NotEnoughTokens(amount));
```

_Icon ClipboardText_

## _Icon Link_ [Updating buy storage](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#updating-buy-storage)

We can increase the item's `total_bought` field value and subsequently reinsert it into the `item_map`. This action will replace the earlier value with the revised item.

```fuel_Box fuel_Box-idXKMmm-css
// update the total amount bought
item.total_bought += 1;

// update the item in the storage map
storage.item_map.insert(item_id, item);
```

_Icon ClipboardText_

## _Icon Link_ [Transferring payment](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#transferring-payment)

Lastly, we can process the payment to the seller. It's recommended to transfer assets only after all storage modifications are completed to prevent [reentrancy attacks](https://docs.fuel.network/docs/sway/blockchain-development/calling_contracts/#handling-re-entrancy).

For items reaching a specific price threshold, a fee can be deducted using a conditional `if` statement. The structure of `if` statements in Sway mirrors that in JavaScript except for the brackets `()`.

```fuel_Box fuel_Box-idXKMmm-css
// only charge commission if price is more than 0.1 ETH
if amount > 100_000_000 {
    // keep a 5% commission
    let commission = amount / 20;
    let new_amount = amount - commission;
    // send the payout minus commission to the seller
    transfer(item.owner, asset_id, new_amount);
} else {
    // send the full payout to the seller
    transfer(item.owner, asset_id, amount);
}
```

_Icon ClipboardText_

In the aforementioned if-condition, we assess if the transmitted amount surpasses 100,000,000. For clarity in large numbers like `100000000`, we can represent it as `100_000_000`. If the foundational asset for this contract is ETH, this equates to 0.1 ETH given that Fuel uses a 9 decimal system.

Should the amount exceed 0.1 ETH, a commission is determined and then deducted from the total.

To facilitate the payment to the item's owner, the `transfer` function is utilized. This function, sourced from the standard library, requires three parameters: the Identity to which the coins are sent, the coin's asset ID, and the coin quantity for transfer.

## _Icon Link_ [3\. Get an item](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#3-get-an-item)

To get the details for an item, we can create a read-only function that returns the `Item` struct for a given item ID.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn get_item(item_id: u64) -> Item {
    // returns the item for the given item_id
    return storage.item_map.get(item_id).try_read().unwrap();
}
```

_Icon ClipboardText_

To return a value in a function, you can use the `return` keyword, similar to JavaScript. Alternatively, you can omit the semicolon in the last line to return that value like in Rust.

```fuel_Box fuel_Box-idXKMmm-css
fn my_function_1(num: u64) -> u64{
    // returns the num variable
    return num;
}

fn my_function_2(num: u64) -> u64{
    // returns the num variable
    num
}
```

_Icon ClipboardText_

## _Icon Link_ [4\. Initialize the owner](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#4-initialize-the-owner)

This method sets the owner's `Identity` for the contract but only once.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn initialize_owner() -> Identity {
    let owner = storage.owner.try_read().unwrap();

    // make sure the owner has NOT already been initialized
    require(owner.is_none(), "owner already initialized");

    // get the identity of the sender
    let sender = msg_sender().unwrap();

    // set the owner to the sender's identity
    storage.owner.write(Option::Some(sender));

    // return the owner
    return sender;
}
```

_Icon ClipboardText_

To ensure that this function can only be called once, specifically right after the contract's deployment, it's imperative that the owner's value remains set to `None`. We can achieve this verification using the `is_none` method, which assesses if an Option type is `None`.

It's also important to note the potential risk of [front running _Icon Link_](https://scsfg.io/hackers/frontrunning/) in this context this code has not been audited.

```fuel_Box fuel_Box-idXKMmm-css
let owner = storage.owner.try_read().unwrap();

// make sure the owner has NOT already been initialized
require(owner.is_none(), "owner already initialized");
```

_Icon ClipboardText_

To assign the `owner` as the message sender, it's necessary to transform the `Result` type into an `Option` type.

```fuel_Box fuel_Box-idXKMmm-css
// get the identity of the sender
let sender = msg_sender().unwrap();

// set the owner to the sender's identity
storage.owner.write(Option::Some(sender));
```

_Icon ClipboardText_

Finally, we'll return the `Identity` of the message sender.

```fuel_Box fuel_Box-idXKMmm-css
// return the owner
return sender;
```

_Icon ClipboardText_

## _Icon Link_ [5\. Withdraw funds](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#5-withdraw-funds)

The `withdraw_funds` function permits the owner to withdraw any accumulated funds from the contract.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn withdraw_funds() {
    let owner = storage.owner.try_read().unwrap();

    // make sure the owner has been initialized
    require(owner.is_some(), "owner not initialized");

    let sender = msg_sender().unwrap();

    // require the sender to be the owner
    require(sender == owner.unwrap(), InvalidError::OnlyOwner(sender));

    // get the current balance of this contract for the base asset
    let amount = this_balance(AssetId::base());

    // require the contract balance to be more than 0
    require(amount > 0, InvalidError::NotEnoughTokens(amount));

    // send the amount to the owner
    transfer(owner.unwrap(), AssetId::base(), amount);
}
```

_Icon ClipboardText_

First, we'll ensure that the owner has been initialized to a specific address.

```fuel_Box fuel_Box-idXKMmm-css
let owner = storage.owner.try_read().unwrap();

// make sure the owner has been initialized
require(owner.is_some(), "owner not initialized");
```

_Icon ClipboardText_

Next, we'll verify that the individual attempting to withdraw the funds is indeed the owner.

```fuel_Box fuel_Box-idXKMmm-css
let sender = msg_sender().unwrap();

// require the sender to be the owner
require(sender == owner.unwrap(), InvalidError::OnlyOwner(sender));
```

_Icon ClipboardText_

Additionally, we can confirm the availability of funds for withdrawal using the `this_balance` function from the standard library. This function returns the current balance of the contract.

```fuel_Box fuel_Box-idXKMmm-css
// get the current balance of this contract for the base asset
let amount = this_balance(AssetId::base());

// require the contract balance to be more than 0
require(amount > 0, InvalidError::NotEnoughTokens(amount));
```

_Icon ClipboardText_

Lastly, we'll transfer the entire balance of the contract to the owner.

```fuel_Box fuel_Box-idXKMmm-css
// send the amount to the owner
transfer(owner.unwrap(), AssetId::base(), amount);
```

_Icon ClipboardText_

## _Icon Link_ [6\. Get the total items](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#6-get-the-total-items)

The final function we'll introduce is `get_count`. This straightforward getter function returns the value of the `item_counter` variable stored in the contract's storage.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn get_count() -> u64 {
    return storage.item_counter.try_read().unwrap();
}
```

_Icon ClipboardText_

## _Icon Link_ [Review](https://docs.fuel.network/guides/intro-to-sway/contract-functions/\#review)

The `SwayStore` contract implementation in your `main.sw` should now look like this, following everything else we have previously written:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::{
    auth::msg_sender,
    call_frames::msg_asset_id,
    context::{
        msg_amount,
        this_balance,
    },
    asset::transfer,
    hash::Hash,
};

struct Item {
    id: u64,
    price: u64,
    owner: Identity,
    metadata: str[20],
    total_bought: u64,
}

abi SwayStore {
    // a function to list an item for sale
    // takes the price and metadata as args
    #[storage(read, write)]
    fn list_item(price: u64, metadata: str[20]);

    // a function to buy an item
    // takes the item id as the arg
    #[storage(read, write), payable]
    fn buy_item(item_id: u64);

    // a function to get a certain item
    #[storage(read)]
    fn get_item(item_id: u64) -> Item;

    // a function to set the contract owner
    #[storage(read, write)]
    fn initialize_owner() -> Identity;

    // a function to withdraw contract funds
    #[storage(read)]
    fn withdraw_funds();

    // return the number of items listed
    #[storage(read)]
    fn get_count() -> u64;
}

storage {
    // counter for total items listed
    item_counter: u64 = 0,

    // map of item IDs to Items
    item_map: StorageMap<u64, Item> = StorageMap {},

    // owner of the contract
    owner: Option<Identity> = Option::None,
}

enum InvalidError {
    IncorrectAssetId: AssetId,
    NotEnoughTokens: u64,
    OnlyOwner: Identity,
}

impl SwayStore for Contract {
    #[storage(read, write)]
    fn list_item(price: u64, metadata: str[20]) {

        // increment the item counter
        storage.item_counter.write(storage.item_counter.try_read().unwrap() + 1);

        // get the message sender
        let sender = msg_sender().unwrap();

        // configure the item
        let new_item: Item = Item {
            id: storage.item_counter.try_read().unwrap(),
            price: price,
            owner: sender,
            metadata: metadata,
            total_bought: 0,
        };

        // save the new item to storage using the counter value
        storage.item_map.insert(storage.item_counter.try_read().unwrap(), new_item);
    }

    #[storage(read, write), payable]
    fn buy_item(item_id: u64) {
        // get the asset id for the asset sent
        let asset_id = msg_asset_id();

        // require that the correct asset was sent
        require(asset_id == AssetId::base(), InvalidError::IncorrectAssetId(asset_id));

        // get the amount of coins sent
        let amount = msg_amount();

        // get the item to buy
        let mut item = storage.item_map.get(item_id).try_read().unwrap();

        // require that the amount is at least the price of the item
        require(amount >= item.price, InvalidError::NotEnoughTokens(amount));

        // update the total amount bought
        item.total_bought += 1;

        // update the item in the storage map
        storage.item_map.insert(item_id, item);

        // only charge commission if price is more than 0.1 ETH
        if amount > 100_000_000 {
            // keep a 5% commission
            let commission = amount / 20;
            let new_amount = amount - commission;
            // send the payout minus commission to the seller
            transfer(item.owner, asset_id, new_amount);
        } else {
            // send the full payout to the seller
            transfer(item.owner, asset_id, amount);
        }
    }

    #[storage(read)]
    fn get_item(item_id: u64) -> Item {
        // returns the item for the given item_id
        return storage.item_map.get(item_id).try_read().unwrap();
    }

    #[storage(read, write)]
    fn initialize_owner() -> Identity {
        let owner = storage.owner.try_read().unwrap();

        // make sure the owner has NOT already been initialized
        require(owner.is_none(), "owner already initialized");

        // get the identity of the sender
        let sender = msg_sender().unwrap();

        // set the owner to the sender's identity
        storage.owner.write(Option::Some(sender));

        // return the owner
        return sender;
    }

    #[storage(read)]
    fn withdraw_funds() {
        let owner = storage.owner.try_read().unwrap();

        // make sure the owner has been initialized
        require(owner.is_some(), "owner not initialized");

        let sender = msg_sender().unwrap();

        // require the sender to be the owner
        require(sender == owner.unwrap(), InvalidError::OnlyOwner(sender));

        // get the current balance of this contract for the base asset
        let amount = this_balance(AssetId::base());

        // require the contract balance to be more than 0
        require(amount > 0, InvalidError::NotEnoughTokens(amount));

        // send the amount to the owner
        transfer(owner.unwrap(), AssetId::base(), amount);
    }

    #[storage(read)]
    fn get_count() -> u64 {
        return storage.item_counter.try_read().unwrap();
    }
}
```

Collapse_Icon ClipboardText_