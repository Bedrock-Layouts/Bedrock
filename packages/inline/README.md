# `@bedrock-layout/inline`

Inline is a layout helper that creates consistent spacing around inline items. It can also have a child element that can stretch to fill any excess space.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

`Inline` can be used to create inline layouts where there is consistent spacing around its children. Unlike the `InlineCluster` component, the children inside `Inline` will not wrap. With `Inline`, you can also specify a child element that stretches to fill the excess space.

---

## How to install

`npm install @bedrock-layout/inline`

or

`yarn add @bedrock-layout/inline`

---

## Usage

```javascript
import { Inline } from "@bedrock-layout/inline";

<Inline stretch={1} gap="size3" justify="start" align="start">
  <span>Lorem ipsum dolor</span>
  <span>sit amet consectetur</span>
  <span>adipisicing elit.</span>
</Inline>;
```

---

## data-attribute

For styling purposes, you can select `data-br-inline`.

---

## API

\* required

|   Property   |                              Description                               |                               Type                                | Default |
| :----------: | :--------------------------------------------------------------------: | :---------------------------------------------------------------: | :-----: |
|    gap\*     |                    Space between each child element                    |                       One of `Spacing`\*\*                        |    -    |
|   stretch    |      Child or children that will stretch to fill available space       |         One of: `all`, `start`, `end`, index of the child         |    -    |
|   justify    |                  Inline justification of the children                  | One of: `start`, `end`, `center`, `space-between`, `space-around` | `start` |
|    align     |                    Block alignment of the children                     |            One of: `start`, `end`, `center`, `stretch`            | `start` |
|   switchAt   | The width threshold at which the container will switch to stack layout |                  One of: `CSS length`, `number`                   |    -    |
| minItemWidth |                  Minimum inline size for the children                  |                  One of: `CSS length`, `number`                   |    -    |
|   padding    |                       Adds padding inside Inline                       |                          `PaddingConfig`                          |    -    |
