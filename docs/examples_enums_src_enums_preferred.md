# Example: examples/enums/src/enums_preferred.sw

```sway
library;

use ::enum_of_enums::{StateError, UserError};

fn preferred() {
    let error1 = StateError::Void;
    let error2 = UserError::Unauthorized;
}

```
