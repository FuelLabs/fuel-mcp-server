[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Common Collections](https://docs.fuel.network/docs/sway/common-collections/) /

Storage Map

## _Icon Link_ [Storage Maps](https://docs.fuel.network/docs/sway/common-collections/storage_map/\#storage-maps)

Another important common collection is the storage map.

The type `StorageMap<K, V>` from the standard library stores a mapping of keys of type `K` to values of type `V` using a hashing function, which determines how it places these keys and values into _storage slots_. This is similar to [Rust's `HashMap<K, V>` _Icon Link_](https://doc.rust-lang.org/std/collections/struct.HashMap.html) but with a few differences.

Storage maps are useful when you want to look up data not by using an index, as you can with vectors, but by using a key that can be of any type. For example, when building a ledger-based sub-currency smart contract, you could keep track of the balance of each wallet in a storage map in which each key is a wallet’s `Address` and the values are each wallet’s balance. Given an `Address`, you can retrieve its balance.

Similarly to `StorageVec<T>`, `StorageMap<K, V>` can only be used in a contract because only contracts are allowed to access persistent storage.

`StorageMap<T>` is included in the [standard library prelude](https://docs.fuel.network/docs/sway/introduction/standard_library/#standard-library-prelude) which means that there is no need to import it manually.

## _Icon Link_ [Creating a New Storage Map](https://docs.fuel.network/docs/sway/common-collections/storage_map/\#creating-a-new-storage-map)

To create a new empty storage map, we have to declare the map in a `storage` block as follows:

```fuel_Box fuel_Box-idXKMmm-css
map: StorageMap<Address, u64> = StorageMap::<Address, u64> {},
```

_Icon ClipboardText_

Just like any other storage variable, two things are required when declaring a `StorageMap`: a type annotation and an initializer. The initializer is just an empty struct of type `StorageMap` because `StorageMap<K, V>` itself is an empty struct! Everything that is interesting about `StorageMap<K, V>` is implemented in its methods.

Storage maps, just like `Vec<T>` and `StorageVec<T>`, are implemented using generics which means that the `StorageMap<K, V>` type provided by the standard library can map keys of any type `K` to values of any type `V`. In the example above, we’ve told the Sway compiler that the `StorageMap<K, V>` in `map` will map keys of type `Address` to values of type `u64`.

## _Icon Link_ [Updating a Storage Map](https://docs.fuel.network/docs/sway/common-collections/storage_map/\#updating-a-storage-map)

To insert key-value pairs into a storage map, we can use the `insert` method.

For example:

```fuel_Box fuel_Box-idXKMmm-css
#[storage(write)]
fn insert_into_storage_map() {
    let addr1 = Address::from(0x0101010101010101010101010101010101010101010101010101010101010101);
    let addr2 = Address::from(0x0202020202020202020202020202020202020202020202020202020202020202);

    storage.map.insert(addr1, 42);
    storage.map.insert(addr2, 77);
}
```

_Icon ClipboardText_

Note two details here. First, in order to use `insert`, we need to first access the storage map using the `storage` keyword. Second, because `insert` requires _writing_ into storage, a `#[storage(write)]` annotation is required on the ABI function that calls `insert`.

> _Icon InfoCircle_
>
> **Note**
> The storage annotation is also required for any private function defined in the contract that tries to insert into the map.

> _Icon InfoCircle_
>
> **Note**
> There is no need to add the `mut` keyword when declaring a `StorageMap<K, V>`. All storage variables are mutable by default.

## _Icon Link_ [Accessing Values in a Storage Map](https://docs.fuel.network/docs/sway/common-collections/storage_map/\#accessing-values-in-a-storage-map)

We can get a value out of the storage map by providing its `key` to the `get` method.

For example:

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn get_from_storage_map() {
    let addr1 = Address::from(0x0101010101010101010101010101010101010101010101010101010101010101);
    let addr2 = Address::from(0x0202020202020202020202020202020202020202020202020202020202020202);

    storage.map.insert(addr1, 42);
    storage.map.insert(addr2, 77);

    let value1 = storage.map.get(addr1).try_read().unwrap_or(0);
}
```

_Icon ClipboardText_

Here, `value1` will have the value that's associated with the first address, and the result will be `42`. The `get` method returns an `Option<V>`; if there’s no value for that key in the storage map, `get` will return `None`. This program handles the `Option` by calling `unwrap_or` to set `value1` to zero if `map` doesn't have an entry for the key.

## _Icon Link_ [Storage Maps with Multiple Keys](https://docs.fuel.network/docs/sway/common-collections/storage_map/\#storage-maps-with-multiple-keys)

Maps with multiple keys can be implemented using tuples as keys. For example:

```fuel_Box fuel_Box-idXKMmm-css
map_two_keys: StorageMap<(b256, bool), b256> = StorageMap::<(b256, bool), b256> {},
```

_Icon ClipboardText_

## _Icon Link_ [Nested Storage Maps](https://docs.fuel.network/docs/sway/common-collections/storage_map/\#nested-storage-maps)

It is possible to nest storage maps as follows:

```fuel_Box fuel_Box-idXKMmm-css
nested_map: StorageMap<u64, StorageMap<u64, u64>> = StorageMap::<u64, StorageMap<u64, u64>> {},
```

_Icon ClipboardText_

The nested map can then be accessed as follows:

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn access_nested_map() {
    storage.nested_map.get(0).insert(1, 42);
    storage.nested_map.get(2).insert(3, 24);

    assert(storage.nested_map.get(0).get(1).read() == 42);
    assert(storage.nested_map.get(0).get(0).try_read().is_none()); // Nothing inserted here
    assert(storage.nested_map.get(2).get(3).read() == 24);
    assert(storage.nested_map.get(2).get(2).try_read().is_none()); // Nothing inserted here
}
```

_Icon ClipboardText_