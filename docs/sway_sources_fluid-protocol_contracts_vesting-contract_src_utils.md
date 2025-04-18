# Example: sway_sources/fluid-protocol/contracts/vesting-contract/src/utils.sw

```sway
library;

use ::data_structures::VestingSchedule;
use std::u128::U128;
use libraries::fluid_math::fm_multiply_ratio;
pub fn calculate_redeemable_amount(current_time: u64, vesting_schedule: VestingSchedule) -> u64 {
    if current_time < vesting_schedule.cliff_timestamp {
        return 0;
    }
    if current_time >= vesting_schedule.end_timestamp {
        return vesting_schedule.total_amount - vesting_schedule.claimed_amount;
    }

    let total_minus_cliff = vesting_schedule.total_amount - vesting_schedule.cliff_amount;
    let total_vesting_duration = vesting_schedule.end_timestamp - vesting_schedule.cliff_timestamp;
    let time_elapsed = current_time - vesting_schedule.cliff_timestamp;
    // Linear vesting
    let fraction_amount_claimable = fm_multiply_ratio(total_minus_cliff, time_elapsed, total_vesting_duration);
    return vesting_schedule.cliff_amount + fraction_amount_claimable - vesting_schedule.claimed_amount;
}
pub fn is_valid_vesting_schedule(vesting_schedule: VestingSchedule) -> bool {
    if vesting_schedule.cliff_timestamp >= vesting_schedule.end_timestamp
    {
        return false;
    }
    if vesting_schedule.cliff_amount > vesting_schedule.total_amount
    {
        return false;
    }
    if vesting_schedule.claimed_amount != 0 {
        return false;
    }
    return true;
}
#[test]
fn test_redeemable_calculations() {
    let mut vesting_schedule = VestingSchedule {
        cliff_timestamp: 100,
        cliff_amount: 100,
        end_timestamp: 200,
        total_amount: 1000,
        claimed_amount: 0,
        recipient: Identity::Address(Address::zero()),
    };
    // Before cliff
    assert(calculate_redeemable_amount(0, vesting_schedule) == 0);
    // At cliff
    assert(calculate_redeemable_amount(100, vesting_schedule) == 100);
    // In the middle of the vesting period with cliff amount claimed
    vesting_schedule = VestingSchedule {
        cliff_timestamp: 100,
        cliff_amount: 100,
        end_timestamp: 200,
        total_amount: 1000,
        claimed_amount: 100,
        recipient: Identity::Address(Address::zero()),
    };
    assert(calculate_redeemable_amount(150, vesting_schedule) == 450);
    // At the end of the vesting period with 650 claimed
    vesting_schedule = VestingSchedule {
        cliff_timestamp: 100,
        cliff_amount: 100,
        end_timestamp: 200,
        total_amount: 1000,
        claimed_amount: 650,
        recipient: Identity::Address(Address::zero()),
    };
    assert(calculate_redeemable_amount(200, vesting_schedule) == 350);
    // After the end of the vesting period with 1000 claimed
    vesting_schedule = VestingSchedule {
        cliff_timestamp: 100,
        cliff_amount: 100,
        end_timestamp: 200,
        total_amount: 1000,
        claimed_amount: 1000,
        recipient: Identity::Address(Address::zero()),
    };
    assert(calculate_redeemable_amount(300, vesting_schedule) == 0);
}

```
