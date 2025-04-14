[Docs](https://docs.fuel.network/) /

[Contributing](https://docs.fuel.network/docs/contributing/) /

Style Guide

## _Icon Link_ [Style Guide](https://docs.fuel.network/docs/contributing/style-guide/\#style-guide)

This style guide is a set of guidelines for writing and editing documentation. It's important to follow these guidelines to ensure that our documentation is consistent and easy to read.

## _Icon Link_ [General Guidelines](https://docs.fuel.network/docs/contributing/style-guide/\#general-guidelines)

## _Icon Link_ [Writing](https://docs.fuel.network/docs/contributing/style-guide/\#writing)

- Use a friendly and conversational tone of voice.
- Use an active voice (vs. a passive voice).
- Avoid long paragraphs or sentences.
- Always use accurate and verified information.
- Maintain consistency in style across pages and sections.
- Assume the reader does not have a lot of context. Keep in mind that readers have different levels of expertise.
- Don't use _click here_ or _read this document_ for links. Just link [the thing _Icon Link_](https://en.wikipedia.org/wiki/The_Thing_(1982_film)) in context.
- Don’t use double negatives.

## _Icon Link_ [Words](https://docs.fuel.network/docs/contributing/style-guide/\#words)

- Use second-person perspective (use _you_).
- Use American English.
- Use simple (but accurate) words.
- Avoid slang, jargon, or making up new words. Everything should be easy to translate into major languages.
- Avoid gendered words or pronouns like “his”, “her”, “manned”, etc.
- Define acronyms and abbreviations on first usage and if they're used infrequently.
- Use italics or bold text to emphasize a word. Avoid using all capital letters.
- Avoid using words that indicate time like “new feature”, as it may fall out-of-date quickly.
- Avoid the word “please” in an instruction.
- Avoid violent words.
- Don’t use offensive language.

## _Icon Link_ [Code](https://docs.fuel.network/docs/contributing/style-guide/\#code)

- Use code examples whenever possible.
- Always specify the language of a code block.
- Avoid hard-coded examples, and instead import code examples from code that is routinely tested.
- Use comments to define code examples to be imported instead of line numbers that may change.
- Always wrap inline code in backticks.
- Always use code fences when showing commands and separate commands from console outputs. The user should be able to copy and paste the entire code in the code fence.
- Use descriptive variable names in code examples. Don’t use `foo` , `bar` , `baz` , etc.

## _Icon Link_ [Organizing Information](https://docs.fuel.network/docs/contributing/style-guide/\#organizing-information)

- Use the standard HTML heading hierarchy: The first line should be an `h1` (use 1 # in markdown) and should be the only `h1` on the page. The subheadings shouldn’t skip a level, e.g. `h3` tags should only be inside `h2` tags.
- Organize information so that readers can skim the page and get an answer for the most common questions quickly. Use subheadings to call out important information, and use a blockquote to identify supplemental information.
- Avoid using tables.

## _Icon Link_ [Graphics](https://docs.fuel.network/docs/contributing/style-guide/\#graphics)

- Don’t create complex flow-charts (having more than 5-6 items).
- Don't use images of text or code. Use the actual text or code in markdown format.

## _Icon Link_ [Lists](https://docs.fuel.network/docs/contributing/style-guide/\#lists)

- Use numbers, number-letter combinations (1.a, etc.), or bullet points for lists. Do not use Roman numerals or letters alone.

## _Icon Link_ [Guides](https://docs.fuel.network/docs/contributing/style-guide/\#guides)

If you are writing for a guide or the `intro` section, follow these additional guidelines:

## _Icon Link_ [Components](https://docs.fuel.network/docs/contributing/style-guide/\#components)

To maintain accuracy and consistency, it is recommended to use the available React components within a guide whenever they apply. For example:

- Use the `CodeImport` and `TextImport` components instead of copying and pasting code or text.
- For images, use the `Box.Centered` component to center the image.
- For content only applicable to a certain version of the docs, use the `ConditionalContent` component.

You can find examples for how to these components within the [`docs/guides/docs` _Icon Link_](https://github.com/FuelLabs/docs-hub/tree/master/docs/guides/docs) folder.

For a full list of components available, see the [`src/components/MDXRender.tsx` _Icon Link_](https://github.com/FuelLabs/docs-hub/blob/master/src/components/MDXRender.tsx) component.

## _Icon Link_ [Variables](https://docs.fuel.network/docs/contributing/style-guide/\#variables)

There are several variables passed into the MDX context that you can use within a guide. You can find a full list in the [`src/components/MDXRender.tsx` _Icon Link_](https://github.com/FuelLabs/docs-hub/blob/master/src/components/MDXRender.tsx) component.

You can then use these variables within a guide like so:

```fuel_Box fuel_Box-idXKMmm-css
The faucet URL is {props.faucetUrl}
```

_Icon ClipboardText_

Which would render as:
The faucet URL is https://faucet-testnet.fuel.network/