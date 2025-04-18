# Example: docs/reference/src/code/language/style-guide/letter_casing/src/lib.sw

```sway
// ANCHOR: module
library;
// ANCHOR_END: module
// ANCHOR: const
const MAXIMUM_DEPOSIT = 10;
// ANCHOR_END: const
// ANCHOR: structures
struct MultiSignatureWallet {
    owner_count: u64,
}

trait MetaData {
    // code
}

enum DepositError {
    IncorrectAmount: (),
    IncorrectAsset: (),
}
// ANCHOR_END: structures
// ANCHOR: function_case
fn authorize_user(user: Identity) {
    let blacklist_user = false;
    // code
}
// ANCHOR_END: function_case

```
