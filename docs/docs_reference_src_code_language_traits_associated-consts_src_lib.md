# Example: docs/reference/src/code/language/traits/associated-consts/src/lib.sw

```sway
script;

trait T {
    const C: bool;
}

struct S {}

impl T for S {
    const C: bool = true;
}

fn main() -> bool {
    let s = S {};
    S::C
}

```
