# Example: sway_sources/fluid-protocol/libraries/src/fluid_math/numbers.sw

```sway
library;
use std::u128::U128;
use std::logging::log;

impl U128 {
    pub fn is_power_of_two(self) -> bool {
        // Check if the number is non-zero and has only one bit set
        self != U128::zero() && (self & (self - U128::from(1u64))) == U128::zero()
    }
    pub fn modulo(self, other: Self) -> Self {
        // Handle the special case where the divisor is a power of 2.
        if other.is_power_of_two() {
            // For power of 2 divisors, we can use a bitwise AND with (divisor - 1)
            return self & (other - U128::from(1u64));
        }

        let quotient = self / other;
        let product = quotient * other;
        self - product
    }
}
#[test]
fn test_is_power_of_two() {
    assert(U128::zero().is_power_of_two() == false);
    assert(U128::from(1u64).is_power_of_two() == true);
    assert(U128::from(2u64).is_power_of_two() == true);
    assert(U128::from(3u64).is_power_of_two() == false);
    assert(U128::from(4u64).is_power_of_two() == true);
    assert(U128::from(5u64).is_power_of_two() == false);
    assert(U128::from(100u64).is_power_of_two() == false);
    assert(U128::from(1024u64).is_power_of_two() == true);
}
#[test]
fn test_u128_modulo() {
    assert(U128::from(100u64).modulo(U128::from(3u64)) == U128::from(1u64));
    assert(U128::from(101u64).modulo(U128::from(3u64)) == U128::from(2u64));
    assert(U128::from(102u64).modulo(U128::from(3u64)) == U128::from(0u64));
    assert(U128::from(103u64).modulo(U128::from(5u64)) == U128::from(3u64));
    assert(U128::from(104u64).modulo(U128::from(5u64)) == U128::from(4u64));
    assert(U128::from(8u64).modulo(U128::from(10u64)) == U128::from(8u64));

    // Additional tests
    assert(U128::from(1000u64).modulo(U128::from(7u64)) == U128::from(6u64));
    assert(U128::from(9999u64).modulo(U128::from(13u64)) == U128::from(2u64));
    assert(U128::from(123456789u64).modulo(U128::from(100u64)) == U128::from(89u64));

    // Prime number tests
    assert(U128::from(97u64).modulo(U128::from(23u64)) == U128::from(5u64));
    assert(U128::from(1009u64).modulo(U128::from(17u64)) == U128::from(6u64));

    assert(U128::from(0u64).modulo(U128::from(5u64)) == U128::from(0u64));
    assert(U128::from(17u64).modulo(U128::from(17u64)) == U128::from(0u64));
}
#[test]
fn test_u128_modulo_large_numbers() {
    let a = U128::max(); //340_282_366_920_938_463_463_374_607_431_768_211_455
    let b = U128::from(7u64);
    assert(a.modulo(b) == U128::from(3u64));

    let c = U128::from(1000u64);
    assert(a.modulo(c) == U128::from(455u64));
}
#[test]
fn test_u128_modulo_other_greater_than_self() {
    let a = U128::from(10u64);
    let b = U128::from(100u64);
    assert(a.modulo(b) == U128::from(10u64));
}
#[test]
fn test_u128_modulo_pow_2_divisor() {
    assert(U128::from(1u64) % U128::from(1u64) == U128::from(0u64));
    assert(U128::from(2u64) % U128::from(1u64) == U128::from(0u64));
    assert(U128::from(3u64) % U128::from(1u64) == U128::from(0u64));
    assert(U128::from(0u64) % U128::from(2u64) == U128::from(0u64));
    assert(U128::from(1u64) % U128::from(2u64) == U128::from(1u64));
    assert(U128::from(2u64) % U128::from(2u64) == U128::from(0u64));
    assert(U128::from(3u64) % U128::from(2u64) == U128::from(1u64));
    assert(U128::from(100u64) % U128::from(2u64) == U128::from(0u64));
    assert(U128::from(101u64) % U128::from(2u64) == U128::from(1u64));
}

```
