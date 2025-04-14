[Guides](https://docs.fuel.network/guides/) /

[Intro to Sway](https://docs.fuel.network/guides/intro-to-sway/) /

ABI

## _Icon Link_ [Defining the ABI](https://docs.fuel.network/guides/intro-to-sway/contract-abi/\#defining-the-abi)

Next, we will define our ABI. ABI stands for Application Binary Interface. In a Sway contract, it serves as an outline of all the functions within the contract. For each function, you need to specify its name, input types, return types, level of storage access, and if it's payable.

The ABI for our contract is structured as follows. Write the ABI provided below into your `main.sw` file:

```fuel_Box fuel_Box-idXKMmm-css
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
```

_Icon ClipboardText_

Don't be worried about understanding the specifics of each function at this moment. We will dive into detailed explanations in the "Functions" section.

## _Icon Link_ [Functions Structure](https://docs.fuel.network/guides/intro-to-sway/contract-abi/\#functions-structure)

A function is defined using the `fn` keyword. In Sway, snake case is the convention, so instead of naming a function `myFunction`, you would name it `my_function`.

If the function returns a value, its return type must be defined using a skinny arrow. Additionally, if the function has parameters, their types must also be specified. Semicolons are _required_ at the end of each statement.

If a function either reads from or writes to storage, you need to specify the access level above the function using annotations like `#[storage(read)]` or `#[storage(read, write)]`.

For functions that are expected to receive funds when called, such as the `buy_item` function, the `#[payable]` annotation is required.