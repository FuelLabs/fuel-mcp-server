[Guides](https://docs.fuel.network/guides/) /

[Intro to Predicates](https://docs.fuel.network/guides/intro-to-predicates/) /

Predicate Limitations

## _Icon Link_ [Predicate Limitations](https://docs.fuel.network/guides/intro-to-predicates/predicate-limitations/\#predicate-limitations)

Given that all operations are done off-chain, it's clear there are inherent limitations to the capabilities of a predicate.

|  | Predicates | Contracts |
| --- | --- | --- |
| Access data on chain | ❌ | ✅ |
| Read data from smart contracts | ❌ | ✅ |
| Check date or time | ❌ | ✅ |
| Read block hash or number | ❌ | ✅ |
| Read input coins | ✅ | ✅ |
| Read output coins | ✅ | ✅ |
| Read transaction scripts | ✅ | ✅ |
| Read transaction bytecode | ✅ | ✅ |

These constraints mean that our MultiSig cannot "approve" interactions with contracts. However, it retains the ability to oversee the flow of funds when the correct wallets are involved.

Now that we have a basic understanding of what a predicate is, we can start writing our MultiSig.