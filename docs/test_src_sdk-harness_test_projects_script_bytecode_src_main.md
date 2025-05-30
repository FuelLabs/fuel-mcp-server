# Example: test/src/sdk-harness/test_projects/script_bytecode/src/main.sw

```sway
script;

use std::hash::*;
use std::tx::tx_script_bytecode;

impl Hash for [u64; 35] {
    fn hash(self, ref mut state: Hasher) {
        let mut i = 0;
        while i < 35 {
            self[i].hash(state);
            i += 1;
        }
    }
}

fn main() -> b256 {
    // length of return array is script length padded to nearest full word
    let script_bytecode: [u64; 35] = tx_script_bytecode().unwrap();

    // Return the hash of the bytecode to compare
    sha256(script_bytecode)
}

```
