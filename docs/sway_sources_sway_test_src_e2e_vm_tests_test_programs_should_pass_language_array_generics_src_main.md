# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/array_generics/src/main.sw

```sway
script;

fn get_array_pair<T>(a: T, b: T) -> [T; 2] {
    [a, b]
}

fn idx_array_pair<T>(ary: [T; 2], idx: u64) -> T {
    ary[idx]
}

struct S<T> {
    a: [T; 10],
}

fn main() -> bool {
    let _ary_u64: [u64; 2] = get_array_pair(1, 2);

    let s = S {
        a: [0_u64; 10]
    };
    let _t = (s.a)[9];

    let ary_bool = get_array_pair(false, true);
    idx_array_pair(ary_bool, 1)
}

```
