# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/supertraits_with_trait_methods/src/main.sw

```sway
script;

trait MyAdd {
    fn my_add(self, other: Self) -> Self;
}

trait MyMul {
    fn my_mul(self, other: Self) -> Self;
}

trait MyMath: MyAdd + MyMul {

} {
    fn my_double(self) -> Self {
        self.my_add(self)
    }

    fn my_exp(self) -> Self {
        self.my_mul(self)
    }
}

struct Data {
    value: u64,
}

impl MyAdd for Data {
    fn my_add(self, other: Self) -> Self {
        Data {
            value: self.value + other.value
        }
    }
}

impl MyMul for Data {
    fn my_mul(self, other: Self) -> Self {
        Data {
            value: self.value * other.value
        }
    }
}

impl MyMath for Data {}

fn main() -> bool {
    let a = Data {
        value: 3u64
    };
    let b = a.my_exp();
    let c = b.my_double();
    assert(c.value == 18);

    true
}

```
