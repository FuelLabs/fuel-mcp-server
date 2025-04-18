# Example: sway_sources/sway/test/src/e2e_vm_tests/reduced_std_libs/sway-lib-std-option-result/src/prelude.sw

```sway
//! Defines the Sway standard library prelude.
//! The prelude consists of implicitly available items,
//! for which `use` is not required.
library;

// Error handling
pub use ::assert::{assert, assert_eq, assert_ne};
pub use ::option::Option::{self, *};
pub use ::result::Result::{self, *};
pub use ::revert::{require, revert};

// Logging
pub use ::logging::log;

// (Previously) core
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
