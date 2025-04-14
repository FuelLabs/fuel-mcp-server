[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Common Collections](https://docs.fuel.network/docs/nightly/sway/common-collections/) /

Storage Vec

## _Icon Link_ [Storage Vectors](https://docs.fuel.network/docs/nightly/sway/common-collections/storage_vec/\#storage-vectors)

The second collection type we’ll look at is `StorageVec<T>`. Just like vectors on the heap (i.e. `Vec<T>`), storage vectors allow you to store more than one value in a single data structure where each value is assigned an index and can only store values of the same type. However, unlike `Vec<T>`, the elements of a `StorageVec` are stored in _persistent storage_, and consecutive elements are not necessarily stored in storage slots that have consecutive keys.

In order to use `StorageVec<T>`, you must first import `StorageVec` as follows:

```fuel_Box fuel_Box-idXKMmm-css
use std::storage::storage_vec::*;
```

_Icon ClipboardText_

Another major difference between `Vec<T>` and `StorageVec<T>` is that `StorageVec<T>` can only be used in a contract because only contracts are allowed to access persistent storage.

## _Icon Link_ [Creating a New `StorageVec`](https://docs.fuel.network/docs/nightly/sway/common-collections/storage_vec/\#creating-a-new-storagevec)

To create a new empty `StorageVec`, we have to declare the vector in a `storage` block as follows:

```fuel_Box fuel_Box-idXKMmm-css
v: StorageVec<u64> = StorageVec {},
```

_Icon ClipboardText_

Just like any other storage variable, two things are required when declaring a `StorageVec`: a type annotation and an initializer. The initializer is just an empty struct of type `StorageVec` because `StorageVec<T>` itself is an empty struct! Everything that is interesting about `StorageVec<T>` is implemented in its methods.

Storage vectors, just like `Vec<T>`, are implemented using generics which means that the `StorageVec<T>` type provided by the standard library can hold any type. When we create a `StorageVec` to hold a specific type, we can specify the type within angle brackets. In the example above, we’ve told the Sway compiler that the `StorageVec<T>` in `v` will hold elements of the `u64` type.

## _Icon Link_ [Updating a `StorageVec`](https://docs.fuel.network/docs/nightly/sway/common-collections/storage_vec/\#updating-a-storagevec)

To add elements to a `StorageVec`, we can use the `push` method, as shown below:

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn push_to_storage_vec() {
    storage.v.push(5);
    storage.v.push(6);
    storage.v.push(7);
    storage.v.push(8);
}
```

_Icon ClipboardText_

Note two details here. First, in order to use `push`, we need to first access the vector using the `storage` keyword. Second, because `push` requires accessing storage, a `storage` annotation is required on the ABI function that calls `push`. While it may seem that `#[storage(write)]` should be enough here, the `read` annotation is also required because each call to `push` requires _reading_ (and then updating) the length of the `StorageVec` which is also stored in persistent storage.

> _Icon InfoCircle_
>
> **Note**
> The storage annotation is also required for any private function defined in the contract that tries to push into the vector.

> _Icon InfoCircle_
>
> **Note**
> There is no need to add the `mut` keyword when declaring a `StorageVec<T>`. All storage variables are mutable by default.

## _Icon Link_ [Reading Elements of Storage Vectors](https://docs.fuel.network/docs/nightly/sway/common-collections/storage_vec/\#reading-elements-of-storage-vectors)

To read a value stored in a vector at a particular index, you can use the `get` method as shown below:

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn read_from_storage_vec() {
    let third = storage.v.get(2);
    match third {
        Some(third) => log(third.read()),
        None => revert(42),
    }
}
```

_Icon ClipboardText_

Note three details here. First, we use the index value of `2` to get the third element because vectors are indexed by number, starting at zero. Second, we get the third element by using the `get` method with the index passed as an argument, which gives us an `Option<StorageKey<T>>`. Third, the ABI function calling `get` only requires the annotation `#[storage(read)]` as one might expect because `get` does not write to storage.

When the `get` method is passed an index that is outside the vector, it returns `None` without panicking. This is particularly useful if accessing an element beyond the range of the vector may happen occasionally under normal circumstances. Your code will then have logic to handle having either `Some(element)` or `None`. For example, the index could be coming as a contract method argument. If the argument passed is too large, the method `get` will return a `None` value, and the contract method may then decide to revert when that happens or return a meaningful error that tells the user how many items are in the current vector and give them another chance to pass a valid value.

## _Icon Link_ [Iterating over the Values in a Vector](https://docs.fuel.network/docs/nightly/sway/common-collections/storage_vec/\#iterating-over-the-values-in-a-vector)

Iterating over a storage vector is conceptually the same as [iterating over a `Vec<T>`](https://docs.fuel.network/docs/nightly/sway/common-collections/vec/). The only difference is an additional call to `read()` to actually read the stored value.

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read)]
fn iterate_over_a_storage_vec() {
    // Iterate over all the elements
    // in turn using the `while` loop.
    // **This approach is not recommended.**
    // For iterating over all the elements
    // in turn use the `for` loop instead.
    let mut i = 0;
    while i < storage.v.len() {
        log(storage.v.get(i).unwrap().read());
        i += 1;
    }

    // The preferred and most performant way
    // to iterate over all the elements in turn is
    // to use the `for` loop.
    for elem in storage.v.iter() {
        log(elem.read());
    }

    // Use the `while` loop only when more
    // control over traversal is needed.
    // E.g., in the below example we iterate
    // the vector backwards, accessing only
    // every second element.
    let mut i = storage.v.len() - 1;
    while 0 <= i {
        log(storage.v.get(i).unwrap().read());
        i -= 2;
    }
}
```

_Icon ClipboardText_

Note that **modifying a vector during iteration, by e.g. adding or removing elements, is a logical error and results in an [undefined behavior](https://docs.fuel.network/docs/nightly/sway/reference/undefined_behavior/)**:

## _Icon Link_ [Using an Enum to store Multiple Types](https://docs.fuel.network/docs/nightly/sway/common-collections/storage_vec/\#using-an-enum-to-store-multiple-types)

Storage vectors, just like `Vec<T>`, can only store values that are the same type. Similarly to what we did for `Vec<T>` in the section [Using an Enum to store Multiple Types](https://docs.fuel.network/docs/nightly/sway/common-collections/vec/#using-an-enum-to-store-multiple-types), we can define an enum whose variants will hold the different value types, and all the enum variants will be considered the same type: that of the enum. This is shown below:

```fuel_Box fuel_Box-idXKMmm-css
enum TableCell {
    Int: u64,
    B256: b256,
    Boolean: bool,
}
```

_Icon ClipboardText_

Then we can declare a `StorageVec` in a `storage` block to hold that enum and so, ultimately, holds different types:

```fuel_Box fuel_Box-idXKMmm-css
row: StorageVec<TableCell> = StorageVec {},
```

_Icon ClipboardText_

We can now push different enum variants to the `StorageVec` as follows:

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn push_to_multiple_types_storage_vec() {
    storage.row.push(TableCell::Int(3));
    storage
        .row
        .push(TableCell::B256(0x0101010101010101010101010101010101010101010101010101010101010101));
    storage.row.push(TableCell::Boolean(true));
}
```

_Icon ClipboardText_

Now that we’ve discussed some of the most common ways to use storage vectors, be sure to review the API documentation for all the many useful methods defined on `StorageVec<T>` by the standard library. For now, these can be found in the [source code for `StorageVec<T>` _Icon Link_](https://github.com/FuelLabs/sway/blob/v0.67.0/sway-lib-std/src/storage.sw). For example, in addition to `push`, a `pop` method removes and returns the last element, a `remove` method removes and returns the element at some chosen index within the vector, an `insert` method inserts an element at some chosen index within the vector, etc.

## _Icon Link_ [Nested Storage Vectors](https://docs.fuel.network/docs/nightly/sway/common-collections/storage_vec/\#nested-storage-vectors)

It is possible to nest storage vectors as follows:

```fuel_Box fuel_Box-idXKMmm-css
nested_vec: StorageVec<StorageVec<u64>> = StorageVec {},
```

_Icon ClipboardText_

The nested vector can then be accessed as follows:

```fuel_Box fuel_Box-idXKMmm-css
#[storage(read, write)]
fn access_nested_vec() {
    storage.nested_vec.push(StorageVec {});
    storage.nested_vec.push(StorageVec {});

    let mut inner_vec0 = storage.nested_vec.get(0).unwrap();
    let mut inner_vec1 = storage.nested_vec.get(1).unwrap();

    inner_vec0.push(0);
    inner_vec0.push(1);

    inner_vec1.push(2);
    inner_vec1.push(3);
    inner_vec1.push(4);

    assert(inner_vec0.len() == 2);
    assert(inner_vec0.get(0).unwrap().read() == 0);
    assert(inner_vec0.get(1).unwrap().read() == 1);
    assert(inner_vec0.get(2).is_none());

    assert(inner_vec1.len() == 3);
    assert(inner_vec1.get(0).unwrap().read() == 2);
    assert(inner_vec1.get(1).unwrap().read() == 3);
    assert(inner_vec1.get(2).unwrap().read() == 4);
    assert(inner_vec1.get(3).is_none());
}
```

_Icon ClipboardText_