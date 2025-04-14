[Docs](https://docs.fuel.network/) /

[Fuels Ts](https://docs.fuel.network/docs/fuels-ts/) /

[Getting Started](https://docs.fuel.network/docs/fuels-ts/getting-started/) /

React Example

## _Icon Link_ [React Example](https://docs.fuel.network/docs/fuels-ts/getting-started/react-example/\#react-example)

```fuel_Box fuel_Box-idXKMmm-css
import { BN, Provider, Wallet } from "fuels";
import { useEffect, useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const onPageLoad = async () => {
      const provider = new Provider("https://mainnet.fuel.network/v1/graphql");

      const wallet = Wallet.fromAddress("0x...", provider);
      const { balances } = await wallet.getBalances();

      setBalance(new BN(balances[0].amount).toNumber());
    };

    onPageLoad();
  }, []);

  return <div>My Balance: {balance}</div>;
}

export default App;
```

_Icon ClipboardText_

## _Icon Link_ [See Also](https://docs.fuel.network/docs/fuels-ts/getting-started/react-example/\#see-also)

- [Optimized React Example](https://docs.fuel.network/docs/fuels-ts/cookbook/optimized-react-example/)
- [CDN Usage](https://docs.fuel.network/docs/fuels-ts/getting-started/cdn-usage/)