# Example: sway_sources/sway/examples/enums/src/enum_of_structs.sw

```sway
library;

struct Item {
    price: u64,
    amount: u64,
    id: u64,
}

enum MyEnum {
    Item: Item,
}

fn main() {
    let my_enum = MyEnum::Item(Item {
        price: 5,
        amount: 2,
        id: 42,
    });
}

```
