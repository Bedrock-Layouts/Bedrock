# `@bedrock-layout/padbox`

A layout helper component that creates vertical stack layout with gutters.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

`Padbox` component creates a uniform padding based on the spacing constants. It can either take a single value or an array/object of values to fine-tune the padding.

---

## How to install

`npm install @bedrock-layout/padbox`

or

`yarn add @bedrock-layout/padbox`

---

## Usage

```javascript
import { Padbox } from '@bedrock-layout/padbox';

<Padbox>{...content}</Padbox>;
```

---

## data-attribute

For styling purposes, you can select `data-bedrock-padbox`.

---

## API

\* required

| Property  |                    Description                     |                               Type                                | Default |
| :-------: | :------------------------------------------------: | :---------------------------------------------------------------: | :-----: |
| padding\* | sets the padding around the content of the element | `Spacing`\*\*, array of `Spacings`, or object of `Spacing` values |    -    |

\*\* By default, `Spacing` is one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants) values, but this can be overwritten using the `ThemeProvider` from `@bedrock-layout/spacing-constants`
