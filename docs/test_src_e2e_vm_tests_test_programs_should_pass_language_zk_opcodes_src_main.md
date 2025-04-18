# Example: test/src/e2e_vm_tests/test_programs/should_pass/language/zk_opcodes/src/main.sw

```sway
script;

fn main() -> bool {
    let src_addr: [u64; 32] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let dst_addr: [u64; 32] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    asm(dst_addr: dst_addr, curve: 0, op: 0, src_addr: src_addr) {
        ecop dst_addr curve op src_addr;
    }

    asm(res, curve: 0, group_of_points: 1, addr: dst_addr) {
        epar res curve group_of_points addr;
        res: bool
    }
}

```
