# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/generic_inside_generic/src/main.sw

```sway
script;

struct Generic1<T> {
    a: T,
}

struct Generic2<T> {
    b: Generic1<T>,
}

enum Generic3<T> {
    A: T,
    B: T
}

enum Generic4<T> {
    C: Generic3<T>,
    D: Generic3<T>
}

fn main() -> u64 {
    let a = Generic1 {
        a: 7u64
    };
    let b = Generic2 {
        b: a
    };
    let c = Generic3::B(b);
    let d = Generic4::C(c);

    match d {
        Generic4::C(
            Generic3::B(
                Generic2 {
                    b: Generic1 {
                        a
                    }
                }
            )
        ) => { a },
        _ => { 0 }
    }
}
```
