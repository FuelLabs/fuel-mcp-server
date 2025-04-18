# Example: docs/reference/src/code/language/program-types/libraries/internal/my_lib/src/lib.sw

```sway
library;

mod my_library;

use my_library::bar;

// `bar` from `my_library` is now available throughout the file

```
