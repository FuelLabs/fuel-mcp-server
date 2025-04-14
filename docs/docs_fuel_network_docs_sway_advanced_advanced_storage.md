[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Advanced](https://docs.fuel.network/docs/sway/advanced/) /

Advanced Storage

## _Icon Link_ [Advanced Storage](https://docs.fuel.network/docs/sway/advanced/advanced_storage/\#advanced-storage)

## _Icon Link_ [Nested Storage Collections](https://docs.fuel.network/docs/sway/advanced/advanced_storage/\#nested-storage-collections)

Through the use of `StorageKey` s, you may have nested storage collections such as storing a `StorageString` in a `StorageMap<K, V>`.

For example, here we have a few common nested storage types declared in a `storage` block:

```fuel_Box fuel_Box-idXKMmm-css
storage {
    nested_map_vec: StorageMap<u64, StorageVec<u8>> = StorageMap {},
    nested_map_string: StorageMap<u64, StorageString> = StorageMap {},
    nested_vec_bytes: StorageVec<StorageBytes> = StorageVec {},
}
```

_Icon ClipboardText_

Please note that storage initialization is needed to do this.

> _Icon InfoCircle_
>
> **NOTE**: When importing a storage type, please be sure to use the glob operator i.e. `use std::storage::storage_vec::*`.

## _Icon Link_ [Storing a `StorageVec<T>` in a `StorageMap<K, V>`](https://docs.fuel.network/docs/sway/advanced/advanced_storage/\#storing-a-storagevect-in-a-storagemapk-v)

The following demonstrates how to write to a `StorageVec<T>` that is nested in a `StorageMap<T, V>`:

```fuel_Box fuel_Box-idXKMmm-css
    // Setup and initialize storage for the StorageVec.
    storage.nested_map_vec.try_insert(10, StorageVec {});

    // Method 1: Push to the vec directly
    storage.nested_map_vec.get(10).push(1u8);
    storage.nested_map_vec.get(10).push(2u8);
    storage.nested_map_vec.get(10).push(3u8);

    // Method 2: First get the storage key and then push the values.
    let storage_key_vec: StorageKey<StorageVec<u8>> = storage.nested_map_vec.get(10);
    storage_key_vec.push(4u8);
    storage_key_vec.push(5u8);
    storage_key_vec.push(6u8);
}
#[storage(read, write)]
fn get_map_vec() {
    // Method 1: Access the StorageVec directly.
    let stored_val1: u8 = storage.nested_map_vec.get(10).pop().unwrap();
    let stored_val2: u8 = storage.nested_map_vec.get(10).pop().unwrap();
    let stored_val3: u8 = storage.nested_map_vec.get(10).pop().unwrap();

    // Method 2: First get the storage key and then access the value.
    let storage_key: StorageKey<StorageVec<u8>> = storage.nested_map_vec.get(10);
    let stored_val4: u8 = storage_key.pop().unwrap();
    let stored_val5: u8 = storage_key.pop().unwrap();
    let stored_val6: u8 = storage_key.pop().unwrap();
}

#[storage(write)]
fn store_map_string() {
    // Setup and initialize storage for the StorageString.
    storage.nested_map_string.try_insert(10, StorageString {});

    // Method 1: Store the string directly.
    let my_string = String::from_ascii_str("Fuel is blazingly fast");
    storage.nested_map_string.get(10).write_slice(my_string);

    // Method 2: First get the storage key and then write the value.
    let my_string = String::from_ascii_str("Fuel is modular");
    let storage_key: StorageKey<StorageString> = storage.nested_map_string.get(10);
    storage_key.write_slice(my_string);
}
#[storage(read)]
fn get_map_string() {
    // Method 1: Access the string directly.
    let stored_string: String = storage.nested_map_string.get(10).read_slice().unwrap();

    // Method 2: First get the storage key and then access the value.
    let storage_key: StorageKey<StorageString> = storage.nested_map_string.get(10);
    let stored_string: String = storage_key.read_slice().unwrap();
}

#[storage(write)]
fn store_vec() {
    // Setup Bytes to store
    let mut my_bytes = Bytes::new();
    my_bytes.push(1u8);
    my_bytes.push(2u8);
    my_bytes.push(3u8);

    // Setup and initialize storage for the StorageBytes.
    storage.nested_vec_bytes.push(StorageBytes {});

    // Method 1: Store the bytes by accessing StorageBytes directly.
    storage
        .nested_vec_bytes
        .get(0)
        .unwrap()
        .write_slice(my_bytes);

    // Method 2: First get the storage key and then write the bytes.
    let storage_key: StorageKey<StorageBytes> = storage.nested_vec_bytes.get(0).unwrap();
    storage_key.write_slice(my_bytes);
```

Collapse_Icon ClipboardText_

The following demonstrates how to read from a `StorageVec<T>` that is nested in a `StorageMap<T, V>`:

```fuel_Box fuel_Box-idXKMmm-css
    // Method 1: Access the StorageVec directly.
    let stored_val1: u8 = storage.nested_map_vec.get(10).pop().unwrap();
    let stored_val2: u8 = storage.nested_map_vec.get(10).pop().unwrap();
    let stored_val3: u8 = storage.nested_map_vec.get(10).pop().unwrap();

    // Method 2: First get the storage key and then access the value.
    let storage_key: StorageKey<StorageVec<u8>> = storage.nested_map_vec.get(10);
    let stored_val4: u8 = storage_key.pop().unwrap();
    let stored_val5: u8 = storage_key.pop().unwrap();
    let stored_val6: u8 = storage_key.pop().unwrap();
}

#[storage(write)]
fn store_map_string() {
    // Setup and initialize storage for the StorageString.
    storage.nested_map_string.try_insert(10, StorageString {});

    // Method 1: Store the string directly.
    let my_string = String::from_ascii_str("Fuel is blazingly fast");
    storage.nested_map_string.get(10).write_slice(my_string);

    // Method 2: First get the storage key and then write the value.
    let my_string = String::from_ascii_str("Fuel is modular");
    let storage_key: StorageKey<StorageString> = storage.nested_map_string.get(10);
    storage_key.write_slice(my_string);
}
#[storage(read)]
fn get_map_string() {
    // Method 1: Access the string directly.
    let stored_string: String = storage.nested_map_string.get(10).read_slice().unwrap();

    // Method 2: First get the storage key and then access the value.
    let storage_key: StorageKey<StorageString> = storage.nested_map_string.get(10);
    let stored_string: String = storage_key.read_slice().unwrap();
}

#[storage(write)]
fn store_vec() {
    // Setup Bytes to store
    let mut my_bytes = Bytes::new();
    my_bytes.push(1u8);
    my_bytes.push(2u8);
    my_bytes.push(3u8);

    // Setup and initialize storage for the StorageBytes.
    storage.nested_vec_bytes.push(StorageBytes {});

    // Method 1: Store the bytes by accessing StorageBytes directly.
    storage
        .nested_vec_bytes
        .get(0)
        .unwrap()
        .write_slice(my_bytes);

    // Method 2: First get the storage key and then write the bytes.
    let storage_key: StorageKey<StorageBytes> = storage.nested_vec_bytes.get(0).unwrap();
    storage_key.write_slice(my_bytes);
}
#[storage(read, write)]
fn get_vec() {
    // Method 1: Access the stored bytes directly.
    let stored_bytes: Bytes = storage.nested_vec_bytes.get(0).unwrap().read_slice().unwrap();

    // Method 2: First get the storage key and then access the stored bytes.
    let storage_key: StorageKey<StorageBytes> = storage.nested_vec_bytes.get(0).unwrap();
    let stored_bytes: Bytes = storage_key.read_slice().unwrap();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Storing a `StorageString` in a `StorageMap<K, V>`](https://docs.fuel.network/docs/sway/advanced/advanced_storage/\#storing-a-storagestring-in-a-storagemapk-v)

The following demonstrates how to write to a `StorageString` that is nested in a `StorageMap<T, V>`:

```fuel_Box fuel_Box-idXKMmm-css
// Setup and initialize storage for the StorageString.
storage.nested_map_string.try_insert(10, StorageString {});

// Method 1: Store the string directly.
let my_string = String::from_ascii_str("Fuel is blazingly fast");
storage.nested_map_string.get(10).write_slice(my_string);

// Method 2: First get the storage key and then write the value.
let my_string = String::from_ascii_str("Fuel is modular");
let storage_key: StorageKey<StorageString> = storage.nested_map_string.get(10);
storage_key.write_slice(my_string);
```

_Icon ClipboardText_

The following demonstrates how to read from a `StorageString` that is nested in a `StorageMap<T, V>`:

```fuel_Box fuel_Box-idXKMmm-css
// Method 1: Access the string directly.
let stored_string: String = storage.nested_map_string.get(10).read_slice().unwrap();

// Method 2: First get the storage key and then access the value.
let storage_key: StorageKey<StorageString> = storage.nested_map_string.get(10);
let stored_string: String = storage_key.read_slice().unwrap();
```

_Icon ClipboardText_

## _Icon Link_ [Storing a `StorageBytes` in a `StorageVec<T>`](https://docs.fuel.network/docs/sway/advanced/advanced_storage/\#storing-a-storagebytes-in-a-storagevect)

The following demonstrates how to write to a `StorageBytes` that is nested in a `StorageVec<T>`:

```fuel_Box fuel_Box-idXKMmm-css
    // Setup and initialize storage for the StorageVec.
    storage.nested_map_vec.try_insert(10, StorageVec {});

    // Method 1: Push to the vec directly
    storage.nested_map_vec.get(10).push(1u8);
    storage.nested_map_vec.get(10).push(2u8);
    storage.nested_map_vec.get(10).push(3u8);

    // Method 2: First get the storage key and then push the values.
    let storage_key_vec: StorageKey<StorageVec<u8>> = storage.nested_map_vec.get(10);
    storage_key_vec.push(4u8);
    storage_key_vec.push(5u8);
    storage_key_vec.push(6u8);
}
#[storage(read, write)]
fn get_map_vec() {
    // Method 1: Access the StorageVec directly.
    let stored_val1: u8 = storage.nested_map_vec.get(10).pop().unwrap();
    let stored_val2: u8 = storage.nested_map_vec.get(10).pop().unwrap();
    let stored_val3: u8 = storage.nested_map_vec.get(10).pop().unwrap();

    // Method 2: First get the storage key and then access the value.
    let storage_key: StorageKey<StorageVec<u8>> = storage.nested_map_vec.get(10);
    let stored_val4: u8 = storage_key.pop().unwrap();
    let stored_val5: u8 = storage_key.pop().unwrap();
    let stored_val6: u8 = storage_key.pop().unwrap();
}

#[storage(write)]
fn store_map_string() {
    // Setup and initialize storage for the StorageString.
    storage.nested_map_string.try_insert(10, StorageString {});

    // Method 1: Store the string directly.
    let my_string = String::from_ascii_str("Fuel is blazingly fast");
    storage.nested_map_string.get(10).write_slice(my_string);

    // Method 2: First get the storage key and then write the value.
    let my_string = String::from_ascii_str("Fuel is modular");
    let storage_key: StorageKey<StorageString> = storage.nested_map_string.get(10);
    storage_key.write_slice(my_string);
}
#[storage(read)]
fn get_map_string() {
    // Method 1: Access the string directly.
    let stored_string: String = storage.nested_map_string.get(10).read_slice().unwrap();

    // Method 2: First get the storage key and then access the value.
    let storage_key: StorageKey<StorageString> = storage.nested_map_string.get(10);
    let stored_string: String = storage_key.read_slice().unwrap();
}

#[storage(write)]
fn store_vec() {
    // Setup Bytes to store
    let mut my_bytes = Bytes::new();
    my_bytes.push(1u8);
    my_bytes.push(2u8);
    my_bytes.push(3u8);

    // Setup and initialize storage for the StorageBytes.
    storage.nested_vec_bytes.push(StorageBytes {});

    // Method 1: Store the bytes by accessing StorageBytes directly.
    storage
        .nested_vec_bytes
        .get(0)
        .unwrap()
        .write_slice(my_bytes);

    // Method 2: First get the storage key and then write the bytes.
    let storage_key: StorageKey<StorageBytes> = storage.nested_vec_bytes.get(0).unwrap();
    storage_key.write_slice(my_bytes);
```

Collapse_Icon ClipboardText_

The following demonstrates how to read from a `StorageBytes` that is nested in a `StorageVec<T>`:

```fuel_Box fuel_Box-idXKMmm-css
    // Method 1: Access the StorageVec directly.
    let stored_val1: u8 = storage.nested_map_vec.get(10).pop().unwrap();
    let stored_val2: u8 = storage.nested_map_vec.get(10).pop().unwrap();
    let stored_val3: u8 = storage.nested_map_vec.get(10).pop().unwrap();

    // Method 2: First get the storage key and then access the value.
    let storage_key: StorageKey<StorageVec<u8>> = storage.nested_map_vec.get(10);
    let stored_val4: u8 = storage_key.pop().unwrap();
    let stored_val5: u8 = storage_key.pop().unwrap();
    let stored_val6: u8 = storage_key.pop().unwrap();
}

#[storage(write)]
fn store_map_string() {
    // Setup and initialize storage for the StorageString.
    storage.nested_map_string.try_insert(10, StorageString {});

    // Method 1: Store the string directly.
    let my_string = String::from_ascii_str("Fuel is blazingly fast");
    storage.nested_map_string.get(10).write_slice(my_string);

    // Method 2: First get the storage key and then write the value.
    let my_string = String::from_ascii_str("Fuel is modular");
    let storage_key: StorageKey<StorageString> = storage.nested_map_string.get(10);
    storage_key.write_slice(my_string);
}
#[storage(read)]
fn get_map_string() {
    // Method 1: Access the string directly.
    let stored_string: String = storage.nested_map_string.get(10).read_slice().unwrap();

    // Method 2: First get the storage key and then access the value.
    let storage_key: StorageKey<StorageString> = storage.nested_map_string.get(10);
    let stored_string: String = storage_key.read_slice().unwrap();
}

#[storage(write)]
fn store_vec() {
    // Setup Bytes to store
    let mut my_bytes = Bytes::new();
    my_bytes.push(1u8);
    my_bytes.push(2u8);
    my_bytes.push(3u8);

    // Setup and initialize storage for the StorageBytes.
    storage.nested_vec_bytes.push(StorageBytes {});

    // Method 1: Store the bytes by accessing StorageBytes directly.
    storage
        .nested_vec_bytes
        .get(0)
        .unwrap()
        .write_slice(my_bytes);

    // Method 2: First get the storage key and then write the bytes.
    let storage_key: StorageKey<StorageBytes> = storage.nested_vec_bytes.get(0).unwrap();
    storage_key.write_slice(my_bytes);
}
#[storage(read, write)]
fn get_vec() {
    // Method 1: Access the stored bytes directly.
    let stored_bytes: Bytes = storage.nested_vec_bytes.get(0).unwrap().read_slice().unwrap();

    // Method 2: First get the storage key and then access the stored bytes.
    let storage_key: StorageKey<StorageBytes> = storage.nested_vec_bytes.get(0).unwrap();
    let stored_bytes: Bytes = storage_key.read_slice().unwrap();
```

Collapse_Icon ClipboardText_

## _Icon Link_ [Storage Namespace](https://docs.fuel.network/docs/sway/advanced/advanced_storage/\#storage-namespace)

If you want the values in storage to be positioned differently, for instance to avoid collisions with storage from another contract when loading code, you can use the namespace annotation to add a salt to the slot calculations.

```fuel_Box fuel_Box-idXKMmm-css
storage {
    example_namespace {
        foo: u64 = 0,
    },
```

_Icon ClipboardText_

## _Icon Link_ [Manual Storage Management](https://docs.fuel.network/docs/sway/advanced/advanced_storage/\#manual-storage-management)

It is possible to leverage FuelVM storage operations directly using the `std::storage::storage_api::write` and `std::storage::storage_api::read` functions provided in the standard library. With this approach, you will have to manually assign the internal key used for storage. An example is as follows:

```fuel_Box fuel_Box-idXKMmm-css
contract;

use std::storage::storage_api::{read, write};

abi StorageExample {
    #[storage(write)]
    fn store_something(amount: u64);

    #[storage(read)]
    fn get_something() -> u64;
}

const STORAGE_KEY: b256 = 0x0000000000000000000000000000000000000000000000000000000000000000;

impl StorageExample for Contract {
    #[storage(write)]
    fn store_something(amount: u64) {
        write(STORAGE_KEY, 0, amount);
    }

    #[storage(read)]
    fn get_something() -> u64 {
        let value: Option<u64> = read::<u64>(STORAGE_KEY, 0);
        value.unwrap_or(0)
    }
}

```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **Note**: Though these functions can be used for any data type, they should mostly be used for arrays because arrays are not yet supported in `storage` blocks. Note, however, that _all_ data types can be used as types for keys and/or values in `StorageMap<K, V>` without any restrictions.