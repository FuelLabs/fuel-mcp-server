[Guides](https://docs.fuel.network/guides/) /

[Intro to Predicates](https://docs.fuel.network/guides/intro-to-predicates/) /

Main

## _Icon Link_ [Main](https://docs.fuel.network/guides/intro-to-predicates/main/\#main)

Now that we have all the components, let's put them together!

We simply call the function across all the multisigs, tallying the number of valid signatures to see if it meets the threshold set in the configuration. It must return true or false in order to determine if assets can be unlocked.

```fuel_Box fuel_Box-idXKMmm-css
fn main() -> bool {
    let mut valid_signatures = 0;

    // Verifiying each potential signature
    valid_signatures = verify_signature(0);
    valid_signatures = valid_signatures + verify_signature(1);
    valid_signatures = valid_signatures + verify_signature(2);

    if valid_signatures >= REQUIRED_SIGNATURES {
        return true;
    }
    return false;
}
```

_Icon ClipboardText_