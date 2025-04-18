# Example: sway_sources/sway/examples/enums/src/enums_avoid.sw

```sway
library;

use ::enum_of_enums::{Error, StateError, UserError};

fn avoid() {
    let error1 = Error::StateError(StateError::Void);
    let error2 = Error::UserError(UserError::Unauthorized);
}

```
