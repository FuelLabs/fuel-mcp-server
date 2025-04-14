[Guides](https://docs.fuel.network/guides/) /

[Intro to Predicates](https://docs.fuel.network/guides/intro-to-predicates/) /

Configurables

## _Icon Link_ [Configurables](https://docs.fuel.network/guides/intro-to-predicates/configurables/\#configurables)

Configurables are special constants that can be modified at compile time. This is where we can define the signers responsible for protecting the funds in the predicate as well as the number of signatures required.

This information can later be configured with SDKs before building a transaction.

```fuel_Box fuel_Box-idXKMmm-css
configurable {
    REQUIRED_SIGNATURES: u64 = 0,
    SIGNERS: [Address; 3] = [\
        Address::from(0x0000000000000000000000000000000000000000000000000000000000000000),\
        Address::from(0x0000000000000000000000000000000000000000000000000000000000000000),\
        Address::from(0x0000000000000000000000000000000000000000000000000000000000000000)\
    ]
}
```

_Icon ClipboardText_

Imagine you are a multisig provider assisting businesses and users in setting up their own multisigs. You wouldn't want to hard-code these details every time but rather provide a few parameters that users can configure themselves.