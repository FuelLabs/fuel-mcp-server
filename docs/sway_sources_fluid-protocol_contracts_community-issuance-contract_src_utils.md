# Example: sway_sources/fluid-protocol/contracts/community-issuance-contract/src/utils.sw

```sway
library;

use libraries::fluid_math::{dec_pow, DECIMAL_PRECISION, fm_abs_diff, fm_min};
use std::u128::U128;
// 32_000_000 * 1_000_000_000
pub const FPT_SUPPLY_CAP = 32_000_000_000_000_000;
pub const SECONDS_IN_ONE_MINUTE = 60;
pub const ISSUANCE_FACTOR = 999_998_681;
pub fn internal_get_fpt_supply_cap(
    time_transition_started: u64,
    total_transition_time_seconds: u64,
    current_time: u64,
    has_transitioned_rewards: bool,
) -> u64 {
    if (!has_transitioned_rewards) {
        return FPT_SUPPLY_CAP / 2;
    } else {
        // time transition started will always be less than current time
        let time_diff = U128::from(current_time - time_transition_started);
        let supply_cap_over_2 = U128::from(FPT_SUPPLY_CAP / 2);
        let transition_completed_ratio = time_diff * U128::from(DECIMAL_PRECISION) / U128::from(total_transition_time_seconds);
        // transition completed, without this we will eventually overflow
        if (transition_completed_ratio > U128::from(DECIMAL_PRECISION))
        {
            return FPT_SUPPLY_CAP;
        }
        let current_supply_cap = supply_cap_over_2 + (supply_cap_over_2 * transition_completed_ratio / U128::from(DECIMAL_PRECISION));
        let current_supply_cap_64 = current_supply_cap.as_u64().unwrap();
        return current_supply_cap_64;
    }
}
pub fn internal_get_cumulative_issuance_fraction(current_time: u64, deployment_time: u64) -> u64 {
    let time_passed_in_minutes = (current_time - deployment_time) / SECONDS_IN_ONE_MINUTE;
    let power = dec_pow(ISSUANCE_FACTOR, time_passed_in_minutes);
    let cumulative_issuance_fraction = U128::from(DECIMAL_PRECISION) - power;
    require(
        cumulative_issuance_fraction <= U128::from(DECIMAL_PRECISION),
        "CommunityIssuance: Cumulative issuance fraction is greater than DECIMAL_PRECISION",
    );
    return cumulative_issuance_fraction.as_u64().unwrap()
}
// ad u128 to production function
pub fn test_issue_fpt(
    current_time: u64,
    deployment_time: u64,
    time_transition_started: u64,
    total_transition_time_seconds: u64,
    total_fpt_issued: u64,
    has_transitioned_rewards: bool,
) -> u64 {
    let latest_total_fpt_issued = (U128::from(internal_get_fpt_supply_cap(
        time_transition_started,
        total_transition_time_seconds,
        current_time,
        has_transitioned_rewards,
    )) * U128::from(internal_get_cumulative_issuance_fraction(current_time, deployment_time))) / U128::from(DECIMAL_PRECISION);
    let issuance = latest_total_fpt_issued.as_u64().unwrap() - total_fpt_issued;
    return issuance
}
#[test]
fn test_issuance_factor() {
    let current_time = 121;
    let deployment_time = 1;
    let cumulative_issuance = internal_get_cumulative_issuance_fraction(current_time, deployment_time);
    assert(cumulative_issuance >= 0);
    assert(cumulative_issuance <= DECIMAL_PRECISION);
    let current_time = 18_400_000_000_000_000_000;
    let deployment_time = 1;
    let cumulative_issuance = internal_get_cumulative_issuance_fraction(current_time, deployment_time);
    assert(cumulative_issuance >= 0);
    assert(cumulative_issuance <= DECIMAL_PRECISION);
    let current_time = 60;
    let deployment_time = 0;
    let cumulative_issuance = internal_get_cumulative_issuance_fraction(current_time, deployment_time);
    let diff = fm_abs_diff(cumulative_issuance, 1_318);
    assert(diff <= 10);
    let current_time = 60 * 60;
    let deployment_time = 0;
    let cumulative_issuance = internal_get_cumulative_issuance_fraction(current_time, deployment_time);
    let diff = fm_abs_diff(cumulative_issuance, 79_123);
    assert(diff <= 100);
    let current_time = 60 * 60 * 24;
    let deployment_time = 0;
    let cumulative_issuance = internal_get_cumulative_issuance_fraction(current_time, deployment_time);
    let diff = fm_abs_diff(cumulative_issuance, 1_897_231);
    assert(diff <= 1_000);
    let current_time = 60 * 60 * 24 * 30;
    let deployment_time = 0;
    let cumulative_issuance = internal_get_cumulative_issuance_fraction(current_time, deployment_time);
    let diff = fm_abs_diff(cumulative_issuance, 55_378_538);
    assert(diff <= 100_000);
    let current_time = 60 * 60 * 24 * 30 * 12;
    let deployment_time = 0;
    let cumulative_issuance = internal_get_cumulative_issuance_fraction(current_time, deployment_time);
    let diff = fm_abs_diff(cumulative_issuance, 500_000_000);
    assert(diff <= 10_000_000);
    let current_time = 60 * 60 * 24 * 30 * 12 * 2;
    let deployment_time = 0;
    let cumulative_issuance = internal_get_cumulative_issuance_fraction(current_time, deployment_time);
    let diff = fm_abs_diff(cumulative_issuance, 750_000_000);
    assert(diff <= 10_000_000);
    let current_time = 60 * 60 * 24 * 30 * 12 * 4;
    let deployment_time = 0;
    let cumulative_issuance = internal_get_cumulative_issuance_fraction(current_time, deployment_time);
    let diff = fm_abs_diff(cumulative_issuance, 937_500_000);
    assert(diff <= 10_000_000);
    let current_time = 60 * 60 * 24 * 30 * 12 * 10;
    let deployment_time = 0;
    let cumulative_issuance = internal_get_cumulative_issuance_fraction(current_time, deployment_time);
    let diff = fm_abs_diff(cumulative_issuance, 999_000_000);
    assert(diff <= 10_000_000);
}
#[test]
fn test_supply_cap_transition() {
    let current_time = 2;
    let time_transition_started = 1;
    let total_transition_time_seconds = 1;
    let has_transitioned_rewards = false;
    let supply_cap_before_transition = internal_get_fpt_supply_cap(
        time_transition_started,
        total_transition_time_seconds,
        current_time,
        has_transitioned_rewards,
    );
    assert(supply_cap_before_transition == FPT_SUPPLY_CAP / 2);
    let current_time = 2_000;
    let time_transition_started = 1_000;
    let total_transition_time_seconds = 10_000;
    let has_transitioned_rewards = true;
    let supply_cap_during_transition = internal_get_fpt_supply_cap(
        time_transition_started,
        total_transition_time_seconds,
        current_time,
        has_transitioned_rewards,
    );
    assert(
        supply_cap_during_transition == (FPT_SUPPLY_CAP / 2) + (FPT_SUPPLY_CAP / 2) / 10,
    );
    let current_time = 60 * 60 * 24 * 30 * 12;
    let time_transition_started = current_time / 4;
    let total_transition_time_seconds = current_time;
    let has_transitioned_rewards = true;
    let supply_cap_during_transition = internal_get_fpt_supply_cap(
        time_transition_started,
        total_transition_time_seconds,
        current_time,
        has_transitioned_rewards,
    );
    let time_diff = U128::from(current_time - time_transition_started);
    let expect = (FPT_SUPPLY_CAP / 2) + (FPT_SUPPLY_CAP / 2 * 3 / 4);
    assert(supply_cap_during_transition == expect);
    let current_time = 60 * 60 * 24 * 30 * 12;
    let time_transition_started = current_time - (current_time / 24);
    let total_transition_time_seconds = current_time / 12;
    let has_transitioned_rewards = true;
    let supply_cap_during_transition = internal_get_fpt_supply_cap(
        time_transition_started,
        total_transition_time_seconds,
        current_time,
        has_transitioned_rewards,
    );
    assert(supply_cap_during_transition == (FPT_SUPPLY_CAP / 2) + (FPT_SUPPLY_CAP / 2) / 2);
    let current_time = 2000;
    let time_transition_started = 1000;
    let total_transition_time_seconds = 100;
    let has_transitioned_rewards = true;
    let supply_cap_after_transition = internal_get_fpt_supply_cap(
        time_transition_started,
        total_transition_time_seconds,
        current_time,
        has_transitioned_rewards,
    );
    assert(supply_cap_after_transition == FPT_SUPPLY_CAP);
    let current_time = 60 * 60 * 24 * 30 * 12 * 100;
    let time_transition_started = current_time - 1;
    let total_transition_time_seconds = 1;
    let has_transitioned_rewards = true;
    let supply_cap_after_transition = internal_get_fpt_supply_cap(
        time_transition_started,
        total_transition_time_seconds,
        current_time,
        has_transitioned_rewards,
    );
    assert(supply_cap_after_transition == FPT_SUPPLY_CAP);
}
#[test]
fn test_emissions_schedule_before_transition() {
    // double check math
    let current_time = 2_000;
    let deployment_time = 1;
    let time_transition_started = 1;
    let total_transition_time_seconds = 1;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = false;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let issuance_pre_transition = (U128::from((FPT_SUPPLY_CAP / 2)) * U128::from(internal_get_cumulative_issuance_fraction(current_time, deployment_time))) / U128::from(DECIMAL_PRECISION);
    assert(issuance == issuance_pre_transition.as_u64().unwrap());
    // test emissions before transition
    // check that half of half of the fpt supply is issued before transitioned at 1 year mark
    let current_time = 60 * 60 * 24 * 30 * 12;
    let deployment_time = 0;
    let time_transition_started = 1;
    let total_transition_time_seconds = 1;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = false;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let diff = fm_abs_diff(issuance, FPT_SUPPLY_CAP / 4);
    assert(diff <= 100_000_000_000_000);
    // check that 75% of half of fpt supply is issued before transition after 2 years
    let current_time = 60 * 60 * 24 * 30 * 12 * 2;
    let deployment_time = 0;
    let time_transition_started = 1;
    let total_transition_time_seconds = 1;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = false;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let diff = fm_abs_diff(issuance, (FPT_SUPPLY_CAP / 2) * 75 / 100);
    assert(diff <= 100_000_000_000_000);
    // check that half of fpt supply is issued before transition after 100 years
    let current_time = 60 * 60 * 24 * 30 * 12 * 100;
    let deployment_time = 0;
    let time_transition_started = 1;
    let total_transition_time_seconds = 1;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = false;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let diff = fm_abs_diff(issuance, FPT_SUPPLY_CAP / 2);
    assert(diff <= 1_000_000_000_000);
}
#[test]
fn test_emissions_schedule_after_transition() {
    // test emissions after transitioned
    // // check that half of the fpt supply amount is issued after transition at 1 year mark
    // this one gets up to 1% off because of 9 decimals, but it should be ok
    let current_time = 60 * 60 * 24 * 30 * 12;
    let deployment_time = 0;
    let time_transition_started = current_time - 1;
    let total_transition_time_seconds = 1;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = true;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let diff = fm_abs_diff(issuance, FPT_SUPPLY_CAP / 2);
    assert(diff <= 1_000_000_000_000_000);
    // check that full fpt supply amount is issued after transition after 100 years
    let current_time = 60 * 60 * 24 * 30 * 12 * 100;
    let deployment_time = 0;
    let time_transition_started = current_time - 1;
    let total_transition_time_seconds = 1;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = true;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let diff = fm_abs_diff(issuance, FPT_SUPPLY_CAP);
    assert(diff <= 1_000_000_000_000);
}
#[test]
fn test_emissions_schedule_during_transition() {
    // test emissions during transition
    // half way through emissions after 1 year, should be 75% of half of fpt supply
    let current_time = 60 * 60 * 24 * 30 * 12;
    let deployment_time = 0;
    let time_transition_started = 0;
    let total_transition_time_seconds = 60 * 60 * 24 * 30 * 12 * 2;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = true;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let expect = ((FPT_SUPPLY_CAP / 2) + (FPT_SUPPLY_CAP / 4)) / 2;
    let diff = fm_abs_diff(issuance, expect);
    assert(diff <= 1_000_000_000_000_000);
    // 3/4 of the way through emissions after two years
    let current_time = 60 * 60 * 24 * 30 * 12 * 2;
    let deployment_time = 0;
    let time_transition_started = 0;
    let total_transition_time_seconds = 60 * 60 * 24 * 30 * 12 * 2;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = true;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let expect = (U128::from(FPT_SUPPLY_CAP) * U128::from(3u64) / U128::from(4u64)).as_u64().unwrap();
    let diff = fm_abs_diff(issuance, expect);
    assert(diff <= 1_000_000_000_000_000);
    // 3/4 of the way through emissions after 2 years, half way through transition
    let current_time = 60 * 60 * 24 * 30 * 12 * 2;
    let deployment_time = 0;
    let time_transition_started = 0;
    let total_transition_time_seconds = 60 * 60 * 24 * 30 * 12 * 4;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = true;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let expect = (U128::from(FPT_SUPPLY_CAP) * U128::from(3u64) / U128::from(4u64) * U128::from(3u64) / U128::from(4u64)).as_u64().unwrap();
    let diff = fm_abs_diff(issuance, expect);
    assert(diff <= 1_000_000_000_000_000);
}
#[test]
fn test_emissions_fpt_issuance_subtraction() {
    // test total fpt issued subtraction
    // be default after 1 year with transition completed we should expect FPT_SUPPLY_CAP / 2
    let current_time = 60 * 60 * 24 * 30 * 12;
    let deployment_time = 0;
    let time_transition_started = 1;
    let total_transition_time_seconds = 1;
    let total_fpt_issued = FPT_SUPPLY_CAP / 4;
    let has_transitioned_rewards = true;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let expect = FPT_SUPPLY_CAP / 4;
    let diff = fm_abs_diff(issuance, expect);
    assert(diff <= 1_000_000_000_000_000);
    let current_time = 60 * 60 * 24 * 30 * 12;
    let deployment_time = 0;
    let time_transition_started = 1;
    let total_transition_time_seconds = 1;
    let total_fpt_issued = FPT_SUPPLY_CAP / 10;
    let has_transitioned_rewards = true;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let expect = (FPT_SUPPLY_CAP / 2) - (FPT_SUPPLY_CAP / 10);
    let diff = fm_abs_diff(issuance, expect);
    assert(diff <= 1_000_000_000_000_000);
}
#[test]
fn test_emissions_for_overflow() {
    let current_time = 60 * 60 * 24 * 30 * 12 * 1_000_000;
    let deployment_time = 0;
    let time_transition_started = 1;
    let total_transition_time_seconds = 1;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = true;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let current_time = 60 * 60 * 24 * 30 * 12;
    let deployment_time = 0;
    let time_transition_started = 1;
    let total_transition_time_seconds = current_time * 1_000;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = true;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let current_time = 1_686_723_344;
    let deployment_time = 0;
    let time_transition_started = 1;
    let total_transition_time_seconds = current_time * 1_000;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = true;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
    let current_time = 1_686_723_344 * 10_000;
    let deployment_time = 0;
    let time_transition_started = 1;
    let total_transition_time_seconds = current_time * 1_000;
    let total_fpt_issued = 0;
    let has_transitioned_rewards = true;
    let issuance = test_issue_fpt(
        current_time,
        deployment_time,
        time_transition_started,
        total_transition_time_seconds,
        total_fpt_issued,
        has_transitioned_rewards,
    );
}

```
