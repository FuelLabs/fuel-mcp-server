# Example: sway_sources/sway/test/src/e2e_vm_tests/reduced_std_libs/sway-lib-std-core/src/prelude.sw

```sway
//! Defines the Sway standard library prelude.
//! The prelude consists of implicitly available items,
//! for which `use` is not required.
library;

// This was previously the `core` library.
pub use ::primitives::*;
pub use ::slice::*;
pub use ::ops::*;
pub use ::never::*;
pub use ::raw_ptr::*;
pub use ::raw_slice::*;
pub use ::codec::*;
pub use ::str::*;
#[cfg(experimental_error_type = true)]
pub use ::marker::*;

```
