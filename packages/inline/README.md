# `@bedrock-layout/inline`

Inline is a layout helper that creates consistent spacing around inline items. It can also have a child element that can stretch to fill any excess spaces

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

`Inline` can be used to create inline layouts where there is a consistent space around its child elements. Unlike the `InlineCluster` component, the child elements inside `Inline` components will not wrap. With `Inline` component, you can also specify a child element that can stretch to fill excess spaces.

---

## How to install

`npm install @bedrock-layout/inline`

or

`yarn add @bedrock-layout/inline`

---

## Usage

```javascript
import { Inline } from "@bedrock-layout/inline";

<Inline stretch={1} gutter="size3" justify="start" align="start">
  <span>Lorem ipsum dolor</span>
  <span>sit amet consectetur</span>
  <span>adipisicing elit.</span>
</Inline>;
```

---

## data-attribute

For styliing purposes, you can select `data-br-inline`.

---

## API

\* required

| Property |                              Description                               |                     Type                      | Default |
| :------: | :--------------------------------------------------------------------: | :-------------------------------------------: | :-----: |
| gutter\* |                   Space inbetween each child element                   |             One of `Spacing`\*\*              |    -    |
| stretch  |      Child or children that will stretch to fill available space       | One of: `all, start, end, index of the child` |    -    |
| justify  |                  Inline justification of the children                  |         One of: `start, end, center`          | `start` |
|  align   |                    Block alignment of the children                     |         One of: `start, end, center`          | `start` |
| switchAt | The width threshold at which the container will switch to stack layout |         One of: `CSS length, number`          |    -    |

\*\* By default, `Spacing` is one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants) values, but this can be overwritten using the `ThemeProvider` from `@bedrock-layout/spacing-constants`
