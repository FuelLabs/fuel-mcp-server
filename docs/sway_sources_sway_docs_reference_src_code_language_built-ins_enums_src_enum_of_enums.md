# Example: sway_sources/sway/docs/reference/src/code/language/built-ins/enums/src/enum_of_enums.sw

```sway
library;

// ANCHOR: content
enum UserError {
    InsufficientPermissions: (),
    Unauthorized: (),
}

enum Error {
    UserError: UserError,
}

fn main() {
    let my_enum = Error::UserError(UserError::Unauthorized);
}
// ANCHOR_END: content

```
