# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/enum_init_fn_call/src/main.sw

```sway
script;

struct T1 {
    t1: u64, 
}

struct T2 {
    t1: u64, 
    t2: u64
}

enum A {
    A: u64,
    B: T1,
    C: T2,
}

fn main() -> u64 {
    let x = if let A::A(n) = A::A(f()) { n } else { 0 };
    assert(x == 1);

    let y = if let A::B(t) = A::B(g()) { t.t1 } else { 0 };
    assert(y == 42);

    let z = if let A::C(t) = A::C(h()) { t.t2 } else { 0 };
    assert(z == 66);

    1
}

fn f() -> u64 {
    1
}

fn g() -> T1 {
    T1 { t1: 42 }
}

fn h() -> T2 {
    T2 { t1: 77, t2: 66 }
}

```
