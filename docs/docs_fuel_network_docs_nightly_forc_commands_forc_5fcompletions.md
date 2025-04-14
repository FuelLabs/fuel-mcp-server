[Docs](https://docs.fuel.network/) /

Nightly  /

[Forc](https://docs.fuel.network/docs/nightly/forc/) /

[Commands](https://docs.fuel.network/docs/nightly/forc/commands/) /

Forc Completions

## _Icon Link_ [Generate](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcompletions/\#forc-completions)

Usage: forc completions \[OPTIONS\] --target

Options:

`-T`, `--target` < _TARGET_ \>

Specify shell to enable tab-completion for

\[possible values: zsh, bash, fish, powershell, elvish\]

For more info: https://fuellabs.github.io/sway/latest/forc/commands/forc\_completions.html

Possible values:

- bash: Bourne Again Shell (bash)
- elvish: Elvish shell
- fish: Friendly Interactive Shell (fish)
- power-shell: PowerShell
- zsh: Z Shell (zsh)
- fig: Fig

`-v`, `--verbose...`

Use verbose output

`-s`, `--silent`

Silence all output

`-L`, `--log-level` < _LOG\_LEVEL_ \>

Set the log level

`-h`, `--help`

Print help (see a summary with '-h')

## _Icon Link_ [DISCUSSION](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcompletions/\#forc-completions)

Enable tab completion for Bash, Fish, Zsh, or PowerShell The script is output on `stdout`, allowing one to re-direct the output to the file of their choosing. Where you place the file will depend on which shell, and which operating system you are using. Your particular configuration may also determine where these scripts need to be placed.

Here are some common set ups for the three supported shells under Unix and similar operating systems (such as GNU/Linux).

## _Icon Link_ [BASH](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcompletions/\#forc-completions)

Completion files are commonly stored in `/etc/bash_completion.d/` for system-wide commands, but can be stored in `~/.local/share/bash-completion/completions` for user-specific commands. Run the command:

```fuel_Box fuel_Box-idXKMmm-css
mkdir -p ~/.local/share/bash-completion/completions
forc completions --shell=bash >> ~/.local/share/bash-completion/completions/forc

```

_Icon ClipboardText_

This installs the completion script. You may have to log out and log back in to your shell session for the changes to take effect.

## _Icon Link_ [BASH (macOS/Homebrew)](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcompletions/\#forc-completions)

Homebrew stores bash completion files within the Homebrew directory. With the `bash-completion` brew formula installed, run the command:

```fuel_Box fuel_Box-idXKMmm-css
mkdir -p $(brew --prefix)/etc/bash_completion.d
forc completions --shell=bash > $(brew --prefix)/etc/bash_completion.d/forc.bash-completion

```

_Icon ClipboardText_

## _Icon Link_ [FISH](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcompletions/\#forc-completions)

Fish completion files are commonly stored in `$HOME/.config/fish/completions`. Run the command:

```fuel_Box fuel_Box-idXKMmm-css
mkdir -p ~/.config/fish/completions
forc completions --shell=fish > ~/.config/fish/completions/forc.fish

```

_Icon ClipboardText_

This installs the completion script. You may have to log out and log back in to your shell session for the changes to take effect.

## _Icon Link_ [ZSH](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcompletions/\#forc-completions)

ZSH completions are commonly stored in any directory listed in your `$fpath` variable. To use these completions, you must either add the generated script to one of those directories, or add your own to this list.

Adding a custom directory is often the safest bet if you are unsure of which directory to use. First create the directory; for this example we'll create a hidden directory inside our `$HOME` directory:

```fuel_Box fuel_Box-idXKMmm-css
mkdir ~/.zfunc

```

_Icon ClipboardText_

Then add the following lines to your `.zshrc` just before `compinit`:

```fuel_Box fuel_Box-idXKMmm-css
fpath+=~/.zfunc

```

_Icon ClipboardText_

Now you can install the completions script using the following command:

```fuel_Box fuel_Box-idXKMmm-css
forc completions --shell=zsh > ~/.zfunc/_forc

```

_Icon ClipboardText_

You must then either log out and log back in, or simply run

```fuel_Box fuel_Box-idXKMmm-css
exec zsh

```

_Icon ClipboardText_

for the new completions to take effect.

## _Icon Link_ [CUSTOM LOCATIONS](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcompletions/\#forc-completions)

Alternatively, you could save these files to the place of your choosing, such as a custom directory inside your $HOME. Doing so will require you to add the proper directives, such as `source` ing inside your login script. Consult your shells documentation for how to add such directives.

## _Icon Link_ [POWERSHELL](https://docs.fuel.network/docs/nightly/forc/commands/forc%5fcompletions/\#forc-completions)

The powershell completion scripts require PowerShell v5.0+ (which comes with Windows 10, but can be downloaded separately for windows 7 or 8.1).

First, check if a profile has already been set

```fuel_Box fuel_Box-idXKMmm-css
Test-Path $profile

```

_Icon ClipboardText_

If the above command returns `False` run the following

```fuel_Box fuel_Box-idXKMmm-css
New-Item -path $profile -type file -force

```

_Icon ClipboardText_

Now open the file provided by `$profile` (if you used the `New-Item` command it will be `${env:USERPROFILE}\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`

Next, we either save the completions file into our profile, or into a separate file and source it inside our profile. To save the completions into our profile simply use

```fuel_Box fuel_Box-idXKMmm-css
forc completions --shell=powershell >> ${env:USERPROFILE}\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1

```

_Icon ClipboardText_