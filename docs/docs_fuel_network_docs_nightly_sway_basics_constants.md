[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway](https://docs.fuel.network/docs/nightly/sway/) /

[Basics](https://docs.fuel.network/docs/nightly/sway/basics/) /

Constants

## _Icon Link_ [Constants](https://docs.fuel.network/docs/nightly/sway/basics/constants/\#constants)

Constants are similar to variables; however, there are a few differences:

- Constants are always evaluated at compile-time.
- Constants can be declared both inside of a [function](https://docs.fuel.network/docs/nightly/sway/) and at global / `impl` scope.
- The `mut` keyword cannot be used with constants.

```fuel_Box fuel_Box-idXKMmm-css
const ID: u32 = 0;
```

_Icon ClipboardText_

Constant initializer expressions can be quite complex, but they cannot use, for
instance, assembly instructions, storage access, mutable variables, loops and
`return` statements. Although, function calls, primitive types and compound data
structures are perfectly fine to use:

```fuel_Box fuel_Box-idXKMmm-css
fn bool_to_num(b: bool) -> u64 {
    if b {
        1
    } else {
        0
    }
}

fn arr_wrapper(a: u64, b: u64, c: u64) -> [u64; 3] {
    [a, b, c]
}

const ARR2 = arr_wrapper(bool_to_num(1) + 42, 2, 3);
```

_Icon ClipboardText_

## _Icon Link_ [Associated Constants](https://docs.fuel.network/docs/nightly/sway/basics/constants/\#associated-constants)

Associated constants are constants associated with a type and can be declared in an `impl` block or in a `trait` definition.

Associated constants declared inside a `trait` definition may omit their initializers to indicate that each implementation of the trait must specify those initializers.

The identifier is the name of the constant used in the path. The type is the type that the
definition has to implement.

You can _define_ an associated `const` directly in the interface surface of a trait:

```fuel_Box fuel_Box-idXKMmm-css
script;

trait ConstantId {
    const ID: u32 = 0;
}
```

_Icon ClipboardText_

Alternatively, you can also _declare_ it in the trait, and implement it in the interface of the
types implementing the trait.

```fuel_Box fuel_Box-idXKMmm-css
script;

trait ConstantId {
    const ID: u32;
}

struct Struct {}

impl ConstantId for Struct {
    const ID: u32 = 1;
}

fn main() -> u32 {
    Struct::ID
}
```

_Icon ClipboardText_

## _Icon Link_ [`impl self` Constants](https://docs.fuel.network/docs/nightly/sway/basics/constants/\#impl-self-constants)

Constants can also be declared inside non-trait `impl` blocks.

```fuel_Box fuel_Box-idXKMmm-css
script;

struct Point {
    x: u64,
    y: u64,
}

impl Point {
    const ZERO: Point = Point { x: 0, y: 0 };
}

fn main() -> u64  {
    Point::ZERO.x
}
```

_Icon ClipboardText_

## _Icon Link_ [Configurable Constants](https://docs.fuel.network/docs/nightly/sway/basics/constants/\#configurable-constants)

Configurable constants are special constants that behave like regular constants in the sense that they cannot change during program execution, but they can be configured _after_ the Sway program has been built. The Rust and TS SDKs allow updating the values of these constants by injecting new values for them directly in the bytecode without having to build the program again. These are useful for contract factories and behave somewhat similarly to `immutable` variables from languages like Solidity.

Configurable constants are declared inside a `configurable` block and require a type ascription and an initializer as follows:

```fuel_Box fuel_Box-idXKMmm-css
configurable {
    U8: u8 = 8u8,
    BOOL: bool = true,
    ARRAY: [u32; 3] = [253u32, 254u32, 255u32],
    STR_4: str[4] = __to_str_array("fuel"),
    STRUCT: StructWithGeneric<u8> = StructWithGeneric {
        field_1: 8u8,
        field_2: 16,
    },
    ENUM: EnumWithGeneric<bool> = EnumWithGeneric::VariantOne(true),
}
```

_Icon ClipboardText_

At most one `configurable` block is allowed in a Sway project. Moreover, `configurable` blocks are not allowed in libraries.

Configurable constants can be read directly just like regular constants:

```fuel_Box fuel_Box-idXKMmm-css
fn return_configurables() -> (u8, bool, [u32; 3], str[4], StructWithGeneric<u8>) {
    (U8, BOOL, ARRAY, STR_4, STRUCT)
}
```

_Icon ClipboardText_