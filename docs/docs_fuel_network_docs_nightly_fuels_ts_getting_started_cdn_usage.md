[Docs](https://docs.fuel.network/) /

Nightly  /

[Fuels Ts](https://docs.fuel.network/docs/nightly/fuels-ts/) /

[Getting Started](https://docs.fuel.network/docs/nightly/fuels-ts/getting-started/) /

Cdn Usage

## _Icon Link_ [CDN Usage (browser only)](https://docs.fuel.network/docs/nightly/fuels-ts/getting-started/cdn-usage/\#cdn-usage-browser-only)

```fuel_Box fuel_Box-idXKMmm-css
<script type="module">
  import {
    Wallet,
    Provider,
  } from "https://cdnjs.cloudflare.com/ajax/libs/fuels/0.100.1/browser.mjs";

  const main = async () => {
    const provider = new Provider(
      "https://mainnet.fuel.network/v1/graphql",
    );
    const { name } = await provider.getChain();
    console.log(name);
  };

  main();
</script>
```

_Icon ClipboardText_

## _Icon Link_ [More](https://docs.fuel.network/docs/nightly/fuels-ts/getting-started/cdn-usage/\#more)

- [React Example](https://docs.fuel.network/docs/nightly/fuels-ts/getting-started/react-example/)