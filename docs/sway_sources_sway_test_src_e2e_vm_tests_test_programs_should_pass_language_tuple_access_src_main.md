# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/tuple_access/src/main.sw

```sway
script;

fn gimme_a_pair() -> (u32, u64) {
    (1u32, 2u64)
}

fn test<T, E>(a: T, b: E) {
    let (_x, _y): (T, E) = (a, b);
} 

fn main() -> u64 {
    let (_foo, _bar) = gimme_a_pair();
    let (_x, _y): (u32, bool) = (10, true);
    let (x, y): (u32, _) = (42, true);
    test(x, y);
    test(true, false);
    test (42, 42);
    let (a, (_b, (_c, _d) ) ): (u64, (u32, (bool, str) ) ) = (42u64, (42u32, (true, "ok") ) );
    a
}

```
