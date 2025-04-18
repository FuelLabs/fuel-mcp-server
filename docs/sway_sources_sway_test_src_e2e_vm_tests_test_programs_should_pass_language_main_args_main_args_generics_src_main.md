# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/main_args/main_args_generics/src/main.sw

```sway
script;

struct OneGeneric<U> {
    a: U,
}

struct TwoGenerics<T, V> {
    b: OneGeneric<T>,
    c: V,
}

type A = (TwoGenerics<u64, u32>, OneGeneric<u8>);

fn main(input: A) -> A {
    (
        TwoGenerics {
            b: OneGeneric { a: input.0.b.a + 1 },
            c: input.0.c + 1
        },
        OneGeneric { a: input.1.a + 1 },
    )
}

```
