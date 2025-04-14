[Guides](https://docs.fuel.network/guides/) /

[Intro to Sway](https://docs.fuel.network/guides/intro-to-sway/) /

Storage

## _Icon Link_ [Defining The Storage Block](https://docs.fuel.network/guides/intro-to-sway/contract-storage/\#defining-the-storage-block)

Next, we'll introduce the storage block. This is where you store all persistent state variables in your contract.

Variables declared within a function and not saved in the storage block will be discarded once the function completes its execution. Add the storage block below to your `main.sw` file:

```fuel_Box fuel_Box-idXKMmm-css
storage {
    // counter for total items listed
    item_counter: u64 = 0,

    // map of item IDs to Items
    item_map: StorageMap<u64, Item> = StorageMap {},

    // owner of the contract
    owner: Option<Identity> = Option::None,
}
```

_Icon ClipboardText_

The first variable we've stored is `item_counter`, a number initialized to 0. This counter can be used to track the total number of items listed.

## _Icon Link_ [StorageMap](https://docs.fuel.network/guides/intro-to-sway/contract-storage/\#storagemap)

A `StorageMap` is a unique type that permits the saving of key-value pairs within a storage block.

To define a storage map, you need to specify the types for both the key and the value. For instance, in the example below, the key type is `u64`, and the value type is an `Item` struct.

```fuel_Box fuel_Box-idXKMmm-css
// map of item IDs to Items
item_map: StorageMap<u64, Item> = StorageMap {},
```

_Icon ClipboardText_

Here, we are creating a mapping from the item's ID to the `Item` struct. Using this, we can retrieve information about an item using its ID.

## _Icon Link_ [Options](https://docs.fuel.network/guides/intro-to-sway/contract-storage/\#options)

Here, we are defining the `owner` variable as one that can either be `None` or hold an `Identity`.

```fuel_Box fuel_Box-idXKMmm-css
// owner of the contract
owner: Option<Identity> = Option::None,
```

_Icon ClipboardText_

If you want a value to be potentially null or undefined under specific conditions, you can employ the `Option` type. It's an enum that can take on either `Some(value)` or `None`. The keyword `None` indicates the absence of a value, while `Some` signifies the presence of a stored value.