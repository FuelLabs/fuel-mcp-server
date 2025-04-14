[Docs](https://docs.fuel.network/) /

[Sway](https://docs.fuel.network/docs/sway/) /

[Reference](https://docs.fuel.network/docs/sway/reference/) /

Compiler Intrinsics

## _Icon Link_ [Compiler Intrinsics](https://docs.fuel.network/docs/sway/reference/compiler_intrinsics/\#compiler-intrinsics)

The Sway compiler supports a list of intrinsics that perform various low level operations that are useful for building libraries. Compiler intrinsics should rarely be used but are preferred over `asm` blocks because they are type-checked and are safer overall. Below is a list of all available compiler intrinsics:

* * *

```fuel_Box fuel_Box-idXKMmm-css
__size_of_val<T>(val: T) -> u64
```

_Icon ClipboardText_

**Description:** Return the size of type `T` in bytes.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__size_of<T>() -> u64
```

_Icon ClipboardText_

**Description:** Return the size of type `T` in bytes.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__size_of_str_array<T>() -> u64
```

_Icon ClipboardText_

**Description:** Return the size of type `T` in bytes. This intrinsic differs from `__size_of` in the case of "string arrays" where the actual length in bytes of the string is returned without padding the byte size to the next word alignment. When `T` is not a "string array" `0` is returned.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__assert_is_str_array<T>()
```

_Icon ClipboardText_

**Description:** Throws a compile error if type `T` is not a "string array".

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__to_str_array(s: str) -> str[N]
```

_Icon ClipboardText_

**Description:** Converts a "string slice" to "string array" at compile time. Parameter "s" must be a string literal.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__is_reference_type<T>() -> bool
```

_Icon ClipboardText_

**Description:** Returns `true` if `T` is a _reference type_ and `false` otherwise.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__is_str_array<T>() -> bool
```

_Icon ClipboardText_

**Description:** Returns `true` if `T` is a string array and `false` otherwise.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__eq<T>(lhs: T, rhs: T) -> bool
```

_Icon ClipboardText_

**Description:** Returns whether `lhs` and `rhs` are equal.

**Constraints:** `T` is `bool`, `u8`, `u16`, `u32`, `u64`, `u256`, `b256` or `raw_ptr`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__gt<T>(lhs: T, rhs: T) -> bool
```

_Icon ClipboardText_

**Description:** Returns whether `lhs` is greater than `rhs`.

**Constraints:** `T` is `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__lt<T>(lhs: T, rhs: T) -> bool
```

_Icon ClipboardText_

**Description:** Returns whether `lhs` is less than `rhs`.

**Constraints:** `T` is `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__gtf<T>(index: u64, tx_field_id: u64) -> T
```

_Icon ClipboardText_

**Description:** Returns transaction field with ID `tx_field_id` at index `index`, if applicable. This is a wrapper around FuelVM's [`gtf` instruction](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#gtf-get-transaction-fields). The resulting field is cast to `T`.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__addr_of<T>(val: T) -> raw_ptr
```

_Icon ClipboardText_

**Description:** Returns the address in memory where `val` is stored.

**Constraints:** `T` is a reference type.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__state_load_word(key: b256) -> u64
```

_Icon ClipboardText_

**Description:** Reads and returns a single word from storage at key `key`.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__state_load_quad(key: b256, ptr: raw_ptr, slots: u64) -> bool
```

_Icon ClipboardText_

**Description:** Reads `slots` number of slots ( `b256` each) from storage starting at key `key` and stores them in memory starting at address `ptr`. Returns a Boolean describing whether all the storage slots were previously set.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__state_store_word(key: b256, val: u64) -> bool
```

_Icon ClipboardText_

**Description:** Stores a single word `val` into storage at key `key`. Returns a Boolean describing whether the store slot was previously set.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__state_store_quad(key: b256, ptr: raw_ptr, slots: u64) -> bool
```

_Icon ClipboardText_

**Description:** Stores `slots` number of slots ( `b256` each) starting at address `ptr` in memory into storage starting at key `key`. Returns a Boolean describing whether the first storage slot was previously set.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__log<T>(val: T)
```

_Icon ClipboardText_

**Description:** Logs value `val`.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__add<T>(lhs: T, rhs: T) -> T
```

_Icon ClipboardText_

**Description:** Adds `lhs` and `rhs` and returns the result.

**Constraints:** `T` is an integer type, i.e. `u8`, `u16`, `u32`, `u64`, `u256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__sub<T>(lhs: T, rhs: T) -> T
```

_Icon ClipboardText_

**Description:** Subtracts `rhs` from `lhs`.

**Constraints:** `T` is an integer type, i.e. `u8`, `u16`, `u32`, `u64`, `u256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__mul<T>(lhs: T, rhs: T) -> T
```

_Icon ClipboardText_

**Description:** Multiplies `lhs` by `rhs`.

**Constraints:** `T` is an integer type, i.e. `u8`, `u16`, `u32`, `u64`, `u256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__div<T>(lhs: T, rhs: T) -> T
```

_Icon ClipboardText_

**Description:** Divides `lhs` by `rhs`.

**Constraints:** `T` is an integer type, i.e. `u8`, `u16`, `u32`, `u64`, `u256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__and<T>(lhs: T, rhs: T) -> T
```

_Icon ClipboardText_

**Description:** Bitwise AND `lhs` and `rhs`.

**Constraints:** `T` is an integer type, i.e. `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__or<T>(lhs: T, rhs: T) -> T
```

_Icon ClipboardText_

**Description:** Bitwise OR `lhs` and `rhs`.

**Constraints:** `T` is an integer type, i.e. `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__xor<T>(lhs: T, rhs: T) -> T
```

_Icon ClipboardText_

**Description:** Bitwise XOR `lhs` and `rhs`.

**Constraints:** `T` is an integer type, i.e. `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__mod<T>(lhs: T, rhs: T) -> T
```

_Icon ClipboardText_

**Description:** Modulo of `lhs` by `rhs`.

**Constraints:** `T` is an integer type, i.e. `u8`, `u16`, `u32`, `u64`, `u256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__rsh<T>(lhs: T, rhs: u64) -> T
```

_Icon ClipboardText_

**Description:** Logical right shift of `lhs` by `rhs`.

**Constraints:** `T` is an integer type, i.e. `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__lsh<T>(lhs: T, rhs: u64) -> T
```

_Icon ClipboardText_

**Description:** Logical left shift of `lhs` by `rhs`.

**Constraints:** `T` is an integer type, i.e. `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__revert(code: u64)
```

_Icon ClipboardText_

**Description:** Reverts with error code `code`.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__ptr_add(ptr: raw_ptr, offset: u64)
```

_Icon ClipboardText_

**Description:** Adds `offset` to the raw value of pointer `ptr`.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__ptr_sub(ptr: raw_ptr, offset: u64)
```

_Icon ClipboardText_

**Description:** Subtracts `offset` to the raw value of pointer `ptr`.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__smo<T>(recipient: b256, data: T, coins: u64)
```

_Icon ClipboardText_

**Description:** Sends a message `data` of arbitrary type `T` and `coins` amount of the base asset to address `recipient`.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__not(op: T) -> T
```

_Icon ClipboardText_

**Description:** Bitwise NOT of `op`

**Constraints:** `T` is an integer type, i.e. `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__jmp_mem()
```

_Icon ClipboardText_

**Description:** Jumps to `MEM[$hp]`.

**Constraints:** None.

* * *

```fuel_Box fuel_Box-idXKMmm-css
__slice(item: &[T; N], start: u64, end: u64) -> &[T]
__slice(item: &[T], start: u64, end: u64) -> &[T]
__slice(item: &mut [T; N], start: u64, end: u64) -> &mut [T]
__slice(item: &mut [T], start: u64, end: u64) -> &mut [T]
```

_Icon ClipboardText_

**Description:** Slices an array or another slice.

This intrinsic returns a reference to a slice containing the range of elements inside `item`.
The mutability of reference is defined by the first parameter mutability.

Runtime bound checks are not generated, and must be done manually when and where appropriated. Compile time bound checks are done when possible.

**Constraints:**

- `item` is an array or a slice;
- when `start` is a literal, it must be smaller than `item` length;
- when `end` is a literal, it must be smaller than or equal to `item` length;
- `end` must be greater than or equal to `start`

* * *

```fuel_Box fuel_Box-idXKMmm-css
__elem_at(item: &[T; N], index: u64) -> &T
__elem_at(item: &[T], index: u64) -> &T
__elem_at(item: &mut [T; N], index: u64) -> &mut T
__elem_at(item: &mut [T], index: u64) -> &mut T
```

_Icon ClipboardText_

**Description:** Returns a reference to the indexed element. The mutability of reference is defined by the first parameter mutability.

Runtime bound checks are not generated, and must be done manually when and where appropriated. Compile time bound checks are done when possible.

**Constraints:**

- `item` is a reference to an array or a reference to a slice;
- when `index` is a literal, it must be smaller than `item` length;