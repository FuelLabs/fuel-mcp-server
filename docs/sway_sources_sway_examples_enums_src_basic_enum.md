# Example: sway_sources/sway/examples/enums/src/basic_enum.sw

```sway
library;

// Declare the enum
enum Color {
    Blue: (),
    Green: (),
    Red: (),
    Silver: (),
    Grey: (),
}

fn main() {
    // To instantiate a variable with the value of an enum the syntax is
    let blue = Color::Blue;
    let silver = Color::Silver;
}

```
