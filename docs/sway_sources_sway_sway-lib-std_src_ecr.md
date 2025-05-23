# Example: sway_sources/sway/sway-lib-std/src/ecr.sw

```sway
//! Helper functions to verify signatures.
library;

use ::address::Address;
use ::b512::B512;
use ::bytes::Bytes;
use ::registers::error;
use ::hash::*;
use ::result::Result::{self, *};
use ::codec::*;

/// The error type used when the `ec_recover` function fails.
pub enum EcRecoverError {
    /// The error variant used when the recover fails.
    UnrecoverablePublicKey: (),
    /// The length of the message is zero.
    ZeroLengthMessage: (),
}

/// Recover the public key derived from the private key used to sign a message.
/// Returns a `Result` to let the caller choose an error handling strategy.
///
/// # Additional Information
///
/// Follows the Secp256k1 elliptical curve.
///
/// # Arguments
///
/// * `signature`: [B512] - The signature generated by signing a message hash.
/// * `msg_hash`: [b256] - The signed data.
///
/// # Returns
///
/// * [Result<B512, EcRecoverError>] - The recovered public key or an error.
///
/// # Examples
///
/// ```sway
/// use std::{ecr::ec_recover, b512::B512};
///
/// fn foo() {
///     let hi = 0xbd0c9b8792876713afa8bff383eebf31c43437823ed761cc3600d0016de5110c;
///     let lo = 0x44ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d;
///     let msg_hash = 0xee45573606c96c98ba970ff7cf9511f1b8b25e6bcd52ced30b89df1e4a9c4323;
///     let pub_hi = 0xD73A188181464CC84AE267E45041AEF6AB938F278E636AA1D02D3014C1BEF74E;
///     let pub_lo = 0xC44415635160ACFC87A84300EED97928C949A2D958FC0947C535F7539C59AE75;
///     let signature: B512 = B512::from((hi, lo));
///     // A recovered public key pair.
///     let public_key = ec_recover(signature, msg_hash).unwrap();
///
///     assert(public_key.bits()[0] == pub_hi);
///     assert(public_key.bits()[1] == pub_lo);
/// }
/// ```
#[deprecated(note = "`std::ecr` has been replaced by `std::crypto`, and is no longer maintained.")]
pub fn ec_recover(signature: B512, msg_hash: b256) -> Result<B512, EcRecoverError> {
    let public_key = B512::new();
    let was_error = asm(
        buffer: __addr_of(public_key),
        sig: __addr_of(signature),
        hash: msg_hash,
    ) {
        eck1 buffer sig hash;
        err
    };
    // check the $err register to see if the `eck1` opcode succeeded
    if was_error == 1 {
        Err(EcRecoverError::UnrecoverablePublicKey)
    } else {
        Ok(public_key)
    }
}

/// Recover the public key derived from the private key used to sign a message.
/// Returns a `Result` to let the caller choose an error handling strategy.
///
/// # Additional Information
///
/// Follows the Secp256r1 elliptical curve.
///
/// # Arguments
///
/// * `signature`: [B512] - The signature generated by signing a message hash.
/// * `msg_hash`: [b256] - The signed data.
///
/// # Returns
///
/// * [Result<B512, EcRecoverError>] - The recovered public key or an error.
///
/// # Examples
///
/// ```sway
/// use std::{ecr::ec_recover_r1, b512::B512};
///
/// fn foo() {
///     let hi = 0xbd0c9b8792876712afadbff382e1bf31c44437823ed761cc3600d0016de511ac;
///     let lo = 0x44ac566bd156b4fc71a4a4cb2655d3da360c695edb27dc3b64d621e122fea23d;
///     let msg_hash = 0x1e45523606c96c98ba970ff7cf9511fab8b25e1bcd52ced30b81df1e4a9c4323;
///     let pub_hi = 0xD73A188181464CC84AE267E45041AEF6AB938F278E636AA1D02D3014C1BEF74E;
///     let pub_lo = 0x62660ecce5979493fe5684526e8e00875b948e507a89a47096bc84064a175452;
///     let signature: B512 = B512::from((hi, lo));
///     // A recovered public key pair.
///     let public_key = ec_recover_r1(signature, msg_hash).unwrap();
///
///     assert(public_key.bits()[0] == pub_hi);
///     assert(public_key.bits()[1] == pub_lo);
/// }
/// ```
#[deprecated(note = "`std::ecr` has been replaced by `std::crypto`, and is no longer maintained.")]
pub fn ec_recover_r1(signature: B512, msg_hash: b256) -> Result<B512, EcRecoverError> {
    let public_key = B512::new();
    let was_error = asm(
        buffer: __addr_of(public_key),
        sig: __addr_of(signature),
        hash: msg_hash,
    ) {
        ecr1 buffer sig hash;
        err
    };
    // check the $err register to see if the `ecr1` opcode succeeded
    if was_error == 1 {
        Err(EcRecoverError::UnrecoverablePublicKey)
    } else {
        Ok(public_key)
    }
}

/// Verifies that a public key derived from the private key was used to sign a message.
/// Returns a `Result` to let the caller choose an error handling strategy.
///
/// # Additional Information
///
/// Follows the edDSA curve25519 verification.
///
/// # Arguments
///
/// * `public_key`: [b256] - The public key that signed the message.
/// * `signature`: [B512] - The signature generated by signing a message.
/// * `msg`: [Bytes] - The signed data.
///
/// # Returns
///
/// * [Result<bool, EcRecoverError>] - A verified result or an error.
///
/// # Examples
///
/// ```sway
/// use std::{ecr::ed_verify, b512::B512, bytes::Bytes};
///
/// fn foo() {
///     let pub_key = 0x314fa58689bbe1da2430517de2d772b384a1c1d2e9cb87e73c6afcf246045b10;
///     let msg = b256::zero();
///     let msg_hash = sha256(msg);

///     let hi = 0xf38cef9361894be6c6e0eddec28a663d099d7ddff17c8077a1447d7ecb4e6545;
///     let lo = 0xf5084560039486d3462dd65a40c80a74709b2f06d450ffc5dc00345c6b2cdd00;
///     let signature: B512 = B512::from((hi, lo));
///     // A verified public key with signature
///     let verified = ed_verify(pub_key, signature, Bytes::from(msg_hash)).unwrap();
///     assert(verified);
/// }
/// ```
#[deprecated(note = "`std::ecr` has been replaced by `std::crypto`, and is no longer maintained.")]
pub fn ed_verify(public_key: b256, signature: B512, msg: Bytes) -> Result<bool, EcRecoverError> {
    let len = msg.len();

    if len == 0 {
        return Err(EcRecoverError::ZeroLengthMessage);
    };

    let was_error = asm(
        buffer: public_key,
        sig: __addr_of(signature),
        msg: msg.ptr(),
        len: len,
    ) {
        ed19 buffer sig msg len;
        err
    };
    // check the $err register to see if the `ed19` opcode succeeded
    if was_error == 1 {
        Err(EcRecoverError::UnrecoverablePublicKey)
    } else {
        Ok(true)
    }
}

/// Recover the address derived from the private key used to sign a message.
/// Returns a `Result` to let the caller choose an error handling strategy.
///
/// # Additional Information
///
/// Follows the Secp256k1 elliptical curve.
///
/// # Arguments
///
/// * `signature`: [B512] - The signature generated by signing a message hash.
/// * `msg_hash`: [b256] - The signed data.
///
/// # Returns
///
/// * [Result<Address, EcRecoverError>] - The recovered Fuel address or an error.
///
/// # Examples
///
/// ```sway
/// use std::{ecr::ec_recover_address, b512::B512};
///
/// fn foo() {
///     let hi = 0xbd0c9b8792876713afa8bff383eebf31c43437823ed761cc3600d0016de5110c;
///     let lo = 0x44ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d;
///     let msg_hash = 0xee45573606c96c98ba970ff7cf9511f1b8b25e6bcd52ced30b89df1e4a9c4323;
///     let address = Address::from(0x7AAE2D980BE4C3275C72CE5B527FA23FFB97B766966559DD062E2B78FD9D3766);
///     let signature: B512 = B512::from((hi, lo));
///     // A recovered Fuel address.
///     let result_address = ec_recover_address(signature, msg_hash).unwrap();
///     assert(result_address == address);
/// }
/// ```
#[deprecated(note = "`std::ecr` has been replaced by `std::crypto`, and is no longer maintained.")]
#[allow(deprecated)]
pub fn ec_recover_address(signature: B512, msg_hash: b256) -> Result<Address, EcRecoverError> {
    let pub_key_result = ec_recover(signature, msg_hash);

    if let Err(e) = pub_key_result {
        // propagate the error if it exists
        Err(e)
    } else {
        let pub_key = pub_key_result.unwrap();
        let address = sha256(((pub_key.bits())[0], (pub_key.bits())[1]));
        Ok(Address::from(address))
    }
}

/// Recover the address derived from the private key used to sign a message.
/// Returns a `Result` to let the caller choose an error handling strategy.
///
/// # Additional Information
///
/// Follows the Secp256r1 elliptical curve.
///
/// # Arguments
///
/// * `signature`: [B512] - The signature generated by signing a message hash.
/// * `msg_hash`: [b256] - The signed data.
///
/// # Returns
///
/// * [Result<Address, EcRecoverError>] - The recovered Fuel address or an error.
///
/// # Examples
///
/// ```sway
/// use std::{ecr::ec_recover_address_r1, b512::B512};
///
/// fn foo() {
///     let hi = 0xbd0c9b8792876713afa8bf3383eebf31c43437823ed761cc3600d0016de5110c;
///     let lo = 0x44ac566bd156b4fc71a4a4cb2655d3dd360c695edb17dc3b64d611e122fea23d;
///     let msg_hash = 0xee45573606c96c98ba970ff7cf9511f1b8b25e6bcd52ced30b89df1e4a9c4323;
///     let address = Address::from(0xb4a5fabee8cc852084b71f17107e9c18d682033a58967027af0ab01edf2f9a6a);
///     let signature: B512 = B512::from((hi, lo));
///     // A recovered Fuel address.
///     let result_address = ec_recover_address_r1(signature, msg_hash).unwrap();
///     assert(result_address == address);
/// }
/// ```
#[deprecated(note = "`std::ecr` has been replaced by `std::crypto`, and is no longer maintained.")]
#[allow(deprecated)]
pub fn ec_recover_address_r1(signature: B512, msg_hash: b256) -> Result<Address, EcRecoverError> {
    let pub_key_result = ec_recover_r1(signature, msg_hash);

    if let Err(e) = pub_key_result {
        // propagate the error if it exists
        Err(e)
    } else {
        let pub_key = pub_key_result.unwrap();
        let address = sha256(((pub_key.bits())[0], (pub_key.bits())[1]));
        Ok(Address::from(address))
    }
}

```
