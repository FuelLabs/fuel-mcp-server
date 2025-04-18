# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/dereferenced_projection_reassignment/src/main.sw

```sway
script;

struct MyStruct {
    a: u64
}

fn main() -> u64 {
    let mut a = [1, 2];
    let mut p = &mut a;
    (*p)[1] = 1;
    assert_eq(a[0], 1);
    assert_eq(a[1], 1);

    let mut a = (1, 2);
    let mut p = &mut a;
    (*p).0 = 0;
    assert_eq(a.0, 0);
    assert_eq(a.1, 2);

    let mut a = MyStruct { a: 1 };
    let mut p = &mut a;
    (*p).a = 2;
    assert_eq(a.a, 2);

    let mut a = [1, 2];
    let mut p = &mut a;
    let mut p2 = &mut p;
    (**p2)[1] = 1;
    assert_eq(a[0], 1);
    assert_eq(a[1], 1);

    let mut a = (1, 2);
    let mut p = &mut a;
    let mut p2 = &mut p;
    (**p2).0 = 0;
    assert_eq(a.0, 0);
    assert_eq(a.1, 2);

    let mut a = MyStruct { a: 1 };
    let mut p = &mut a;
    let mut p2 = &mut p;
    (**p2).a = 2;
    assert_eq(a.a, 2);

    42
}

```
