# Example: test/src/in_language_tests/test_programs/b512_inline_tests/src/main.sw

```sway
library;

use std::b512::B512;

#[test]
fn b512_eq() {
    let b512_1 = B512::zero();
    let b512_2 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000000,
        0x0000000000000000000000000000000000000000000000000000000000000000,
    ));
    let b512_3 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000001,
        0x0000000000000000000000000000000000000000000000000000000000000001,
    ));
    let b512_4 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000001,
        0x0000000000000000000000000000000000000000000000000000000000000001,
    ));
    let b512_5 = B512::from((
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    ));
    let b512_6 = B512::from((
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    ));

    assert(b512_1 == b512_2);
    assert(b512_3 == b512_4);
    assert(b512_5 == b512_6);
}

#[test]
fn b512_ne() {
    let b512_1 = B512::zero();
    let b512_2 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000000,
        0x0000000000000000000000000000000000000000000000000000000000000000,
    ));
    let b512_3 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000001,
        0x0000000000000000000000000000000000000000000000000000000000000001,
    ));
    let b512_4 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000001,
        0x0000000000000000000000000000000000000000000000000000000000000001,
    ));
    let b512_5 = B512::from((
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    ));
    let b512_6 = B512::from((
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    ));

    assert(b512_1 != b512_3);
    assert(b512_1 != b512_4);
    assert(b512_1 != b512_5);
    assert(b512_1 != b512_6);
    assert(b512_2 != b512_3);
    assert(b512_2 != b512_4);
    assert(b512_2 != b512_5);
    assert(b512_2 != b512_6);
    assert(b512_3 != b512_5);
    assert(b512_3 != b512_6);
}

#[test]
fn b512_from_b256() {
    let b256_tuple_1: (b256, b256) = (
        0x0000000000000000000000000000000000000000000000000000000000000000,
        0x0000000000000000000000000000000000000000000000000000000000000000,
    );
    let b512_1 = B512::from(b256_tuple_1);
    assert(
        b512_1
            .bits()[0] == 0x0000000000000000000000000000000000000000000000000000000000000000 && b512_1
            .bits()[1] == 0x0000000000000000000000000000000000000000000000000000000000000000,
    );

    let b256_tuple_2: (b256, b256) = (
        0x0000000000000000000000000000000000000000000000000000000000000001,
        0x0000000000000000000000000000000000000000000000000000000000000001,
    );
    let b512_2 = B512::from(b256_tuple_2);
    assert(
        b512_2
            .bits()[0] == 0x0000000000000000000000000000000000000000000000000000000000000001 && b512_2
            .bits()[1] == 0x0000000000000000000000000000000000000000000000000000000000000001,
    );

    let b256_tuple_3: (b256, b256) = (
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    );
    let b512_3 = B512::from(b256_tuple_3);
    assert(
        b512_3
            .bits()[0] == 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF && b512_3
            .bits()[1] == 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    );
}

#[test]
fn b512_into_b256() {
    let b256_tuple_1: (b256, b256) = (
        0x0000000000000000000000000000000000000000000000000000000000000000,
        0x0000000000000000000000000000000000000000000000000000000000000000,
    );
    let b512_1: B512 = b256_tuple_1.into();
    assert(
        b512_1
            .bits()[0] == 0x0000000000000000000000000000000000000000000000000000000000000000 && b512_1
            .bits()[1] == 0x0000000000000000000000000000000000000000000000000000000000000000,
    );

    let b256_tuple_2: (b256, b256) = (
        0x0000000000000000000000000000000000000000000000000000000000000001,
        0x0000000000000000000000000000000000000000000000000000000000000001,
    );
    let b512_2: B512 = b256_tuple_2.into();
    assert(
        b512_2
            .bits()[0] == 0x0000000000000000000000000000000000000000000000000000000000000001 && b512_2
            .bits()[1] == 0x0000000000000000000000000000000000000000000000000000000000000001,
    );

    let b256_tuple_3: (b256, b256) = (
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    );
    let b512_3: B512 = b256_tuple_3.into();
    assert(
        b512_3
            .bits()[0] == 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF && b512_3
            .bits()[1] == 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    );
}

#[test]
fn b512_b256_from() {
    // Glob operator needed for From<B512> for (b256, b256)
    use std::b512::*;

    let b512_1 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000000,
        0x0000000000000000000000000000000000000000000000000000000000000000,
    ));
    let b256_tuple_1: (b256, b256) = b512_1.into();
    assert(
        b256_tuple_1.0 == 0x0000000000000000000000000000000000000000000000000000000000000000 && b256_tuple_1.1 == 0x0000000000000000000000000000000000000000000000000000000000000000,
    );

    let b512_2 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000001,
        0x0000000000000000000000000000000000000000000000000000000000000001,
    ));
    let b256_tuple_2: (b256, b256) = b512_2.into();
    assert(
        b256_tuple_2.0 == 0x0000000000000000000000000000000000000000000000000000000000000001 && b256_tuple_2.1 == 0x0000000000000000000000000000000000000000000000000000000000000001,
    );

    let b512_3 = B512::from((
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    ));
    let b256_tuple_3: (b256, b256) = b512_3.into();
    assert(
        b256_tuple_3.0 == 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF && b256_tuple_3.1 == 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    );
}

#[test]
fn b512_b256_into() {
    // Glob operator needed for From<B512> for (b256, b256)
    use std::b512::*;

    let b512_1 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000000,
        0x0000000000000000000000000000000000000000000000000000000000000000,
    ));
    let b256_tuple_1: (b256, b256) = <(b256, b256) as From<B512>>::from(b512_1);
    assert(
        b256_tuple_1.0 == 0x0000000000000000000000000000000000000000000000000000000000000000 && b256_tuple_1.1 == 0x0000000000000000000000000000000000000000000000000000000000000000,
    );

    let b512_2 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000001,
        0x0000000000000000000000000000000000000000000000000000000000000001,
    ));
    let b256_tuple_2: (b256, b256) = <(b256, b256) as From<B512>>::from(b512_2);
    assert(
        b256_tuple_2.0 == 0x0000000000000000000000000000000000000000000000000000000000000001 && b256_tuple_2.1 == 0x0000000000000000000000000000000000000000000000000000000000000001,
    );

    let b512_3 = B512::from((
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    ));
    let b256_tuple_3: (b256, b256) = <(b256, b256) as From<B512>>::from(b512_3);
    assert(
        b256_tuple_3.0 == 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF && b256_tuple_3.1 == 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    );
}

#[test]
fn b512_new() {
    let new_b512 = B512::new();
    assert(new_b512.bits()[0] == b256::zero() && new_b512.bits()[1] == b256::zero());
}

#[test]
fn b512_bits() {
    let b256_tuple_1: (b256, b256) = (
        0x0000000000000000000000000000000000000000000000000000000000000000,
        0x0000000000000000000000000000000000000000000000000000000000000000,
    );
    let b256_array_1: [b256; 2] = [
        0x0000000000000000000000000000000000000000000000000000000000000000,
        0x0000000000000000000000000000000000000000000000000000000000000000,
    ];
    let b512_1 = B512::from(b256_tuple_1);
    assert(b512_1.bits()[0] == b256_array_1[0] && b512_1.bits()[1] == b256_array_1[1]);

    let b256_tuple_2: (b256, b256) = (
        0x0000000000000000000000000000000000000000000000000000000000000001,
        0x0000000000000000000000000000000000000000000000000000000000000001,
    );
    let b256_array_2: [b256; 2] = [
        0x0000000000000000000000000000000000000000000000000000000000000001,
        0x0000000000000000000000000000000000000000000000000000000000000001,
    ];
    let b512_2 = B512::from(b256_tuple_2);
    assert(b512_2.bits()[0] == b256_array_2[0] && b512_2.bits()[1] == b256_array_2[1]);

    let b256_tuple_3: (b256, b256) = (
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    );
    let b256_array_3: [b256; 2] = [
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    ];
    let b512_3 = B512::from(b256_tuple_3);
    assert(b512_3.bits()[0] == b256_array_3[0] && b512_3.bits()[1] == b256_array_3[1]);
}

#[test]
fn b512_zero() {
    let zero_b512 = B512::zero();
    assert(zero_b512.bits()[0] == b256::zero() && zero_b512.bits()[1] == b256::zero());
}

#[test]
fn b512_is_zero() {
    let zero_b512 = B512::zero();
    assert(zero_b512.is_zero());

    let b512_1 = B512::from((
        b256::zero(),
        0x0000000000000000000000000000000000000000000000000000000000000001,
    ));
    assert(!b512_1.is_zero());

    let b512_2 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000001,
        b256::zero(),
    ));
    assert(!b512_2.is_zero());

    let b512_3 = B512::from((
        0x0000000000000000000000000000000000000000000000000000000000000001,
        0x0000000000000000000000000000000000000000000000000000000000000001,
    ));
    assert(!b512_3.is_zero());

    let b512_4 = B512::from((
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
        0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
    ));
    assert(!b512_4.is_zero());
}

#[test]
fn b512_try_from_bytes() {
    use std::bytes::Bytes;

    // Test empty bytes
    let bytes_1 = Bytes::new();
    assert(B512::try_from(bytes_1).is_none());

    // Test not full length but capacity bytes
    let mut bytes_2 = Bytes::with_capacity(64);
    bytes_2.push(1u8);
    bytes_2.push(3u8);
    bytes_2.push(5u8);
    assert(B512::try_from(bytes_2).is_none());

    // Test zero bytes
    let b256_tuple_3 = (b256::zero(), b256::zero());
    let bytes_3 = Bytes::from(raw_slice::from_parts::<u8>(__addr_of(b256_tuple_3), 64));
    let b512_3 = B512::try_from(bytes_3);
    assert(b512_3.is_some());
    assert(b512_3.unwrap() == B512::zero());

    // Test max bytes
    let b256_tuple_4 = (b256::max(), b256::max());
    let bytes_4 = Bytes::from(raw_slice::from_parts::<u8>(__addr_of(b256_tuple_4), 64));
    let b512_4 = B512::try_from(bytes_4);
    assert(b512_4.is_some());
    assert(b512_4.unwrap() == B512::from((b256::max(), b256::max())));

    // Test too many bytes
    let b256_tuple_5 = (b256::max(), b256::max());
    let mut bytes_5 = Bytes::from(raw_slice::from_parts::<u8>(__addr_of(b256_tuple_5), 64));
    bytes_5.push(255u8);
    assert(B512::try_from(bytes_5).is_none());

    // Test modifying bytes after doesn't impact 
    let b256_tuple_6 = (b256::zero(), b256::zero());
    let mut bytes_6 = Bytes::from(raw_slice::from_parts::<u8>(__addr_of(b256_tuple_6), 64));
    let b512_6 = B512::try_from(bytes_6);
    assert(b512_6.is_some());
    assert(b512_6.unwrap() == B512::zero());
    bytes_6.set(0, 255u8);
    assert(b512_6.unwrap() == B512::zero());
}

#[test]
fn b512_into_bytes() {
    use std::bytes::Bytes;

    let b512_1 = B512::zero();
    let bytes_1: Bytes = <B512 as Into<Bytes>>::into(b512_1);
    assert(bytes_1.capacity() == 64);
    assert(bytes_1.len() == 64);
    let mut iter_1 = 0;
    while iter_1 < 64 {
        assert(bytes_1.get(iter_1).unwrap() == 0u8);
        iter_1 += 1;
    }

    let b512_2 = B512::from((b256::max(), b256::max()));
    let bytes_2: Bytes = <B512 as Into<Bytes>>::into(b512_2);
    assert(bytes_2.capacity() == 64);
    assert(bytes_2.len() == 64);
    let mut iter_2 = 0;
    while iter_2 < 64 {
        assert(bytes_2.get(iter_2).unwrap() == 255u8);
        iter_2 += 1;
    }

    let b512_3 = B512::from((
        b256::zero(),
        0x0000000000000000000000000000000000000000000000000000000000000001,
    ));
    let bytes_3: Bytes = <B512 as Into<Bytes>>::into(b512_3);
    assert(bytes_3.capacity() == 64);
    assert(bytes_3.len() == 64);
    assert(bytes_3.get(63).unwrap() == 1u8);
    let mut iter_3 = 0;
    while iter_3 < 63 {
        assert(bytes_3.get(iter_3).unwrap() == 0u8);
        iter_3 += 1;
    }
}

```
