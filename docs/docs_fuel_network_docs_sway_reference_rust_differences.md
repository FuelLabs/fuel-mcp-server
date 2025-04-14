[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Reference](https://docs.fuel.network/docs/sway/reference/) /

Rust Differences

## _Icon Link_ [Differences From Rust](https://docs.fuel.network/docs/sway/reference/rust_differences/\#differences-from-rust)

Sway shares a lot with Rust, especially its syntax. Because they are so similar, you may be surprised or caught off guard when they differ. This page serves to outline, from a high level, some of the syntactic _gotchas_ that you may encounter.

## _Icon Link_ [Enum Variant Syntax](https://docs.fuel.network/docs/sway/reference/rust_differences/\#enum-variant-syntax)

In Rust, enums generally take one of three forms: _unit_ variants, which have no inner data, _struct_ variants, which contain named fields, and _tuple_ variants, which contain within them a tuple of data. If you are unfamiliar with these terms, this is what they look like:

```fuel_Box fuel_Box-idXKMmm-css
// note to those skimming the docs: this is Rust syntax! Not Sway! Don't copy/paste this into a Sway program.

enum Foo {
    UnitVariant,
    TupleVariant(u32, u64, bool),
    StructVariant {
        field_one: bool,
        field_two: bool
    }
}
```

_Icon ClipboardText_

In Sway, enums are simplified. Enums variants must all specify exactly one type. This type represents their interior data. This is actually isomorphic to what Rust offers, but with a different syntax. You can see the above enum but with Sway syntax below:

```fuel_Box fuel_Box-idXKMmm-css
// This is equivalent Sway syntax for the above Rust enum.
enum Foo {
    UnitVariant: (),
    TupleVariant: (u32, u64, bool),
    StructVariant: MyStruct,
}

struct MyStruct {
    field_one: bool,
    field_two: bool,
}
```

_Icon ClipboardText_

## _Icon Link_ [Memory Allocation](https://docs.fuel.network/docs/sway/reference/rust_differences/\#memory-allocation)

In Rust, the borrow checker implements Rust's [ownership system _Icon Link_](https://doc.rust-lang.org/1.8.0/book/ownership.html)

In Sway, there is no borrow checker. This means there is no concept of ownership, borrowing, or lifetimes. Instead, objects are copied and moved similar to C++. Also Sway does not have any destructors nor `Drop` traits. This means allocated memory lives for the entire transaction and is not deallocated until the end of the transaction. A transaction may allocate up to [64 MB _Icon Link_](https://github.com/FuelLabs/fuel-vm/blob/a80f82ed7c793763de6a73ca72d946b311b0fd0b/fuel-vm/src/consts.rs#L26) of memory.