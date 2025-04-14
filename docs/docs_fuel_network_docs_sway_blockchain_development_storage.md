[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Blockchain Development](https://docs.fuel.network/docs/sway/blockchain-development/) /

Storage

## _Icon Link_ [Storage](https://docs.fuel.network/docs/sway/blockchain-development/storage/\#storage)

When developing a [smart contract](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/), you will typically need some sort of persistent storage. In this case, persistent storage, often just called _storage_ in this context, is a place where you can store values that are persisted inside the contract itself. This is in contrast to a regular value in _memory_, which disappears after the contract exits.

Put in conventional programming terms, contract storage is like saving data to a hard drive. That data is saved even after the program that saved it exits. That data is persistent. Using memory is like declaring a variable in a program: it exists for the duration of the program and is non-persistent.

Some basic use cases of storage include declaring an owner address for a contract and saving balances in a wallet.

## _Icon Link_ [Storage Accesses Via the `storage` Keyword](https://docs.fuel.network/docs/sway/blockchain-development/storage/\#storage-accesses-via-the-storage-keyword)

Declaring variables in storage requires a `storage` block that contains a list of all your variables, their types, and their initial values. The initial value can be any expression that can be evaluated to a constant during compilation, as follows:

```fuel_Box fuel_Box-idXKMmm-css
storage {
    var1: u64 = 1,
    var2: b256 = b256::zero(),
    var3: Address = Address::zero(),
    var4: Option<u8> = None,
}
```

_Icon ClipboardText_

To write into a storage variable, you need to use the `storage` keyword as follows:

```fuel_Box fuel_Box-idXKMmm-css
storage.var1.write(42);
storage
    .var2
    .write(0x1111111111111111111111111111111111111111111111111111111111111111);
storage
    .var3
    .write(Address::from(0x1111111111111111111111111111111111111111111111111111111111111111));
storage.var4.write(Some(2u8));
```

_Icon ClipboardText_

To read a storage variable, you also need to use the `storage` keyword. You may use `read()` or `try_read()`, however we recommend using `try_read()` for additional safety.

```fuel_Box fuel_Box-idXKMmm-css
let var1: u64 = storage.var1.read();
let var2: b256 = storage.var2.try_read().unwrap_or(b256::zero());
let var3: Address = storage.var3.try_read().unwrap_or(Address::zero());
let var4: Option<u8> = storage.var4.try_read().unwrap_or(None);
```

_Icon ClipboardText_

## _Icon Link_ [Storing Structs](https://docs.fuel.network/docs/sway/blockchain-development/storage/\#storing-structs)

To store a struct in storage, each variable must be assigned in the `storage` block. This can be either my assigning the fields individually or using a public [constructor](https://docs.fuel.network/docs/sway/basics/methods_and_associated_functions/#constructors) that can be evaluated to a constant during compilation.

```fuel_Box fuel_Box-idXKMmm-css
struct Type1 {
    x: u64,
    y: u64,
}

struct Type2 {
    w: b256,
    z: bool,
}

impl Type2 {
    // a constructor that evaluates to a constant during compilation
    fn default() -> Self {
        Self {
            w: 0x0000000000000000000000000000000000000000000000000000000000000000,
            z: true,
        }
    }
}

storage {
    var1: Type1 = Type1 { x: 0, y: 0 },
    var2: Type2 = Type2::default(),
}
```

_Icon ClipboardText_

You may write to both fields of a struct and the entire struct as follows:

```fuel_Box fuel_Box-idXKMmm-css
// Store individual fields
storage.var1.x.write(42);
storage.var1.y.write(77);

// Store an entire struct
let new_struct = Type2 {
    w: 0x1111111111111111111111111111111111111111111111111111111111111111,
    z: false,
};
storage.var2.write(new_struct);
```

_Icon ClipboardText_

The same applies to reading structs from storage, where both the individual and struct as a whole may be read as follows:

```fuel_Box fuel_Box-idXKMmm-css
let var1_x: u64 = storage.var1.x.try_read().unwrap_or(0);
let var1_y: u64 = storage.var1.y.try_read().unwrap_or(0);
let var2: Type2 = storage.var2.try_read().unwrap_or(Type2::default());
```

_Icon ClipboardText_

## _Icon Link_ [Common Storage Collections](https://docs.fuel.network/docs/sway/blockchain-development/storage/\#common-storage-collections)

We support the following common storage collections:

- `StorageMap<K, V>`
- `StorageVec<T>`
- `StorageBytes`
- `StorageString`

Please note that these types are not initialized during compilation. This means that if you try to access a key from a storage map before the storage has been set, for example, the call will revert.

Declaring these variables in storage requires a `storage` block as follows:

```fuel_Box fuel_Box-idXKMmm-css
storage {
    storage_map: StorageMap<u64, bool> = StorageMap {},
    storage_vec: StorageVec<b256> = StorageVec {},
    storage_string: StorageString = StorageString {},
    storage_bytes: StorageBytes = StorageBytes {},
}
```

_Icon ClipboardText_

## _Icon Link_ [`StorageMaps<K, V>`](https://docs.fuel.network/docs/sway/blockchain-development/storage/\#storagemapsk-v)

Generic storage maps are available in the standard library as `StorageMap<K, V>` which have to be defined inside a `storage` block and allow you to call `insert()` and `get()` to insert values at specific keys and get those values respectively. Refer to [Storage Maps](https://docs.fuel.network/docs/sway/common-collections/storage_map/) for more information about `StorageMap<K, V>`.

**Warning** While the `StorageMap<K, V>` is currently included in the prelude, to use it the `Hash` trait must still be imported. This is a known issue and will be resolved.

```fuel_Box fuel_Box-idXKMmm-css
use std::hash::Hash;
```

_Icon ClipboardText_

To write to a storage map, call either the `insert()` or `try_insert()` functions as follows:

```fuel_Box fuel_Box-idXKMmm-css
storage.storage_map.insert(12, true);
storage.storage_map.insert(59, false);

// try_insert() will only insert if a value does not already exist for a key.
let result = storage.storage_map.try_insert(103, true);
assert(result.is_ok());
```

_Icon ClipboardText_

The following demonstrates how to read from a storage map:

```fuel_Box fuel_Box-idXKMmm-css
// Access directly
let stored_val1: bool = storage.storage_map.get(12).try_read().unwrap_or(false);

// First get the storage key and then access the value.
let storage_key2: StorageKey<bool> = storage.storage_map.get(59);
let stored_val2: bool = storage_key2.try_read().unwrap_or(false);

// Unsafely access the value.
let stored_val3: bool = storage.storage_map.get(103).read();
```

_Icon ClipboardText_

## _Icon Link_ [`StorageVec<T>`](https://docs.fuel.network/docs/sway/blockchain-development/storage/\#storagevect)

Generic storage vectors are available in the standard library as `StorageVec<T>` which have to be defined inside a `storage` block and allow you to call `push()` and `pop()` to push and pop values from a vector respectively. Refer to [Storage Vector](https://docs.fuel.network/docs/sway/common-collections/storage_vec/) for more information about `StorageVec<T>`.

The following demonstrates how to import `StorageVec<T>`:

```fuel_Box fuel_Box-idXKMmm-css
use std::storage::storage_vec::*;
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE**: When importing the `StorageVec<T>`, please be sure to use the glob operator: `use std::storage::storage_vec::*`.

The following demonstrates how to write to a `StorageVec<T>`:

```fuel_Box fuel_Box-idXKMmm-css
storage
    .storage_vec
    .push(0x1111111111111111111111111111111111111111111111111111111111111111);
storage
    .storage_vec
    .push(0x0000000000000000000000000000000000000000000000000000000000000001);
storage
    .storage_vec
    .push(0x0000000000000000000000000000000000000000000000000000000000000002);

// Set will overwrite the element stored at the given index.
storage.storage_vec.set(2, b256::zero());
```

_Icon ClipboardText_

The following demonstrates how to read from a `StorageVec<T>`:

```fuel_Box fuel_Box-idXKMmm-css
// Method 1: Access the element directly
// Note: get() does not remove the element from the vec.
let stored_val1: b256 = storage.storage_vec.get(0).unwrap().try_read().unwrap_or(b256::zero());

// Method 2: First get the storage key and then access the value.
let storage_key2: StorageKey<b256> = storage.storage_vec.get(1).unwrap();
let stored_val2: b256 = storage_key2.try_read().unwrap_or(b256::zero());

// pop() will remove the last element from the vec.
let length: u64 = storage.storage_vec.len();
let stored_val3: b256 = storage.storage_vec.pop().unwrap();
assert(length != storage.storage_vec.len());
```

_Icon ClipboardText_

## _Icon Link_ [`StorageBytes`](https://docs.fuel.network/docs/sway/blockchain-development/storage/\#storagebytes)

Storage of `Bytes` is available in the standard library as `StorageBytes` which have to be defined inside a `storage` block. `StorageBytes` cannot be manipulated in the same way a `StorageVec<T>` or `StorageMap<K, V>` can but stores bytes more efficiently thus reducing gas. Only the entirety of a `Bytes` may be read/written to storage. This means any changes would require loading the entire `Bytes` to the heap, making changes, and then storing it once again. If frequent changes are needed, a `StorageVec<u8>` is recommended.

The following demonstrates how to import `StorageBytes`:

```fuel_Box fuel_Box-idXKMmm-css
use std::storage::storage_bytes::*;
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE**: When importing the `StorageBytes`, please be sure to use the glob operator: `use std::storage::storage_bytes::*`.

The following demonstrates how to write to a `StorageBytes`:

```fuel_Box fuel_Box-idXKMmm-css
// Setup Bytes
let mut my_bytes = Bytes::new();
my_bytes.push(1u8);
my_bytes.push(2u8);
my_bytes.push(3u8);

// Write to storage
storage.storage_bytes.write_slice(my_bytes);
```

_Icon ClipboardText_

The following demonstrates how to read from a `StorageBytes`:

```fuel_Box fuel_Box-idXKMmm-css
let stored_bytes: Bytes = storage.storage_bytes.read_slice().unwrap();
```

_Icon ClipboardText_

## _Icon Link_ [`StorageString`](https://docs.fuel.network/docs/sway/blockchain-development/storage/\#storagestring)

Storage of `String` is available in the standard library as `StorageString` which have to be defined inside a `storage` block. `StorageString` cannot be manipulated in the same way a `StorageVec<T>` or `StorageMap<K, V>`. Only the entirety of a `String` may be read/written to storage.

The following demonstrates how to import `StorageString`:

```fuel_Box fuel_Box-idXKMmm-css
use std::storage::storage_string::*;
```

_Icon ClipboardText_

> _Icon InfoCircle_
>
> **NOTE**: When importing the `StorageString`, please be sure to use the glob operator: `use std::storage::storage_string::*`.

The following demonstrates how to write to a `StorageString`:

```fuel_Box fuel_Box-idXKMmm-css
let my_string = String::from_ascii_str("Fuel is blazingly fast");
storage.storage_string.write_slice(my_string);
```

_Icon ClipboardText_

The following demonstrates how to read from a `StorageString`:

```fuel_Box fuel_Box-idXKMmm-css
let stored_string: String = storage.storage_string.read_slice().unwrap();
```

_Icon ClipboardText_

## _Icon Link_ [Advanced Storage](https://docs.fuel.network/docs/sway/blockchain-development/storage/\#advanced-storage)

For more advanced storage techniques please refer to the [Advanced Storage](https://docs.fuel.network/docs/sway/advanced/advanced_storage/) page.