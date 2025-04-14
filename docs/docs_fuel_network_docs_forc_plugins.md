[Docs](https://docs.fuel.network/) /

[Forc](https://docs.fuel.network/docs/forc/) /

Plugins

## _Icon Link_ [Plugins](https://docs.fuel.network/docs/forc/plugins/\#plugins)

Plugins can be used to extend `forc` with new commands that go beyond the native commands mentioned in the previous chapter. While the Fuel ecosystem provides a few commonly useful plugins ( `forc-fmt`, `forc-client`, `forc-lsp`, `forc-explore`), anyone can write their own!

Let's install a plugin, `forc-explore`, and see what's underneath the plugin:

```fuel_Box fuel_Box-idXKMmm-css
cargo install forc-explore
```

_Icon ClipboardText_

Check that we have installed `forc-explore`:

```fuel_Box fuel_Box-idXKMmm-css
$ forc plugins
Installed Plugins:
forc-explore
```

_Icon ClipboardText_

`forc-explore` runs the Fuel Network Explorer, which you can run and check out for yourself:

```fuel_Box fuel_Box-idXKMmm-css
$ forc explore
Fuel Network Explorer 0.1.1
Running server on http://127.0.0.1:3030
Server::run{addr=127.0.0.1:3030}: listening on http://127.0.0.1:3030
```

_Icon ClipboardText_

You can visit [http://127.0.0.1:3030 _Icon Link_](http://127.0.0.1:3030/) to check out the network explorer!

Note that some plugin crates can also provide more than one command. For example, installing the `forc-client` plugin provides the `forc deploy` and `forc run` commands. This is achieved by specifying multiple `[[bin]]` targets within the `forc-client` manifest.

## _Icon Link_ [Writing your own plugin](https://docs.fuel.network/docs/forc/plugins/\#writing-your-own-plugin)

We encourage anyone to write and publish their own `forc` plugin to enhance their development experience.

Your plugin must be named in the format `forc-<MY_PLUGIN>` and you may use the above template as a starting point. You can use [clap _Icon Link_](https://docs.rs/clap/latest/clap/) and add more subcommands, options and configurations to suit your plugin's needs.