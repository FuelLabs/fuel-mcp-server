# Example: sway_sources/sway/test/src/sdk-harness/test_projects/script_data/src/main.sw

```sway
script;

use std::tx::tx_script_data;

fn main() {
    // Reference type
    let received: b256 = tx_script_data().unwrap();
    let expected: b256 = 0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a;
    log(received);
    assert(received == expected);

    // Copy type
    let received: u64 = tx_script_data().unwrap();
    let expected: u64 = 17259675764097085660;
    log(received);
    assert(received == expected);
}

```
